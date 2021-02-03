const supertest = require("supertest")
const server = require("../app/server")

const usertests = () => {
    it("gets a list of users", async ()=> {
        const res = await supertest(server).get("/users")
        expect(res.type).toBe("application/json")
        expect(res.body.length).toBeGreaterThanOrEqual(5)
        expect(res.body[0].username).toBe("jameskirk")
    })

    it("creates a new user", async ()=> {
        const res = await supertest(server)
            .post("/users/register")
            .send({"username": "Spock", "password": "abc123"})
        expect(res.statusCode).toBe(201)
        expect(res.body.username).toBe("Spock")
    })
};

module.exports = usertests;
