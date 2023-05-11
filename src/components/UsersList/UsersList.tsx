import React, { FC } from 'react';
import './UsersList.css';
import { Link } from 'react-router-dom';
import { UsersApi } from '../../types';

interface Props {
  users: UsersApi[] | null;
}

export const UsersList: FC<Props> = ({ users }) => {
  // todo количество репозиториев
  // todo название организации

  return (
    <div className="users-list">
      {users?.map((user) => (
        <section className="users-list__item" key={user.id}>
          <div className="users-list__image-container">
            <img className="users-list__image" src={user.avatar_url} alt="profile photo" />
          </div>
          <div className="users-list__content">
            <h2 className="users-list__title">
              <Link to={`/users/${user.login}`} className="link">
                {user.login}
              </Link>
              , 15 репозиториев
            </h2>
            <p className="users-list__text">Название организации</p>
          </div>
        </section>
      ))}
    </div>
  );
};
