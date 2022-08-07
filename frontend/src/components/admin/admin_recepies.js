import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Back,
  Delete,
  DeleteInternal,
  AddButton,
  Success,
  Popup,
  FileUploader,
} from "../general";
import { parseToTitle, parseToDbName } from "../../utils";
import "../../css/admin/cookbook.css";
import Cookies from "universal-cookie";

const cookies = new Cookies();

// Ingredient component
const Ingredient = (props) => {
  const deleteInternal = (e) => {
    props.deleteInternal(e, props.number);
  };

  let extraClass = props.number % 2 === 0 ? "item-left" : "item-right";
  return (
    <div
      className={"ingredient-in-recipe pt-p2p5 pb-p2p5 " + extraClass}
      onClick={deleteInternal}
    >
      <p>{props.name}</p>
      <p>
        {props.amount} {props.unit ? props.unit : ""}
      </p>
    </div>
  );
};

// step component
// TODO: allow for reordering
const Step = (props) => {
  return (
    <div className="step-in-recipe">
      <div className="step-container">
        <p>{props.number}.</p>
        <p>{props.text}</p>
      </div>
      <DeleteInternal
        deleteInternal={props.deleteInternal}
        element={props.number - 1}
      />
    </div>
  );
};

// :( component for the recipe form
const RecipeForm = (props) => {
  const initIngredient = {
    name: "",
    amount: 0,
    unit: "",
  };
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState(initIngredient);
  const [currentStep, setCurrentStep] = useState("");
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);

  // resets all states
  const cleanup = () => {
    setName("");
    setIngredients([]);
    setSteps([]);
    setCurrentIngredient(initIngredient);
    setCurrentStep("");
    setError("");
    document.getElementById("file-input").value = null;
  };

  // updates the current ingredients name
  const updateIngName = (target) => {
    setCurrentIngredient((current) => {
      return {
        ...current,
        name: target,
      };
    });
  };

  // updates the current ingredients amount
  const updateIngAmount = (target) => {
    if (target >= 0) {
      setCurrentIngredient((current) => {
        return {
          ...current,
          amount: target,
        };
      });
      setError("");
    } else {
      setError("Can't have a negative amount");
    }
  };

  // updates the current ingredients unit
  const updateIngUnit = (target) => {
    setCurrentIngredient((current) => {
      return {
        ...current,
        unit: target,
      };
    });
  };

  // validation for adding a ingredient and adds to the list
  const handleAddIngredient = (event) => {
    event.preventDefault();
    if (currentIngredient.name) {
      let ingredient = {
        name: currentIngredient.name,
      };
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
      setError("");
    } else {
      setError("Ingredient must have a name!");
    }
  };

  const handleDeleteIngredient = (event, index) => {
    event.preventDefault();
    setIngredients(
      ingredients.filter((_, i) => {
        return i !== index;
      })
    );
  };

  // validates the step and adds to the list
  const handleAddStep = (event) => {
    event.preventDefault();
    if (currentStep) {
      setSteps([...steps, currentStep]);
      setCurrentStep("");
      setError("");
    } else {
      setError("Ingredient field cannot be empty.");
    }
  };

  const handleDeleteStep = (event, index) => {
    event.preventDefault();
    setSteps(
      steps.filter((_, i) => {
        return i !== index;
      })
    );
  };

  // handles submission of form. Creates the body and file
  const handleSubmit = (event) => {
    event.preventDefault();
    if (ingredients.length === 0 || steps.length === 0) {
      setError("You need to add steps and ingredients!");
      return;
    }
    let recipeJson = {
      ingredients: ingredients,
      steps: steps,
    };

    const form = new FormData();
    form.append("recipeName", parseToDbName(name));
    form.append("recipeJson", JSON.stringify(recipeJson));
    form.append("recipe_image", file);
    axios
      .post(
        process.env.REACT_APP_API_BASE_URL + "admin/cookbook/new_recipe",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${cookies.get("TOKEN")}`,
          },
        }
      )
      .then((res) => {
        props.togglePopup();
        props.rerenderAllRecipies();
        cleanup();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="new-recipe-content">
      <h2>Add recipe</h2>
      <form className="new-recipe-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Name of the recipe"
          onChange={(e) => setName(e.target.value)}
          className="form-input w-100"
          required
        />
        <div className="ingredient-container mt-p5">
          {ingredients.map((ing, i) => {
            return (
              <Ingredient
                key={i}
                number={i}
                name={ing.name}
                amount={ing.amount}
                unit={ing.unit}
                deleteInternal={handleDeleteIngredient}
              />
            );
          })}
        </div>
        <div className="ingredient-input-group">
          <input
            type="text"
            value={currentIngredient.name}
            placeholder="Ingredient name"
            onChange={(e) => updateIngName(e.target.value)}
            className="form-input"
          />
          <input
            type="number"
            value={currentIngredient.amount}
            onChange={(e) => updateIngAmount(e.target.value)}
            className="form-input"
          />
          <input
            type="text"
            value={currentIngredient.unit}
            onChange={(e) => updateIngUnit(e.target.value)}
            placeholder="Unit"
            className="form-input"
          />
        </div>
        <div>
          <AddButton handleClick={handleAddIngredient} />
        </div>
        <div className="steps-container">
          {steps.map((step, i) => {
            return (
              <Step
                key={i}
                number={i + 1}
                text={step}
                deleteInternal={handleDeleteStep}
              />
            );
          })}
        </div>
        <textarea
          value={currentStep}
          onChange={(e) => setCurrentStep(e.target.value)}
          className="form-input w-100"
          placeholder="Write a descriptive step"
        />
        <div>
          <AddButton handleClick={handleAddStep} />
        </div>
        <FileUploader onFileSelect={(file) => setFile(file)} />
        <input type="submit" className="form-submit" value="Add" />
        <p className="form-error">{error}</p>
      </form>
    </div>
  );
};

// component for all recipies
const AllRecipies = (props) => {
  return (
    <div className="all-recipies-content">
      <h2>All recipies</h2>
      <ul className="all-recipies">
        {props.cookbook.map((recipe) => {
          return (
            <li key={recipe.recipeID} className="single-recipe">
              <div>
                <span>{parseToTitle(recipe.recipeName)}</span>
                <Delete
                  section="cookbook"
                  id={recipe.recipeID}
                  notifyParent={props.rerenderAllRecipies}
                />
              </div>
              <img src={recipe.img_src} alt={parseToTitle(recipe.recipeName)} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// main component for page
const AdminCookbook = () => {
  const [cookbook, setCookbook] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false);
  const [popup, setPopup] = useState(false);

  // fetches all recipies
  useEffect(() => {
    fetch(process.env.REACT_APP_API_BASE_URL + "admin/cookbook", {
      headers: {
        Authorization: `Bearer ${cookies.get("TOKEN")}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setCookbook(json);
        setLoaded(true);
        setReload(false);
      })
      .catch((err) => {
        setError(err);
      });
  }, [reload]);

  // forces a state change and rerenders component
  const forceStateChange = () => {
    setReload(true);
  };

  // toggles the popup
  const togglePopup = () => {
    setPopup(!popup);
  };

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
        <Back to="/admin" />
        <h1 className="mt--p5">Admin Cookbook Page</h1>
        <div className="admin-cookbook-content">
          <AllRecipies
            cookbook={cookbook}
            rerenderAllRecipies={forceStateChange}
          />
          <RecipeForm
            rerenderAllRecipies={forceStateChange}
            togglePopup={togglePopup}
          />
        </div>
        {popup && (
          <Popup
            onClick={togglePopup}
            content={
              <>
                <Success />
              </>
            }
            handleClose={togglePopup}
          />
        )}
      </div>
    );
  }
};

export default AdminCookbook;
