const shoeImage = document.getElementById("shoeImage");
const shoeName = document.getElementById("shoeName");
const body = document.body;

const shoes = {
    "blue": { image: "bleumarine.png", name: "JORDEN BLUE", bg: "blue" },
    "white": { image: "whitechoes.png", name: "JORDEN WHITE", bg: "#F5EEDC"},
    "red": { image: "redchoes.png", name: "JORDEN RED", bg: "rgb(105, 5, 5)" },
    "green": { image: "greenchoes.png", name: "JORDEN GREEN", bg: "green" },
    "blueclaire": { image: "bleuclaureshoes.png", name: "JORDEN BLUE CLAIRE", bg: "rgb(0, 153, 255)" }
};

// Tableau des couleurs dans l'ordre
const colorOrder = ["blue", "white", "red", "green", "blueclaire"];
let currentIndex = 4; // Index initial pour bleuclaire

function changeShoe(color) {
    if (shoes[color]) {
        const newImage = document.createElement("img");
        newImage.src = shoes[color].image;
        newImage.alt = shoes[color].name;
        newImage.classList.add("shoe-img");
        newImage.style.position = "absolute";
        newImage.style.opacity = "0";
        newImage.style.animation = "fadeInDown 0.5s forwards";

        const oldImage = shoeImage;
        oldImage.style.animation = "fadeOutUp 0.5s forwards";

        setTimeout(() => {
            shoeImage.src = shoes[color].image;
            shoeImage.alt = shoes[color].name;
            shoeName.textContent = shoes[color].name;
            body.style.backgroundColor = shoes[color].bg;
            oldImage.style.opacity = "1";
            oldImage.style.animation = "";
        }, 500);
    }
}

// Fonction pour changer vers la chaussure suivante
function nextShoe() {
    currentIndex = (currentIndex + 1) % colorOrder.length;
    const nextColor = colorOrder[currentIndex];
    changeShoe(nextColor);
    updateActiveButton();
}

// Fonction pour changer vers la chaussure précédente
function previousShoe() {
    currentIndex = (currentIndex - 1 + colorOrder.length) % colorOrder.length;
    const prevColor = colorOrder[currentIndex];
    changeShoe(prevColor);
    updateActiveButton();
}

// Mettre à jour le bouton de couleur actif
function updateActiveButton() {
    const colorButtons = document.querySelectorAll(".color button");
    colorButtons.forEach(button => {
        button.classList.remove("active");
        if (button.getAttribute("data-color") === colorOrder[currentIndex]) {
            button.classList.add("active");
        }
    });
}

// Ajouter les événements pour les boutons de navigation
document.querySelector(".icon button:first-child").addEventListener("click", previousShoe);
document.querySelector(".icon button:last-child").addEventListener("click", nextShoe);

// Ajouter les événements pour les boutons de couleur
document.querySelectorAll(".color button").forEach(button => {
    button.addEventListener("click", function () {
        const color = this.getAttribute("data-color");
        currentIndex = colorOrder.indexOf(color);
        changeShoe(color);
        updateActiveButton();
    });
});
