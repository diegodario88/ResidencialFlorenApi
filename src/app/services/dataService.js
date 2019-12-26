const Repository = require('../repositories/plantaoRepository');
const plantaoService = require('../services/plantaoService');

exports.buscaDataPlantao = async function (id, tipo) {
    const result = await Repository.findByID(id);
    let diaPlantao = null;
    let plantaoAtual = null;

    if (tipo === 1) {
        diaPlantao = result.escalaSemanal.getDate();
        plantaoAtual = await Repository.getByStatusSemanal();
    } else if (tipo === 2) {
        diaPlantao = result.escalaSabado.getDate();
        plantaoAtual = await Repository.getByStatusSabadal();
    } else {
        diaPlantao = result.escalaDomingo.getDate();
        plantaoAtual = await Repository.getByStatusDomingal();
    }

    const verificaData = async function (diaAtual) {

        if (diaAtual !== diaPlantao) {
            console.info('dia mudou para ' + diaAtual);
            console.warn(plantaoAtual);
            plantaoService.proximoPlantao(plantaoAtual);
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
