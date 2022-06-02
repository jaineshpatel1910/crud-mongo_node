const UserModel = require('../model/model')

// Create and Save a new user
exports.create = async (req, res) => {

    if (!req.body.firstName && !req.body.lastName && !req.body.email && !req.body.phone) {
        res.status(400).send({
            message: "Content cannot be empty"
        })
    }

    // const user = new UserModel({
    //     firstName: req.body.firstName,
    //     lastName: req.body.lastName,
    //     email: req.body.email,
    //     phone: req.body.phone,
    // })

    const user = req.body

    await user.save()
        .then(data => {
            res.send({
                message: "User created successfully!",
                user: data
            })
        }).catch(error => {
            res.status(500).send({
                message: error.message
            })
        })
}

// Retrieve all users from the database.
exports.findAll = async (req, res) => {
    try {
        const user = await UserModel.find()
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Find a single User with an id
exports.findOne = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Update a user by the id in the request
exports.update = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty"
        })
    }
    id = req.params.id
    await UserModel.findByIdAndUpdate(id, req.body)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "User not found"
                })
            } else {
                res.send({ messae: "User updated successfully!" })
            }
        }).catch(error => {
            res.status(500).send({
                message: error.messae
            })
        })
}

// Delete a user with the specified id in the request
exports.delete = async (req, res) => {
    await UserModel.findByIdAndRemove(req.params.id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "User not found"
                })
            } else {
                res.send({
                    message: "User deleted successfully!"
                })
            }
        }).catch(error => {
            res.status(500).send({
                message: error.messae
            })
        })
}