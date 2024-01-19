"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CardWrapper } from "./card-wrapper";
import { HashLoader } from "react-spinners";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(async () => {
    if(success || error) return;

    if(!token) {
      setError("Votre url de vérification ne contient aucun token")
      return;
    };

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Une erreur est survenue.")
      })
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit])



  return (
    <CardWrapper
      headerTitle="Confirmer votre identité"
      headerLabel="Confirmation de votre e-mail"
      backButtonHref="/auth/login"
      backButtonLabel="Retour"
    >
      <div className="flex flex-col space-y-4 items-center w-full justify-center">
        {!error && !success && (
            <HashLoader />
          )
        }
        <FormSuccess message={success} />
        {!success &&(
            <FormError message={error} />
          )
        }
      </div>
    </CardWrapper>
  )
}

export default  NewVerificationForm;