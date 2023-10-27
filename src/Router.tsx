import React from 'react';
import {NativeRouter, Navigate, Route, Routes} from 'react-router-native';
import {Login} from './views/Login';
import {useHandleAndroidBackButton} from './hooks/use-android-back-button';
import {useAppSelector} from './store';
import {selectIsCurrentUserAuthenticated} from './store/user-settings';
import {AchievableAppWebView} from './views/AchievableWebViewController';

const BackButtonHandler = () => {
  useHandleAndroidBackButton();
  return null;
};

export const Router = () => {
  const isAuthenticated = useAppSelector(selectIsCurrentUserAuthenticated);

  return (
    <NativeRouter>
      <BackButtonHandler />
      <Routes>
        <Route path="/app" element={<AchievableAppWebView />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/login" /> : <Navigate to="/app" />
          }
        />
      </Routes>
    </NativeRouter>
  );
};
