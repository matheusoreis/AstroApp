import type { UserRepositoryInterface } from "@/domains/interfaces/user";
import type {
  UserType,
  CreateUserType,
  UpdateUserType,
} from "@/domains/types/user";
import postgres from "../database/postgres";
import { NotFoundError } from "@/domains/errors/not-found";
import { InvalidFieldError } from "@/domains/errors/invalid-field";
import { RowNotAffectedError } from "@/domains/errors/row-not-affected";

export class UserRepository implements UserRepositoryInterface {
  private mapRowToUserType(row: any): UserType {
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      avatarLink: row.avatar_link,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  private async getUserOrFail(id: number): Promise<UserType> {
    const row = await postgres("users").where("id", id).first();

    if (!row) {
      throw new NotFoundError(`Usuário com o id ${id} não encontrada.`);
    }

    return this.mapRowToUserType(row);
  }

  async getAll(): Promise<UserType[]> {
    return (await postgres("users").select("*")).map((row) =>
      this.mapRowToUserType(row),
    );
  }

  async getById(id: number): Promise<UserType> {
    return await this.getUserOrFail(id);
  }

  async create(data: CreateUserType): Promise<UserType> {
    const [row] = await postgres("users")
      .insert({
        name: data.name,
        description: data.description,
        avatar_link: data.avatarLink,
        created_at: new Date(),
      })
      .returning("*");

    return this.mapRowToUserType(row);
  }

  async deleteById(id: number): Promise<number> {
    await this.getUserOrFail(id);

    const deletedCount = await postgres("users").where("id", id).del();

    if (deletedCount === 0) {
      throw new RowNotAffectedError(
        `Nenhum registro foi deletado com id: ${id}`,
      );
    }

    return id;
  }

  async update(data: UpdateUserType): Promise<UserType> {
    if (!data.id) {
      throw new NotFoundError(
        "Não foi possível prosseguir com a solicitação, o Id não foi informado.",
      );
    }

    await this.getUserOrFail(data.id);

    const fieldMap: Record<string, string> = {
      name: "name",
      description: "description",
      avatarLink: "avatar_link",
    };

    const filteredData = Object.fromEntries(
      Object.entries(data)
        .filter(([_, value]) => value != null && value !== "")
        .map(([key, value]) => [fieldMap[key] || key, value]),
    );

    if (Object.keys(filteredData).length === 0) {
      throw new InvalidFieldError("Nenhum campo válido para atualizar.");
    }

    const [row] = await postgres("users")
      .where("id", data.id)
      .update({
        ...filteredData,
        updated_at: new Date(),
      })
      .returning("*");

    if (!row) {
      throw new RowNotAffectedError(
        `Falha ao atualizar o usuário com id ${data.id}`,
      );
    }

    return this.mapRowToUserType(row);
  }

  async deleteAll(): Promise<boolean> {
    const deletedCount = await postgres("users").del();

    if (deletedCount === 0) {
      throw new RowNotAffectedError(`Nenhum registro foi deletado.`);
    }

    return true;
  }
}
