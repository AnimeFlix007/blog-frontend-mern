import * as Yup from "yup"

const loginSchema = Yup.object({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().min(6).required("Password is required"),
})

export default loginSchema