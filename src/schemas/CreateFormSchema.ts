import { z } from "zod"

export const formSchema = z.object({
  name: z.string().min(4, {
    message: "name must be at least 4 characters.",
  }),
  description: z.string(),
})

export type formSchemaType = z.infer<typeof formSchema>