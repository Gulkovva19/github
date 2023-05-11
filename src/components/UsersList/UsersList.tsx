import React, { FC, useEffect, useState } from 'react';
import './UsersList.css';
import { Link } from 'react-router-dom';
import { UserApi, UsersApi } from '../../types';
import { GITHUB_API_SETTINGS } from '../../api/github';

interface Props {
  users: UsersApi[] | null;
}

export const UsersList: FC<Props> = ({ users }) => {
  const [repos, setRepos] = useState<UsersApi[] | null>(null);
  const [org, setOrg] = useState<string[]>([]);

  const arrLogin = users?.map((user) => {
    return user.login;
  });

  useEffect(() => {
    const arrFetchUsers = arrLogin?.map((login) =>
      fetch(`https://api.github.com/users/${login}/orgs`, GITHUB_API_SETTINGS)
      .then((response) => response.json())
    );
    
    if (arrFetchUsers)
    Promise.all(arrFetchUsers)
      .then((responses) => {
        const arrFirstOrg = responses.map((item) => item[0])
        const arrOrgLogin = arrFirstOrg.map((item => item?.login))
        const arrOrg = arrOrgLogin.map((item => {
          if (item === undefined) 
          return '' 
          else return item;
        }))
        setOrg(arrOrg);
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
            </h2>
            <p className="users-list__text"key={org[users.indexOf(user)]} >{org[users.indexOf(user)]}</p>
          </div>
        </section>
      ))}
    </div>
  );
};
