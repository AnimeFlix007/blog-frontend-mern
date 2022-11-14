import * as Yup from "yup"

const addCaregorySchema = Yup.object({
    title: Yup.string().min(4).required()
})

export default addCaregorySchema