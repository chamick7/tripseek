import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faUser, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "../css/register.css";

export default function Register() {
  const history = useHistory();
  const { handleSubmit, register, errors, watch } = useForm();
  const [Err, setErr] = useState("");

  const accountInitialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cf_password: "",
  };

  const onsubmit = async (account) => {
    await axios
      .post("http://localhost:5000/account", account)
      .then((data) => {
        history.push("/login");
      })
      .catch((err) => {
        // console.log(err.response);
        if (
          err.response.data.status === "Error" &&
          err.response.data.message === "email already registed"
        ) {
          setErr("email is already registered");
        }
      });

    // console.log(account);
  };

  return (
    <div className="bg">
      <section className="reg-left">
        <form className="reg-form" onSubmit={handleSubmit(onsubmit)}>
          <div className="header">
            <h1>Register</h1>
            <hr width="25%" />
            <h4>Create account for free</h4>
          </div>
          {<h3 className="err_msg" >{Err}</h3>}
          <div className="reg-input">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              ref={register({
                required: "Required",
              })}
            />
            <FontAwesomeIcon icon={faUser} />
          </div>
          {errors.firstName && <h5 className="err_msg">This is Required</h5>}

          <div className="reg-input">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              ref={register({
                required: "Required",
              })}
            />
            <FontAwesomeIcon icon={faUser} />
          </div>
          {errors.lastName && <h5 className="err_msg">This is Required</h5>}

          <div className="reg-input">
            <input
              type="email"
              name="email"
              placeholder="Email"
              ref={register({
                required: "Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
            />
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          {errors.email && <h5 className="err_msg">This is Required</h5>}
          <div className="reg-input">
            <input
              type="password"
              name="password"
              placeholder="Password"
              ref={register({
                required: "Required",
                minLength: 6,
              })}
            />
            <FontAwesomeIcon icon={faLock} />
          </div>
          {errors.password && errors.password.type === "required" && (
            <h5 className="err_msg">This is Required</h5>
          )}

          {errors.password && errors.password.type === "minLength" && (
            <h5 className="err_msg">This field required min length 6</h5>
          )}

          <div className="reg-input">
            <input
              type="password"
              name="cf_password"
              placeholder="Confirm password"
              ref={register({
                required: "Required",
                validate: (value) => value === watch("password"),
              })}
            />
            <FontAwesomeIcon icon={faLock} />
          </div>
          {errors.cf_password && errors.cf_password.type === "required" && (
            <h5 className="err_msg">This is Required</h5>
          )}

          {errors.cf_password && errors.cf_password.type === "validate" && (
            <h5 className="err_msg">Passwords don't match</h5>
          )}

          <div className="reg-submit">
            <input type="submit" value="Register" />
            <Link to="/login">Already have an account ?</Link>
          </div>
        </form>
      </section>
      <section className="reg-right"></section>
    </div>
  );
}
