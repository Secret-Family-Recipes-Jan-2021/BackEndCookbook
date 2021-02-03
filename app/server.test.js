const supertest = require("supertest")
const server = require("./server")

test("Get /", async ()=> {
    const res = await supertest(server).get("/")
    expect(res.type).toBe("application/json")
    expect(res.body).toBe("Hello World")
})