import React, {useState, useEffect} from 'react';

const ProjectCard = (props) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetch(props.img_src)
      .then(result => result.blob())
      .then(blob => setImage(URL.createObjectURL(blob)));
  }, [props.img_src]);

  return (<img src={image} alt="Project"/>)
}

export default ProjectCard