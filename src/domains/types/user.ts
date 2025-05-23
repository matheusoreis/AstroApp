export type UserType = {
  id: number;
  name: string;
  description: string;
  avatarLink: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateUserType = Omit<UserType, "id" | "createdAt" | "updatedAt">;

export type DeleteUserType = Omit<
  UserType,
  "name" | "description" | "avatarLink" | "createdAt" | "updatedAt"
>;

export type UpdateUserType = Partial<Omit<UserType, "createdAt">>;
