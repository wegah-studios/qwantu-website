export type FAQ = {
  question: string;
  answer: string;
};

export type Status = {
  open: boolean;
  type: "loading" | "error" | "success" | "expired" | "captcha";
  title?: string;
  message?: string;
  action: {
    title?: string;
    callback: (token?: string) => void;
  };
};

export type Config = {
  price: {
    amount: number;
    offer: number;
  };
  inviteThreshold: number;
};

export type Payload = {
  sub: string;
  type: string;
  data?: Record<string, string>;
  iat: number;
  exp: number;
};

export type ApiResponse = {
  success: boolean;
  data: Record<string, any> & {
    tokens: { type: string; value: string }[];
    error: null | string;
  };
  responseCode: number;
  message: string;
};

export type InviteStep = {
  image: string;
  title: string;
  description: string;
};
