import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

const cookies = new Cookies();

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("username", username);
    form.append("password", password);

    axios.post(process.env.REACT_APP_API_BASE_URL + "login", form, {
      headers: {"Content-Type": "multipart/form-data"}
    })
      .then((res) => {
        cookies.set("TOKEN", res.data.token, {path: "/"})
        window.location.href = "/admin";
      })
      .catch((err) => {
        err = new Error()
      })
  }

  return (
    <div className="container-main">
      <form onSubmit={handleSubmit}>
        <input
          className="form-input"
          type="text"
          value={username}
          placeholder="Brukernavn"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="form-input"
          type="password"
          value={password}
          placeholder="Passord"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          className="form-submit"
          type="submit"
          value="Logg inn"
        />
      </form>
    </div>
  )
}

export default Login;