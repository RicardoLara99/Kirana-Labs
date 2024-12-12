# Procesador de Guía Telefónica

Este repositorio incluye un archivo CSV que necesitamos procesar y representar en una página web. El archivo CSV contiene datos de una guía telefónica con la siguiente estructura:

- **Nombre**: Nombre de la persona.
- **Correo Electrónico**: Dirección de correo electrónico.
- **Número de Teléfono**: Número de teléfono (debería contener 10 dígitos).

## Funcionalidades

La plataforma permite:

1. **Cargar un archivo CSV**: El usuario puede cargar un archivo CSV con la misma estructura que el incluido en este repositorio.
2. **Visualizar datos en una tabla**: Los valores del CSV se muestran en una tabla interactiva.
3. **Eliminación de líneas duplicadas**: El sistema elimina líneas completamente duplicadas (aquellas que tienen el mismo nombre, correo electrónico y número de teléfono).
4. **Resaltar líneas con datos repetidos**: Las líneas que contienen valores repetidos se resaltan en color rojo.
5. **Resaltar valores no válidos**: Los valores no válidos se resaltan en amarillo:
   - Un correo electrónico no válido.
   - Un número de teléfono no válido (que no tenga exactamente 10 dígitos).
6. **Estadísticas de duplicados**:
   - Muestra el número de líneas con valores duplicados sobre la tabla.
7. **Conteo total de personas**:
   - Muestra el número total de personas únicas en la guía telefónica.

## Tecnologías

- **Framework**: React
- **Herramienta de desarrollo**: Vite

## Instrucciones para ejecutar el proyecto

Sigue estos pasos para configurar y ejecutar el proyecto:

1. **Clonar el repositorio**:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_REPOSITORIO>
   ```

2. **Instalar dependencias**:
   Asegúrate de tener Node.js y npm instalados. Luego ejecuta:
   ```bash
   npm install
   ```

3. **Ejecutar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

4. **Abrir la aplicación en el navegador**:
   Visita [http://localhost:5173](http://localhost:5173) para ver la aplicación en funcionamiento.

5. **Compilar para producción** (opcional):
   Si deseas generar una versión optimizada para producción, ejecuta:
   ```bash
   npm run build
   ```
   Los archivos compilados se encontrarán en el directorio `dist`.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

```
src/
├── assets/         # Archivos estáticos
├── components/     # Componentes React
├── pages/          # Páginas de la aplicación
├── utils/          # Funciones de utilidad (validación, procesamiento de CSV)
├── App.jsx         # Componente principal
└── main.jsx        # Punto de entrada
```

## Contribuir

Si deseas contribuir al proyecto:

1. Haz un fork del repositorio.
2. Crea una rama nueva para tu funcionalidad o corrección:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Realiza tus cambios y haz commit:
   ```bash
   git commit -m "Añadida nueva funcionalidad"
   ```
4. Envía tus cambios al repositorio remoto:
   ```bash
   git push origin feature/nueva-funcionalidad
   ```
5. Abre un Pull Request.

---

¡Gracias por contribuir! 🚀
