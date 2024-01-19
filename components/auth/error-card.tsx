import { Header } from "@/components/auth/header";
import {
  Card,
  CardHeader
} from "@/components/ui/card";
import { BackButton } from "./back-button";

export const ErrorCard = () => {
  return (
    <Card className="w-[400px] shadow-none border-none">
      <CardHeader>
        <Header title="Connexion" label="Une erreur est survenue :("  />
        <BackButton href="/auth/login" label="Retour"/>
      </CardHeader>

    </Card>
  )
}