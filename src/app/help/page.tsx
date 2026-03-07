import ContactForm from "@/components/contactForm";
import FaqContainer from "@/components/faqContainer";
import Footer from "@/components/footer";
import Header from "@/components/header";
import loadFaqs from "@/lib/loadFaqs";
import { Box, Typography } from "@mui/material";
import { Metadata } from "next";
import React from "react";

const page = () => {
  const faqs = loadFaqs();
  return (
    <Box>
      <Header actionUrl={process.env.APP_URL as string} />
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
        <Typography variant="h1" sx={{ pt: "20px" }}>
          FAQs
        </Typography>
        <FaqContainer faqs={faqs} />
        <ContactForm helpMode />
        <Footer />
      </Box>
    </Box>
  );
};

export default page;

export const metadata: Metadata = {
  title: "Help | Qwantu",
  description: "Our Help page",
  keywords: [
    "qwantu",
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
    title: "Help | Qwantu",
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
    title: "Help | Qwantu",
    description:
      "Automatically track your spending, manage your budgets, and gain insights into your financial habits — all in one simple, powerful app.",
    images: [process.env.HOME_URL + "/logo.png"],
  },
};
