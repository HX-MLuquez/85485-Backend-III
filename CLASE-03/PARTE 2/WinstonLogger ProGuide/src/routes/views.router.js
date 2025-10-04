import { Router } from "express";
import CharactersManager from "../manager/characters.manager.js";

export const router = Router();

//* IMPORTANTE: El logger en nuestras ROUTES se debe usar en cada endpoint, y lo obtenemos del req (request)
//* porque lo inyectamos en el middleware logger. Lo obtenemos con: req.logger.grave - warn - info - leve

// Instanciamos el gestor de personajes
const charactersManager = new CharactersManager();

// Ruta de inicio (vista: home)
router.get("/", (req, res) => {
  req.logger.info("Bienvenidos al Home");
  res.status(200).render("home");
});

// Ruta para mostrar los personajes (vista: characters)
router.get("/characters", (req, res) => {
  try {
    const characters = charactersManager.getCharacters();
    res.status(200).render("characters", { characters });
  } catch (error) {
    // console.error("Error al obtener personajes:", error.message);
    req.logger.grave("Error al obtener personajes:", error.message);
    res.status(500).send("Error interno del servidor");
  }
});
