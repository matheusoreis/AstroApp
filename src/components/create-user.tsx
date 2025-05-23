import React from "react";
import { Form, Input, Button } from "@heroui/react";
import type { UserType } from "@/domains/types/user";
import type ServiceResult from "@/domains/types/service-result";

interface Errors {
  [key: string]: string;
}

export default function CreateUser() {
  const [errors, setErrors] = React.useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState<UserType | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(
      formData as unknown as Iterable<[string, FormDataEntryValue]>,
    );

    try {
      const response = await fetch("/apis/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result: ServiceResult<UserType> = await response.json();

      if (!response.ok) {
        setErrors(result.error ?? {});
        return;
      }

      setSuccess(result.data ?? null);
      e.currentTarget.reset();
    } catch (err) {
      setErrors({ form: "Erro ao criar usuário." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <Form
        className="flex flex-col gap-4"
        onSubmit={onSubmit}
        validationErrors={errors}
      >
        <Input
          isRequired
          name="name"
          label="Nome"
          labelPlacement="outside"
          placeholder="Digite o nome do usuário"
        />
        <Input
          isRequired
          name="description"
          label="Descrição"
          labelPlacement="outside"
          placeholder="Descrição do usuário"
        />
        <Input
          name="avatarLink"
          label="Avatar (URL)"
          labelPlacement="outside"
          placeholder="https://"
          type="url"
        />

        <Button type="submit" isLoading={isSubmitting} color="primary">
          Criar Usuário
        </Button>

        {errors.form && <p className="text-red-500 text-sm">{errors.form}</p>}
        {success && (
          <p className="text-green-600 text-sm">
            Usuário <strong>{success.name}</strong> criado com sucesso!
          </p>
        )}
      </Form>
    </div>
  );
}
