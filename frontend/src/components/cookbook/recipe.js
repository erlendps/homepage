import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import parseToTitle from '../../utils';
import '../../css/recipe.css';
import Back from '../general';


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

const Ingredient = (props) => {
  const calculateAmount = () => {
    if (props.ingredient.amount) {
      let amount = (props.ratio / 2) * props.ingredient.amount;
      return Math.round(amount * 100) / 100;
    }
    return null;
  }
  return (
    <div className="ingredient">
      <p>{props.ingredient.name}</p>
      <p>{calculateAmount()} {props.ingredient.unit}</p>
    </div>
  )
}

const Portions = (props) => {
  return (
    <div className="portion-container">
      <button className="ingredient-button reduce" onClick={() => props.onClick(-1)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-dash-circle" viewBox="0 0 16 16" color="#FFFFFF">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
        </svg>
      </button>
      <div className="portions">
          <p id="portion-int">{props.portions}</p>
          <p id="portion-text">{props.portions === 1 ? "porsjon" : "porsjoner"}</p>
      </div>
      <button className="ingredient-button increase" onClick={() => props.onClick(1)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16" color="#FFFFFF">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
        </svg>
      </button>
    </div>
  )
}

class Ingredients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeIngredients: this.props.ingredients,
      portions: 2
    }
  }

  handleClick = (delta) => {
    if (this.state.portions > 1 || delta > 0) {
      this.setState((state) => ({
        portions: state.portions + delta
      }));
    }
  }

  render() {
    return (
      <div className="ingredients">
        <h2 id="ingredient-header">Ingredienser</h2>
        <Portions portions={this.state.portions} onClick={this.handleClick}/>

        <ul>
          {this.state.recipeIngredients.map((ingredient) => {
            return (
              <li key={ingredient.name}>
                <Ingredient ingredient={ingredient} ratio={this.state.portions}/>
              </li>);
          })}
        </ul>
      </div>
    );
  }
}


// TODO: parse name, and generaly fix this shit
const Recipe = () => {
  let { recipeName } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [img, setImg] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  let recipeUrl = process.env.REACT_APP_API_BASE_URL + "cookbook/" + recipeName;

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
          <Back to="/cookbook" />
          <img src={img} alt={recipeName} />
          <h1>{parseToTitle(recipeName)}</h1>
          <div className="steps-and-ingredients">
            <Ingredients ingredients={recipe.recipeJson.ingredients} />
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