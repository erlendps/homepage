import React, { useState, useEffect } from 'react';
import ProjectCard from './projectCard';
import '../../css/projects.css';

const Projects = () => {
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/projects")
      .then(res => res.json())
      .then((result) => {
        setProjects(result);
      },
      (error) => {
        setError(error);
      });
  }, []);

  if (error) {
    return (<div>Error: {error.message}</div>);
  } else {
    return (
      <div className="container-main">
        <div className="projects">    
          {projects.map(project => (
            <ProjectCard 
              key={project.projectID}
              title={project.title}
              desc={project.description}
              techsUsed={project.techsUsed}
              github_link={project.link}
              img_src={project.image_path}
            />
          ))}
        </div> 
      </div>
    );
  }
}

export default Projects;