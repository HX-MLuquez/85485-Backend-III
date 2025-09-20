# 🌐 Guía para Configurar un Entorno Kubernetes con Minikube en Windows

## 🧰 Herramientas Requeridas

### 1. Verificar `curl`

```bash
curl --version
```

### 2. Instalar `curl` con Chocolatey (si no está instalado)

Instalar [Chocolatey](https://chocolatey.org/install) y luego:

```bash
choco install curl
```

---

### 3. Instalar la CLI de Kubernetes (`kubectl`)

```bash
curl.exe -LO "https://dl.k8s.io/release/v1.25.0/bin/windows/amd64/kubectl.exe"
```

### Verificación

```bash
kubectl version
kubectl help
```

---

## ⚙️ Tecnología para Ambiente Kubernetes

### ➤ Desarrollo Local

**Minikube**
[Documentación Oficial - Instalación](https://minikube.sigs.k8s.io/docs/start/?arch=%2Fwindows%2Fx86-64%2Fstable%2F.exe+download)

> Descargar e instalar el último release del instalador para Windows.

### ➤ Producción

**k3s**
Ideal para entornos de producción livianos.

---

## 🚀 Iniciar el Entorno Local con Minikube

```bash
minikube start
```

Verificar servicios disponibles:

```bash
minikube service list
```

---

## 📡 Información del Clúster

```bash
kubectl cluster-info
```

Ejemplo de salida:

```
Kubernetes control plane is running at https://127.0.0.1:60661
CoreDNS is running at https://127.0.0.1:60661/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
```

---

## 📦 Desplegar Aplicación en Kubernetes

### 1. Crear el manifiesto `.yaml`

Define tu despliegue y servicio en un archivo `kube-users.yaml`.

### 2. Aplicar el manifiesto

```bash
kubectl apply -f kube-users.yaml
```

### 3. Exponer el servicio

```bash
minikube service app-users-create-service
# o para obtener solo la URL:
minikube service app-users-create-service --url
```

🔑 **Este comando es clave** para que Minikube exponga el servicio.

- Expone servicios de tipo `NodePort` o `LoadBalancer`.
- Solo funciona con Minikube (no en entornos Kubernetes en la nube).

---

## 📊 Verificar Recursos

### Obtener información

```bash
kubectl get pods
kubectl get deployments
kubectl get services
```

---

## 📌 Ejemplo de Estado del Clúster

### 🔧 Services

```
NAME                        TYPE           CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE
app-users-create-service   LoadBalancer   10.101.122.144   <pending>     80:32178/TCP     4h21m
```

### 🚀 Deployments

```
NAME                        READY   UP-TO-DATE   AVAILABLE   AGE
app-users-create-deployment   5/5     5            5           4h20m
```

### 📦 Pods

```
NAME                                              READY   STATUS    RESTARTS   AGE
app-users-create-deployment-c64777c97-dqztj       1/1     Running   1          4h18m
app-users-create-deployment-c64777c97-lgwj2       1/1     Running   1          4h18m
app-users-create-deployment-c64777c97-mtmt9       1/1     Running   1          4h18m
app-users-create-deployment-c64777c97-ndj9s       1/1     Running   1          4h18m
app-users-create-deployment-c64777c97-w4nvf       1/1     Running   1          4h18m
```

---

## 📝 Notas Finales

- Este entorno es ideal para desarrollo local y pruebas con Minikube.
- Asegurate de tener los puertos correctamente mapeados y utilizar `minikube service <nombre>` para abrir el servicio en tu navegador.

```

---


---


---


Docker build -> del Dockerfile -> imagen
Docker run -> de la imagen -> container 

Logger de nuestron contenedores
Docker ps -a     log de mi container
Docker images    los de mi imagen
Docker volumes   los volumes 