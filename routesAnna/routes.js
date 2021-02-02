const router = require("express").Router()
const bcrypt = require("bcryptjs")
const model = require("./model")
//const {restrict} = require("./middleware")
const jwt = require("jsonwebtoken")

router.post('/register', async (req, res, next)=> {
    try{
        const {username, password} = req.body
        const user = await model.findBy({username})

        if(user){
            return res.status(409).json({
                message: "Username is already taken"
            })
        }

        if(!req.body.username || !req.body.password){
            return res.status(409).json({
                message: "username and password required"
            })
        }

        const newUser = await model.add({
            username,
            password: await bcrypt.hash(password, 10)
        })

        res.status(201).json(newUser)

    }
    catch(err){
        next(err)
    }
})


router.post("/login", async (req, res, next)=> {
    try{
        const {username, password} = req.body
        const registered = await module.findBy({username})

        if(!registered){
            return res.status(401).json({
                message: "you must register first"
            })
        }

        const passwordValid =  await bcrypt.compareSync(password, registered.password)

        if(!passwordValid){
            return res.status(401).json({
                message: "That's not the password"
            })
        }

        const token = jwt.sign({
            userId: registered.id,
        }, process.env.JWT_SECRET, {expiresIn: "7d"})

        res.cookie("token", token)

        res.json({
            message: `Welcome ${registered.username}`,
            token: token
        })

    }
    catch(err){
        next(err)
    }
})


module.exports = router

