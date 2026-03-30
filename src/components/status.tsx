import { Status } from "@/types/common";
import { NewReleasesRounded, VerifiedRounded } from "@mui/icons-material";
import { Button, CircularProgress, Paper, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const StatusComponent = ({
  status,
  setStatus,
}: {
  status: Status;
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
}) => {
  const handleCaptchaVerify = (token: string) => {
    status.action.callback(token);
  };

  const handleStatusAction = () => {
    status.action.callback();
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        zIndex: 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "30px",
        padding: "20px",
      }}
    >
      {status.type === "loading" ? (
        <CircularProgress />
      ) : status.type === "error" ? (
        <NewReleasesRounded sx={{ color: "error.main", fontSize: "3.5rem" }} />
      ) : status.type === "success" ? (
        <VerifiedRounded sx={{ color: "success.main", fontSize: "3.5rem" }} />
      ) : status.type === "expired" ? (
        <Image
          src={"/expired.png"}
          alt="expired"
          width={100}
          height={100}
          style={{
            width: "clamp(80px, 3vw, 100px)",
            height: "clamp(80px, 3vw, 100px)",
          }}
        />
      ) : status.type === "captcha" ? (
        <Image
          src={"/bot.png"}
          alt="expired"
          width={100}
          height={100}
          style={{
            width: "clamp(80px, 3vw, 100px)",
            height: "clamp(80px, 3vw, 100px)",
          }}
        />
      ) : (
        false
      )}
      {!!status.title && (
        <Typography
          textAlign={"center"}
          sx={{ fontSize: "1.5rem", fontWeight: 500 }}
        >
          {status.title}
        </Typography>
      )}
      {!!status.message && (
        <Typography
          textAlign={"center"}
          sx={{ fontSize: "1.1rem", maxWidth: "500px" }}
        >
          {status.message}
        </Typography>
      )}
      {status.type === "captcha" ? (
        <HCaptcha
          sitekey="d75a0490-1e94-4ed6-8cc8-4dee0eb6482e"
          onVerify={handleCaptchaVerify}
        />
      ) : (
        status.type !== "loading" && (
          <Button
            onClick={handleStatusAction}
            variant="contained"
            disableElevation
            sx={{ mt: "40px" }}
          >
            {status.action.title || "OK"}
          </Button>
        )
      )}
    </Paper>
  );
};

export default StatusComponent;
