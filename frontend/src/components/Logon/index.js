import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import api from "../../services/api";
import logo from "../../assets/logo.svg";
import heroes from "../../assets/heroes.png";
import { FiLogIn } from "react-icons/fi";
import "./styles.css";

const Logon = props => {
  const [id, setId] = useState("");

  const history = useHistory();

  const logonHandler = async event => {
    event.preventDefault();

    try {
      const response = await api.post("sessions", { id });

      localStorage.setItem("ongId", id);
      localStorage.setItem("ongName", response.data.name);

      history.push("/profile");
    } catch (err) {
      alert("Falha no login, tente novamente!");
    }
  };

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logo} alt="Be the hero" />

        <form onSubmit={logonHandler}>
          <h1>Faça seu Logon</h1>

          <input
            placeholder="Seu ID"
            value={id}
            onChange={event => setId(event.target.value)}
          />
          <button className="button" type="submit">
            Entrar
          </button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img className="heroes" src={heroes} alt="Hero" />
    </div>
  );
};

export default Logon;
