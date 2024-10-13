# SuresAdmin Frontend

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.0.0-blue)
![Spring Backend](https://img.shields.io/badge/Backend-SpringBoot-green)
![Status](https://img.shields.io/badge/status-In%20Development-orange)

## Descripción

**SuresAdmin** es una aplicación web diseñada para gestionar la administración de productos, clientes y cotizaciones. Este repositorio contiene el frontend del proyecto, implementado en **React** y que consume una API REST desarrollada en **Spring Boot**. 

### Características Principales

- **Gestión de Productos**: Creación, actualización y eliminación de productos, incluyendo la carga y visualización de imágenes.
- **Gestión de Clientes**: Listado, búsqueda, creación y edición de clientes.
- **Módulo de Cotizaciones**: Creación y gestión de cotizaciones para clientes, permitiendo agregar múltiples productos, aplicar descuentos y calcular impuestos.
- **Notificaciones**: Sistema de notificaciones para el seguimiento de inventario mínimo y límites de crédito de los clientes.

## Tabla de Contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Endpoints del API](#endpoints-del-api)
- [Contribución](#contribución)
- [Licencia](#licencia)

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/JesusAnayaMtz/suresadminfront.git

2. Instala las dependencias
   npm install

3. Configura las variables de entorno en un archivo .env para conectar con la API del backend.
   
4. Inicia la aplicación en modo de desarrollo:
   npm start
   La aplicación estará disponible en http://localhost:3000.

## Uso
   Una vez iniciada la aplicación, podrás interactuar con las siguientes funcionalidades:

   Gestión de Productos: Accede al listado de productos, edítalos o agrégalos directamente desde el formulario.
   Gestión de Clientes: Busca clientes, agrégalos o actualiza su información.
   Cotizaciones: Crea cotizaciones para clientes, elige productos, aplica descuentos y visualiza el total calculado con IVA.
   Notificaciones en el Navbar: Revisa alertas de inventario bajo y límites de crédito de clientes.

## Estructura de Proyecto
   ├── src/
│   ├── components/       # Componentes reutilizables del frontend
│   ├── services/         # Servicios para consumir la API del backend
│   ├── views/            # Vistas principales (Clientes, Productos, Cotizaciones)
│   ├── App.js            # Configuración principal de la aplicación
│   └── index.js          # Punto de entrada de la aplicación
└── public/               # Archivos estáticos

## Endpoints del API
   A continuación, algunos de los principales endpoints que utiliza la aplicación:

   /productos: Para gestionar productos (crear, editar, eliminar).
   /clientes: Para gestionar clientes.
   /cotizaciones: Para crear y gestionar cotizaciones.
   /notificaciones: Para recuperar notificaciones de inventario y crédito.

   Nota: Para más detalles sobre los endpoints y cómo se consumen, consulta la documentación del backend: SuresAdmin Backend.

## Contribucion
   Las contribuciones son bienvenidas. Si deseas mejorar alguna funcionalidad o reportar un problema, por favor sigue estos pasos:

   Realiza un fork del proyecto.
   Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
   Realiza tus cambios y commitea (git commit -am 'Agrega nueva funcionalidad').
   Sube tus cambios (git push origin feature/nueva-funcionalidad).
   Crea un Pull Request.

## Licencia
   Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más información.



