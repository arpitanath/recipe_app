import React, { useState, useEffect } from "react";
import Recipe from "./Recipe";
import "./App.css";

const App = () => {
  const YOUR_APP_ID = "286f4dd8";
  const YOUR_APP_KEY = "85569dd38b9d26d264c44322dc7fe1d6";

  //illustrating the use of useEffect in React

  //everything which we are getting from the API are stored in this recipe state
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  useEffect(() => {
    console.log(query);
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`
    );
    const data = await response.json();
    console.log(data.hits);
    setRecipes(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
    console.log("SEARCH", search);
  };

  const getSearchQuery = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="App">
      <form onSubmit={getSearchQuery} className="search-form">
        <input
          className="search-bar"
          type="text"
          placeholder="Search any ingredient"
          value={search}
          onChange={updateSearch}
        ></input>
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
      {/* <h1 onClick={() => setCounter(count + 1)}>{count}</h1> */}
    </div>
  );
};

export default App;
