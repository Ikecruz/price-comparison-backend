import MainService from "../../src/services/main.service"

let mainService: MainService;

beforeAll(async () => {
    mainService = new MainService()
})

describe('service', () => {
    it('should return an array of phones', async () => {
        const query = {
            keyword: "Samsung"
        }

        const phones = await mainService.search(query);
        expect(Array.isArray(phones)).toBe(true);
        
        phones.forEach(phone => {
            expect(phone).toHaveProperty('id')
            expect(phone).toHaveProperty('cellular')
            expect(phone).toHaveProperty('model')
            expect(phone).toHaveProperty('storage')
        })

    })
})