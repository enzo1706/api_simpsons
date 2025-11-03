"use strict";
const API_URL = "https://api.allorigins.win/raw?url=https://thesimpsonsapi.com/api/characters";
const loadButton = document.getElementById("loadBtn");
const characterContainer = document.getElementById("characters");
const loadingSection = document.getElementById("loading");
const errorDiv = document.getElementById("error");
function showLoading() {
    loadingSection.style.display = "block";
    errorDiv.style.display = "none";
}
function hideLoading() {
    loadingSection.style.display = "none";
}
function showError(message) {
    errorDiv.textContent = message;
    errorDiv.style.display = "block";
    setTimeout(() => (errorDiv.style.display = "none"), 5000);
}
function createCharacterCard(character) {
    const card = document.createElement("div");
    card.className = "character-card";
    const img = document.createElement("img");
    img.src = `https://cdn.thesimpsonsapi.com/500${character.portrait_path}`;
    img.alt = character.name;
    const name = document.createElement("h3");
    name.textContent = character.name;
    const occupation = document.createElement("p");
    occupation.textContent = character.occupation;
    const age = document.createElement("p");
    age.textContent = `Edad: ${character.age}`;
    const phrase = document.createElement("p");
    phrase.textContent = character.phrases[Math.floor(Math.random() * character.phrases.length)] || "";
    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(occupation);
    card.appendChild(age);
    card.appendChild(phrase);
    return card;
}
function renderCharacters(characters) {
    characterContainer.innerHTML = "";
    characters.forEach((char) => {
        const card = createCharacterCard(char);
        characterContainer.appendChild(card);
    });
}
async function fetchCharacters() {
    try {
        showLoading();
        const response = await fetch(API_URL);
        if (!response.ok)
            throw new Error("Error al obtener los personajes");
        const data = await response.json();
        renderCharacters(data.results);
    }
    catch (error) {
        console.error(error);
        showError("No se pudieron cargar los personajes 😢");
    }
    finally {
        hideLoading();
    }
}
loadButton.addEventListener("click", fetchCharacters);
