# CLUSTER

- Para correr el proyecto en WSL2 UBUNTU

```bash
cd /mnt/c/Users/mauuu/OneDrive/Escritorio/CODERHOUSE/74610\ BACK-III\ MARTES\ 19-00/74610\ Back-III\ CLASE/CLASE-04
```

- Para ver los cpu en windows
```bash
ctrl + shift + esc
```
  - Vamos a 'Rendimiento' y luego a 'Monitores de CPU'

Es un conjunto de nodos que trabajan juntos para ejecutar aplicaciones. Un clúster puede ser un grupo de servidores físicos o virtuales que trabajan juntos para proporcionar alta disponibilidad, escalabilidad y rendimiento. Los clústeres se utilizan comúnmente en entornos de producción para ejecutar aplicaciones críticas y garantizar que estén siempre disponibles.

- Test de carga con Artillery

* npm start (desde teminal Linux)
* artillery run config.yml --output resultadoBruteHash.json
* artillery report resultadoBruteHash.json -o informeRegistroBruteHash.html

- Clustering con Node.js
  Este test permite observar cómo se distribuye la carga entre los procesos hijos
  El plugin metrics-by-endpoint te da métricas detalladas por ruta

- Cortar un worker (desde nueva terminal Linux)
  ps aux | grep node
  kill numberPID

- Info General

* `cluster.isPrimary`
  Determina si el proceso actual es el **principal**, el cual se encarga de crear los **workers** (procesos hijos).

* `cluster.fork()`
  Crea un nuevo proceso (worker) que ejecuta el mismo archivo. Cada uno tendrá su propia instancia del servidor.

* `cluster.on('disconnect')`
  Detecta cuando un worker falla o se cierra, y permite regenerarlo automáticamente.

* `visitas++`
  Este contador está en el espacio de memoria del **worker**, por lo tanto **no se comparte entre procesos**.
  Cada worker llevará su propio conteo.

---

- Consideraciones Importantes

- Si necesitás **compartir estado** (como el contador de visitas) entre workers, deberías usar Redis,
  una base de datos, o comunicación IPC (inter-process communication).
- En entornos como Docker o DigitalOcean App Platform, **no siempre es necesario usar `cluster`**,
  ya que el entorno ya escala procesos por contenedor/pod.
