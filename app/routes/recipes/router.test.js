const supertest = require("supertest")
const db = require("../../../data/dbConfig")
const server = require("../../server")

// beforeEach(async ()=> {
//     await db.seed.run()
// })

// afterAll(async ()=> {
//     await db.destroy()
// })

describe("get recipes", ()=> {
    it("doesn't get recipes", async ()=> {
        const res = await supertest(server).get("/recipes")
        expect(res.status).toBe(400)
        expect(res.body.message).toBe("token required")
    })
})