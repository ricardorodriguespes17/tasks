

exports.up = function (knex) {
  return knex.schema.createTable('tasks', function (table) {
    table.increments()
    table.string('title').notNullable()
    table.string('description').notNullable()
    table.string('status').notNullable()
    table.datetime('startedIn').nullable()
    table.datetime('finishedIn').nullable()
    table.string('user_id').notNullable()

    table.foreign('user_id').references('id').inTable('users')
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable('tasks')
};
