import * as Yup from "yup";

const createPostSchema = Yup.object({
  title: Yup.string().min(4).required(),
  description: Yup.string().min(10).required(),
  category: Yup.object().required(),
  image: Yup.mixed()
    .required()
    .test(
      "FILE_SIZE",
      "Too Big File Size Max 10mb",
      (val) => val && val.size < 1024 * 1024 * 1
    )
    .test(
      "FILE_TYPE",
      "Invalid only jpg/jpeg/png",
      (val) => val && ["image/jpeg", "image/png"].includes(val.type)
    ),
});

export default createPostSchema;
