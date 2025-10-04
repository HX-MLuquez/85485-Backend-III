# YARN (manejador de paquetes de NODE)
```bash
yarn --version
```
1.22.22

Instalación
npm install -g yarn

yarn -v

Para iniciar un proyecto

yarn init

yarn init -y

Para instalar dependencias usamos ADD

yarn add express

Para desinstalar una dependencia usamos remove
yarn remove nombre_paquete

---

En Yarn el '.lock' es uno diferente propio de yarn

## Guía de comandos principales de Yarn

| Comando                      | Descripción                                                                |
| ---------------------------- | -------------------------------------------------------------------------- |
| `yarn init`                  | Crea un nuevo archivo `package.json`                                       |
| `yarn add paquete`           | Instala una dependencia                                                    |
| `yarn add paquete --dev`     | Instala una dependencia como de desarrollo                                 |
| `yarn remove paquete`        | Elimina una dependencia                                                    |
| `yarn install`               | Instala todas las dependencias listadas en `package.json`                  |
| `yarn upgrade`               | Actualiza todas las dependencias a su última versión respetando los rangos |
| `yarn upgrade paquete`       | Actualiza una dependencia específica                                       |
| `yarn run script`            | Ejecuta un script definido en `package.json`                               |
| `yarn list`                  | Lista todas las dependencias instaladas                                    |
| `yarn cache clean`           | Limpia la caché de Yarn                                                    |
| `yarn global add paquete`    | Instala una dependencia globalmente                                        |
| `yarn global remove paquete` | Elimina una dependencia global                                             |

**IMPORTANTE no mezclar NPM con YARN**
