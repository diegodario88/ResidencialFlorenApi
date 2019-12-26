const Repository = require('../repositories/plantaoRepository');
const plantaoService = require('../services/plantaoService');

exports.monitorData = async function (id, tipo) {

    const result = await Repository.findByID(id);
    let diaPlantao = null;

    if (tipo === 1) {
        diaPlantao = result.escalaSemanal.getDate();

    } else if (tipo === 2) {
        diaPlantao = result.escalaSabado.getDate();

    } else {
        diaPlantao = result.escalaDomingo.getDate();

    }

    const verificaData = async function (diaAtual) {

        if (diaAtual !== diaPlantao) {
            console.info('dia mudou para ' + diaAtual);
            console.warn(plantaoAtual);
            plantaoService.proximoPlantao();
        }
        return console.info('dia continua o mesmo do plantão ' + diaPlantao);
    }
    const minutes = 1;
    const interval = minutes * 60 * 1000;

    setInterval(function () {
        console.warn('Monitorando Data -->');

        verificaData(new Date().getDate()).catch(console.warn);
    }, interval);

}
