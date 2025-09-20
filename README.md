# 📚 Programación Backend III: Testing y Escalabilidad Backend

**Comisión 85485**  
**Profesor:** Mauricio Gastón Lúquez  
**TA:** Walter Maza  
📅 **Inicio:** 20/09/2025  
🕒 **Horario:** Sábados de 11:30 a 13:30 hs  
🖥️ **Modalidad:** Virtual (Zoom)  
📦 [Formulario de presentación](https://forms.gle/axNtzw6XGbAfqiHW9)  
📁 [Repositorio del curso](https://github.com/HX-MLuquez/85485-Backend-III.git)

---

## 🛠️ Herramientas y Plataformas

- **Zoom:** Plataforma principal para clases en vivo
- **GitHub:** Repositorio con material, ejemplos y entregas
- **Coderhouse:** Gestión académica y seguimiento del curso

---

## 🧭 Objetivo del Curso

Formar desarrolladores backend capaces de construir aplicaciones escalables, testeables y listas para producción. Se abordarán herramientas modernas como Docker, PM2, Swagger, Artillery, y frameworks de testing como Jest y Chai.

---

## 📅 Calendario de Clases

| Clase        | Temas Principales                                                                                                      |
| ------------ | ---------------------------------------------------------------------------------------------------------------------- |
| **Clase 01** | Variables de entorno, `process`, `child_process`, uso de `dotenv`, argumentos en CLI, y presentación de conceptos      |
| **Clase 02** | Testing con TDD, mocks, introducción a Jest, PM2 y compresión de respuestas                                            |
| **Clase 03** | Gestión de paquetes con NPM/Yarn, uso de NVM, servidor básico, introducción a Artillery y Winston Logger               |
| **Clase 04** | Contenedores con Docker, orquestación con Kubernetes, instalación y configuración de clusters                          |
| **Clase 05** | Seguridad backend: vulnerabilidades OWASP, documentación con Swagger, y manejo de recursos                             |
| **Clase 06** | Testing avanzado: unitario con TDD, integración, comparación Jest vs Chai, visualización con gráficos                  |
| **Clase 07** | Backend con NestJS, integración con MongoDB, uso de TypeScript en proyectos reales                                     |
| **Clase 08** | Práctica integradora: estructura profesional con `src`, `test`, `.env`, `.gitignore`, y preparación para Dockerización |

---

## 🧪 Proyecto Final: Dockerizando Nuestro Backend

### 🎯 Objetivos Generales

- Aplicar mejoras finales al proyecto
- Dockerizar la aplicación
- Documentar y testear de forma profesional

### 📌 Entregables

- Documentación Swagger del módulo **Users**
- Tests funcionales completos para `adoption.router.js`
- Dockerfile funcional y reproducible
- Imagen subida a DockerHub con enlace público
- README con instrucciones claras de uso

### ✅ Criterios de Evaluación

| Área                  | Requisitos                                                              |
| --------------------- | ----------------------------------------------------------------------- |
| **Tests Funcionales** | Cobertura total de endpoints, casos de éxito y error                    |
| **Dockerfile**        | Instalación de dependencias, configuración de entorno, reproducibilidad |
| **DockerHub**         | Imagen accesible públicamente, link en README                           |
| **Documentación**     | Instrucciones para construir, ejecutar y testear el proyecto            |

---

## 📦 Estructura Recomendada del Proyecto Final

```
PRACTICA-INTEGRADORA/
├── src/
│   └── ... (código fuente)
├── test/
│   └── ... (tests funcionales)
├── .env.dev
├── .env.prod
├── .gitignore
├── Dockerfile
├── README.md
```

---

## 🧭 Cómo Ejecutar el Proyecto con Docker

```bash
# Construir la imagen
docker build -t adoptme-backend .

# Ejecutar el contenedor
docker run -p 3000:3000 adoptme-backend

# Acceder a la API
http://localhost:3000/api
```

📌 [Imagen en DockerHub](https://hub.docker.com/tu-enlace-aqui)  
📌 Swagger disponible en `/api-docs`

---
