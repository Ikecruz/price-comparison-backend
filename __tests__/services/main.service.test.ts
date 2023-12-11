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
        expect(Array.isArray(phones.data)).toBe(true);
        
        phones.data.forEach(phone => {
            expect(phone).toHaveProperty('id')
            expect(phone).toHaveProperty('cellular')
            expect(phone).toHaveProperty('model')
            expect(phone).toHaveProperty('storage')
        })

    })

    it('should return valid pagination pointers (prev, next) when page is set to 2', async () => {
        const query = {
            keyword: "Galaxy",
            page: 2
        }

        const phones = await mainService.search(query);
        
        expect(phones.prev).toBe(1)
        expect(phones.next).toBe(3)

        phones.data.forEach(phone => {
            expect(phone).toHaveProperty('id')
            expect(phone).toHaveProperty('cellular')
            expect(phone).toHaveProperty('model')
            expect(phone).toHaveProperty('storage')
        })

    })
})