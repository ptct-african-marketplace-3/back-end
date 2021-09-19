require("dotenv").config();
const bcrypt = require("bcryptjs");

const PASSWORD1 = process.env.PASSWORD1
const PASSWORD2 = process.env.PASSWORD2

const hash1 = bcrypt.hashSync(PASSWORD1, 10);
const hash2 = bcrypt.hashSync(PASSWORD2, 10);

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('owners')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('owners').insert([
        {
          userName: 'JohnDoe',
          email: 'johndoe@email.com',
          password: hash1,
          location: 'Cape Town, South Africa'
        },
        {
          userName: 'JaneDoe',
          email: 'janedoe@email.com',
          password: hash2,
          location: 'Durban, South Africa'
        },
      ]);
    });
};