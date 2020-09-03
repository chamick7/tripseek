import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "../css/login.css";
import Axios from "axios";
import Cookies from "js-cookie";
import { useRecoilState } from "recoil";
import { account as accountAtom } from "../atom";

export default function Login() {
  const { handleSubmit, register, errors } = useForm();
  const [Err, setErr] = useState("");
  const [account,setAccount] = useRecoilState(accountAtom);
  var expire = new Date(new Date().getTime()+60*60*1000);


  const onsubmit = async (account) => {
    await Axios.post("http://localhost:5000/account/login", account)
      .then((res) => {
        console.log(res);

        Cookies.set('token',res.data.token,{expires:expire});
        setAccount(res.data.account)


      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <div className="bg">
      <section className="login-left"></section>
      <section className="login-right">
        <form className="reg-form" onSubmit={handleSubmit(onsubmit)}>
          <div className="header">
            <h1>Log in</h1>
            <hr width="25%" />
            <h4>Work too much ? Let's "Split"</h4>
          </div>

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

          <div className="reg-submit">
            <input type="submit" value="Login" />
            <Link to="/register">Don't have an account ?</Link>
          </div>
        </form>
      </section>
    </div>
  );
}
