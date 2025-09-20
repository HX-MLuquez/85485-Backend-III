# DEPLOY by RENDER

## Enlace al repositorio

https://github.com/HX-MLuquez/app-integrador-deploy

## GIT + GITHUB

```bash
git init
```

```bash
git remote add origin https://github.com/HX-MLuquez/app-integrador-deploy.git
git branch -M main
```

```bash
git add .
git commit -m "init app"
git push -u origin main
```

```bash
git checkout -b feature/login
git push origin feature/login
```

```bash
git checkout -b develop
git push origin develop
```

```bash
git checkout -b qa
git push origin qa
```

---

## RENDER

- Deploy PRODUCTION

  - new Web Service
  - -> Vinculamos al repositorio https://github.com/HX-MLuquez/app-integrador-deploy
  - -> START -> npm run strat:prod
  - -> BRANCH -> Branch **main**
  - -> .ENV -> Agregamos las variables de entorno propias del entorno **PRODUCTION** (con su propia Base de Datos)
  - -> y Desplegar

- Deploy QA
  - new Web Service
  - -> Vinculamos al repositorio https://github.com/HX-MLuquez/app-integrador-deploy
  - -> START -> npm run strat:prod
  - -> BRANCH -> Branch **qa**
  - -> .ENV -> Agregamos las variables de entorno propias del entorno **QA** (con su propia Base de Datos)
  - -> y Desplegar

---

## Trabajando en ENTORNOS DIFERENTES

### Ejemplo de FLOW de trabajo en nuestro diferentes entornos

- -> desde branch DEVELOP -> git checkout -b feature/login

#### Tenemos el trabajo nuevo terminado en desarrollo sobre 'feature/login'

```bash
git add .
git commit -m "Implement new title"
git push origin feature/login
```

```bash
git checkout develop
git merge feature/login
git push origin develop
```

- **Testean en entorno desarrollo la nueva funcionalidad 'feature/login'**
- **Dan el OK!!!**

#### Llevar al entorno 'QA'

- Desde branch 'develop' -> a la branch 'qa'

```bash
git checkout qa
git merge develop
git push origin qa
```

**Si en nuestra instancia (VM en la nube) no se realizó el Auto-Deploy lo hacemos nosotros de manera manual**

- En RENDER -> MANUAL DEPLOY <- En nuestro entorno 'qa'

  - Testean la app en el entorno de calidad (qa)
  - Le dan el OK!!!

#### Llevar a 'PRODUCTION' <- actualizar la main

- Desde branch 'qa' -> a la branch 'main'

```bash
git checkout main
git merge qa
```

- Crear el TAG (una etiqueta - marca -versión)
  - git tag v1.0.2
  - git push origin v1.0.2
  - git push origin main || o un pull request desde arriba entre 'main' <-> y 'qa'

**En RENDER -> MANUAL DEPLOY <- En nuestro entorno 'production'**

- Testeo en production
- Enjoy!!!

- Por último emparejamos la rama 'qa' con la rama 'main' (para que ambas esten iguales)
  - git checkout qa
  - git pull origin main
  - git push origin qa

---

#### Y Repetimos el FLOW - con una nueva tarea para un desarrollador "x"

- -> desde branch DEVELOP -> git checkout -b feature/calendar

#### Tenemos el trabajo nuevo terminado en desarrollo sobre 'feature/calendar'

nest g resource calendar

... ... etc ...

```bash
git add .
git commit -m "Implement new calendar"
git push origin feature/calendar
```

```bash
git checkout develop
git merge feature/calendar
git push origin develop
```

- **Testean en entorno desarrollo la nueva funcionalidad 'feature/calendar'**
- **Dan el OK!!!**

#### Llevar al entorno 'QA'

- Desde branch 'develop' -> a la branch 'qa'

```bash
git checkout qa
git merge develop
git push origin qa
```

**Si en nuestra instancia (VM en la nube) no se realizó el Auto-Deploy lo hacemos nosotros de manera manual**

- En RENDER -> MANUAL DEPLOY <- En nuestro entorno 'qa'

  - Testean la app en el entorno de calidad (qa)
  - Le dan el OK!!!

#### Llevar a 'PRODUCTION' <- actualizar la main

- Desde branch 'qa' -> a la branch 'main'

```bash
git checkout main
git merge qa
```

- Crear el TAG (una etiqueta - marca -versión)

  - git tag v1.0.2
  - git push origin v1.0.2
  - git push origin main || o un pull request desde arriba entre 'main' <-> y 'qa'

- En RENDER -> MANUAL DEPLOY <- En nuestro entorno 'production'

  - Testeo en production
  - Enjoy!!!

- Por último emparejamos la rama 'qa' con la rama 'main' (para que ambas esten iguales)
  - git checkout qa
  - git pull origin main
  - git push origin qa

---

**LOOP INFINITY**
