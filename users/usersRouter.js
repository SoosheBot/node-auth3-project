const router = require("express").Router();

const Users = require("./usersModel");
// const restricted = require("../auth/restrictedMiddleware");

router.get("/", (req,res) => {
    Users.find()
    .then(users => {
        res.status(201).json(users);
    })
    .catch(err => {
        res.status(500).json({error: "Could not get users."});
    });
});



module.exports = router;