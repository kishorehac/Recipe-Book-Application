import { useEffect, useState } from "react";
import app from "../firebaseSetup/firebaseConfig";

import { ref, get, getDatabase } from "firebase/database";

const ViewRecipe = () => {
  const [recipes, setRecipes] = useState([]); // State to hold recipe data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [query, setQuery] = useState("");

  const fetchRecipes = async () => {
    try {
      const db = getDatabase(app);
      const usersRef = ref(db, "data / users /"); // Reference to users path
      const snapshot = await get(usersRef); // Fetch data
      if (snapshot.exists()) {
        const usersData = snapshot.val();
        const allRecipes = []; // To hold all recipes across users

        // Iterate through users and their recipes
        Object.entries(usersData).forEach(([userId, userRecipes]) => {
          Object.entries(userRecipes).forEach(([recipeId, recipe]) => {
            allRecipes.push({
              name: recipe.name,
              servings: recipe.servings,
              cookingTime: recipe.cookingTime,
              cuisine: recipe.cuisine,
              ingredients: recipe.ingredients,
              instructions: recipe.instructions,
              notes: recipe.notes,
              preparationTime: recipe.preparationTime,
              fname: recipe.fname,
              lname: recipe.lname,
              email: recipe.email,
            });
          });
        });

        setRecipes(allRecipes); // Update state with fetched recipes
      } else {
        console.log("No users found");
      }
    } catch (err) {
      console.error("Error fetching recipes:", err);
      setError(err.message); // Capture any errors
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };
  const filteredItems = recipes.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );
  useEffect(() => {
    fetchRecipes(); // Call the fetch function on mount
  }, []);

  if (loading)
    return (
      <div className="w-[100%] h-[80vh] flex justify-center items-center text-2xl bold">
        Loading recipes...
      </div>
    );
  if (error)
    return (
      <div className="w-[100%] h-[80vh] flex justify-center items-center text-2xl bold">
        Error: {error}
      </div>
    ); // Display error if any

  return (
    <div>
      <h2 className="p-2 m-2 text-3xl bold text-gray-700 border-l-4 border-green-500">
        Recipe List
      </h2>
      <div className="shadow-lg ml-10 w-[300px] rounded-md font-mono text-md h-[90px] p-2">
        <div>
          {/* <label htmlFor="names">Name</label> */}
          <label htmlFor="names">Enter Recipe Name</label>
          <input
            className="border w-[100%] shadow-sm rounded-sm pl-1"
            id="names"
            type="text"
            placeholder="enter recipe name"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          <div className="text-green-500"> Search</div>
        </div>
      </div>

      <ul>
        {filteredItems.reverse().map((item, index) => {
          return (
            <>
              <div
                key={index}
                className="rounded-lg shadow-lg p-3 grid md:grid-cols-10 lg:grid-cols-10 border m-20 bg-gradient-to-r from-gray-100 to-gray-300"

              >
                <div className="col-span-9">
                  <div>
                    <div>
                      <div className="text-sm text-gray-500">
                        Date :- {item.date}
                      </div>
                      <div className="text-sm text-gray-500">
                        From:- {item.fname} {item.lname}
                        <div>{item.email}</div>
                      </div>
                      <div>
                        <span className="text-3xl font-bold text-stone-700">
                          {item.name}{" "}
                        </span>
                        <span className="text-2xl text-gray-400 pl-1 pr-1">
                          /
                        </span>{" "}
                        <span className="text-sm text-gray-500">
                          {item.cuisine}
                        </span>
                        <span className="text-2xl text-gray-400  pl-1 pr-1">
                          /
                        </span>{" "}
                        <span className="text-sm text-gray-500">
                          {item.servings} Servings
                        </span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">
                          Cooking Time :{" "}
                        </span>
                        <span className="text-sm text-gray-500">
                          {item.cookingTime}
                        </span>
                        <span className="text-2xl text-gray-400 pl-1 pr-1">
                          |{" "}
                        </span>
                        <span className="text-sm text-gray-500">
                          Preparation Time :{" "}
                        </span>
                        <span className="text-sm text-gray-500">
                          {item.preparationTime}
                        </span>
                      </div>
                      <div>
                        <div>
                          <div className="text-2xl font-bold text-stone-700">
                            Ingredients
                          </div>
                          <div className="text-sm text-gray-500">
                            {item.ingredients}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div>
                          <div className="text-2xl font-bold text-stone-700">
                            Instruction
                          </div>
                          <div className="text-sm text-gray-500">
                            {item.instructions}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div>
                          <label
                            className="text-2xl font-bold text-stone-700"
                            htmlFor="notes"
                          >
                            Note:
                          </label>
                          <div className="text-sm text-gray-500">
                            {item.notes}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default ViewRecipe;
