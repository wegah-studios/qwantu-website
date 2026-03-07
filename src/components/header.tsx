"use client";

import { Box, Button, Paper, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Header = ({
  hidden = false,
  actionUrl,
}: {
  hidden?: boolean;
  actionUrl: string;
}) => {
  const [show, setShow] = useState<boolean>(!hidden);

  useEffect(() => {
    if (hidden) {
      document.addEventListener("scroll", (e) => {
        setShow((prev) => {
          const shouldShow = window.scrollY > 600;
          if (prev !== shouldShow) {
            return shouldShow;
          }
          return prev;
        });
      });

      return () => document.removeEventListener("scroll", () => {});
    }
  }, []);

  return (
    <Paper
      sx={{
        opacity: show ? 1 : 0,
        position: hidden ? "fixed" : "sticky",
        top: 0,
        width: "100%",
        padding: "10px 20px",
        zIndex: 1000,
        borderRadius: "0px",
        transition: "opacity 0.2s ease",
        border: "none",
      }}
      variant="outlined"
    >
      <Box
        maxWidth={"1200px"}
        m={"auto"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={"20px"}
      >
        <Link
          href={"/"}
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
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
          <Typography
            sx={{ fontWeight: 500, fontSize: "clamp(1rem, 2vw, 2rem)" }}
          >
            Qwantu
          </Typography>
        </Link>
        <Link
          href={actionUrl || "/#"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            disableElevation
            variant="contained"
            startIcon={
              <Image
                src={"/playstore.png"}
                width={20}
                height={20}
                alt="playstore logo"
              />
            }
            size="small"
          >
            Download
          </Button>
        </Link>
      </Box>
    </Paper>
  );
};

export default Header;
