import MainRoute from "../../src/routes/main.route"
import App from "../../src/app"
import request from "supertest"

let mainRoute: MainRoute;
let app: App

beforeAll(async () => {
    mainRoute = new MainRoute()
    app = new App([
        mainRoute
    ])
    app.listen()
})

describe('GET /phone/:id', () => {
    it('should return 200 & a phone object if 1 is passed a id in params', async () => {
       
        const response = await request(app.app).get("/api/v1/phone/1")

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty('cellular')
        expect(response.body).toHaveProperty('comparisons')
        expect(response.body).toHaveProperty('storage')

    })

    it('should return 404 & an error message if 0 is passed a id in params', async () => {
       
        const response = await request(app.app).get("/api/v1/phone/0")

        expect(response.statusCode).toBe(404)
        expect(response.body).toMatchObject({ message: 'Phone not found' });

    })
})

describe('GET /search', () => {
    it('should return 400 if no query is parameters is provided', async () => {

        const response = await request(app.app).get("/api/v1/search?")

        expect(response.statusCode).toBe(400)
        expect(response.body).toMatchObject({ message: 'Invalid query data' });

    })
})