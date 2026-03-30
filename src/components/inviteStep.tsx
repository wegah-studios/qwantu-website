import { InviteStep } from "@/types/common";
import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import RiseUpComponent from "./riseUpComponent";

const InviteStepComponent = ({
  image,
  title,
  description,
  reverse = false,
  index,
}: InviteStep & { reverse: boolean; index: number }) => {
  return (
    <Box
      padding={"40px 20px"}
      borderRadius={"20px"}
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
            <Typography variant="h2" sx={{ fontWeight: 500 }}>
              {index + 1}. {title}
            </Typography>
          </RiseUpComponent>
          <RiseUpComponent delay={0.2}>
            <Typography sx={{ letterSpacing: "0.1em" }}>
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
            aspectRatio: "1/1",
            borderRadius: "20px",
            borderWidth: "1px",
            borderColor: "text.primary",
            borderStyle: "solid",
            overflow: "hidden",
          }}
        >
          <Image src={image} alt={title} fill style={{ objectFit: "cover" }} />
        </Box>
      </Box>
    </Box>
  );
};

export default InviteStepComponent;
