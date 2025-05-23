import type { FormErrorType } from "@/domains/types/form-error";
import type ServiceResult from "@/domains/types/service-result";
import type { DeleteUserType } from "@/domains/types/user";
import { Button } from "@heroui/react";
import React from "react";

interface DeleteAllUsersProps {
  onAllDeleted: () => void;
}

export default function DeleteAllUsers({ onAllDeleted }: DeleteAllUsersProps) {
  const [errors, setErrors] = React.useState<FormErrorType>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/apis/delete-all-users", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result: ServiceResult<number> = await response.json();

      if (!response.ok || !result.data) {
        setErrors(result.error ?? { form: "Erro ao criar usuário." });
        return;
      }

      onAllDeleted();
    } catch (error: any) {
      setErrors({ form: "Erro ao criar usuário." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Button
      color="danger"
      disabled={isSubmitting}
      isLoading={isSubmitting}
      onPress={onSubmit}
    >
      Apagar Tudo
    </Button>
  );
}
