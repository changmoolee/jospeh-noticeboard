import React, { useState } from "react";
import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (event: any) => {
    const {
      target: { name, value },
    } = event;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const auth = getAuth();

  const onSubmit = (event: any) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const onSocialClick = (event: any) => {
    const {
      target: { name },
    } = event;

    if (name === "google auth") {
      signInWithPopup(auth, googleProvider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential && credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log(token, user);
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
          if (errorCode === "auth/account-exists-with-different-credential") {
            alert(
              "이미 다른 auth 계정에 의해 등록되어 있습니다. 중복된 auth 계정은 사용 불가능합니다."
            );
          }
        });
    } else if (name === "github auth") {
      signInWithPopup(auth, githubProvider)
        .then((result) => {
          // This gives you a GitHub Access Token. You can use it to access the GitHub API.
          const credential = GithubAuthProvider.credentialFromResult(result);
          const token = credential && credential.accessToken;
          console.log(result);
          // The signed-in user info.
          const user = result.user;
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The AuthCredential type that was used.
          const credential = GithubAuthProvider.credentialFromError(error);
          // ...
          if (errorCode === "auth/account-exists-with-different-credential") {
            alert(
              "이미 다른 auth 계정에 의해 등록되어 있습니다. 중복된 auth 계정은 사용 불가능합니다."
            );
          }
        });
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="email"
          value={email}
          onChange={onChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          value={password}
          onChange={onChange}
          required
        />
        <input type="submit" value="Log in" />
      </form>
      <button name="google auth" onClick={onSocialClick}>
        continue with google
      </button>
      <button name="github auth" onClick={onSocialClick}>
        continue with github
      </button>
    </div>
  );
};

export default Login;
