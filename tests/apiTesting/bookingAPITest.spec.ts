import { test, expect } from '@playwright/test'
import pet from '../../testData/pet.json'
import updatePet from '../../testData/updatePet.json'
import booking from '../../testData/booking.json'

test.describe('API Testing - CRUD Methods', () => {
    // let baseURL = 'https://restful-booker.herokuapp.com'
    test('Fetch all bookings', async ({ request }) => {
        const response = await request.get('/booking')
        const resStatus = response.status()
        console.log(resStatus)
        expect(response.status()).toBe(200)
        expect(response.ok()).toBeTruthy()
        const headers = response.headers()
        console.log('Headers.....', headers['content-type'])
        expect(headers['content-type']).toEqual('application/json; charset=utf-8')
        const jsonData = await response.json()
        console.log('JSon data list ....', jsonData)

    })

    test('Fetch  a Pet details', async ({ request }) => {
        const response = await request.get('https://petstore.swagger.io/v2/pet/548661')
        const resStatus = response.status()
        console.log(resStatus)
        expect(response.status()).toBe(200)
        console.log('Status text ...', response.statusText())
        expect(response.ok()).toBeTruthy()
        const headers = response.headers()
        console.log('Headers.....', headers['content-type'])
        // application/json 
        // expect(headers['content-type']).toEqual('application/json; charset=utf-8')
        expect(headers['content-type']).toEqual('application/json')
        const jsonData = await response.json()
        console.log('JSon data list ....', jsonData)
        expect(jsonData.category.name).toBe('kangs name')
        expect(jsonData.tags[0].name).toBe('kangs tag 548661')

    })

    test('Create a new Pet', async ({ request }) => {
        const response = await request.post('https://petstore.swagger.io/v2/pet/',
            {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: pet
            })
        console.log(response.status())
        await expect(response).toBeOK()
        const jsonData = await response.json()
        console.log(await response.json())
        expect(response.status()).toBe(200)
        expect(jsonData.name).toBe('doggie')
        expect(jsonData.category).toHaveProperty('name', 'dog')
        expect(jsonData.tags[1].name).toBe('Golden')
        expect(jsonData).toHaveProperty('name', 'doggie')
        expect(jsonData.status).toContain('available')

    })

    test('Update  Pet details', async ({ request }) => {
        const response = await request.put('https://petstore.swagger.io/v2/pet/',
            {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: updatePet
            })
        console.log(response.status())
        await expect(response).toBeOK()
        const jsonData = await response.json()
        console.log(await response.json())
        expect(response.status()).toBe(200)
        // expect(jsonData.name).toBe('doggie')
        // expect(jsonData.category).toHaveProperty('name', 'dog')
        expect(jsonData.tags[0].name).toBe('kangs tag 548661')
        expect(jsonData).toHaveProperty('name', 'kitty')
        // expect(jsonData.status).toContain('available')

    })

    test('Generate a token', async ({ request }) => {
        let strToken: string
        const response = await request.post('/auth', {
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                "username": "admin",
                "password": "password123"
            }
        })
        const resStatus = response.status()
        const jsonData = await response.json()
        console.log('Token generated.....', jsonData.token)
        strToken = jsonData.token
        const delResponse = await request.delete('/booking/81', {
            headers: {
                'Content-Type': 'application/json',
                'Cookie': 'token=' + strToken
            }
        })
        console.log(delResponse.status())
    })


    test.only('To update booking', async ({ request }) => {
        let token: string
        const response = await request.post('/auth', {
            headers: {
                'Content-Type': 'application/json',

            },
            data: {
                "username": "admin",
                "password": "password123"
            }
        })
        const resBody = await response.json()
        token = resBody.token
        console.log('Token.....', token)
        const responseUpd = await request.put('/booking/832', {
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Cookie': 'token=' + token
            },
            data: booking
        })
        console.log(responseUpd.status(), ' with Status Text', response.statusText())
        const resBodyUpd = await responseUpd.json()
        console.log('JSON Body....', resBodyUpd)
        // expect(resBodyUpd.status()).toBe(200)
        expect(resBodyUpd.booking).toHaveProperty('firstname', 'Anandhi')

    })
    test('Fetch all Users', async ({ request }) => {
        const response = await request.get('https://reqres.in/api/users/4',
            {
                headers: {
                    'x-api-key': 'reqres_e935237c065d40f384fcc759eb86b888'
                }
            }
        )
        const resStatus = response.status()
        console.log(resStatus)
        console.log(await response.json())
    })




})