import { estimateCostPerIngredient } from './ingredients';

export const findRecipe = (recipesList, recipeID) => {
  const recipe = recipesList.find(
    currentRecipe => currentRecipe.id === recipeID
  );
  return recipe;
};

export const findRecipeIngredients = (recipe) => {
  const recipeIngredients = recipe.ingredients;
  const ingredientList = recipeIngredients.map(ingredient => ingredient.id);
  return ingredientList;
};

export const findRecipeInstructions = recipe => {
  const recipeInstructions = recipe.instructions.sort(
    (a, b) => a.number - b.number
  );
  const instructionList = recipeInstructions.map(
    instruction => instruction.instruction
  );
  return instructionList;
};

export const estimateCostPerRecipeIngredients = (ingredients, recipe) => {
  return recipe.ingredients.map(ingredient =>
    estimateCostPerIngredient(ingredients, ingredient)
  );
};

export const estimateCostPerRecipe = ingredientCosts => {
  const totalCents = ingredientCosts.reduce((acc, val) => (acc += val), 0);
  const dollars = (totalCents / 100).toFixed(2);
  return Number(dollars);
};

export const updateRecipeWithCost = (ingredientsData, recipe) => {
  const ingredientCosts = estimateCostPerRecipeIngredients(ingredientsData, recipe)
  const totalCost = estimateCostPerRecipe(ingredientCosts)
  recipe.totalCost = totalCost
  return recipe
};

export const updateAllRecipesWithCost = (ingredientData, allRecipes) => {
  const updatedRecipes = allRecipes.map(recipe => updateRecipeWithCost(ingredientData, recipe))
  return updatedRecipes
};

export const filterRecipesByCost = (allRecipes, minCost, maxCost) => {
  const filterByCost = allRecipes.filter(recipe =>
    recipe.totalCost >= minCost && recipe.totalCost <= maxCost)
  return filterByCost
}

export const filterRecipesByTag = (recipesList, tag) => {
  if (!tag) return recipesList;
  return recipesList.filter(recipe => recipe.tags.includes(tag));
};

export const filterRecipesByName = (recipesList, name) => {
  return recipesList.filter(recipe => {
    const recipeName = recipe.name.toLowerCase();
    const otherName = name.toLowerCase();

    return recipeName.includes(otherName);
  });
};

export const getAllRecipeTags = recipesList => {
  return recipesList
    .reduce((tags, recipe) => {
      recipe.tags.forEach(tag => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });

      return tags;
    }, [])
    .sort();
};

export const getRandomRecipe = recipes =>
  recipes[Math.floor(Math.random() * recipes.length)];

export const getMaxRecipeCost = recipes => {
  const sortedRecipes = [...recipes].sort((a, b) => b.totalCost - a.totalCost);
  return Math.ceil(sortedRecipes[0].totalCost);
}
