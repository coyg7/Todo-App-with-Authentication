exports.up = function(knex) {
  return knex.schema
    .createTable('tags', table => {
      table.increments();
      table.string('tag_name').notNull();
    })
    .createTable('tags_todo', table => {
      table.integer('todo_id').references('todo.id');
      table.integer('tag_id').references('tags.id');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('tags').dropTable('tags_todo');
};
