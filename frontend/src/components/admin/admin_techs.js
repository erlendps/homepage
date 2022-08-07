import React, { useState, useEffect } from "react";
import "../../css/admin/techs.css";
import "../../css/popup.css";
import { Back, Delete, Popup, Success } from "../general";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

// change to FC
class TechForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const form = new FormData();
    form.append("name", this.state.value);
    axios
      .post(process.env.REACT_APP_API_BASE_URL + "admin/newtech", form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${cookies.get("TOKEN")}`,
        },
      })
      .then(() => {
        this.props.forceRerenderOfAllTechs();
        this.setState({ value: "" });
        this.props.togglePopup();
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="new-tech" onSubmit={this.handleSubmit}>
        <h2 className="mt--p5">Add a new tech</h2>
        <form className="new-tech-form">
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            placeholder="Name"
            className="form-input"
            required
          />
          <input type="submit" className="form-submit" value="Add" />
        </form>
      </div>
    );
  }
}

const AllTechs = (props) => {
  return (
    <div className="all-techs">
      <h2>All Techs</h2>
      <ul className="techs-list">
        {props.techs.map((tech) => {
          return (
            <li key={tech.techID} className="tech-list-item">
              {tech.name}
              <Delete
                section="tech"
                id={tech.techID}
                notifyParent={props.forceRerenderOfAllTechs}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const AdminTechs = () => {
  const [techs, setTechs] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false);
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_BASE_URL + "admin/newtech", {
      headers: { Authorization: `Bearer ${cookies.get("TOKEN")}` },
    })
      .then((res) => res.json())
      .then((json) => {
        setTechs(json);
        setLoaded(true);
        setReload(false);
      })
      .catch((err) => {
        setError(err);
      });
  }, [reload]);

  const forceStateChange = () => {
    setReload(true);
  };

  const togglePopup = () => {
    setPopup(!popup);
  };

  if (error) {
    return (
      <div>
        <p>500: Internal Server Error</p>
        <p>{error}</p>
      </div>
    );
  } else if (!loaded) {
    return;
  } else {
    return (
      <div className="admin-techs-page">
        <Back to="/admin" />
        <h1>Admin Tech Page</h1>
        <div className="admin-techs-content">
          <AllTechs techs={techs} forceRerenderOfAllTechs={forceStateChange} />
          <TechForm
            forceRerenderOfAllTechs={forceStateChange}
            togglePopup={togglePopup}
          />
        </div>
        {popup && (
          <Popup
            onClick={togglePopup}
            content={
              <>
                <Success />
              </>
            }
            handleClose={togglePopup}
          />
        )}
      </div>
    );
  }
};

export default AdminTechs;
