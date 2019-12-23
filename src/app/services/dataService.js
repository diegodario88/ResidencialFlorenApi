exports.armazenaDiaPlantao = function (dataPlantaoAtual) {
    TODO://construir um date no formato pt br

    diaPlantaoAtual = new Date(dataPlantaoAtual).getDate();
    console.log(`Armazenado dia ${diaPlantaoAtual} para comparação. `);
    return diaPlantaoAtual;
}

const verificaData = async function (diaAtual) {

    const diaPlantao = armazenaDiaPlantao;

    if (diaAtual != diaPlantao) {
        return console.info('dia mudou para ' + diaAtual);
    }
    return console.info('dia continua o mesmo do plantão ' + diaPlantao);
}
const minutes = 1;
const interval = minutes * 60 * 1000;

// setInterval(function () {

//     verificaData(new Date().getDate()).catch(console.log);
// }, interval);