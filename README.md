Trabajo Práctico – Consumo de The Simpsons API con TypeScript

-  Objetivo
El objetivo de este trabajo práctico fue crear una pequeña aplicación web que consuma la API de Los Simpsons para mostrar personajes con sus imágenes y frases. El desarrollo se hizo usando TypeScript, HTML y CSS, aplicando conceptos de tipado, manejo de promesas y fetch API.

-  Configuración del proyecto
1. Inicializar npm
npm init -y
Este comando crea el archivo package.json, que guarda los datos del proyecto y las dependencias.
2. Instalar TypeScript
npm install typescript --save-dev
Se usa --save-dev porque TypeScript solo se necesita en desarrollo, ya que el navegador trabaja con el código compilado a JavaScript.
3. Compilar el proyecto
npm run build
Esto traduce los archivos .ts a .js dentro de la carpeta dist/.
4. Modo automático (watch)
npm run watch
Compila de nuevo cada vez que se guarda un cambio.

-  Estructura del proyecto
simpsons-api-project/
│
├── src/
│   ├── main.ts          
│   └── styles.css       
│
├── dist/
│   └── main.js          
│
├── index.html           
├── package.json
└── tsconfig.json

-  API utilizada
URL base: https://thesimpsonsapi.com/api/characters

Esta API devuelve un listado de personajes con su información. Para evitar errores de CORS, se usó el proxy público AllOrigins.

URL final usada en el proyecto:
https://api.allorigins.win/raw?url=https://thesimpsonsapi.com/api/characters

Ejemplo de respuesta:
{
  "id": 1,
  "name": "Homer Simpson",
  "occupation": "Safety Inspector",
  "phrases": ["D'oh!", "Woo-hoo!"],
  "portrait_path": "/character/1.webp"
}

- Lógica del proyecto (main.ts)
El archivo main.ts contiene toda la lógica de la app:

- Interfaces:
  - SimpsonCharacter → define la estructura de un personaje.
  - IResponseApi → define cómo viene la respuesta completa de la API.

- Funciones principales:
  - fetchCharacters() → hace la petición a la API usando async/await.
  - renderCharacters() → genera las tarjetas dinámicas con los datos.
  - showLoading() / hideLoading() → manejan el estado de carga.
  - showError() → muestra errores por pantalla por unos segundos.

- Event listener:
  El botón “Cargar Personajes” ejecuta fetchCharacters() al hacer clic.
  
  -  Interfaz HTML
El sitio cuenta con:
- Un header con título y descripción.
- Un botón para cargar personajes.
- Un spinner de carga.
- Una sección para mostrar las tarjetas con imágenes, nombre, ocupación y frase.
- Un footer con enlace a la documentación de la API.
🧠 Configuración de TypeScript
Algunas opciones importantes del tsconfig.json:
- "target": "ES2020" → versión del JS generado.
- "strict": true → activa el modo estricto de tipado.
- "outDir": "./dist" → carpeta donde se guardan los archivos compilados.
- "rootDir": "./src" → carpeta donde está el código fuente.
🚀 Cómo ejecutar el proyecto
1. Compilar TypeScript a JavaScript:
   npm run build
2. Abrir el archivo index.html (de preferencia con Live Server).
3. Hacer clic en el botón “Cargar Personajes” para traer los datos.
4. Si ocurre un error, se muestra un mensaje temporal en pantalla.
📸 Vista de la aplicación
- Inicio: muestra el título y el botón para cargar personajes.
- Durante la carga: aparece el texto “Cargando personajes...” con un spinner.
- Resultado: se renderizan las tarjetas con imagen, nombre, edad, ocupación y una frase.
