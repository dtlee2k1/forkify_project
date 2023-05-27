import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import uploadRecipeView from './views/uploadRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
if (module.hot) {
    module.hot.accept();
}

const controlRecipes = async function () {
    try {
        const id = window.location.hash.slice(1);
        if (!id) return;

        recipeView.renderSpinner();

        // Updating results view to marked selected search result
        resultsView.update(model.getSearchResultPage());

        // Updating bookmarks view
        bookmarksView.update(model.state.bookmarks);

        // Loading recipe
        await model.loadRecipe(id);

        // Rendering recipe
        recipeView.render(model.state.recipe);
    } catch (error) {
        recipeView.renderError();
    }
};

const controlSearchResults = async function () {
    try {
        // get search query
        const query = searchView.getQuery();
        if (!query) return;

        resultsView.renderSpinner();

        // Loading search results
        await model.loadSearchResults(query);

        // Rendering search results
        resultsView.render(model.getSearchResultPage());

        // Render pagination buttons
        paginationView.render(model.state.search);
    } catch (error) {
        resultsView.renderError();
    }
};

const controlPagination = function (gotoPage) {
    // Rendering NEW search results
    resultsView.render(model.getSearchResultPage(gotoPage));

    // Render NEW pagination buttons
    paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
    // Update the recipe servings (in state)
    model.updateServing(newServings);

    // Update the recipe view
    // recipeView.render(model.state.recipe);
    recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
    // Add/Remove bookmark
    if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
    else model.deleteBookmark(model.state.recipe.id);

    // Update the recipe view
    recipeView.update(model.state.recipe);

    // Render the bookmark
    bookmarksView.render(model.state.bookmarks);
};

// Render the bookmark at FIRST
const controlBookmarks = function () {
    bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
    try {
        // Upload the new recipe data
        await model.uploadRecipe(newRecipe);

        // Close modal after submission
        uploadRecipeView.toggleWindow();

        // Render the new recipe view
        recipeView.render(model.state.recipe);

        // Render the bookmarks view
        bookmarksView.render(model.state.bookmarks);
        // Change url id of new recipe
        window.history.pushState(null, '', `#${model.state.recipe.id}`);
    } catch (error) {
        uploadRecipeView.renderError();
    }
};

const app = function () {
    bookmarksView.addHandlerRender(controlBookmarks);
    recipeView.addHandlerRender(controlRecipes);
    recipeView.addHandlerUpdateServings(controlServings);
    recipeView.addHandlerAddBookmark(controlAddBookmark);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
    uploadRecipeView.addHandlerUpload(controlAddRecipe);
};

app();
