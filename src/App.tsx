import React from "react";
import "./styles/reset.scss";
import "./styles/global.scss";
import layout from "./styles/layout.module.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./pages/Main/Main";
import SignIn from "./pages/SignIn/SignIn";
import MyProfile from "./pages/MyProfile/MyProfile";
import Writing from "./pages/Writing/Writing";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main className={layout.outer}>
          <div className={layout.inner}>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/myprofile" element={<MyProfile />} />
              <Route path="/writing" element={<Writing />} />
            </Routes>
          </div>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
