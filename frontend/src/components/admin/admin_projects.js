import React, {useEffect, useState} from "react";


const ProjectForm = () => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [techsUsed, setTechsUsed] = useState([]);
  const [allTechs, setAllTechs] = useState([])

  useEffect(() => {
    fetch(process.env.REACT_APP_API_BASE_URL + "admin/newproject")
      .then(result => result.json())
      .then(result => {
        setAllTechs(result);
        setLoaded(true);
      })
  }, []);

  if (!loaded) {
    return (<p>error</p>)
  } else {
    return (
      <ul>
        {allTechs.map(tech => {
          return (<li key={tech.techID}>{tech.name}</li>)
        })}
      </ul>
    );
  }
}

const AdminProjects = () => {
  return (
    <ProjectForm />
  );
}

export default AdminProjects;