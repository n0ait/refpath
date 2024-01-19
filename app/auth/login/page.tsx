import { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Connexion",
  description: "Se connecter à Refpath.",
}

const LoginPage = () => {
  return (
    <LoginForm />
  )
}

export default LoginPage;