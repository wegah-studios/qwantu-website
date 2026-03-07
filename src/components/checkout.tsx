import { userAppContext } from "@/context/appContext";
import { getDid, inputErrors, normalizeInput } from "@/lib/appUtils";
import { ApiResponse, Config, Status } from "@/types/common";
import {
  ArrowRightAltRounded,
  DoneRounded,
  EastRounded,
  EmojiPeopleRounded,
  ExitToAppRounded,
  ForwardRounded,
  GroupsRounded,
  PhoneAndroidRounded,
} from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const CheckoutComponent = ({
  config,
  setupToken,
  setStatus,
}: {
  config: Config | null;
  setupToken: string;
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
}) => {
  const router = useRouter();
  const { setCaptchaReturnUrl } = userAppContext();

  const [checkoutToken, setCheckoutToken] = useState<string | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<number>(0);
  const [form, setForm] = useState<{
    phoneNumber: string;
    inviteCode: string;
  }>({ phoneNumber: "", inviteCode: "" });
  const [errors, setErrors] = useState<{
    phoneNumber: string;
    inviteCode?: string;
  }>({ phoneNumber: "required" });
  const [touched, setTouched] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchCheckoutToken();
  }, []);

  const fetchCheckoutToken = async () => {
    try {
      setStatus({
        open: true,
        type: "loading",
        message: "Loading, please wait.",
        action: { callback: () => {} },
      });

      const endpoint =
        (process.env.APP_API_URL || "http://192.168.0.101:3001") +
        "/v1/users/checkout";

      const response = await axios.post(
        endpoint,
        {},
        {
          headers: { Authorization: "Bearer " + setupToken, "x-did": getDid() },
        },
      );

      let data = response.data as ApiResponse;

      if (!data.data.tokens.length) {
        throw new Error("Link broken.");
      }

      let checkoutTk = data.data.tokens[0].value;

      setCheckoutToken(checkoutTk);
      setStatus({ open: false, type: "loading", action: { callback() {} } });
    } catch (error: any) {
      if (error.message !== "Network Error" && !!error.response?.data) {
        const data = error.response.data as ApiResponse;
        if (data.responseCode === 1 || data.responseCode === 23) {
          setStatus({
            open: true,
            type: "expired",
            title: "Link expired",
            message: "The provided link has expired, try to login again.",
            action: {
              callback: () => {
                router.replace("/");
              },
            },
          });
        } else if (data.responseCode === 429 && data.data.tokens.length) {
          let challengeTk = data.data.tokens.find(
            ({ type }) => type === "challenge",
          );
          if (challengeTk) {
            router.push("/captcha/" + challengeTk.value);
            setCaptchaReturnUrl("/setup/" + setupToken);
          }
        } else {
          setStatus({
            open: true,
            type: "error",
            title: "An error occured.",
            message: data.message,
            action: {
              callback: () => {
                router.replace("/");
              },
            },
          });
        }
      } else {
        setStatus({
          open: true,
          type: "error",
          title: "Network Error.",
          message: "Make sure your connected to the internet, then try again.",
          action: {
            callback: () => {
              router.refresh();
            },
          },
        });
      }
    }
  };

  const handleChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = target;

    setErrors((prev) => ({
      ...prev,
      [name]: inputErrors(name, value, name === "phoneNumber"),
    }));

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = ({
    target,
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = target;
    if (!touched.has(name)) {
      setTouched((prev) => {
        const newSet = new Set(prev);
        newSet.add(name);
        return newSet;
      });
    }
  };

  const handleSubmit = () => {
    if (checkoutStep === 0 && !errors.phoneNumber) {
      setCheckoutStep(1);
    } else if (
      checkoutStep === 1 &&
      !!checkoutToken &&
      !errors.phoneNumber &&
      !errors.inviteCode
    ) {
      makePayment();
    } else if (checkoutStep === 2) {
      router.replace("/legal/terms-of-service");
    }
  };

  const makePayment = async () => {
    try {
      setStatus({
        open: true,
        type: "loading",
        message: "Processing payment...",
        action: { callback: () => {} },
      });

      let body: Record<string, string> = {};
      body.phoneNumber = normalizeInput(form.phoneNumber, {
        whitespace: "",
      }).replace(/^(0|\+254)/, "254");

      let inviteCode = normalizeInput(form.inviteCode, {
        whitespace: "",
      }).replace("-", "");

      if (inviteCode) {
        body.inviteCode = inviteCode;
      }

      const endpoint =
        (process.env.APP_API_URL || "http://192.168.0.101:3001") +
        "/v1/payments/initiate";
      await axios.post(endpoint, body, {
        headers: {
          Authorization: "Bearer " + checkoutToken,
          "x-did": getDid(),
        },
      });

      setStatus({
        open: true,
        type: "success",
        title: "Payment prompt sent.",
        message:
          "The payment prompt has been sent to your phone, once payment is received you will receive an email confirming account setup.",
        action: {
          callback: () => {
            setCheckoutStep(2);
            setStatus({
              open: false,
              type: "loading",
              action: { callback: () => {} },
            });
          },
        },
      });
    } catch (error: any) {
      if (error.message !== "Network Error" && !!error.response?.data) {
        const data = error.response.data as ApiResponse;
        if (data.responseCode === 23 || 2) {
          setStatus({
            open: true,
            type: "error",
            title: "Session expired.",
            message: "Checkout session expired, please reload the page.",
            action: {
              callback: () => {
                window.location.reload();
              },
            },
          });
        } else if (data.responseCode === 1) {
          if (data.data.tokens.length) {
            let newCheckoutTk = data.data.tokens[0].value;
            setCheckoutToken(newCheckoutTk);
          }
          setStatus({
            open: true,
            type: "error",
            title: "Prompt not sent.",
            message:
              "The payment prompt cannot be sent, make sure your phone is unlocked.",
            action: {
              callback: () => {
                setStatus({
                  open: false,
                  type: "loading",
                  action: {
                    callback: () => {},
                  },
                });
              },
            },
          });
        } else if (data.responseCode === 429 && data.data.tokens.length) {
          let challengeTk = data.data.tokens.find(
            ({ type }) => type === "challenge",
          );
          if (challengeTk) {
            router.push("/captcha/" + challengeTk.value);
            setCaptchaReturnUrl("/setup/" + setupToken);
          }
        } else {
          setStatus({
            open: true,
            type: "error",
            title: "An error occured.",
            message: data.message,
            action: {
              callback: () => {
                setStatus({
                  open: false,
                  type: "loading",
                  action: { callback: () => {} },
                });
              },
            },
          });
        }
      } else {
        setStatus({
          open: true,
          type: "error",
          title: "Network Error.",
          message: "Make sure your connected to the internet, then try again.",
          action: {
            callback: () => {
              router.refresh();
            },
          },
        });
      }
    }
  };

  return (
    <Box
      sx={{
        flex: 1,
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {
        [
          <>
            <PhoneAndroidRounded sx={{ fontSize: "2rem" }} />
            <Typography variant="h2">Enter your phone number</Typography>
            <Typography sx={{}}>
              Use a phone number that can receive M-pesa payment prompts.
            </Typography>
            <TextField
              required
              label="Phone number"
              name="phoneNumber"
              value={form.phoneNumber}
              placeholder="Your phone number"
              type="tel"
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.phoneNumber && touched.has("phoneNumber")}
              helperText={
                errors.phoneNumber && touched.has("phoneNumber")
                  ? "Phone number " + errors.phoneNumber
                  : " "
              }
              sx={{ mt: "20px", width: "min(300px, 100%)" }}
            />
            <Button
              onClick={handleSubmit}
              variant="contained"
              disableElevation
              endIcon={<ForwardRounded />}
            >
              Send Prompt
            </Button>
          </>,
          <>
            <Button
              onClick={() => setCheckoutStep(0)}
              size="small"
              startIcon={
                <ArrowRightAltRounded sx={{ transform: "rotate(180deg)" }} />
              }
              sx={{
                position: "absolute",
                left: 10,
                top: 10,
                textTransform: "unset",
              }}
            >
              Back
            </Button>
            <EmojiPeopleRounded sx={{ fontSize: "2.5rem" }} />
            <Typography variant="h2">Brought here by a friend?</Typography>
            <Typography
              textAlign={"center"}
              sx={{ letterSpacing: "0.1em", maxWidth: "400px" }}
            >
              Ask them for their invite code, and get them a full refund
              (optional).
            </Typography>
            <TextField
              label="Invite Code"
              name="inviteCode"
              value={form.inviteCode}
              placeholder="Your friend's invite code."
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.inviteCode && touched.has("inviteCode")}
              helperText={
                errors.inviteCode && touched.has("inviteCode")
                  ? "Invite code " + errors.inviteCode
                  : " "
              }
              sx={{ mt: "20px", width: "min(300px, 100%)" }}
            />
            <Button
              onClick={handleSubmit}
              variant="contained"
              disableElevation
              startIcon={
                !!form.inviteCode ? <DoneRounded /> : <ExitToAppRounded />
              }
            >
              {!!form.inviteCode ? "Done" : "Skip"}
            </Button>
          </>,
          <>
            <GroupsRounded sx={{ fontSize: "2.5rem" }} />
            <Typography variant="h2">Did you know?</Typography>
            <Typography
              textAlign={"center"}
              sx={{ letterSpacing: "0.1em", maxWidth: "400px" }}
            >
              If you invite just{" "}
              <strong>{config?.inviteThreshold || 2} friends</strong> using your
              invite code you'll be able to get a full refund.
            </Typography>
            <Button
              onClick={handleSubmit}
              variant="contained"
              disableElevation
              endIcon={<EastRounded />}
            >
              Learn more
            </Button>
          </>,
        ][checkoutStep]
      }
    </Box>
  );
};

export default CheckoutComponent;
