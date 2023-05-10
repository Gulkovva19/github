import React, { FC, useState } from 'react';
import { UsersList } from '../UsersList/UsersList';
import { UsersApi } from '../../types';
import { useSearchParams } from 'react-router-dom';

export const UsersSearchPage: FC = () => {
  const [users, setUsers] = useState<UsersApi[]>([]);
  const [searchParams] = useSearchParams();

  const searchLogin = searchParams.get('query');

  React.useEffect(() => {
    fetch(`https://api.github.com/search/users?q=${searchLogin}`)
      .then((response) => response.json())
      .then((response) => {
        setUsers(response.items);
      });
  }, [searchLogin]);

  return (
    <main>
      <div className="container">
        <h1 className="title">Пользователи по запросу {searchLogin}</h1>
        <UsersList users={users} />
      </div>
    </main>
  );
};
