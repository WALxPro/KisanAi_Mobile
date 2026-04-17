import * as yup from "yup";

export const profilePictureSchema = yup.object().shape({
  image: yup.string().required("Profile picture is required"),
});


export const profileSchema = yup.object({
  fullName: yup
    .string()
    .trim()
    .required("Full Name is required")
    .min(3, "Full Name must be at least 3 characters"),


  phone: yup
    .string()
    .trim()
    .required("Phone Number is required")
    .matches(
      /^03\d{2}-?\d{7}$/,
      "Phone number must be 03XX-XXXXXXX or 03XXXXXXXXX",
    ),

  city: yup.string().trim().required("City is required"),
});
export const passwordSchema = yup.object({
  currentPassword: yup
    .string()
    .required("Current Password is required")
    .min(6, "Current Password must be at least 6 characters"),

  newPassword: yup
    .string()
    .required("New Password is required")
    .min(6, "New Password must be at least 6 characters"),

  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});
