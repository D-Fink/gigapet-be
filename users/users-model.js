const db = require('../data/dbConfig.js')

module.exports = {
    findUserBy,
    findUserById,
    addUser
}

function findUserBy(filter){
    return db('users').where(filter).select('id', 'username', 'password').first()
}

function findUserById(id){
    return db('users').where({id}).select('id', 'username').first()
}

function addUser(user){
    return db('users').insert(user, 'id').then(([id]) => {return findUserById(id)})
}