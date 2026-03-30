"use client";

import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer";
import StatusComponent from "@/components/status";
import PricingComponent from "@/components/pricing";
import CheckoutComponent from "@/components/checkout";
import { Config, Payload, Status } from "@/types/common";
import { jwtDecode } from "jwt-decode";
import { normalizeInput } from "@/lib/appUtils";

const SetupPage = ({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ email?: string }>;
}) => {
  const router = useRouter();

  const [token, setToken] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<Status>({
    open: false,
    type: "loading",
    action: { callback() {} },
  });
  const [step, setStep] = useState<number | null>(null);
  const [config, setConfig] = useState<Config | null>(null);

  useEffect(() => {
    if (step === null) {
      const handleToken = async () => {
        try {
          let urlParams = await params;
          let search = await searchParams;

          let payload = jwtDecode(urlParams.token) as Payload;

          if (payload.type !== "setup" || !search.email) {
            throw new Error();
          }

          let expiry = payload.exp * 1000;

          if (Date.now() > expiry) {
            setStatus({
              open: true,
              type: "expired",
              title: "Link expired",
              message: "This link has expired, try login again.",
              action: {
                callback() {
                  router.replace("/");
                },
              },
            });
            return;
          }

          //continue
          setToken(urlParams.token);
          setEmail(normalizeInput(search.email, { whitespace: "" }));
          setStep(0);
        } catch (error) {
          setStatus({
            open: true,
            type: "error",
            title: "Invalid link",
            message: "The link provided is invalid. try again.",
            action: {
              callback() {
                router.replace("/");
              },
            },
          });
        }
      };
      handleToken();
    }
  }, [step]);

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
          {status.open && (
            <StatusComponent status={status} setStatus={setStatus} />
          )}
          {step !== null ? (
            [
              <PricingComponent
                key={0}
                setupToken={token}
                setStatus={setStatus}
                setStep={setStep}
                config={config}
                setConfig={setConfig}
              />,
              <CheckoutComponent
                key={1}
                email={email}
                setStatus={setStatus}
                setupToken={token}
              />,
            ][step]
          ) : (
            <Typography>loading</Typography>
          )}
        </Paper>
      </Box>
      <Footer />
    </Box>
  );
};

export default SetupPage;
