import { z } from "zod";

export const textFieldPropertiesSchema = z.object({
  label : z.string().min(2).max(50),
  helperText : z.string().max(200),
  required : z.boolean(),
  placeHolder : z.string().max(50)
})

export type textFieldPropertiesType = z.infer<typeof textFieldPropertiesSchema>