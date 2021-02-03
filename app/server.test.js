const supertest = require("supertest")
const server = require("./server")
const db = require('../data/dbConfig')

const userTests = require("../routesAnna/routertests")
const recipeTests = require('./routes/recipes/routertests')

beforeEach(async ()=> {
    await db.seed.run()
})

afterAll(async ()=> {
    await db.destroy()
})

test("Get /", async ()=> {
    const res = await supertest(server).get("/")
    expect(res.type).toBe("application/json")
    expect(res.body).toBe("Hello World")
})

describe("users tests", userTests)
describe("recipes tests", recipeTests)
