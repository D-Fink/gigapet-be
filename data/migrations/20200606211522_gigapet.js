let d = new Date()
const getDate = () => {
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
}

exports.up = async (knex, Promise) => {
    return knex.schema.createTable('users', tbl => {
        tbl.increments();
        tbl.string('username').unique().notNullable();
        tbl.string('password').notNullable();
        tbl.string('email').unique().notNullable();
    })
    .createTable('pet', tbl => {
        tbl.increments();
        tbl.string('name').notNullable();
        tbl.integer('type').notNullable();
        tbl.integer('stage').notNullable();
        tbl.integer('progress').notNullable();
        tbl.integer('status').notNullable();
        tbl.integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
    .createTable('food', tbl => {
        tbl.increments();
        tbl.integer('carbs').defaultTo(0).nullable();
        tbl.integer('fruits').defaultTo(0).nullable();
        tbl.integer('veggies').defaultTo(0).nullable();
        tbl.integer('dairy').defaultTo(0).nullable();
        tbl.integer('protein').defaultTo(0).nullable();
        tbl.integer('sweets').defaultTo(0).nullable();
        tbl.string('created_at').defaultTo({getDate()});
        tbl.integer('pet_id')
        .unsigned()
        .references('id')
        .inTable('pet')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
};

exports.down = async (knex, Promise) => {
    return knex.schema
    .dropTableIfExists('food')
    .dropTableIfExists('pet')
    .dropTableIfExists('users')
  
};
