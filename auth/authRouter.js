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

router.get("/logout", (req,res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.status(500).json({ err: "Could not log out"});
            } else {
                res.status(200).json({ message: "You are now logged out. Seeya later."})
            }
        })
    } else {
        res.status(200).json({ message: "Logout success."})
    }
});

function signToken(user) {
    const payload = {
        userId: user.id,
        user: user.password
    };

    const options = {
        expiresIn: '1h'
    };

    return jwt.sign(payload, jwtSecret, options);
};

module.exports = router;