import * as Yup from "yup"

const createPostSchema = Yup.object({
    title: Yup.string().min(4).required(),
    description: Yup.string().min(10).required()
})

export default createPostSchema