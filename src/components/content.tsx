import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import RiseUpComponent from "./riseUpComponent";

const Content = ({
  reverse = false,
  title,
  description,
  image,
  color = "primary.main",
}: {
  reverse?: boolean;
  title: string;
  description: string;
  image: string;
  color?: "primary.main" | "secondary.main" | "secondary.light";
}) => {
  return (
    <Box
      padding={"40px 20px"}
      borderRadius={"20px"}
      bgcolor={color}
      display={"flex"}
      gap={"20px"}
      flexDirection={reverse ? "row-reverse" : "row"}
      flexWrap={"wrap"}
    >
      <Box flexBasis={300} flexGrow={1} display={"flex"} alignItems={"center"}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={"20px"}
          maxWidth={"450px"}
          m={"0 auto"}
        >
          <RiseUpComponent>
            <Typography variant="h1" sx={{ color: "black", fontWeight: 500 }}>
              {title}
            </Typography>
          </RiseUpComponent>
          <RiseUpComponent delay={0.2}>
            <Typography sx={{ color: "black", letterSpacing: "0.1em" }}>
              {description}
            </Typography>
          </RiseUpComponent>
        </Box>
      </Box>
      <Box flexBasis={300} flexGrow={1}>
        <Box
          position={"relative"}
          maxWidth={"400px"}
          m={"0 auto"}
          sx={{
            aspectRatio: "1.2/1",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <Image src={image} alt={title} fill style={{ objectFit: "cover" }} />
        </Box>
      </Box>
    </Box>
  );
};

export default Content;
