import React, { FC, useState } from 'react';
import './UserProfilePage.css';
import { useParams } from 'react-router-dom';
import { ReposApi, UserApi } from '../../types';

export const UserProfilePage: FC = () => {
  // todo функция склонения

  const { login } = useParams();
  const [user, setUser] = useState<UserApi | null>(null);
  const [repos, setRepos] = useState<ReposApi[] | null>(null);
  const [followers, setFollowers] = useState<number | null>(null);
  const [following, setFollowing] = useState<number | null>(null);

  React.useEffect(() => {
    Promise.all([
      fetch(`https://api.github.com/users/${login}`).then((response) => response.json()),
      fetch(`https://api.github.com/users/${login}/followers?per_page=100`).then((response) => response.json()),
      fetch(`https://api.github.com/users/${login}/following`).then((response) => response.json()),
      fetch(`https://api.github.com/users/${login}/repos`).then((response) => response.json()),
    ]).then((responses) => {
      setUser(responses[0]);
      setFollowers(responses[1].length);
      setFollowing(responses[2].length);
      setRepos(responses[3]);
    });
  }, []);

  const reposUrl = `${user?.html_url}?tab=repositories`;

  return (
    <main>
      <div className="container">
        <section className="user-profile">
          <div className="user-profile__image-container">
            <img className="user-profile__image" src={user?.avatar_url} alt="defunkt profile photo" />
          </div>
          <div className="user-profile__content">
            <h1 className="user-profile__title">
              {user?.name}, <span className="user-profile__accent">{user?.login}</span>
            </h1>
            <p className="user-profile__text">
              <span className="user-profile__accent">{followers}</span> Подписчиков ·{' '}
              <span className="user-profile__accent">{following}</span> Подписок ·{' '}
              <a href={user?.html_url} className="link">
                {user?.html_url}
              </a>
            </p>
          </div>
        </section>

        <section className="repository-list">
          <div className="repository-list__header">
            <h2 className="repository-list__title">Репозитории</h2>
            <a href={reposUrl} className="link" target="_blank" rel="noreferrer">
              Все репозитории
            </a>
          </div>

          <div className="repository-list__container">
            {repos?.map((item) => (
              <section className="repository-list__item" key={item.id}>
                <h3 className="repository-list__item-title">
                  <a href={item.html_url} className="link">
                    {item.name}
                  </a>
                </h3>
                <p className="repository-list__item-text">{item.description}</p>
              </section>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};
