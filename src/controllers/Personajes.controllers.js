const { DATABASE } = require('../config/variables')
//obtener la conexion a la base de datos
const client = require('../database')
//funcion para insertar un item en la base de datos
const { ScanCommand,GetCommand,DynamoDBDocumentClient} = require("@aws-sdk/lib-dynamodb");



const docClient = DynamoDBDocumentClient.from(client);


const CtrlGetPersonajes = async (req, res) => {

    //obtener los personajes de la base de datos de dynamodb    
    const params = {
        TableName: DATABASE.DYNAMODB_TABLE,
    };
    const command = new ScanCommand(params);
    try {
        const response = await docClient.send(command);
        res.json({
            message: 'Lista de personajes de Star Wars',
            personajes: response
        });
    } catch (error) {
        console.error(error);
        res.json({
            message: 'Error al obtener los personajes de la base de datos',
            error
        });
    }

}


const CtrlGetPersonaje = async (req, res) => {
    const { id } = req.params;
    const params = {
        TableName: DATABASE.DYNAMODB_TABLE,
        Key: {
            id: id
        }
    };
    const command = new GetCommand(params);
    try {
        const response = await docClient.send(command);
        res.json({
            message: 'Personaje de Star Wars',
            personaje: response
        });
    } catch (error) {
        console.error(error);
        res.json({
            message: 'Error al obtener el personaje de la base de datos',
            error
        });
    }
}





module.exports = {
    CtrlGetPersonajes,
    CtrlGetPersonaje
}