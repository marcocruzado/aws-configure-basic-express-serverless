// tests/Personajes.controllers.test.js
const { CtrlGetPersonajes, CtrlGetPersonaje } = require('../controllers/Personajes.controllers');
const { DynamoDBDocumentClient, ScanCommand, GetCommand } = require("@aws-sdk/lib-dynamodb");

// Mock de DynamoDBDocumentClient y comandos
jest.mock('@aws-sdk/lib-dynamodb', () => {
    const originalModule = jest.requireActual('@aws-sdk/lib-dynamodb');
    return {
        ...originalModule,
        DynamoDBDocumentClient: {
            from: jest.fn().mockReturnValue({
                send: jest.fn()
            })
        },
        ScanCommand: jest.fn(),
        GetCommand: jest.fn()
    };
});

describe('Pruebas para CtrlGetPersonajes y CtrlGetPersonaje', () => {
    let req, res, docClientMock;

    beforeEach(() => {
        req = { params: {} };
        res = {
            json: jest.fn(),
        };
        docClientMock = DynamoDBDocumentClient.from();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('CtrlGetPersonajes', () => {
        it('debería retornar la lista de personajes al llamar a ScanCommand', async () => {
            const mockItems = { Items: [{ id: 1, name: 'Luke Skywalker' }, { id: 2, name: 'Darth Vader' }] };
            docClientMock.send.mockResolvedValueOnce(mockItems);

            await CtrlGetPersonajes(req, res);

            expect(docClientMock.send).toHaveBeenCalledWith(expect.any(ScanCommand));
            expect(res.json).toHaveBeenCalledWith({
                message: 'Lista de personajes de Star Wars',
                personajes: mockItems
            });
        });

        it('debería manejar el error al fallar ScanCommand', async () => {
            const error = new Error('Error de conexión');
            docClientMock.send.mockRejectedValueOnce(error);

            await CtrlGetPersonajes(req, res);

            expect(docClientMock.send).toHaveBeenCalledWith(expect.any(ScanCommand));
            expect(res.json).toHaveBeenCalledWith({
                message: 'Error al obtener los personajes de la base de datos',
                error
            });
        });
    });

    describe('CtrlGetPersonaje', () => {
        it('debería retornar un personaje específico al llamar a GetCommand', async () => {
            const mockItem = {
                Item: {
                    id: 1,
                    name: 'Luke Skywalker'
                }
            };
            docClientMock.send.mockResolvedValueOnce(mockItem);

            req.params.id = 1;
            await CtrlGetPersonaje(req, res);

            expect(docClientMock.send).toHaveBeenCalledWith(expect.any(GetCommand));
            expect(res.json).toHaveBeenCalledWith({
                message: 'Personaje de Star Wars',
                personaje: mockItem
            });

        });
    });
});
