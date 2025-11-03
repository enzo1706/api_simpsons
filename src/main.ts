    interface SimpsonCharacter {
    id: number;
    age: number;
    birthdate: string;
    gender: string;
    name: string;
    occupation: string;
    portrait_path: string;
    phrases: string[];
    status: string;
    }

    interface IResponseApi {
    count: number;
    next: string | null;
    prev: string | null;
    pages: number;
    results: SimpsonCharacter[];
    }

    const API_URL = "https://api.allorigins.win/raw?url=https://thesimpsonsapi.com/api/characters";

    const loadButton = document.getElementById("loadBtn") as HTMLButtonElement;
    const characterContainer = document.getElementById("characters") as HTMLDivElement;
    const loadingSection = document.getElementById("loading") as HTMLDivElement;
    const errorDiv = document.getElementById("error") as HTMLDivElement;

    function showLoading(): void {
    loadingSection.style.display = "block";
    errorDiv.style.display = "none";
    }

    function hideLoading(): void {
    loadingSection.style.display = "none";
    }

    function showError(message: string): void {
    errorDiv.textContent = message;
    errorDiv.style.display = "block";
    setTimeout(() => (errorDiv.style.display = "none"), 5000);
    }

    function createCharacterCard(character: SimpsonCharacter): HTMLElement {
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

    function renderCharacters(characters: SimpsonCharacter[]): void {
    characterContainer.innerHTML = "";
    characters.forEach((char) => {
        const card = createCharacterCard(char);
        characterContainer.appendChild(card);
    });
    }

    async function fetchCharacters(): Promise<void> {
    try {
        showLoading();
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al obtener los personajes");

        const data: IResponseApi = await response.json();
        renderCharacters(data.results);
    } catch (error) {
        console.error(error);
        showError("No se pudieron cargar los personajes 😢");
    } finally {
        hideLoading();
    }
    }

    loadButton.addEventListener("click", fetchCharacters);
