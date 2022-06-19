import React, {useEffect, useState} from "react";
import axios from "axios";
import {Back, Delete, Success} from "../general";

const AdminCookbook = () => {
  const [cookbook, setCookbook] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false);
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_BASE_URL + "admin/cookbook")
      .then(res => res.json())
      .then((json) => {
        setCookbook(json);
        setLoaded(true);
        setReload(false);
      })
      .catch((err) => {
        setError(err);
      });
  }, [reload]);

  const forceStateChange = () => {
    setReload(true);
  }

  const togglePopup = () => {
    setPopup(!popup);
  }

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
      <div className="admin-cookbook-page">
      
      </div>
    );
  }
}

export default AdminCookbook;