// Regex patterns
export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
export const NAME_REGEX = /^[a-zA-Z\s]*$/;

// Standard Messages
export const VALIDATION_MESSAGES = {
  REQUIRED: "This field is required",
  INVALID_EMAIL: "Invalid email address",
  INVALID_PASSWORD:
    "Password must be 6-16 characters and contain at least one number and special character",
  INVALID_NAME: "Name should only contain letters and spaces",
};

// Helper functions
export const isValidEmail = (email) => {
  return EMAIL_REGEX.test(email);
};

export const isValidPassword = (password) => {
  return PASSWORD_REGEX.test(password);
};

export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "string" && value.trim() === "")
  );
};
