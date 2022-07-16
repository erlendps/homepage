import React, {useEffect, useState} from "react";
import { Back, Popup, Success, Delete, FileUploader, SearchBar } from "../general";
import "../../css/admin/projects.css";
import { checkStringIsIncluded } from "../../utils"
import axios from "axios";

const Tech = (props) => {
  
  const handleClick = () => {
    props.handleClick(props.id, props.techName);
  }

  return (
    <div className="single-tech" onClick={handleClick} >
      {props.techName}
    </div>
  )
}

const Project = (props) => {
  return (
    <div className="single-project">
      <div className="project-content">
         <h3>{props.title}</h3>
         <Delete section="projects" id={props.id} notifyParent={props.rerender} />
      </div>
      <img src={props.img} alt={props.title + " project"} />
    </div>
  )
}

const ProjectForm = (props) => {
  const [title, setTitle] = useState("");
  const [techsUsed, setTechsUsed] = useState([]);
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);
  const [formError, setFormError] = useState("");

  const [query, setQuery] = useState("");

  const handleAddTech = (id, name) => {
    document.getElementById("search-bar").focus();
    setTechsUsed([...techsUsed, {"techID": id, "name": name}]);
    props.removeTech(id)
  }

  const handleDeleteTech = (id, name) => {
    setTechsUsed(techsUsed.filter((tech) => {
      return tech.techID !== id;
    }));
    props.addTech({"techID": id, "name": name});
  }

  const handleFocus = () => {
    document.getElementById("available-techs").classList.remove("hidden");
  }

  const handleBlur = () => {
    document.getElementById("available-techs").classList.add("hidden");
  }

  const cleanup = () => {
    setTitle("");
    setDescription("");
    setTechsUsed([]);
    setLink("");
    setImage(null);
    setFormError("");
    document.getElementById("file-input").value = null;
    document.getElementById("search-bar").value = "";
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // validation
    if (!title) {
      setFormError("Project needs a title");
      return;
    } else if (techsUsed.length === 0) {
      setFormError("Projects needs technologies");
      return;
    } else if (!description) {
      setFormError("No description")
      return;
    } else if (!link) {
      setFormError("No git link");
      return;
    } else if (!image) {
      setFormError("No image attached");
      return;
    }
    const form = new FormData();
    form.append("title", title);
    form.append("description", description);
    form.append("link", link);
    for (let i = 0; i < techsUsed.length; i++) {
      form.append("techsUsed[]", techsUsed[i].techID);
    }
    form.append("project_image", image);

    axios.post(process.env.REACT_APP_API_BASE_URL + "admin/newproject", form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((res) => {
        props.togglePopup();
        props.rerender();
        cleanup();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="project-form-content">
      <h2>Add new project</h2>
      <form className="project-form" onSubmit={handleSubmit}>
      <input 
        type="text"
        value={title} 
        placeholder="Project title" 
        onChange={(e) => setTitle(e.target.value)}
        className="form-input w-100"
        required 
      />
      <div className="techs-group">
        <div className="selected-techs">
          {techsUsed.map((tech) => {
            return (<Tech key={tech.techID} techName={tech.name} id={tech.techID} handleClick={handleDeleteTech} />)
          })}
        </div>
        <div className="tech-input" tabIndex="0" onFocus={handleFocus} onBlur={handleBlur}>
          <SearchBar resultContainer={"available-techs"} handleChange={(event) => setQuery(event.target.value)} />
          <div id="available-techs" className="available-techs hidden" >
            {
              props.techs.filter((tech) => {
                if (query === "" || checkStringIsIncluded(query, tech.name)) {
                  return true;
                }
                return false;
              }).map((tech) => {
                return (
                  <Tech key={tech.techID} techName={tech.name} id={tech.techID} handleClick={handleAddTech} />
                );
              })
            }
          </div>
        </div>
      </div>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="form-input w-100"
        placeholder="Write a description"
      />
      <input 
        type="text"
        value={link} 
        placeholder="Git link" 
        onChange={(e) => setLink(e.target.value)}
        className="form-input w-100"
        required 
      />
      <FileUploader onFileSelect={(file) => setImage(file)} />
      <input type="submit" className="form-submit" value="Add" />
      <p className="form-error">{formError}</p>
      </form>
    </div>
  )
}

const AllProjects = (props) => {
  return (
    <div className="all-projects-content">
      <h2>All projects</h2>
      <div className="all-projects-list">
        {props.projects.map((project, i) => {
          return (
            <Project
              key={i}
              id={project.projectID}
              title={project.title}
              img={project.image_path}
              rerender={props.rerender}
            />);
        })}
      </div>
    </div>
  );
}

const AdminProjects = () => {
  const [availableTechs, setAvailableTechs] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false);
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    const fetchTechs = async () => {
      try {
        let result = await fetch(process.env.REACT_APP_API_BASE_URL + "admin/newproject");
        result = await result.json();
        setAvailableTechs(result);
      } catch (error) {
        setError(error);
      }
    }
    
    const fetchProjects = async () => {
      try {
        let result = await fetch(process.env.REACT_APP_API_BASE_URL + "admin/projects");
        result = await result.json();
        setAllProjects(result);
      } catch (error) {
        setError(error);
      }
    }

    // make requests run in parallell
    const fetchData = async () => {
      if (!reload) fetchTechs();
      fetchProjects();
      setReload(false);
    }

    const prepareData = async () => {
      await fetchData();
      setLoaded(true);
    }

    prepareData();
  }, [reload]);

  const togglePopup = () => {
    setPopup(!popup);
  }

  const forceRerender = () => {
    setReload(true);
  }

  const removeTech = (id) => {
    setAvailableTechs(availableTechs.filter((tech) => {
      return id !== tech.techID;
    }));
  }

  const addTech = (tech) => {
    setAvailableTechs([...availableTechs, tech])
  }

  if (!loaded) {
    return (<p>loading</p>)
  } else if (error) {
    return (<p>{error}</p>)
  } else {
    return (
      <div className="admin-projects-page">
        <Back to="/admin"/>
        <h1 className="mt--p5">Admin Projects Page</h1>
        <div className="admin-projects-content">
          <AllProjects projects={allProjects} rerender={forceRerender} />
          <ProjectForm
            techs={availableTechs}
            togglePopup={togglePopup}
            rerender={forceRerender} 
            removeTech={removeTech}
            addTech={addTech}
          />
        </div>
        {popup && 
          <Popup onClick={togglePopup}
            content={<>
              <Success />
            </>}
          handleClose={togglePopup}
        />}
      </div>
    );
  }
}

export default AdminProjects;