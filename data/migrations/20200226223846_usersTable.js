exports.up = function(knex) {
    return knex.schema.createTable('usersTable', tbl => {
      tbl.increments();
  
      tbl
        .string('username', 128)
        .notNullable()
        .unique();
      tbl.string('password', 128).notNullable();
      tbl.string('department');
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('usersTable');
  };
