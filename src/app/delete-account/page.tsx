import Footer from "@/components/footer";
import Header from "@/components/header";
import StepComponent from "@/components/step";
import RiseUpComponent from "@/components/riseUpComponent";
import loadSteps from "@/lib/loadSteps";
import { Box, Link, Paper, Typography } from "@mui/material";
import React from "react";

const InviteCodePage = () => {
  const steps = loadSteps("delete");

  return (
    <Box>
      <Header actionUrl={process.env.NEXT_PUBLIC_APP_URL as string} />
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
          sx={{
            minHeight: "80vh",
            mt: "30px",
            display: "flex",
            flexDirection: "column",
            gap: "40px",
          }}
        >
          <Paper
            variant="outlined"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              padding: "40px",
              borderRadius: "30px",
            }}
          >
            <Typography variant="h2" sx={{ fontWeight: 500 }}>
              Deleting your account data
            </Typography>
            <Typography
              textAlign={"center"}
              sx={{ letterSpacing: "0.1em", lineHeight: "30px" }}
            >
              You are able to delete your account data at any time through the
              qwantu app, No expense data (expenses, budgets, preferences
              etc...) is collected or processed outside your device or shared
              with third parties. Account data is only collected and processed
              for authentification, account setup, and refunds and is handled
              strictly as per our{" "}
              <Link href={"/legal/privacy-policy"}>privacy policy</Link>. Follow
              the steps below to delete your account.
            </Typography>
          </Paper>
          <Paper
            variant="outlined"
            sx={{
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              borderRadius: "30px",
            }}
          >
            <RiseUpComponent>
              <Typography
                variant="h2"
                sx={{ fontWeight: 500, textAlign: "center" }}
              >
                Delete your account
              </Typography>
            </RiseUpComponent>
            {steps.map((step, index) => (
              <StepComponent
                key={index}
                {...step}
                reverse={index % 2 !== 0}
                index={index}
              />
            ))}
          </Paper>
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default InviteCodePage;
