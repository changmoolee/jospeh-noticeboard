import React, { useState, useEffect } from "react";
import "./styles/reset.scss";
import "./styles/global.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SignIn from "./pages/SignIn/SignIn";
import { app, db } from "./firebase";
import Main from "./pages/Main/Main";
import MyProfile from "./pages/MyProfile/MyProfile";
import Writing from "./pages/Writing/Writing";
import Header from "./components/Header/Header";
import layout from "./styles/layout.module.scss";

function App() {
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className={layout.outer}>
          <div className={layout.inner}>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/myprofile" element={<MyProfile />} />
              <Route path="/writing" element={<Writing />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
