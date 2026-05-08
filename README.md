![](https://github.com/sabrinaceciliajeria-cmyk/RefugioAnimales/raw/main/screenshot-1775781823.png)

# 🎮 RPG System - JavaScript

Sistema RPG en consola desarrollado con JavaScript puro (Node.js) como parte de un challenge de práctica de programación.

---

## 🧠 Descripción del proyecto

El reino de JavaScriptia está siendo atacado por monstruos.

Este sistema permite crear y administrar un jugador, interactuar con enemigos y manejar un inventario mediante un menú en consola.

El objetivo es aplicar conceptos fundamentales de JavaScript como objetos, arrays, funciones, loops y manipulación de datos.

---

🚀 Tecnologías y herramientas utilizadas
Node.js → entorno de ejecución de JavaScript en consola
JavaScript (ES Modules) → lógica principal del sistema RPG
prompt-sync → interacción con el usuario por terminal
chalk → estilización de texto en consola (colores y efectos)
fs (File System de Node.js) → guardado y carga de partidas en archivos (save.json)
JSON → almacenamiento de datos del juego
ASCII Art → representación visual en consola del juego y enemigos

---

## 📦 Instalación

Clona el repositorio:
git clone https://github.com/tu-usuario/rpg-system.git

Entra al proyecto:
cd rpg-system

Instala dependencias:
npm install

Ejecuta el proyecto:
node app.js

---

## 🎮 Funcionalidades principales

👤 Sistema de jugador:
- Crear personaje con nombre, nivel, HP, ataque y arma
- Ver estadísticas completas
- Curarse sin superar HP máximo
- Atacar enemigos con daño aleatorio

🎒 Inventario:
- Agregar items con push()
- Eliminar items con pop()
- Ver inventario completo

👾 Sistema de enemigos:
- Agregar enemigos dinámicamente
- Buscar enemigos con find()
- Filtrar enemigos fuertes con filter()
- Mostrar nombres en mayúsculas con map()

---

## 📊 Menú interactivo

El sistema funciona con un menú en consola usando do...while:

1. Ver jugador  
2. Atacar  
3. Curarse  
4. Agregar item  
5. Ver inventario  
6. Agregar enemigo  
7. Ver enemigos  
8. Buscar enemigo  
9. Filtrar enemigos fuertes  
10. Mostrar nombres MAYÚSCULAS  
0. Salir  

---

## 🧠 Conceptos aplicados

- Variables y tipos de datos  
- Objetos  
- Arrays y arrays de objetos  
- Funciones y métodos personalizados  
- Constructor function  
- Loops (for, while, do while)  
- Condicionales  
- Métodos de arrays (push, pop, find, filter, map)  
- Math.random()  
- typeof  
- Conversión de tipos (Number, parseInt, parseFloat)  
- Template literals  
- Interacción con terminal (prompt-sync)  

---

## 📂 Estructura del proyecto

rpg-system/
- app.js  
- package.json  
- README.md  

---


## ⚙️ package.json

{
  "type": "module",
  "dependencies": {
    "prompt-sync": "^4.2.0"
  }
}

---

## 👥 Autores

 Arantxa Fischer
 Manuel Labrador
 Cristian Díaz
 Cristopher Contreras
 Natalia Medel
 Diego Peña
 Sabrina Jeria
```

