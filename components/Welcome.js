import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";

export default function Welcome() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/homepage");
      }
    });
  });

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/homepage", { replace: true });
      })
      .catch((err) => alert(err.message));
  };

  const handleRegister = () => {
    if (registerInfo.email !== registerInfo.confirmEmail) {
      alert("Please confirm that the email address is same");
      return;
    } else if (registerInfo.password !== registerInfo.confirmPassword) {
      alert("Please confirm that the password is same");
      return;
    }
    createUserWithEmailAndPassword(
      auth,
      registerInfo.email,
      registerInfo.password
    )
      .then(() => {
        navigate("/homepage", { replace: true });
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="welcome">
      <h1>Todo-list</h1>
      <div className="login-register-container">
        {isRegistering ? (
          <>
            <input
              type="email"
              placeholder="Email"
              value={registerInfo.email}
              onChange={(e) =>
                setRegisterInfo({ ...registerInfo, email: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Confirm Email"
              value={registerInfo.confirmEmail}
              onChange={(e) =>
                setRegisterInfo({
                  ...registerInfo,
                  confirmEmail: e.target.value,
                })
              }
            />
            <input
              type="password"
              placeholder="Password"
              value={registerInfo.password}
              onChange={(e) =>
                setRegisterInfo({ ...registerInfo, password: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={registerInfo.confirmPassword}
              onChange={(e) =>
                setRegisterInfo({
                  ...registerInfo,
                  confirmPassword: e.target.value,
                })
              }
            />
            <button className="signin-acc" onClick={handleRegister}>
              Register
            </button>
            <button
              className="create-acc"
              onClick={() => setIsRegistering(false)}
            >
              Go back
            </button>
          </>
        ) : (
          <>
            <input
              type="email"
              placeholder="email"
              onChange={handleEmailChange}
              value={email}
            />
            <input
              type="password"
              placeholder="password"
              onChange={handlePasswordChange}
              value={password}
            />
            <button className="signin-acc" onClick={handleSignIn}>
              Sign In
            </button>
            <button
              className="create-acc"
              onClick={() => setIsRegistering(true)}
            >
              Create an Account
            </button>
          </>
        )}
      </div>
    </div>
  );
}
