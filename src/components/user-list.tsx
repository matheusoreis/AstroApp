import type { UserType } from "@/domains/types/user";
import { Card, CardBody, User } from "@heroui/react";
import UpdateUser from "./update-user";
import DeleteUser from "./delete-user";

interface UserListProps {
  users: UserType[];
  onEdited: (user: UserType) => void;
  onDeleted: (id: number) => void;
}

export default function UserList({
  users,
  onEdited,
  onDeleted,
}: UserListProps) {
  return (
    <Card>
      <CardBody className="flex flex-col items-start gap-2">
        {users.map((user) => (
          <div
            className="flex flex-row justify-between items-center w-full"
            key={user.id}
          >
            <User
              avatarProps={{
                src:
                  user.avatarLink || "https://i.pravatar.cc/150?u=" + user.id,
                alt: user.name,
                size: "lg",
              }}
              name={user.name}
              description={user.description}
            />
            <div className="flex flex-row gap-2">
              <UpdateUser user={user} onEdited={onEdited} />
              <DeleteUser user={user} onDeleted={onDeleted} />
            </div>
          </div>
        ))}
      </CardBody>
    </Card>
  );
}
