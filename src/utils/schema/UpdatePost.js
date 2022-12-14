import * as Yup from "yup";

const updatePostSchema = Yup.object({
  title: Yup.string().min(4).required(),
  description: Yup.string().min(10).required(),
  category: Yup.object().required(),
});

export default updatePostSchema;