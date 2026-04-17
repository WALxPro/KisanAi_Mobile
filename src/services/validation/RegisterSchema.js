import * as yup from "yup";

export const registerSchema = yup.object({
  fullName: yup
    .string()
    .trim()
    .required("Full Name is required")
    .min(3, "Full Name must be at least 3 characters"),

  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Invalid email address"),

  phone: yup
    .string()
    .trim()
    .required("Phone Number is required")
    .matches(
      /^03\d{2}-?\d{7}$/,
      "Phone number must be 03XX-XXXXXXX or 03XXXXXXXXX",
    ),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const otpSchema = yup.object({
  otp: yup
    .string()
    .trim()
    .required("OTP is required")
    .matches(/^\d{6}$/, "OTP must be a 6-digit number"),
});
export const profileSchema = yup.object().shape({
  image: yup.string().required("Profile picture is required"),
});

export const cropSchema = yup.object().shape({
  city: yup.string().required("City is required"),
  season: yup.string().required("Season is required"),
  irrigation: yup.string().required("Irrigation type is required"),
  crop: yup.string().required("Crop is required"),
});
