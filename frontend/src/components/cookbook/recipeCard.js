import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import parseToTitle from '../../utils';

// TODO: fix this ugly shit
const RecipeCard = (props) => {
  const [error, setError] = useState(null);
  const [image, setImage] = useState("");
  const [loaded, setLoaded] = useState(false); 

  useEffect(() => {
    // image
    fetch(props.img_link)
      .then(res => res.blob())
      .then(blob => {
        setImage(URL.createObjectURL(blob));
        setLoaded(true);
      }, (error) => setError(error));
  }, [])

  if (error) {
    return (
      <h1>500: Internal Server Error</h1>
    );
  } else if (!loaded) {
    return (<h1>Loading</h1>)
  } else {
    let title = parseToTitle(props.recipeName);
    return (
      <Link to={ `/cookbook/${props.recipeName}` } className="recipe-card-link">
        <div className="recipe-card">
          <img src={image} alt={props.recipeName} className="recipe-image" />
          <h2>{title}</h2>
        </div>
      </Link>
    );
  }
}


export default RecipeCard;