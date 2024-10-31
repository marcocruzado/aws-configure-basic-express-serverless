// tests/StarWarsController.test.js
const { CtrlGetSwars, CtrlWellcome, CtrlPostSwars } = require('../controllers/Swars.controllers');
const { PutCommand } = require("@aws-sdk/lib-dynamodb");
const fetch = require('node-fetch');
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

jest.mock('@aws-sdk/lib-dynamodb', () => {
    const originalModule = jest.requireActual('@aws-sdk/lib-dynamodb');
    return {
        ...originalModule,
        DynamoDBDocumentClient: {
            from: jest.fn().mockReturnValue({
                send: jest.fn()
            })
        },
        PutCommand: jest.fn()
    };
});

jest.mock('node-fetch');

describe('Pruebas para CtrlWellcome, CtrlGetSwars y CtrlPostSwars', () => {
    let req, res, docClientMock;

    beforeEach(() => {
        req = { body: {}, params: {} };
        res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        docClientMock = DynamoDBDocumentClient.from();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('CtrlWellcome', () => {
        it('debería retornar el mensaje de bienvenida', () => {
            CtrlWellcome(req, res);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Bienvenido a la API de Star Wars prueba tecnica para Indra'
            });
        });
    });

    describe('CtrlGetSwars', () => {
        it('debería retornar la lista de personajes de la API de Star Wars', async () => {
            const mockResponse = {
                results: [
                    { name: 'Luke Skywalker', height: '172', mass: '77', hair_color: 'blond', skin_color: 'fair', eye_color: 'blue', birth_year: '19BBY', gender: 'male', homeworld: 'Tatooine', films: [], species: [], vehicles: [], starships: [], created: '2023-10-31', edited: '2023-10-31', url: 'url1' }
                ],
                next: null
            };
            fetch.mockResolvedValueOnce({
                json: jest.fn().mockResolvedValueOnce(mockResponse)
            });

            await CtrlGetSwars(req, res);

            expect(fetch).toHaveBeenCalledWith(expect.stringContaining('people/?page=1'));
            expect(res.json).toHaveBeenCalledWith({
                message: 'Lista de personajes de Star Wars',
                cantidad: 1,
                personajes: [
                    {
                        nombre: 'Luke Skywalker',
                        altura: '172',
                        peso: '77',
                        color_cabello: 'blond',
                        color_piel: 'fair',
                        color_ojo: 'blue',
                        año_nacimiento: '19BBY',
                        genero: 'male',
                        planeta: 'Tatooine',
                        peliculas: [],
                        especies: [],
                        vehiculos: [],
                        naves: [],
                        creado: '2023-10-31',
                        editado: '2023-10-31',
                        url: 'url1'
                    }
                ]
            });
        });

        it('debería manejar un error en la API de Star Wars', async () => {
            fetch.mockRejectedValueOnce(new Error('Error al conectar con la API'));

            await CtrlGetSwars(req, res);

            expect(res.json).toHaveBeenCalledWith({
                message: 'Error al obtener los personajes de la base de datos',
                error: expect.any(Error)
            });
        });
    });
});
