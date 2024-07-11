import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Settings from './pages/Settings';
import Layout from './components/layout';
import GamePlay from './pages/GamePlay';
import PrivateRoute from './components/PrivateRoute';
import Subscribe from './pages/Subcribe';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        <Route path="games" element={
          <PrivateRoute>
            <GamePlay />
          </PrivateRoute>
        } />
        <Route path="leaderboard" element={
          <PrivateRoute>
            <Leaderboard />
          </PrivateRoute>
        } />
        <Route path="settings" element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        } />
         <Route path="subscribe" element={
          <Subscribe />
        } />

        <Route path="*" element={<NotFound />} />
      </Route>
      {/* Public route */}
      <Route path="login" element={<Login />} />
    </Routes>
  );
};

export default App;
