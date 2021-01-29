const express = require('express');

const Recipe = require('../recipes/model');

const { validateGuestToken } = require('./middleware');

const guest = express.Router();

guest.get('/', validateGuestToken(), async (request, response, next) => {
   try {
       return response.status(200).json({message: 'Hello World'});
   } catch (error) {
       next(error);
   }
});

module.exports = guest;
