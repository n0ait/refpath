import * as z from "zod";

export const ProfileSchema = z.object({
  name: z.string().min(1, {
    message: "Un mail est requis",
  }),
});