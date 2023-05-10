import React, { FC, useEffect } from 'react';
import {UserProfilePage} from "../UserProfilePage/UserProfilePage";
import { UsersPage } from "../UsersPage/UsersPage";
import { useLocation, Routes, Route } from 'react-router-dom';
import { Header } from '../Header/Header';
import { UsersSearchPage } from '../UsersSearchPage/UsersSearchPage';

export const App: FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <React.Fragment>
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<UsersPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/:login" element={<UserProfilePage />} />
        <Route path="/search" element={<UsersSearchPage />} />
      </Routes>
    </main>
    </React.Fragment>
  );
};

