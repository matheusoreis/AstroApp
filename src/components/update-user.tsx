import type { FormErrorType } from "@/domains/types/form-error";
import type ServiceResult from "@/domains/types/service-result";
import type { UpdateUserType, UserType } from "@/domains/types/user";
import {
  Button,
  Form,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@heroui/react";
import React from "react";

interface EditUserProps {
  user: UpdateUserType;
  onEdited: (user: UserType) => void;
}

export default function UpdateUser({ user, onEdited }: EditUserProps) {
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
      const response = await fetch("/apis/update-user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: user.id, ...data }),
      });

      const result: ServiceResult<UserType> = await response.json();

      if (!response.ok || !result.data) {
        setErrors(result.error ?? { form: "Erro ao atualizar usuário." });
        return;
      }

      setSuccess(result.data);
      onEdited(result.data);

      form.reset();
      setIsOpen(false);
    } catch (err) {
      setErrors({ form: "Erro ao atualizar usuário." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Popover isOpen={isOpen} onOpenChange={setIsOpen} placement="bottom">
      <PopoverTrigger>
        <Button color="primary">Editar</Button>
      </PopoverTrigger>
      <PopoverContent className="p-4">
        <Form
          className="flex flex-col gap-4"
          onSubmit={onSubmit}
          validationErrors={errors}
        >
          <Input
            name="name"
            label="Nome"
            labelPlacement="outside"
            placeholder="Digite o nome do usuário"
          />
          <Input
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

          <Button
            type="submit"
            isDisabled={isSubmitting}
            isLoading={isSubmitting}
            color="primary"
            className="w-full"
          >
            Atualizar Usuário
          </Button>

          {errors.form && <p className="text-red-500 text-sm">{errors.form}</p>}
          {success && (
            <p className="text-green-600 text-sm">
              Usuário <strong>{success.name}</strong> atualizado com sucesso!
            </p>
          )}
        </Form>
      </PopoverContent>
    </Popover>
  );
}
