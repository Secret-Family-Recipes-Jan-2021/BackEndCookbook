const supertest = require("supertest")
const server = require("./server")

test("Get /", async ()=> {
    const res = await supertest(server).get("/")
    expect(res.type).toBe("appllication/json")
})