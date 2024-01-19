import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Un mail est requis",
  }),
  password: z.string().min(1, {
    message: "Un mot de passe est requis",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Un mail est requis",
  }),
  password: z.string().min(6, {
    message: "Votre mot de passe doit au moins faire 6 caractère",
  }),

  name: z.string().min(1, {
    message: "Un nom est requis"
  })
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Un mail est requis",
  })
});