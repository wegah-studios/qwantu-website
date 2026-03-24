"use client";

import Footer from "@/components/footer";
import StatusComponent from "@/components/status";
import { ApiResponse, Payload, Status } from "@/types/common";
import { Box, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import axios from "axios";
import { generateUID, getDid } from "@/lib/appUtils";
import { useAppContext } from "@/context/appContext";
import ContactForm from "@/components/contactForm";

const CaptchaPage = ({ params }: { params: Promise<{ token: string }> }) => {
  const router = useRouter();
  const { captchaReturnUrl, setCaptchaReturnUrl } = useAppContext();

  const [_challengeToken, setChallengeToken] = useState<string>("");
  const [idemKeys, setIdemKeys] = useState({ verify: generateUID() });
  const [status, setStatus] = useState<Status>({
    open: true,
    type: "loading",
    action: { callback() {} },
  });

  useEffect(() => {
    const handleToken = async () => {
      try {
        let { token } = await params;
        let payload = jwtDecode(token) as Payload;

        if (payload.type !== "challenge") {
          throw new Error();
        }

        let expiry = payload.exp * 1000;

        if (Date.now() > expiry) {
          setStatus({
            open: true,
            type: "expired",
            title: "Link expired",
            message: `This link has expired, ${captchaReturnUrl ? "click 'OK' to continue." : "you can close this page."}`,
            action: {
              callback: handleVerified,
            },
          });
          return;
        }

        setChallengeToken(token);
        setStatus({
          open: true,
          type: "captcha",
          title: "Verify you are human.",
          message:
            "Click the checkbox below to verify. If you need assistance, contact us below.",
          action: {
            callback: async (captchaToken) => {
              if (captchaToken) {
                await verifyCaptcha(captchaToken, token);
              }
            },
          },
        });
      } catch (error) {
        setStatus({
          open: true,
          type: "error",
          title: "Invalid link",
          message: "The link provided is invalid. try again.",
          action: {
            callback: handleVerified,
          },
        });
      }
    };
    handleToken();
  }, []);

  const updateIdemKeys = (...keys: string[]) => {
    setIdemKeys((prev) => {
      let update = keys.reduce(
        (obj, key) => {
          obj[key] = generateUID();
          return obj;
        },
        {} as Record<string, any>,
      );

      return { ...prev, ...update };
    });
  };

  const verifyCaptcha = async (
    captchaToken: string,
    challengeToken: string,
  ) => {
    try {
      let endpoint = process.env.NEXT_PUBLIC_API_URL;
      if (endpoint) {
        endpoint += "/v1/captcha/verify";
        await axios.post(
          endpoint,
          { response: captchaToken },
          {
            headers: {
              Authorization: "Bearer " + challengeToken,
              "x-did": getDid(),
              "x-idem-key": idemKeys.verify,
              "ngrok-skip-browser-warning": "true",
            },
          },
        );

        updateIdemKeys("verify");

        setStatus({
          open: true,
          type: "success",
          title: "Verification complete",
          message: `You have completed the verification, ${captchaReturnUrl ? "click 'OK' to continue." : "you can close this page."}`,
          action: {
            callback: handleVerified,
          },
        });
      } else {
        throw new Error();
      }
    } catch (error: any) {
      if (error.message !== "Network Error" && !!error.response?.data) {
        const { data, responseCode } = error.response.data as ApiResponse;
        if (responseCode === 1 || 23) {
          setStatus({
            open: true,
            type: "success",
            title: "Verification complete",
            message: `You have completed the verification, ${captchaReturnUrl ? "click 'OK' to continue." : "you can close this page."}`,
            action: {
              callback: handleVerified,
            },
          });
        } else if (responseCode === 2 && !!data.tokens.length) {
          let challengeTk = data.tokens.find(
            ({ type }) => type === "challenge",
          );
          if (challengeTk) {
            setStatus({
              open: true,
              type: "error",
              title: "Incorrect verification",
              message: "The response received was incorrect, try again.",
              action: {
                callback: () => {
                  setStatus({
                    open: true,
                    type: "captcha",
                    title: "Verify you are human, again.",
                    message:
                      "Click the checkbox below to verify. If you need assistance, contact us below.",
                    action: {
                      callback: async (captchaToken) => {
                        if (captchaToken) {
                          await verifyCaptcha(captchaToken, challengeTk.value);
                        }
                      },
                    },
                  });
                },
              },
            });
          }
        } else {
          setStatus({
            open: true,
            type: "error",
            title: "An error occured.",
            message: error.message,
            action: {
              callback: handleVerified,
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
              window.location.reload();
            },
          },
        });
      }
    }
  };

  const handleVerified = () => {
    router.replace(captchaReturnUrl || "/");
    setCaptchaReturnUrl("");
  };

  return (
    <Box
      component={"main"}
      maxWidth={"1200px"}
      m={"auto"}
      p={"0 20px"}
      pb={"10px"}
      display={"flex"}
      flexDirection={"column"}
      gap={"80px"}
    >
      <Box
        minHeight={"80vh"}
        pt={"50px"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Paper
          variant="outlined"
          sx={{
            width: "min(700px, 100%)",
            minHeight: "500px",
            display: "flex",
            position: "relative",
            padding: "20px",
          }}
        >
          <StatusComponent status={status} setStatus={setStatus} />
        </Paper>
      </Box>
      <ContactForm />
      <Footer />
    </Box>
  );
};

export default CaptchaPage;
