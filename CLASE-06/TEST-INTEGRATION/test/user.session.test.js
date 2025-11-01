import { expect } from "chai";
import { describe, it, before, after } from "mocha";

import supertest from "supertest";
import mongoose from "mongoose";
import app from "../src/app.js";

mongoose.set("strictQuery", true);

// URL de conexión a la base de datos de testing
const MONGO_URI =
  "mongodb://localhost:27017/integration_testing?directConnection=true";

// Instancia de supertest apuntando a tu servidor
// const request = supertest("http://localhost:8080");
const request = supertest(app);

//* request {} <- es nuestro Servidor Test <----

describe("Testing users Api", function () {
  this.timeout(6000); // Tolerancia de 6 segundos para cada test
  // Variables para usar entre tests
  before(async function () {
    //* ANTES DE TODOS LOS TESTS
    // Conexión a MongoDB antes de correr los tests
    await mongoose
      .connect(MONGO_URI)
      .then(() => {
        console.log("Connected to MongoDB for testing");
      })
      .catch((err) => {
        console.error("Error connecting to MongoDB for testing:", err);
      });
    // Usuario de prueba
    this.mockUser = {
      first_name: "Usuario de prueba 2",
      last_name: "Apellido de prueba 2",
      email: "correodeprueba2@gmail.com",
      password: "123456",
    };
    this.cookie = null;
  });

  after(async function () {
    //* DESPUÉS DE TODOS LOS TESTS
    // Limpia la colección de usuarios después de correr los tests
    await mongoose.connection.collection("users").deleteMany({
      email: this.mockUser.email,
    });

    // Cierra la conexión a MongoDB después de correr todos los tests
    await mongoose.connection.close();
  });

  // Test 01 - Registro de un User
  it("Test Registro Usuario: Debe poder registrar correctamente un usuario", async function () {
    const response = await request
      .post("/api/sessions/register")
      .send(this.mockUser); // Enviamos el usuario de prueba por body
    // console.log("----->", response);
    expect(response.statusCode).to.eql(200);
  });

  // Test 02 - Login de un User
  it("Test Login Usuario: Debe poder hacer login correctamente con el usuario registrado previamente y obtener la cookie", async function () {
    const mockLogin = {
      email: this.mockUser.email,
      password: this.mockUser.password,
    };

    const result = await request.post("/api/sessions/login").send(mockLogin);
    // console.log("result.header: ", result.header);
    /*
    'set-cookie': [
    'coderCookie=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVXN1YXJpbyBkZSBwcnVlYmEgMiBBcGVsbGlkbyBkZSBwcnVlYmEgMiIsInJvbGUiOiJ1c2VyIiwiZW1haWwiOiJjb3JyZW9kZXBydWViYTJAZ21haWwuY29tIiwiaWF0IjoxNzYwNDg1MjkxLCJleHAiOjE3NjA0ODg4OTF9.c4xiBEVG4J9mijyKspFdV1LpCWxjzNYeZYy3j87y7kY; Max-Age=3600; Path=/; Expires=Wed, 15 Oct 2025 00:41:31 GMT'
  ],
    */
    const cookieResult = result.header["set-cookie"][0];
    const cookieData = cookieResult.split("=");
    this.cookie = {
      name: cookieData[0], // -> 'coderCookie'
      value: cookieData[1].split(";")[0],
    };
    expect(this.cookie.name).to.eql("coderCookie");
    expect(this.cookie.value).to.be.ok;
  });
  it("Test Ruta de Mascotas: Debe poder crear una mascota con imagen", async function () {
    // Mock de mascota a crear
    const mockPet = {
      name: "Nemo",
      specie: "Pez",
      birthDate: "10-11-2022",
    };

    // Realiza la petición POST con campos y archivo adjunto
    const result = await request
      .post("/api/pets/withimage")
      .set("Cookie", `${this.cookie.name}=${this.cookie.value}`)
      .field("name", mockPet.name)
      .field("specie", mockPet.specie)
      .field("birthDate", mockPet.birthDate)
      .attach("image", "./test/files/coderDog.jpg");

    expect(result.status).to.be.eql(200);
    expect(result.body.payload).to.have.property("_id");
    expect(result.body.payload.name).to.eql(mockPet.name);
    expect(result.body.payload.image).to.be.ok;
  });
});

/*
request {
  métodos
  routes de nuestra app
}

describe{

    conectado a la base de datos
    mockUser {}
    cookie null 
}


*/
