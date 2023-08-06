const app=require("./index.js");
//SuperTest is a Node.js library that helps in testing APIs. It extends another library called superagent, 
//a JavaScript HTTP client for Node.js and the browser. 
const supertest=require("supertest");
const {describe, it} = require("jest-circus");
const request=supertest(app);


describe("/test endpoint",()=>{
    it("Should return a response", async()=>{
        const response=  await request.get('/test');
        expect(response.status).toBe(200);
        expect(response.text).toBe("Yes the test endpoint worked");
    })
})


