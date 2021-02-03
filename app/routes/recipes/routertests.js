const supertest = require("supertest")
const server = require("../../server")

const recipeTests = () => {
    it("doesn't get recipes", async ()=> {
        const res = await supertest(server).get("/recipes")
        expect(res.status).toBe(400)
        expect(res.body.message).toBe("token required")
    })
};

module.exports = recipeTests;
