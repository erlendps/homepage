import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import parseToTitle from '../../utils';
import '../../css/recipe.css';


const Steps = (steps) => {
  const recipeSteps = steps.steps;
  return (
    <ol>
      {recipeSteps.map((step) => {
        return (<li key={step}>{step}</li>);
      })}
    </ol>
  );
}

const Ingredients = (ingredients) => {
  const recipeIngredients = ingredients.ingredients;
  console.log(recipeIngredients);
  return (
    <ul>
      {recipeIngredients.map((ingredient) => {
        return (
          <li key={ingredient.name} className="ingredient">
            <p>{ingredient.name}</p>
            <p>{ingredient.amount} {ingredient.unit}</p>
          </li>);
      })}
    </ul>
  );
}


// TODO: parse name, and generaly fix this shit
const Recipe = () => {
  let { recipeName } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [img, setImg] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  let recipeUrl = "http://localhost:3001/api/cookbook/" + recipeName;

  useEffect(() => {
    const fetchData = async () => {
      let data = await fetch(recipeUrl);
      data = await data.json();
      setRecipe(data[0]);
      let img = await fetch(data[0].img_src);
      img = await img.blob();
      setImg(URL.createObjectURL(img));
      setLoaded(true);
    }

    fetchData()
      .catch(err => setError(err));
  }, []);

  if (error) {
    return (<div className="container-main">Error</div>)
  } else if (!loaded) {
    return;
  } else {
    return (
      <div className="container-main">
        <div className="recipe">
          <img src={img} alt={recipeName} />
          <h1>{parseToTitle(recipeName)}</h1>
          <div className="steps-and-ingredients">
            <div className="ingredients">
              <h2>Ingredienser</h2>
              <Ingredients ingredients={recipe.recipeJson.ingredients} />
            </div>
            <div className="steps">
              <h2>Fremgangsmåte</h2>
              <Steps steps={recipe.recipeJson.steps} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Recipe;