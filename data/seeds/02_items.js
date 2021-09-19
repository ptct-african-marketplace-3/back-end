
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        {
          ownerId: 1,
          itemName: 'Custom Guitar', 
          itemDescription: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid reiciendis, ex culpa explicabo itaque praesentium rem sit fugit ducimus eaque eveniet? Voluptatem quis iusto debitis?',
          itemPrice: 499.50
        },
        {
          ownerId: 2,
          itemName: 'Fruit Basket', 
          itemDescription: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid reiciendis, ex culpa explicabo itaque praesentium rem sit fugit ducimus eaque eveniet? Voluptatem quis iusto debitis?',
          itemPrice: 45.25
        },
        {
          ownerId: 2,
          itemName: 'Handsewn Hat', 
          itemDescription: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid reiciendis, ex culpa explicabo itaque praesentium rem sit fugit ducimus eaque eveniet? Voluptatem quis iusto debitis?',
          itemPrice: 19.99
        }
      ]);
    });
};