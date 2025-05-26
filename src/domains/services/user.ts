import { InvalidFieldError } from "../errors/invalid-field";
import { NotFoundError } from "../errors/not-found";
import { RowNotAffectedError } from "../errors/row-not-affected";
import type { UserRepositoryInterface } from "../interfaces/user";
import type ServiceResult from "../types/service-result";
import type { UserType, CreateUserType, UpdateUserType } from "../types/user";

export class UserService {
  constructor(private readonly repository: UserRepositoryInterface) {}

  handleError<T>(e: unknown, fallback: string): ServiceResult<T> {
    if (
      e instanceof NotFoundError ||
      e instanceof InvalidFieldError ||
      e instanceof RowNotAffectedError
    ) {
      return {
        error: {
          form: e.message,
        },
      };
    }

    const error = e instanceof Error ? e.message : fallback;

    return {
      error: {
        form: error,
      },
    };
  }

  async getAll(): Promise<ServiceResult<UserType[]>> {
    try {
      return { data: await this.repository.getAll() };
    } catch (erro) {
      return this.handleError<UserType[]>(
        erro,
        "Erro desconhecido ao buscar usuários.",
      );
    }
  }

  async getById(id: number): Promise<ServiceResult<UserType>> {
    try {
      return { data: await this.repository.getById(id) };
    } catch (e) {
      return this.handleError<UserType>(
        e,
        "Erro desconhecido ao buscar usuário.",
      );
    }
  }

  async create(data: CreateUserType): Promise<ServiceResult<UserType>> {
    try {
      return { data: await this.repository.create(data) };
    } catch (e) {
      return this.handleError<UserType>(
        e,
        "Erro desconhecido ao criar usuário.",
      );
    }
  }

  async deleteById(id: number): Promise<ServiceResult<number>> {
    try {
      return { data: await this.repository.deleteById(id) };
    } catch (e) {
      return this.handleError<number>(
        e,
        "Erro desconhecido ao apagar usuário.",
      );
    }
  }

  async update(data: UpdateUserType): Promise<ServiceResult<UserType>> {
    try {
      return { data: await this.repository.update(data) };
    } catch (e) {
      return this.handleError<UserType>(
        e,
        "Erro desconhecido ao atualizar usuário.",
      );
    }
  }

  async deleteAll(): Promise<ServiceResult<boolean>> {
    try {
      return { data: await this.repository.deleteAll() };
    } catch (e) {
      return this.handleError<boolean>(
        e,
        "Erro desconhecido ao apagar todos os usuário.",
      );
    }
  }
}
