exports.up = function(knex) {
    return knex.schema
      .createTable('owners', tbl => {
          tbl.increments('ownerId');
          tbl.text('userName', 128)
              .unique()
              .notNullable();
          tbl.text('email', 128)
              .unique()
              .notNullable();
          tbl.text('password')
              .notNullable();
          tbl.text('location', 128)
              .notNullable();
      })
      .createTable('items', tbl => {
          tbl.increments('itemId');
          tbl.text('itemName', 128)
              .notNullable();
          tbl.text('itemDescription')
              .notNullable();
          tbl.decimal('itemPrice')
              .notNullable();
          tbl.integer('ownerId')
              .unsigned()
              .notNullable()
              .references('ownerId')
              .inTable('owners')
              .onUpdate('restrict')
              .onDelete('restrict')
      })
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('items')
      .dropTableIfExists('owners');
  };
  