require("dotenv").config();
const bcrypt = require("bcryptjs");

const PASSWORD1 = process.env.PASSWORD1
const PASSWORD2 = process.env.PASSWORD2

const encrypt1 = async () => {
  try{
    const hash1 = await bcrypt.hash(PASSWORD1, 10);

    if (hash1){
      return hash1
    }
  }catch(err){
    console.log(err);
  }
}

const encrypt2 = async () => {
  try{
    const hash2 = await bcrypt.hash(PASSWORD2, 10);

    if (hash2){
      return hash2
    }
  }catch(err){
    console.log(err);
  }
}

const pass1 = encrypt1();
const pass2 = encrypt2();

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
          password: pass1,
          location: 'Cape Town, South Africa'
        },
        {
          userName: 'JaneDoe',
          email: 'janedoe@email.com',
          password: pass2,
          location: 'Durban, South Africa'
        },
      ]);
    });
};