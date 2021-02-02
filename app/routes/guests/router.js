const express = require('express');

const Recipe = require('../recipes/model');

const { validateGuestToken } = require('./middleware');

const guests = express.Router();

guests.get('/', validateGuestToken(), async (request, response, next) => {
   try {
       let recipe = await Recipe.getRecipeByID(request.guestToken.recipe_id);

       return response.status(200).json({data: recipe});
   } catch (error) {
       next(error);
   }
});

module.exports = guests;
