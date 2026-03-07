import { Box, Paper, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <Paper
      component={"footer"}
      variant="outlined"
      sx={{
        padding: "20px",
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
        justifyContent: "space-between",
        borderRadius: "20px",
      }}
    >
      <Link
        href={
          process.env.COMPANY_URL ||
          "https://www.linkedin.com/in/joshua-wegah-67b83428b/"
        }
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "10px",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        <Image
          src={"/wega-studios-logo.png"}
          alt="wega-studios-logo"
          width={30}
          height={30}
          style={{ borderRadius: "10px" }}
        />
        <Typography>Made by Wegah Studios</Typography>
        <Typography sx={{ color: "text.secondary", fontSize: "0.8rem" }}>
          © 2025 All rights reserved
        </Typography>
      </Link>
      <Box
        display={"flex"}
        gap={"10px"}
        alignItems={"center"}
        justifyContent={"center"}
        flexWrap={"wrap"}
      >
        <Link
          style={{ color: "inherit", textDecoration: "none" }}
          href={"/legal/terms-of-service"}
        >
          Terms of Service
        </Link>
        <Link
          style={{ color: "inherit", textDecoration: "none" }}
          href={"/legal/privacy-policy"}
        >
          Privacy Policy
        </Link>
      </Box>
    </Paper>
  );
};

export default Footer;
