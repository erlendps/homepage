import React, {useState, useEffect} from 'react';

const ProjectCard = (props, {childReady}) => {
  const [image, setImage] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(props.img_src)
      .then(result => result.blob())
      .then((blob) => {
        setImage(URL.createObjectURL(blob));
        setLoaded(true);
      });
  }, [props]);

  if (!loaded) return;
  return (
    <div className="project-card">
        <img className="project-image" src={image} alt={`Bilde for ${props.title}`}  />
        <h2>{props.title}</h2>
        <p>{props.desc}</p>
      <div className="project-item">
      <ul className="techs">
        {props.techsUsed.map((tech) => (
          <li key={tech} className="techBubble">{tech}</li>
        ))}
      </ul>
      </div>
      <a href={props.github_link}>Github Link</a>
    </div>
  );
}

export default ProjectCard