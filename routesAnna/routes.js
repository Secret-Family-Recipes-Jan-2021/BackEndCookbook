const router = require("express").Router()
const bcrypt = require("bcryptjs")
const model = require("./model")
//const {restrict} = require("./middleware")
const jwt = require("jsonwebtoken")

const SALT = process.env.HASH_ROUNDS ? parseInt(process.env.HASH_ROUNDS) : 10;

router.post('/register', async (req, res, next)=> {
    try{
        const {username, password} = req.body
        const user = await model.findBy(username)

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

        let hashedPassword = await bcrypt.hash(password, SALT)

        const newUser = await model.add({
            username: username,
            password: hashedPassword
        })

        return res.status(201).json(newUser)

    }
    catch(err){
        next(err)
    }
})


router.post("/login", async (req, res, next)=> {
    try{
        const {username, password} = req.body

        const registered = await model.findBy(username)

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

router.get("/", async (req, res, next)=> {
    try{
        const id = req.params.id
        const users = await model.listUsers()

        res.status(200).json(users)

    }
    catch(err){
        next(err)
    }
})

router.get("/:id", async (req, res, next)=> {
    try{
        const [id] = req.params.id
        const user = model.findByUserId(id)

        if(!user){
            res.status(401).json({
                message: "There's no user with this id"
            })
        }

         res.status(200).json(user)

    }
    catch(err){
        next(err)
    }
})



router.get("/:id/recipes", async (req, res, next)=> {
    try{

    }
    catch(err){
        next(err)
    }
})

router.post("/:id/recipes", async (req, res, next)=> {
    try{

    }
    catch(err){
        next(err)
    }
})


module.exports = router

