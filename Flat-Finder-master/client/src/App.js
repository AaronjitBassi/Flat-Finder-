import { useState, createContext, useContext } from 'react';
import { Route, Routes, Navigate, useLocation } from "react-router-dom";

import LoginForm from './components/login';
import Profile from './components/profile';
import Inbox from './components/inbox';
import Chat from './components/chat';
import Listing from './components/listing';
import Post from './components/post';
import CreatePost from './components/createPost';
import Reports from './components/reports';
import MyPosts from "./components/myPosts";

import Navbar from "./components/navbar"

import 'bootstrap/dist/css/bootstrap.min.css';

const AuthContext = createContext();

function useAuth() {
  return useContext(AuthContext);
}

export { AuthContext, useAuth };

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleLogin() {
    setIsLoggedIn(true);
  }

  const auth = {
    isLoggedIn,
    handleLogin
  };

  return (
    <AuthContext.Provider value={auth}>
      {isLoggedIn && <Navbar />}

      <Routes>
        <Route path="/" element={<Navigate to="/listing" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/profile" element={<ProtectedRoute component={Profile} />} />
        <Route path="/inbox" element={<ProtectedRoute component={Inbox} />} />
        <Route path="/listing" element={<ProtectedRoute component={Listing} />} />
        <Route path="/chat" element={<ProtectedRoute component={Chat} />} />
        <Route path="/reports" element={<ProtectedRoute component={Reports} />} />
        <Route path="/createPost" element={<ProtectedRoute component={CreatePost} />} />
        <Route path="/myPosts" element={<ProtectedRoute component={MyPosts} />} />
        <Route path="/post" element={<ProtectedRoute component={Post} />} />
      </Routes>
    </AuthContext.Provider>
  );
}

function ProtectedRoute({ component: Component }) {
  const auth = useAuth();
  const location = useLocation();

  return auth.isLoggedIn ? (
    <Component />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
}

export default App;



