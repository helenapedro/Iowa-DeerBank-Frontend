import React, { useState, type FormEvent } from "react";
import { Building2 } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { loginSuccess, logout } from "../store/slices/authSlice";


type AuthMode = "login" | "register";

type LoginForm  = {
     email: string;
     password: string;
};

type RegisterForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

export function Auth() {
     const dispatch = useDispatch<AppDispatch>();
     
     const isAuthenticated = useSelector(
          (state: RootState) => state.auth.isAuthenticated
     );

     // const userEmail = useSelector(
     //      (state: RootState) => state.auth.userEmail
     // );

     const [mode, setMode] = useState<AuthMode>("login");

     const [loginForm, setLoginForm] = useState<LoginForm>({
          email: "",
          password: "",
     });

     const [registerForm, setRegisterForm] = useState<RegisterForm>({
          email: "",
          password: "",
          confirmPassword: "",
     });

     function handleLoginChange(
          e: React.ChangeEvent<HTMLInputElement>
     ) {
          const { name, value } = e.target;
          setLoginForm((prev) => ({ ...prev, [name]: value }));
     }

     function handleRegisterChange(
          e: React.ChangeEvent<HTMLInputElement>
     ) {
          const { name, value } = e.target;
          setRegisterForm((prev) => ({ ...prev, [name]: value }));
     }

     function handleSubmit(e: FormEvent) {
          e.preventDefault();

          if (mode === "login") {
               // TODO call the backend or Redux
               console.log("Login:", loginForm);
               dispatch(loginSuccess(loginForm.email));
          } else {
               // TODO validation 
               if (registerForm.password !== registerForm.confirmPassword) {
                    alert("Passwords do not match");
                    return;
               }
               console.log("Register:", registerForm);
               dispatch(loginSuccess(registerForm.email));
          }
     }

     const isLogin = mode === "login";

     return (
          <div className="auth-page">
               <div className="auth-card">
               <div className="auth-icon">
                    <Building2 className="h-6 w-6 text-primary" />
               </div>

               <h1 className="auth-title">Welcome to DeerBank</h1>
               <p className="auth-subtitle">Secure banking at your fingertips</p>

               {/* Tabs Login / Register */}
               <div className="auth-tabs">
                    <button
                         type="button"
                         className={`auth-tab ${isLogin ? "active" : ""}`}
                         onClick={() => setMode("login")}
                         >
                         Login
                    </button>
                    <button
                         type="button"
                         className={`auth-tab ${!isLogin ? "active" : ""}`}
                         onClick={() => setMode("register")}
                         >
                         Register
                    </button>
               </div>

                    <form className="auth-form" onSubmit={handleSubmit}>
                         {/* Email */}
                         <label className="auth-label">
                              Email
                                   <input
                                        className="auth-input"
                                        type="email"
                                        name="email"
                                        placeholder="you@example.com"
                                        value={isLogin ? loginForm.email : registerForm.email}
                                        onChange={isLogin ? handleLoginChange : handleRegisterChange}
                                        required
                                   />
                         </label>

                         {/* Password */}
                         <label className="auth-label">
                              Password
                              <input
                                   className="auth-input"
                                   type="password"
                                   name="password"
                                   placeholder="********"
                                   value={isLogin ? loginForm.password : registerForm.password}
                                   onChange={isLogin ? handleLoginChange : handleRegisterChange}
                                   required
                              />
                         </label>

                         {/* Confirm password – only in register mode */}
                         {!isLogin && (
                              <label className="auth-label">
                                   Confirm Password
                                   <input
                                        className="auth-input"
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="********"
                                        value={registerForm.confirmPassword}
                                        onChange={handleRegisterChange}
                                        required
                                   />
                              </label>
                         )}

                         <button className="auth-button" type="submit">
                              {isLogin ? "Sign In" : "Create Account"}
                         </button>

                         {isAuthenticated && (
                              <button onClick={() => dispatch(logout())}>
                                   Logout
                              </button>
                         )}

                    </form>
               </div>
          </div>
     );
}