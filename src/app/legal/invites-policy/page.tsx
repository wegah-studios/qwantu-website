import loadLegalDocumentation from "@/lib/loadLegalDocumentation";
import { Box, Paper, Typography } from "@mui/material";
import { Metadata } from "next";
import React from "react";

const InvitesPolicyPage = () => {
  const documentation = loadLegalDocumentation("invites-policy");
  return (
    <Box
      pt={"50px"}
      minHeight={"90vh"}
      display={"flex"}
      flexDirection={"column"}
      gap={"50px"}
    >
      <Typography variant="h1">Invites Policy</Typography>
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

export default InvitesPolicyPage;

export const metadata: Metadata = {
  title: "Invites Policy | Qwantu",
  description: "Our Invites Policy",
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
    title: "Invites Policy | Qwantu",
    description:
      "Automatically track your spending, manage your budgets, and gain insights into your financial habits — all in one simple, powerful app.",
    url: process.env.NEXT_PUBLIC_HOME_URL,
    siteName: "Qwantu",
    images: [
      {
        url: process.env.NEXT_PUBLIC_HOME_URL + "/logo.png",
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
    title: "Invites Policy | Qwantu",
    description:
      "Automatically track your spending, manage your budgets, and gain insights into your financial habits — all in one simple, powerful app.",
    images: [process.env.NEXT_PUBLIC_HOME_URL + "/logo.png"],
  },
};
