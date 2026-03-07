import { Add, Help, Info, Remove } from "@mui/icons-material";
import { Box, Paper, Typography } from "@mui/material";
import React from "react";

const FaqItem = ({
  index,
  open,
  question,
  answer,
  onClick,
}: {
  index: number;
  open: boolean;
  question: string;
  answer: string;
  onClick: (index: number) => void;
}) => {
  return (
    <Paper
      component={"button"}
      onClick={() => onClick(index)}
      variant="outlined"
      sx={{
        width: "100%",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        borderRadius: "20px",
      }}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box display={"flex"} gap={"10px"} alignItems={"center"}>
          <Help sx={{ fontSize: "clamp(1rem, 2vw, 2rem)" }} />
          <Typography
            sx={{ fontWeight: 500, fontSize: "clamp(1rem, 2vw, 1.2rem)" }}
          >
            {question}
          </Typography>
        </Box>
        {open ? (
          <Remove sx={{ fontSize: "clamp(1rem, 2vw, 2rem)" }} />
        ) : (
          <Add sx={{ fontSize: "clamp(1rem, 2vw, 2rem)" }} />
        )}
      </Box>
      <Box
        p={open ? "20px" : "0px 20px"}
        display={"flex"}
        gap={"10px"}
        sx={{
          transition: "max-height 0.3s ease-in-out, padding 0.3s ease-in-out",
          maxHeight: open ? "500px" : "0px",
          overflow: "hidden",
        }}
      >
        <Info />
        <Typography
          sx={{ letterSpacing: "0.1em", lineHeight: "30px", textAlign: "left" }}
        >
          {answer}
        </Typography>
      </Box>
    </Paper>
  );
};

export default FaqItem;
