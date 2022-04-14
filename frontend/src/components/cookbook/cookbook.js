import React, {useState, useEffect} from 'react';
import RecipeCard from './recipeCard';
import '../../css/cookbook.css';

// TODO: fix searchbar
const SearchBar = () => {
  return (
    <div className="search">
      <input type="text" placeholder="Søk etter en oppskrift!" />
    </div>
  )
}


const Cookbook = () => {
  const [loaded, setLoaded] = useState(false);
  const [cookbook, setCookbook] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/cookbook")
      .then(res => res.json())
      .then((result) => {
        setCookbook(result);
        setLoaded(true);
      },
      (error) => {
        setError(error);
      });
  }, []);

  if (error) {
    return (
      <div className="container-main">
        <h1>Error</h1>
        <p>{error.message}</p>
      </div>
    );
  } else if (!loaded) {
    return;
  } else {
    return (
      <div className="container-main">
        <div className="cookbook">
          {cookbook.map((recipe) => {
            return (
              <RecipeCard
                key={recipe.recipeName}
                recipeName={recipe.recipeName}
                img_link={recipe.img_src}
              />
            );
          })}
        </div>
      </div>
    );
  }
}


export default Cookbook;