import React, { FC, useState } from "react";
import { UsersList } from "../UsersList/UsersList";
import { UsersApi } from "../../types";

export const UsersPage: FC = () => {
  const [users, setUsers] = useState<UsersApi[]>([]);

  React.useEffect(() => {
    fetch(" https://api.github.com/users")
      .then((response) => response.json())
      .then((response) => {
        setUsers(response);
      });
  }, []);

  return (
    <main>
      <div className="container">
        <UsersList users={users} />
      </div>
    </main>
  );
};
