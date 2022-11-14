import * as Yup from "yup";

const signUpSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email().required("email is required"),
  password: Yup.string().min(6).required("password is required"),
  confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

export default signUpSchema;
