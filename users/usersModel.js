const db = require('../data/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
    return db('usersTable').select('id', 'username', 'password');
  }
  
  function findBy(filter) {
    return db('usersTable').select('id', 'username', 'password').where(filter);
  }

  function findById(id) {
    return db('usersTable')
      .where({ id })
      .first();
  }
  
 function add(user) {
    return db("usersTable")
    .insert(user)
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
  }
  
  