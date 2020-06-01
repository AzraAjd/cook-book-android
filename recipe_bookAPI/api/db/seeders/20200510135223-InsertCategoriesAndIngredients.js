'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [
      {name: 'breakfast'},
      {name: 'lunch'},
      {name: 'dinner'},
      {name: 'appetizer'},
      {name: 'cold appetizer'},
      {name: 'hot appetizer'},
      {name: 'main course'},
      {name: 'hot dessert'},
      {name: 'cold dessert'},
      {name: 'drinks'},
      {name: 'hot drinks'},
      {name: 'cold drinks'},
      {name: 'smoothie'},
      {name: 'gluten-free'},
      {name: 'dairy-free'},
      {name: 'sugar-free'},
      {name: 'pasta'},
      {name: 'vegeterian'},
      {name: 'vegan'},
      {name: 'seafood'},
    ]),
    await queryInterface.bulkInsert('Ingredients', [
      {name: 'flour'},
      {name: 'oil'},
      {name: 'butter'},
      {name: 'salt'},
      {name: 'sugar'},
      {name: 'water'},
      {name: 'pepper'},
      {name: 'eggs'},
      {name: 'cheese'},
      {name: 'cream cheese'},
      {name: 'biscuits'},
      {name: 'chocolate'},
      {name: 'cocoa'},
      {name: 'cinnamon'},
      {name: 'baking powder'},
      {name: 'whipped cream'},
      {name: 'heavy cream'},
      {name: 'sour cream'},
      {name: 'onions'},
      {name: 'garlic'},
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Category', null, {});
    return queryInterface.bulkDelete('Ingredients', null, {});
  }
};
