import React from "react";
import {
  Form,
  Input,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@heroui/react";
import type { UserType } from "@/domains/types/user";
import type ServiceResult from "@/domains/types/service-result";
import type { FormErrorType } from "@/domains/types/form-error";

interface CreateUserProps {
  onCreated: (user: UserType) => void;
}

export default function CreateUser({ onCreated }: CreateUserProps) {
  const [errors, setErrors] = React.useState<FormErrorType>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState<UserType | undefined>(undefined);
  const [isOpen, setIsOpen] = React.useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSuccess(undefined);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(
      formData as unknown as Iterable<[string, FormDataEntryValue]>,
    );

    try {
      const response = await fetch("/apis/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result: ServiceResult<UserType> = await response.json();

      if (!response.ok || !result.data) {
        setErrors(result.error ?? { form: "Erro ao criar usuário." });
        return;
      }

      setSuccess(result.data);
      onCreated(result.data);

      form.reset();
      setIsOpen(false);
    } catch (err) {
      setErrors({ form: "Erro ao criar usuário." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Popover isOpen={isOpen} onOpenChange={setIsOpen} placement="bottom">
      <PopoverTrigger>
        <Button color="primary">Novo Usuário</Button>
      </PopoverTrigger>
      <PopoverContent className="p-4">
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
            isRequired
            name="avatarLink"
            label="Avatar (URL)"
            labelPlacement="outside"
            placeholder="https://"
            type="url"
          />

          <Button
            type="submit"
            isDisabled={isSubmitting}
            isLoading={isSubmitting}
            color="primary"
            className="w-full"
          >
            Criar Usuário
          </Button>

          {errors.form && <p className="text-red-500 text-sm">{errors.form}</p>}
          {success && (
            <p className="text-green-600 text-sm">
              Usuário <strong>{success.name}</strong> criado com sucesso!
            </p>
          )}
        </Form>
      </PopoverContent>
    </Popover>
  );
}
