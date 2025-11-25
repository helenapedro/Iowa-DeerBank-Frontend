import React, { useState, type FormEvent } from "react";

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
          } else {
               // TODO validation 
               if (registerForm.password !== registerForm.confirmPassword) {
                    alert("Passwords do not match");
                    return;
               }
               console.log("Register:", registerForm);
          }
     }

     const isLogin = mode === "login";

     return (
          <div className="auth-page">
               <div className="auth-card">
               <div className="auth-icon">
                    <span>🏦</span>
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

                         {/* Confirm password – só no modo register */}
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
                    </form>
               </div>
          </div>
     );
}