import Footer from "@/components/footer";
import Header from "@/components/header";
import { Home } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <>
      <Header actionUrl={process.env.APP_URL as string} />
      <Box
        component={"main"}
        maxWidth={"1200px"}
        m={"auto"}
        p={"0 20px"}
        pb={"10px"}
      >
        <Box
          component={"main"}
          minHeight={"90vh"}
          display={"flex"}
          flexDirection={"column"}
          gap={"20px"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Image
            src={"/not-found.png"}
            alt="not found"
            width={300}
            height={300}
            style={{ width: "min(300px, 100%)", aspectRatio: "1/1" }}
          />
          <Typography variant="h2" sx={{ pb: "20px" }}>
            Page Not Found
          </Typography>
          <Link href={"/"}>
            <Button variant="contained" disableElevation startIcon={<Home />}>
              Home
            </Button>
          </Link>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default NotFound;
