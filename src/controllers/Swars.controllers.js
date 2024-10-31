const { SWAPI, DATABASE, SERVER } = require('../config/variables')
//import uuid
const { v4: uuidv4 } = require('uuid');
//import fetch
const fetch = require('node-fetch')
//obtener la conexion a la base de datos
const client = require('../database')
//funcion para insertar un item en la base de datos
const { PutCommand } = require("@aws-sdk/lib-dynamodb");


const CtrlWellcome = (req, res) => {
    res.json({
        message: 'Bienvenido a la API de Star Wars prueba tecnica para Indra',
    })
}

const CtrlGetSwars = async (req, res) => {

    let personajes = []
    let i = 1
    let next = true
    try {
        while (next) {
            const response = await fetch(`${SWAPI.URL}/people/?page=${i}`)
            const people = await response.json()
            people.results.map(person => {
                personajes.push({
                    nombre: person.name,
                    altura: person.height,
                    peso: person.mass,
                    color_cabello: person.hair_color,
                    color_piel: person.skin_color,
                    color_ojo: person.eye_color,
                    año_nacimiento: person.birth_year,
                    genero: person.gender,
                    planeta: person.homeworld,
                    peliculas: person.films,
                    especies: person.species,
                    vehiculos: person.vehicles,
                    naves: person.starships,
                    creado: person.created,
                    editado: person.edited,
                    url: person.url
                })
            }
            )
            i++
            if (people.next == null) {
                next = false
            }
        }

        return res.json({
            message: 'Lista de personajes de Star Wars',
            cantidad: personajes.length,
            personajes
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener los personajes de la base de datos',
            error
        })

    }


}

const CtrlPostSwars = async (req, res) => {
    //vamos a crear a un personaje dentro de la bd solo consultando a la api por el id https://swapi.py4e.com/api/people/1/ 

    const { id } = req.body
    const response = await fetch(`${SWAPI.URL}/people/${id}`)

    const person = await response.json()

    if (person.detail) {
        return res.status(404).json({
            message: 'Personaje no encontrado',
            personaje: null
        })
    }

    const params = {
        TableName: DATABASE.DYNAMODB_TABLE,
        Item: {
            id: uuidv4(),
            nombre: person.name,
            altura: person.height,
            peso: person.mass,
            color_cabello: person.hair_color,
            color_piel: person.skin_color,
            color_ojo: person.eye_color,
            año_nacimiento: person.birth_year,
            genero: person.gender,
            planeta: person.homeworld,
            peliculas: person.films,
            especies: person.species,
            vehiculos: person.vehicles,
            naves: person.starships,
            creado: person.created,
            editado: person.edited,
            url: person.url
        }
    }


    try {
        await client.send(new PutCommand(params))
    
        return res.json({
            message: 'Personaje creado exitosamente',
            personaje: {
                nombre: person.name,
                altura: person.height,
                peso: person.mass,
                color_cabello: person.hair_color,
                color_piel: person.skin_color,
                color_ojo: person.eye_color,
                año_nacimiento: person.birth_year,
                genero: person.gender,
                planeta: person.homeworld,
                peliculas: person.films,
                especies: person.species,
                vehiculos: person.vehicles,
                naves: person.starships,
                creado: person.created,
                editado: person.edited,
                url: person.url
            }
        })
    }
    catch (error) {
        return res.status(500).json({
            message: 'Error al crear el personaje',
            error
        })
    }
}

module.exports = {
    CtrlGetSwars,
    CtrlWellcome,
    CtrlPostSwars
}