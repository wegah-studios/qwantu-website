import loadLegalDocumentation from "@/lib/loadLegalDocumentation";
import { Box, Paper, Typography } from "@mui/material";
import { Metadata } from "next";
import React from "react";

const TermsOfService = () => {
  const documentation = loadLegalDocumentation("terms-of-service");
  return (
    <Box
      pt={"50px"}
      minHeight={"90vh"}
      display={"flex"}
      flexDirection={"column"}
      gap={"50px"}
    >
      <Typography variant="h1">Terms Of Service</Typography>
      <Paper
        variant="outlined"
        sx={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "50px",
          borderRadius: "30px",
        }}
      >
        {documentation.map(({ title, description }, index) => (
          <Box
            key={index}
            display={"flex"}
            flexDirection={"column"}
            gap={"20px"}
          >
            <Typography variant="h2" sx={{ fontWeight: 500 }}>
              {title}
            </Typography>
            <Typography sx={{ letterSpacing: "0.1em", lineHeight: "30px" }}>
              {description}
            </Typography>
          </Box>
        ))}
      </Paper>
    </Box>
  );
};

export default TermsOfService;

export const metadata: Metadata = {
  title: "Terms of service | Qwantu",
  description: "Our terms of service",
  keywords: [
    "wegah",
    "wegah studios",
    "kenya",
    "tech",
    "software",
    "software tools",
    "mobile apps",
    "websites",
    "m-pesa",
    "expenses",
    "tracker",
  ],
  openGraph: {
    title: "Terms of service | Qwantu",
    description:
      "Automatically track your spending, manage your budgets, and gain insights into your financial habits — all in one simple, powerful app.",
    url: process.env.HOME_URL,
    siteName: "Qwantu",
    images: [
      {
        url: process.env.HOME_URL + "/logo.png",
        width: 1024,
        height: 1024,
        alt: "Qwantu",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of service | Qwantu",
    description:
      "Automatically track your spending, manage your budgets, and gain insights into your financial habits — all in one simple, powerful app.",
    images: [process.env.HOME_URL + "/logo.png"],
  },
};
