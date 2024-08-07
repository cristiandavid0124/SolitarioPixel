const botonEmpezarJuego = document.querySelector(".empezar");

const mazo = [];
let barajado = [];
const pilas = [];
const tipos = ["corazon", "diamante", "trebol", "espada"];
const colores = {
    corazon: "rojo",
    diamante: "rojo",
    trebol: "negro",
    espada: "negro"  // Asegúrate de que todos los tipos están correctos
};

const crearMazo = () => {
    for (let i = 1; i <= 13; i++) {
        for (let j = 0; j < tipos.length; j++) {
            const carta = {
                numero: i,
                color: colores[tipos[j]],
                tipo: tipos[j],
                img: `img/${i}_de_${tipos[j]}.png`
            };
            mazo.push(carta);
        }
    }
};

const mezclarMazo = () => {
    barajado = mazo.map(carta => ({ carta, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ carta }) => carta);
};

const servir = () => {
    for (let i = 0; i < 7; i++) {
        pilas.push([]);
        for (let j = 0; j < i + 1; j++) {
            const primeraCarta = barajado.shift();  // Asegúrate de usar shift() correctamente
            pilas[i].push(primeraCarta);
        }
    }
};

const ponerCartasEnLasPilas = () => {
    for (let i = 0; i < pilas.length; i++) {
        const pilaElement = document.querySelector(`#pila-${i}`);
        if (pilaElement) {  // Verifica que el elemento exista
            for (let j = 0; j < pilas[i].length; j++) {
                const carta = pilas[i][j];
                const cartaHtml = document.createElement("div");
                const imagen = document.createElement("img");
                imagen.src = carta.img;
                cartaHtml.appendChild(imagen);
                pilaElement.appendChild(cartaHtml);
            }
        } else {
            console.error(`Elemento con ID pila-${i} no encontrado.`);
        }
    }
};

botonEmpezarJuego.onclick = () => {
    crearMazo();
    mezclarMazo();
    servir();
    ponerCartasEnLasPilas();
};
