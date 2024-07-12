import { estimateCostPerIngredient } from './ingredients';

export const findRecipe = (recipesList, recipeID) => {
  const recipe = recipesList.find(
    currentRecipe => currentRecipe.id === recipeID
  );
  return recipe;
};

export const findRecipeIngredients = (ingredientsData, recipe) => {
  const recipeIngredients = recipe.ingredients;
  const ingredientList = recipeIngredients.map(ingredient => ingredient.id);
  return ingredientList;
};

export const findRecipeInstructions = (recipe) => {
  const recipeInstructions = recipe.instructions.sort(
    (a, b) => a.number - b.number
  );
  const instructionList = recipeInstructions.map(instruction => instruction.instruction)
  return instructionList
};

export const estimateCostPerRecipeIngredients = (ingredientsData, recipe) => {
  return recipe.ingredients.map(ingredient =>
    estimateCostPerIngredient(ingredientsData, ingredient)
  );
};

export const estimateCostPerRecipe = ingredientCosts => {
  return ingredientCosts.reduce((acc, val) => (acc += val), 0);
};

export const filterRecipesByTag = (recipesList, tag) => {
  return recipesList.filter(recipe => recipe.tags.includes(tag));
};

export const filterRecipesByName = (recipesList, name) => {
  return recipesList.filter(recipe =>
    recipe.name.toLowerCase().includes(name.toLowerCase())
  );
};
