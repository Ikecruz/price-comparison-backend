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

    it('should return an array of not more than 10 phones when limit is set to 10', async () => {
        const query = {
            keyword: "Galaxy",
            limit: 10
        }

        const phones = await mainService.search(query);
        expect(Array.isArray(phones)).toBe(true);

        phones.forEach(phone => {
            expect(phone).toHaveProperty('id')
            expect(phone).toHaveProperty('cellular')
            expect(phone).toHaveProperty('model')
            expect(phone).toHaveProperty('storage')
        })

        expect(phones.length).toBeLessThanOrEqual(10);

    })
})