const bcrypt = require("bcryptjs");
const router = require("express").Router();
const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../config/secrets");

const Users = require("../users/usersModel");

router.post("/register", (req,res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);

    user.password = hash;

    Users.add(user)
    .then(saved => {
        res.status(201).json(saved);
    })
    .catch(err => {
        res.status(500).json({ error: "Registration error."})
    });
});

router.post("/login", (req,res) => {
    let { username, password } = req.body;
    Users.findBy({username})
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            
            const token = signToken(user);
            res.status(200).json({token})
        } else {
            res.status(401).json({ error: "Invalid credentials, cannot login."})
        }
    })
    .catch(err => {
        res.status(500).json({ error: "Login error."})
    });
});

function signToken() {

};

module.exports = router;