import './styles/style.css'

let startTime, endTime;
let imageSize = "";
let image = new Image();
let bitSpeed = document.getElementById("bits"),
    kbSpeed = document.getElementById("kbs"),
    mbSpeed = document.getElementById("mbs"),
    info = document.getElementById("info");

let totalBitSpeed = 0;
let totalKbSpeed = 0;
let totalMbSpeed = 0;
let numTests = 1;
let testCompleted = 0;

// pega uma imagem random em unsplash...
let imageApi = "https://source.unsplash.com/random?topic=nature";

// quando a imagem carregar
image.onload = async function () {
    endTime = new Date().getTime();

    // configurar o tamanho da imagem
    await fetch(imageApi).then((response) => {
        imageSize = response.headers.get("content-length");
        calculateSpeed();
    });
};

// Função para calcular a velocidade
function calculateSpeed() {
    // tempo levado em segundos
    let timeDuration = (endTime - startTime) / 1000;
    // total de bits
    let loadedBits = imageSize * 8;
    let speedInBts = loadedBits / timeDuration;
    let speedInKbs = speedInBts / 1024;
    let speedInMbs = speedInKbs / 1024;

    totalBitSpeed += speedInBts;
    totalKbSpeed += speedInKbs;
    totalMbSpeed += speedInMbs;

    testCompleted++;

    // Se todos os testes forem concluídos (obtemos 5 imagens e calculamos a média)
    if (testCompleted === numTests) {
        let averageSpeedInBps = (totalBitSpeed / numTests).toFixed(2);
        let averageSpeedInKbps = (totalKbSpeed / numTests).toFixed(2);
        let averageSpeedInMbps = (totalMbSpeed / numTests).toFixed(2);

        // Mostrar a velocidade
        bitSpeed.innerHTML += `${averageSpeedInBps}`;
        kbSpeed.innerHTML += `${averageSpeedInKbps}`;
        mbSpeed.innerHTML += `${averageSpeedInMbps}`;
        info.innerHTML = "Test Completed!";
    } else {
        // Rodar o Proximo teste
        startTime = new Date().getTime();
        image.src = imageApi;
    }
}

// Função incial para rodar os teste
const init = async () => {
    info.innerHTML = "Testing...";
    startTime = new Date().getTime();
    image.src = imageApi;
};

// rodar os testes quando o windows rodar
window.onload = () => {
    for (let i = 0; i < numTests; i++) {
        init();
    }
};
