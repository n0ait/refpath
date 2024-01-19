import { Metadata } from "next";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Inscription",
  description: "S'inscrire sur Refpath.",
}

const RegisterPage = () => {
  return (
    <RegisterForm />
  )
}

export default RegisterPage;