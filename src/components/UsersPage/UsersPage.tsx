import React, { FC, useState } from 'react';
import { UsersList } from '../UsersList/UsersList';
import { UsersApi } from '../../types';
import { GITHUB_API_SETTINGS } from '../../api/github';

export const UsersPage: FC = () => {
  const [users, setUsers] = useState<UsersApi[] | null>(null);

  React.useEffect(() => {
    fetch(' https://api.github.com/users', GITHUB_API_SETTINGS)
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
