import type ServiceResult from "@/domains/types/service-result";
import CreateUser from "./create-user";
import UserList from "./user-list";
import type { UserType } from "@/domains/types/user";
import React from "react";
import UpdateUser from "./update-user";
import DeleteAllUsers from "./delete-all-users";

interface UserSectionProps {
  response: ServiceResult<UserType[]>;
}

export default function UserSection({ response }: UserSectionProps) {
  const [users, setUsers] = React.useState(response.data?.map((e) => e) ?? []);

  return (
    <section className="p-10">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between pb-4">
          <h1>AstroApp</h1>

          <div className="flex flex-row gap-2">
            <CreateUser
              onCreated={(u) => {
                setUsers((prev) => [...prev, u]);
              }}
            />

            <DeleteAllUsers
              onAllDeleted={() => {
                setUsers([]);
              }}
            />
          </div>
        </div>

        <UserList
          users={users}
          onEdited={(u) => {
            setUsers((prev) => prev.map((r) => (r.id === u.id ? u : r)));
          }}
          onDeleted={(id) => {
            setUsers((prev) => prev.filter((e) => e.id !== id));
          }}
        />
      </div>
    </section>
  );
}
