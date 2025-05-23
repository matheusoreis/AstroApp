import type { UserType } from "@/domains/types/user";
import { User } from "@heroui/react";

interface UserListProps {
  users: UserType[];
}

export default function UserList({ users }: UserListProps) {
  return (
    <div className="flex flex-col gap-2">
      {users.map((user) => (
        <User
          key={user.id}
          avatarProps={{
            src: user.avatarLink || "https://i.pravatar.cc/150?u=" + user.id,
            alt: user.name,
            size: "lg",
          }}
          name={user.name}
          description={user.description}
        />
      ))}
    </div>
  );
}
