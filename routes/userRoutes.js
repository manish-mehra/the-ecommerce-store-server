const express = require('express')
const router = express.Router()

const { 
        getSingleUser, 
        getAllUsers, 
        showCurrentUser, 
        updateUser, 
        updateUserPassword 
    } = require('../controllers/userController')

// router.route('/').get(getAllUsers)
router
  .route('/')
  .get(getAllUsers);

router.route('/:id').get(getSingleUser);

module.exports = router