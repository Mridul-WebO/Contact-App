import * as Yup from "yup";
// import { regex } from "./utils/helperFunctions"

export const validateForm = (formData) => {
  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Invalid email"),
    password: Yup.string().required("Password is required"),
  });

  return validationSchema.validate(formData, { abortEarly: false });
};
