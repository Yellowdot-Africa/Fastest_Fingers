import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Settings from './pages/Settings';
import Layout from './components/layout';
import GamePlay from './pages/GamePlay';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="games" element={<GamePlay />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="settings" element={<Settings/>} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="login" element={<Login/>} />
    </Routes>
  );
};

export default App;
