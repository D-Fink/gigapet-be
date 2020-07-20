const router = require('express').Router();
const Auth = require('./auth-model.js');
const User = require('../users/users-model.js');

let d = new Date()
const getDate = () => {
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
}

//working
router.post('/pet/', (req, res) => {
    Auth.createPet({name: req.body.name, type: req.body.type, stage: req.body.stage, progress: req.body.progress, status: req.body.status, user_id: req.user.userId})
    .then(pet => {
        res.status(201).json(pet)
        Auth.addFood({carbs: 0, fruits: 0, veggies: 0, dairy: 0, protein: 0, sweets: 0, pet_id: pet.id, created_at: getDate()})
        .then(food => {
            res.status(201).json(food)
        })
        .catch(err => {
            res.status(500).json({message: `error adding food: ${err}`})
        })
    })
    .catch(err => {
        res.status(500).json({message: `error creating pet ${err}`})
    })
});

router.put('/pet/:id', (req, res) => {
    Auth.updatePet(req.params.id, req.body)
    .then(pet => {
        if(pet) {
            res.status(200).json(pet)
        } else {
            res.status(404).json({message: 'pet could not be found'})
        }
    })
    .catch(err => {
        res.status(500).json({message: `error updating pet: ${err}`})
    })
})

router.delete('/pet/:id', (req, res) => {
    Auth.deletePet(req.params.id)
    .then(count => {
        if(count > 0) {
            res.status(200).json({message: 'pet has been deleted'})
        } else {
            res.status(404).json({message: 'pet could not be found'})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'error removing pet'})
    })
});
//working
router.get('/pet/', (req, res) => {
    Auth.findPet(req.user.userId)
    .then(pet => {
        res.status(200).json(pet)
    })
    .catch(err => {
        res.status(500).json({message: 'error retrieving pet'})
    })
});

router.get('/pet/:id', (req, res) => {
    Auth.findPetById(req.params.id)
    .then(pet => {
        if (pet) {
            res.status(200).json(pet)
        } else {
            res.status(404).json({message: 'pet could not be found'})
        }
    })
    .catch(err => {
        res.status(500).json({message: `error retrieving pet: ${err}`})
    })
})

// food
//working
router.post('/pet/food/:id', (req, res) => {
    Auth.addFood({carbs: req.body.carbs, fruits: req.body.fruits, veggies: req.body.veggies, dairy: req.body.dairy, protein: req.body.protein, sweets: req.body.sweets, pet_id: req.params.id, created_at: req.body.created_at})
    .then(food => {
        res.status(201).json(food)
    })
    .catch(err => {
        res.status(500).json({message: `error adding food: ${err}`})
    })
})

router.put('/pet/food/:id', (req, res) => {
    Auth.updateFood(req.params.id, req.body)
    .then(food => {
        if(food) {
            res.status(200).json({message: 'food entry was successfully updated'})
        } else {
            res.status(404).json({message: 'food entry could not be found'})
        }
    })
    .catch(err => {
        res.status(500).json({message: `error updating food: ${err}`})
    })
})

//working
router.get('/pet/food/:id', (req, res) => {
    const id = req.params.id;
    Auth.findPetById(id)
    .then(pet => {
        if (pet.length > 0) {
            Auth.findFoodByPet(pet[0].id).then(food => {
                res.status(200).json(food)
            })
        } else {
            res.status(404).json({message: 'cannot find foods'})
        }
    })
    .catch(err => {
        res.status(500).json({message: `error retrieving foods: ${err}`})
    })
})


module.exports = router