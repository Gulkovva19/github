import React, { FC, useEffect, useState } from 'react';
import './UsersList.css';
import { Link } from 'react-router-dom';
import { UserApi, UsersApi } from '../../types';
import { GITHUB_API_SETTINGS } from '../../api/github';

interface Props {
  users: UsersApi[] | null;
}

export const UsersList: FC<Props> = ({ users }) => {
  const [repos, setRepos] = useState<number[]>([]);
  const [org, setOrg] = useState<string[]>([]);

  const arrLogin = users?.map((user) => {
    return user.login;
  });

  useEffect(() => {
    const arrFetchUsers = arrLogin?.map((login) =>
      fetch(`https://api.github.com/users/${login}`, GITHUB_API_SETTINGS)
      .then((response) => response.json())
    );
    
    if (arrFetchUsers)
    Promise.all(arrFetchUsers)
      .then((responses) => {
        const arrCompany = responses.map((item) => item.company)
        const arrReposNumber = responses.map((item) => item.public_repos)
        setOrg(arrCompany);
        setRepos(arrReposNumber);
      })
  }, [users]);

  return (
    <div className="users-list">
      {users?.map((user) => (
        <section className="users-list__item" key={user.id}>
          <div className="users-list__image-container">
            <img className="users-list__image" src={user.avatar_url} alt={user.login + 'profile photo'} />
          </div>
          <div className="users-list__content">
            <h2 className="users-list__title">
              <Link to={`/users/${user.login}`} className="link">
                {user.login}
              </Link>
              , <div>{repos[users.indexOf(user)]} репозиториев</div>
            </h2>
            <p className="users-list__text">{org[users.indexOf(user)]}</p>
          </div>
        </section>
      ))}
    </div>
  );
};
