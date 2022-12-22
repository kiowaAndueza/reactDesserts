import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { store } from "../../token/Token";
import { containerLogger } from "../../logger/IsLogger";
import { login } from "../../services/Authentication";

export function LogIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const [token, setToken] = store.useState("token");
  const [isLogger, setLogger] = containerLogger.useState("isLogger");

  const navigate = useNavigate();
  const redirectToPath = (path) => {
    navigate(path);
  };


  //VALIDATE AND SAVE USERS
  const handleValidationAndSave = async () => {
    if (email.length <= 0 || password.length <= 0) {
      const result = await Swal.fire({
        title:
          "Error. The fields: email and password are required. Also the email must have more than 4 characters and the password 5 characters min.",
        text: "Do you want to continue?",
        icon: "error",
        confirmButtonColor: "#0CC8A8",
        confirmButtonText: "OK",
      });
      return result;
    } else {
      setIsSaving(true);
      try {
        const response = await login(email, password);
        if(response){
          Swal.fire({
            icon: "success",
            title: "You have successfully logged in",
            showConfirmButton: false,
            timer: 1500,
          });
          setIsSaving(false);
          setToken(response.data.token);
          setLogger(true);
          redirectToPath("/");
        }
      } catch (error) {
        Swal.fire({
          title: "Error ",
          text: "Password or email is invalid",
          icon: "error",
          confirmButtonColor: "#0CC8A8",
          confirmButtonText: "OK",
        });
      }
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="d-flex justify-content-center mb-5">
      <form className="form-created mb-5">
        <div className="row justify-content-center">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              required
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              value={email}
              type="email"
              className="form-control mb-4"
              id="email"
              name="email"
              placeholder="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              required
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              value={password}
              type="password"
              className="form-control mb-4"
              id="password"
              name="password"
              placeholder="password"
            />
          </div>

          <div className="container mb-3">
            <div className="row">
              <p className="textLogin">
                Don't you have an account?  
                <a href="/register"> Sign up here</a>
              </p>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col text-center">
                <button
                  disabled={isSaving}
                  onClick={handleValidationAndSave}
                  type="button"
                  className="mt-1 w-50 h-100 rounded-pill font-weight-bold"
                >
                  <div className="saveText">Log In</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      <Outlet />
    </div>
  );
}
