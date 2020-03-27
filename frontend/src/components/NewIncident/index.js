import React, { useState } from "react";

import { Link, useHistory } from "react-router-dom";

import api from "../../services/api";
import logo from "../../assets/logo.svg";
import { FiArrowLeft } from "react-icons/fi";
import "./styles.css";

const NewIncident = props => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const ongId = localStorage.getItem("ongId");
  const history = useHistory();

  const newIncidentHandler = async event => {
    event.preventDefault();

    const data = {
      title,
      description,
      value
    }

    try {
      await api.post("/incidents", data, {
        headers: {
          authorization: ongId
        }
      })
      history.push("/profile");
    } catch (err) {
      alert("Falha ao cadastrar novo caso.")
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logo} alt="Be The Hero" />

          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para
            resolvê-lo
          </p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para o profile
          </Link>
        </section>

        <form onSubmit={newIncidentHandler}>
          <input
            placeholder="Título"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={event => setDescription(event.target.value)}
          />
          <input
            placeholder="Valor em reais"
            value={value}
            onChange={event => setValue(event.target.value)}
          />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewIncident;
