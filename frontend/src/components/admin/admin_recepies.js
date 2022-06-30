import React, {useEffect, useState} from "react";
import axios from "axios";
import {Back, Delete, Success, Popup} from "../general";
import parseToTitle from "../../utils";
import "../../css/admin/cookbook.css";


const AddButton = (props) => {
  return (
    <button className="recipe-form-button" onClick={props.handleClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" color="#ffffff" className="bi bi-plus-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
      </svg>
    </button>
  )
}

const Ingredient = (props) => {
  return (
    <div className="ingredient-form">
      <p>{props.name}</p>
      <p>{props.amount}</p>
      <p>{props.unit ? props.unit : ""}</p>
    </div>
  );
}

const Step = (props) => {
  return (
    <div className="step-form">
      <p>{props.text}</p>
    </div>
  );
}

// :(
const RecipeForm = () => {
  const initIngredient = {
    "name": "",
    "amount": 0,
    "unit": ""
  }
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState(initIngredient);
  const [currentStep, setCurrentStep] = useState("");
  const [error, setError] = useState("");

  const updateIngName = (target) => {
    setCurrentIngredient((current) => {
      return {
        ...current,
        "name": target, 
      };
    });
  }

  const updateIngAmount = (target) => {
    if (target >= 0) {
      setCurrentIngredient((current) => {
        return {
          ...current,
          "amount": target,
        }
      });
      setError("")
    } else {
      setError("Can't have a negative amount")
    }
  }

  const updateIngUnit = (target) => {
    setCurrentIngredient((current) => {
      return {
        ...current,
        "unit": target, 
      };
    });
  }

  const handleAddIngredient = (event) => {
    event.preventDefault();
    if (currentIngredient.name) {
      let ingredient = {
        "name": currentIngredient.name,
      }
      if (currentIngredient.amount === 0) {
        ingredient["amount"] = null;
      } else {
        ingredient["amount"] = currentIngredient.amount;
      }
      if (currentIngredient.unit) {
        ingredient["unit"] = currentIngredient.unit;
      } else {
        ingredient["unit"] = null;
      }
      setIngredients([...ingredients, ingredient]);
      setCurrentIngredient(initIngredient);
      setError("")
    } else {
      setError("Ingredient must have a name!")
    }
  }

  const handleAddStep = (event) => {
    event.preventDefault()
    if (currentStep) {
      setSteps([...steps, currentStep]);
      setCurrentStep("");
      setError("");
    } else {
      setError("Ingredient field cannot be empty.");
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <div>
      <h2>Add recipe</h2>
      <form className="new-recipe-form">
        <input 
          type="text"
          value={name} 
          placeholder="Name of the recipe" 
          onChange={(e) => setName(e.target.value)}
          className="recipe-input"
          required 
        />
        {ingredients.map((ing, i) => {
          return (<Ingredient key={i} name={ing.name} amount={ing.amount} unit={ing.unit} />);
        })}
        <div className="ingredient-input-group">
          <input 
            type="text"
            value={currentIngredient.name} 
            placeholder="Ingredient name"
            onChange={(e) => updateIngName(e.target.value)}
            className="recipe-input ing-name"
          />
          <input
            type="number"
            value={currentIngredient.amount}
            onChange={(e) => updateIngAmount(e.target.value)}
            className="recipe-input ing-amount"
          />
          <input
            type="text"
            value={currentIngredient.unit}
            onChange={(e) => updateIngUnit(e.target.value)}
            placeholder="Unit"
            className="recipe-input ing-unit"
          />
        </div>
        <AddButton handleClick={handleAddIngredient} />

        {steps.map((step, i) => {
          return (<Step key={i} text={step} />)
        })}
        <textarea value={currentStep} onChange={(e) => setCurrentStep(e.target.value)} className="recipe-textarea"/>
        <AddButton handleClick={handleAddStep} />

        <input type="submit" />
        <p>{error}</p>
      </form>
    </div>
  )
}

const AllRecipies = (props) => {
  return (
    <div>
      <h2>All recipies</h2>
      <ul className="all-recipies">
        {props.cookbook.map((recipe) => {
          return (
            <li key={recipe.recipeID} className="single-recipe">
              <div>
                <span>{parseToTitle(recipe.recipeName)}</span>
                <Delete section="cookbook" id={recipe.recipeID} notifyParent={props.rerenderAllRecipies} />
              </div>
              <img src={recipe.img_src} alt={parseToTitle(recipe.recipeName)} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}


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
        <Back to="/admin"/>
        <h1>Admin Cookbook Page</h1>
        <div className="admin-cookbook-content">
          <AllRecipies cookbook={cookbook} rerenderAllRecipies={forceStateChange}/>
          <RecipeForm rerenderAllRecipies={forceStateChange} togglePopup={togglePopup}/>
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

export default AdminCookbook;