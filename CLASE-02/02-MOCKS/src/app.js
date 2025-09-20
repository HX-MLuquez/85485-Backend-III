import express from "express";
import { generateProducts, generateClient } from "./utils/index.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const styleGlobal = `
  body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        color: #333;
        display: flex;
        flex-direction: column;
        align-items: center;}
  button {
        background-color: #4CAF50;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;}
        button:hover {
        background-color: #45a049;}
  ul {
      background-color: #fff;
      border-radius: 4px;
      padding: 10px;}
  li {
      list-style-type: none;}`;

app.get("/", (req, res) => {
  // res.send("hola mundo");
  res.send(`
    <html>
      <head>
        <title>Cliente</title>
      </head>
      <style>
        ${styleGlobal}
      </style>
      <body>
        <h1>Generador de Datos (Mocks)</h1>
        <h2>Cliente</h2>
        <button onclick="window.location.href='/api/client'">Generar Cliente</button>
        <h2>Productos</h2>
        <button onclick="window.location.href='/api/products'">Generar Productos</button>
      </body>
    </html>
  `);
});

app.get("/api/products", (req, res) => {
  try {
    let products = generateProducts();
    // res.status(200).json(products);
    res.send(`
        <html>
          <head>
            <title>Productos</title>
            <style>
             ${styleGlobal}
          </style>
          </head>
          <body>
            <h1>Productos</h1>
            <ul>
              ${products
                .map(
                  (product) =>
                    `<li>${product.name} - $${product.price} - Cantidad: ${product.quantity}</li>`
                )
                .join("")}
            </ul>
            <button onclick="window.location.href='/'">Volver</button>
          </body>
        </html>
      `);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/api/client", (req, res) => {
  try {
    let client = generateClient();
    // res.status(200).json(client);
    const cliente = generateClient();
    // res.status(200).json(cliente);
    res.send(`
      <html>
        <head>
          <title>Cliente</title>
          <style>
           ${styleGlobal}
        </style>
        </head>
        <body>
          <h1>Cliente</h1>
          <p>Nombre: ${cliente.firstName} ${cliente.lastName}</p>
          <p>Email: ${cliente.email}</p>
          <p>DNI: ${cliente.dni}</p>
          <h2>Productos</h2>
          <ul>
            ${cliente.products
              .map((product) => `<li>${product.name} - $${product.price}</li>`)
              .join("")}
          </ul>
          <button onclick="window.location.href='/'">Volver</button>
        </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default app;
