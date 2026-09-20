# Pokémon React Project

An interactive Pokémon-themed web application built with React,
featuring a Game Boy Advance-inspired interface, trainer information, a
Pokémon party, and a Pokédex powered by the PokéAPI.

## Screenshots

### Overworld

**Desktop**

<img src="/src/assets/screenshots/overworld-desktop.png" width="600">

**Mobile**

<img src="/src/assets/screenshots/overworld-mobile.png" width="220">

### Trainer Card

<img src="/src/assets/screenshots/trainer-card.png" width="600">

### Pokémon Party

<img src="/src/assets/screenshots/pokemon-party.png" width="600">

### Pokédex

**Desktop**

<img src="/src/assets/screenshots/pokedex-desktop.png" width="600">

**Mobile**

<img src="/src/assets/screenshots/pokedex-mobile.png" width="220">

## Features

-   Pokémon-inspired interactive overworld
-   Trainer profile and trainer card
-   Pokémon party with selectable Pokémon
-   Pokédex containing the first 151 Pokémon
-   Pokémon search functionality
-   Pokémon data retrieved from the PokéAPI
-   Responsive desktop and mobile layouts
-   Background music and interactive UI elements
-   Game-inspired dialogue and menu navigation

## Technologies

-   React
-   JavaScript
-   CSS
-   Vite
-   PokéAPI
-   Netlify

## Project Structure

``` text
src/
├── assets/
│   ├── images
│   └── audio/
├── components/
│   ├── Overworld.jsx
│   ├── PokedexModal.jsx
│   ├── PokemonModal.jsx
│   ├── StartMenu.jsx 
│   └── TrainerModal.jsx 
├── data/
│   └── pokemonData.js
├── App.jsx
├── main.jsx
└── index.css
```

## Main Components

### Overworld

The main interactive environment of the application. It contains the
Pokémon-inspired background, trainer character, dialogue system, music
controls, and menu navigation.

### Start Menu

Provides navigation to the main sections of the application:

-   Pokédex
-   Pokémon
-   Trainer

### Trainer

Displays the trainer's profile information, including their name,
academic information, trainer ID, motto, social links, and badges.

### Pokémon

Displays the trainer's six-Pokémon party. Users can select individual
Pokémon to view their level, HP, gender, and type information.

### Pokédex

Retrieves Pokémon information from the PokéAPI and displays the first
151 Pokémon. Users can search the Pokédex and view additional
information about a selected Pokémon.

## React Concepts Demonstrated

This project was developed to practice several fundamental React and
JavaScript concepts, including:

-   React components
-   Props
-   `useState`
-   `useEffect`
-   Event handling
-   Conditional rendering
-   Array `.map()`
-   Asynchronous API requests
-   Dynamic rendering of API data
-   Responsive CSS layouts

## API

Pokémon data is provided by [PokéAPI](https://pokeapi.co/).

The project retrieves information from the API and dynamically renders
Pokémon data within the Pokédex interface.

## Purpose

This project was created as an academic React project for Web Development to practice
building an interactive web application using component-based
development, state management, API integration, event handling, and
responsive design.

The visual interface is inspired by the Pokémon games of the Game Boy
Advance era while using original project content and implementation.

## Deployment

The application is deployed using Netlify.

## Author

**Norielle John D. Buhawe**

BS Computer Science Student

------------------------------------------------------------------------

*This project was created for academic purposes.*