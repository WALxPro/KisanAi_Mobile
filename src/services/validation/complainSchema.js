import * as yup from "yup";

export const complainSchema = yup.object({
  title: yup.string().required("title is required"),
  category: yup.string().required("Category is required"),
  description: yup
    .string()
    .min(10, "Description must be at least 10 characters")
    .required("Description is required"),
});