import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import api from "../../services/api";
import logo from "../../assets/logo.svg";
import { FiPower, FiTrash2 } from "react-icons/fi";

import "./styles.css";

const Profile = props => {
  const [incidents, setIncidents] = useState([]);

  const ongId = localStorage.getItem("ongId");
  const ongName = localStorage.getItem("ongName");
  const history = useHistory();

  useEffect(() => {
    api
      .get("/profile", {
        headers: {
          authorization: ongId
        }
      })
      .then(response => {
        setIncidents(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [ongId]);

  const deleteHandler = async (id) => {
    try {
      await api.delete(`/incidents/${id}`, {
        headers: {
          authorization: ongId
        }
      })

      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (err) {
      alert("Falha ao excluir o caso.")
    }
  }

  const logoutHandler = () => {
    localStorage.clear();

    history.push("/");
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logo} alt="Be the Hero" />
        <span>Bem vinda, {ongName}</span>

        <Link className="button" to="/incidents/new">
          Cadastrar novo caso
        </Link>

        <button onClick={logoutHandler} type="button">
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(incident.value)}
            </p>

            <button onClick={() => deleteHandler(incident.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
