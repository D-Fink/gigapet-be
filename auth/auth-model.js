const db = require('../data/dbConfig.js')

module.exports = {
    findPetById,
    createPet,
    updatePet,
    deletePet,
    addFood,
    updateFood,
    findFoodById
}

function findPetById(id){
    return db('pet').where({id})
}

function findFoodById(id){
    return db('food').where({id})
}

function createPet(pet, id){
    return db('pet').insert(pet, 'id').then(([id]) => {return findPetById(id)})
}

function addFood(food){
    return db('food').insert(food, 'id').then(([id]) => {return findFoodById(id)})
}

function updatePet(id, pet){
    return db('pet').where({id}).update(pet);
}

function updateFood(id, food){
    let d = new Date()
    return db('food')
    .where('created_at', `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`)
    .andWhere('pet_id', id)
    .update(food)
}

function deletePet(id){
    return db('pet').where({id}).del()
}