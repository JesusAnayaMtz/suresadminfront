
# SuresAdmin Frontend

<p align="center">
  <img src="https://user-images.githubusercontent.com/your-image-path/logo.png" alt="SuresAdmin Logo" width="200">
</p>

<p align="center">
  <strong>Gestión de productos, clientes y cotizaciones</strong>
</p>

<p align="center">
  <a href="https://github.com/JesusAnayaMtz/suresadminfront/issues">
    <img src="https://img.shields.io/github/issues/JesusAnayaMtz/suresadminfront" alt="Issues">
  </a>
  <a href="https://github.com/JesusAnayaMtz/suresadminfront/network">
    <img src="https://img.shields.io/github/forks/JesusAnayaMtz/suresadminfront" alt="Forks">
  </a>
  <a href="https://github.com/JesusAnayaMtz/suresadminfront/stargazers">
    <img src="https://img.shields.io/github/stars/JesusAnayaMtz/suresadminfront" alt="Stars">
  </a>
  <a href="https://github.com/JesusAnayaMtz/suresadminfront/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/JesusAnayaMtz/suresadminfront" alt="License">
  </a>
</p>

---

## 📝 Descripción

**SuresAdmin** es una aplicación web diseñada para la administración eficiente de productos, clientes y cotizaciones, proporcionando una solución completa para la gestión comercial. Este proyecto incluye un frontend en **React** que interactúa con una API REST desarrollada en **Spring Boot**.

### ✨ Características Principales

- 🛒 **Gestión de Productos**: CRUD de productos con carga y visualización de imágenes.
- 👥 **Gestión de Clientes**: Búsqueda, edición y creación de clientes.
- 📄 **Cotizaciones**: Gestión de cotizaciones, descuentos y cálculos automáticos de IVA.
- 🔔 **Notificaciones**: Alertas para inventario mínimo y límites de crédito de clientes.

---

## 🚀 Demo

¡Próximamente! (Enlace a la demo si está disponible)

---

## 📦 Instalación

Sigue estos pasos para ejecutar el proyecto localmente:

1. Clona el repositorio:

   ```bash
   git clone https://github.com/JesusAnayaMtz/suresadminfront.git
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Crea un archivo `.env` y añade tus variables de entorno para conectar con el backend.

4. Inicia la aplicación:

   ```bash
   npm start
   ```

   La aplicación estará disponible en `http://localhost:3000`.

---

## 🛠️ Uso

### Funcionalidades principales:

- **Productos**: Administra el catálogo de productos con opciones de edición, eliminación y carga de imágenes.
- **Clientes**: Gestiona los clientes con opciones de búsqueda y edición rápida.
- **Cotizaciones**: Crea cotizaciones dinámicas con múltiples productos y descuentos automáticos.
- **Notificaciones**: Recibe alertas sobre inventario bajo y límites de crédito.

---

## 📂 Estructura del Proyecto

```bash
├── src/
│   ├── components/       # Componentes reutilizables
│   ├── services/         # Lógica para consumir la API
│   ├── views/            # Vistas de la aplicación
│   ├── App.js            # Configuración principal
│   └── index.js          # Punto de entrada
└── public/               # Archivos estáticos
```

---

## 🌐 Endpoints del API

Aquí algunos de los endpoints del backend:

| Método | Endpoint       | Descripción                             |
|--------|----------------|-----------------------------------------|
| GET    | `/productos`   | Obtener lista de productos              |
| POST   | `/productos`   | Crear un nuevo producto                 |
| GET    | `/clientes`    | Obtener lista de clientes               |
| POST   | `/cotizaciones`| Crear una nueva cotización              |
| GET    | `/notificaciones`| Obtener notificaciones de inventario |

Para más detalles, consulta el backend: [SuresAdmin Backend](https://github.com/JesusAnayaMtz/suresadmin.git).

---

## 🤝 Contribución

¡Contribuciones son bienvenidas! Sigue estos pasos para colaborar:

1. Realiza un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y commitea (`git commit -am 'Agrega nueva funcionalidad'`).
4. Sube los cambios (`git push origin feature/nueva-funcionalidad`).
5. Crea un Pull Request.

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](./LICENSE) para más detalles.

---

<p align="center">
  Con ❤️ por <a href="https://github.com/JesusAnayaMtz">Jesus Anaya</a>
</p>
