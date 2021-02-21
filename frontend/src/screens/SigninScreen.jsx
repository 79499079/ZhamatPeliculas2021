import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signin } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function SigninScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    <div>
      <div className="container">
        <div className="col-sm-12 col-md-8 col-lg-6 mx-auto">
          <div className="card">
            <form onSubmit={submitHandler}>
              <div className="card-title">
                <div>
                  <h3 className="text-center">Iniciar Sesión</h3>
                </div>
              </div>
              <div className="card-body">
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    className="form-control"
                    type="email"
                    id="email"
                    placeholder="Enter email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    className="form-control"
                    type="password"
                    id="password"
                    placeholder="Enter password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                </div>
                <div className="form-group">
                  <button className="btn btn-primary btn-block" type="submit">
                    Inicio
                  </button>
                </div>
                <small className="text-center">
                ¿No tienes una cuenta?{" "}
                  <Link to={`/register?redirect=${redirect}`}>
                  {" "}Crea tu Cuenta
                  </Link>
                </small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
