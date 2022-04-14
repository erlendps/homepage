import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

// TODO: parse name, and generaly fix this shit
const Recipe = () => {
  let { recipeName } = useParams();
  return (<h2>{recipeName}</h2>)
}

export default Recipe;