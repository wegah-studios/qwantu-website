"use client";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { ApiResponse, Config, Status } from "@/types/common";
import { Box, Button, Typography } from "@mui/material";
import { Check } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getDid } from "@/lib/appUtils";
import { userAppContext } from "@/context/appContext";

const PricingComponent = ({
  setupToken,
  config,
  setConfig,
  setStatus,
  setStep,
}: {
  setupToken: string;
  config: Config | null;
  setConfig: React.Dispatch<React.SetStateAction<Config | null>>;
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
  setStep: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const router = useRouter();
  const { setCaptchaReturnUrl } = userAppContext();

  const [price, setPrice] = useState<{ amount: number; offer: number }>({
    amount: 0,
    offer: 0,
  });
  const benefits = useMemo(
    () => [
      "Offline access",
      "Automatic expense capture",
      "Budget tracking",
      "Spending insights",
    ],
    [],
  );

  useEffect(() => {
    if (!config) {
      const fetchConfig = async () => {
        try {
          setStatus({
            open: true,
            type: "loading",
            message: "loading, please wait...",
            action: { callback: () => {} },
          });
          const endpoint =
            (process.env.APP_API_URL || "http://192.168.0.101:3001") +
            "/v1/config";
          const response = await axios.get(endpoint, {
            headers: { "x-did": getDid() },
          });

          const data = response.data as ApiResponse;

          if (!data.success) {
            throw new Error();
          }

          let { tokens, ...config } = data.data as Config & {
            tokens: { type: string; value: string }[];
          };

          let pricing = {
            amount:
              config.price.amount - config.price.amount * config.price.offer,
            offer: config.price.amount,
          };

          setConfig(config);

          setPrice(pricing);
          setStatus({
            open: false,
            type: "loading",
            action: { callback: () => {} },
          });
        } catch (error: any) {
          if (error.message !== "Network Error" && !!error.response?.data) {
            const data = error.response.data as ApiResponse;
            if (data.responseCode === 429 && data.data.tokens.length) {
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
                title: "Broken link",
                message: "The link provided is broken, please try again.",
                action: {
                  callback() {
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
              message:
                "Make sure your connected to the internet, then try again.",
              action: {
                callback: () => {
                  router.refresh();
                },
              },
            });
          }
        }
      };
      fetchConfig();
    }
  }, [config]);

  const handleClick = () => {
    setStep(1);
  };

  return (
    <Box
      flex={1}
      display={"flex"}
      flexDirection={"column"}
      gap={"20px"}
      alignItems={"center"}
      justifyContent={"center"}
      padding={"20px"}
    >
      <Box
        bgcolor={"info.main"}
        sx={{
          borderRadius: "10px",
          width: "clamp(30px, 3vw, 40px)",
          height: "clamp(30px, 3vw, 40px)",
        }}
      >
        <Image
          src={"/logo.png"}
          alt="logo"
          width={40}
          height={40}
          style={{
            width: "clamp(30px, 3vw, 40px)",
            height: "clamp(30px, 3vw, 40px)",
          }}
        />
      </Box>
      <Typography variant="h2" sx={{}}>
        Setup a Qwantu Account
      </Typography>
      <Typography sx={{ fontWeight: "bold", fontSize: "1.3rem" }}>
        Pay once, for life
      </Typography>
      <Box
        color={"text.secondary"}
        display={"flex"}
        flexDirection={"column"}
        gap={"10px"}
      >
        {benefits.map((benefit, index) => (
          <Box key={index} display={"flex"} gap={"10px"}>
            <Check sx={{ color: "text.secondary" }} />
            <Typography sx={{ color: "text.secondary" }}>{benefit}</Typography>
          </Box>
        ))}
      </Box>
      <Box display={"flex"} alignItems={"center"} gap={"10px"}>
        <Typography variant="h2">Ksh {price.amount}</Typography>
        <Typography
          sx={{
            fontSize: "1.3rem",
            textDecoration: "line-through",
            color: "text.secondary",
          }}
        >
          Ksh {price.offer}
        </Typography>
      </Box>
      <Button
        onClick={handleClick}
        variant="contained"
        size="large"
        disableElevation
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          padding: "20px 40px",
        }}
      >
        <Image
          src={"/mpesa-logo.png"}
          alt="mpesa logo"
          width={80}
          height={30}
          style={{
            height: "clamp(20px, 3vw, 30px)",
            width: "clamp(70px, 3vw, 80px)",
          }}
        />
        <Typography sx={{ fontWeight: 500 }}>Pay with Mpesa</Typography>
      </Button>
      <Typography>Get a full refund by inviting friends!</Typography>
    </Box>
  );
};

export default PricingComponent;
