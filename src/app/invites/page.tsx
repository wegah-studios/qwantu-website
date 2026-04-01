import Footer from "@/components/footer";
import Header from "@/components/header";
import StepComponent from "@/components/step";
import RiseUpComponent from "@/components/riseUpComponent";
import loadSteps from "@/lib/loadSteps";
import { Box, Link, Paper, Typography } from "@mui/material";
import React from "react";

const InviteCodePage = () => {
  const steps = loadSteps("invite");

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
              Our Invites Refund Program
            </Typography>
            <Typography
              textAlign={"center"}
              sx={{ letterSpacing: "0.1em", lineHeight: "30px" }}
            >
              We offer an Invites Refund Program that select users can opt into
              to qualify for a full refund with no time limitation by inviting
              just five (5) friends to the app via their invite code. This
              program is completely optional and not necessary for any
              functionality of the application and is subject to our{" "}
              <Link href={"/legal/refund-policy"}>refund policy</Link> and{" "}
              <Link href={"/legal/invites-policy"}>invites policy</Link>
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
                How it works
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
