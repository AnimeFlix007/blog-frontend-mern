import * as Yup from "yup"

const addCommentSchema = Yup.object({
    title: Yup.string().min(4).required()
})

export default addCommentSchema