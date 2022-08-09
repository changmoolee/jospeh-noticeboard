import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Login from "./SignIn";
import { app, db } from "../firebase";
import SignUp from "./SignUp";
import SignOut from "./SignOut";
import Form from "./Form";

console.log(app);
function App() {
  const [init, setInit] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log(user);
        const uid = user.uid;
        // ...
        setIsLoggedIn(true);
      } else {
        // User is signed out
        // ...
        setIsLoggedIn(false);
      }
      setInit(false);
    });
  }, []);

  return (
    <div className="App">
      {init ? (
        "init..."
      ) : isLoggedIn ? (
        <>
          <div>You are loggedIn!</div>
          <Form />
          <SignOut />
        </>
      ) : (
        <>
          <Login />
          <SignUp />
        </>
      )}
    </div>
  );
}

export default App;
