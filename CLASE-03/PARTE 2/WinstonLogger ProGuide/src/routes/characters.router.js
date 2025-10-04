import { Router } from "express";
export const router = Router();
import CharactersManager from "../manager/characters.manager.js";

const charactersManager = new CharactersManager();

//* IMPORTANTE: El logger se debe usar en cada endpoint, y lo obtenemos del req (request)
//* porque lo inyectamos en el middleware logger. Lo obtenemos con: req.logger.grave - warn - info - leve

//* Testear con Postman: GET http://localhost:8080/api/characters
router.get("/", (req, res) => {
  let characters;
  try {
    characters = charactersManager.getCharacters();

    //* Manera en usar nuestro Middelware logger que creamos en /config/logger.js
    req.logger.info(`Se recibieron ${characters.length} personajes`);
    res.status(200).json({ characters });
  } catch (error) {
    req.logger.grave("No se completó el name");
    console.log(error.message);
  }
});

const defaultImage =
  "https://upload.wikimedia.org/wikipedia/commons/e/ea/Star_Wars_Identities_%288348847356%29.jpg";
// Endpoint para crear un nuevo personaje (character)
router.post("/", (req, res) => {
  // Siempre responder con Content-Type: application/json
  res.setHeader("Content-Type", "application/json");

  // Extraemos las propiedades relevantes del body
  // Se requiere al menos "name" y opcionalmente se pueden incluir "homeworld", "species" e "image"
  const { name, homeworld, species, image = defaultImage } = req.body;

  // Validación: "name" es obligatorio
  if (!name) {
    req.logger.grave("El campo 'name' es requerido.");
    req.logger.info(`Datos recibidos: ${JSON.stringify(req.body)}`);
    return res
      .status(400)
      .json({ error: "La propiedad 'name' es obligatoria." });
  }

  //* Validar que "name" debe ser un string
  if (typeof name !== "string") {
    req.logger.grave("El campo 'name' debe ser un string.");
    req.logger.info(`Datos recibidos: ${JSON.stringify(req.body)}`);
    return res
      .status(400)
      .json({ error: "La propiedad 'name' debe ser un string." });
  }

  // Lista de propiedades permitidas, adaptada al nuevo esquema
  const allowedProperties = ["name", "homeworld", "species", "image"];
  const requestProperties = Object.keys(req.body);

  // Verificamos que todas las propiedades del body estén permitidas
  const arePropertiesValid = requestProperties.every((prop) =>
    allowedProperties.includes(prop)
  );
  if (!arePropertiesValid) {
    return res.status(400).json({
      error: "Propiedades ingresadas no válidas.",
      allowed: allowedProperties,
    });
  }

  // Obtenemos la lista actual de personajes (se asume que existe un charactersManager)
  const characters = charactersManager.getCharacters();

  // Buscamos si ya existe un personaje con el mismo "name" (comparación sin distinguir mayúsculas/minúsculas)
  const duplicate = characters.find(
    (char) => char.name.trim().toLowerCase() === name.trim().toLowerCase()
  );
  if (duplicate) {
    req.logger.grave(
      `El personaje con el nombre '${name}' ya existe en la base de datos.`
    );
    return res.status(400).json({
      error: `El personaje con el nombre '${name}' ya existe en la base de datos.`,
    });
  }

  // Se determina un nuevo id:
  // Si existen personajes, el nuevo id es el último id + 1; de lo contrario, se asigna 1.
  const newId =
    characters.length > 0 ? characters[characters.length - 1].id + 1 : 1;

  // Se arma el objeto del nuevo personaje, agregando valores por defecto si es necesario
  const newCharacter = {
    id: newId,
    name,
    homeworld: homeworld || "desconocido", // Si no se pasa, se asigna "desconocido"
    species: species || "desconocido", // Si no se pasa, se asigna "desconocido"
    image,
  };

  // Se crea el personaje mediante el gestor (se asume que createCharacter persiste y retorna el objeto creado)
  const createdCharacter = charactersManager.createCharacter(newCharacter);

  // Se responde con el personaje creado y estado 201 (Created)
  req.logger.info(`Personaje creado: ${JSON.stringify(createdCharacter)}`);
  return res.status(201).json({ payload: createdCharacter });
});

/*
Testear con Postman:
POST http://localhost:8080/api/characters
{
    "name": "Hancito", 
    "homeworld": "Lejisimo", 
    "species": "un mix de varios"
}

* Testear ERROR LOG:
POST http://localhost:8080/api/characters
{
    "homeworld": "mamamia", 
    "species": "otro mix de varios"
}
*/
