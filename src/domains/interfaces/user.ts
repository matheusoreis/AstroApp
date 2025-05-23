import type ServiceResult from "../types/service-result";
import type { CreateUserType, UpdateUserType, UserType } from "../types/user";

export interface UserRepositoryInterface {
  getAll(): Promise<UserType[]>;
  getById(id: number): Promise<UserType>;
  create(data: CreateUserType): Promise<UserType>;
  deleteById(id: number): Promise<number>;
  update(data: UpdateUserType): Promise<UserType>;
  deleteAll(): Promise<boolean>;
}

export interface UserServiceInterface {
  handleError<T>(e: unknown, fallback: string): ServiceResult<T>;
  getAll(): Promise<ServiceResult<UserType[]>>;
  getById(id: number): Promise<ServiceResult<UserType>>;
  create(data: CreateUserType): Promise<ServiceResult<UserType>>;
  deleteById(id: number): Promise<ServiceResult<number>>;
  update(data: UpdateUserType): Promise<ServiceResult<UserType>>;
  deleteAll(): Promise<ServiceResult<boolean>>;
}
