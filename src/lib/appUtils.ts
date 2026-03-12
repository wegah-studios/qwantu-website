import * as uuid from "uuid";

export const getDid = () => {
  let id = localStorage.getItem("did");

  if (!id) {
    id = uuid.v4();
    localStorage.setItem("did", id);
  }

  return id;
};

export const inputErrors = (
  name: string,
  value: string,
  required?: boolean,
) => {
  const validator: Record<string, () => string> = {
    phoneNumber: () =>
      !/^(0|\+254|254)7\d{8}$/.test(normalizeInput(value, { whitespace: "" }))
        ? "must be a valid M-pesa number."
        : "",
    inviteCode: () =>
      !/^(?=(?:.*\d){4,})[a-z\d]{8}$/.test(
        normalizeInput(value, { whitespace: "" }).replace("-", ""),
      )
        ? "must be a valid invite code from the Qwantu app."
        : "",
  };

  if (!value) {
    if (required) {
      return "required";
    } else {
      return "";
    }
  }
  return validator[name]?.() || "";
};

export const normalizeInput = (
  str: string,
  options?: { whitespace?: string; maintainCase?: boolean },
) => {
  str = str
    .replace(
      /\s+/g,
      options?.whitespace !== undefined ? options.whitespace : " ",
    )
    .replace(/'/g, "''")
    .trim();
  if (!options?.maintainCase) {
    str = str.toLowerCase();
  }
  return str;
};
