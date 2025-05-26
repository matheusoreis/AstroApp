import type { UserRepositoryInterface } from "@/domains/interfaces/user";
import { UserService } from "@/domains/services/user";
import type ServiceResult from "@/domains/types/service-result";
import type { CreateUserType, UserType } from "@/domains/types/user";
import { UserRepository } from "@/infrastructure/repositories/user";
import jsonResponse from "@/shared/json-response";
import type { APIContext } from "astro";

export async function POST(context: APIContext): Promise<Response> {
  try {
    const repository: UserRepositoryInterface = new UserRepository();
    const service: UserService = new UserService(repository);

    const headers: Headers = context.request.headers;
    const body: CreateUserType = await context.request.json();
    const result: ServiceResult<UserType> = await service.create(body);

    if (result.error || !result.data) {
      return jsonResponse<ServiceResult<UserType>>(
        { error: result.error },
        400,
      );
    }

    return jsonResponse<ServiceResult<UserType>>({ data: result.data }, 200);
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "Erro interno no servidor.";

    return jsonResponse<ServiceResult<UserType>>(
      { error: { form: message } },
      500,
    );
  }
}
