const Repository = require('../repositories/plantaoRepository');
const plantaoService = require('../services/plantaoService');

const verificaData = async (diaAtual) => {

    let result = null;
    const dia = plantaoService.diaAtualSemana();
    const sabado = 6;

    let diaPlantao = null;

    if (dia > 0 && dia < sabado) {
        result = await Repository.getByStatusSemanal();
        diaPlantao = result.escalaSemanal.getDate();
        if (diaAtual > diaPlantao) {
            console.info('dia mudou para ' + diaAtual);
            plantaoService.proximoPlantao();
        }
        return console.warn(`Dia do Plantão: ${diaPlantao} *** Dia atual: ${diaAtual}`);

    } else if (dia === sabado) {
        result = await Repository.getByStatusSabadal();
        diaPlantao = result.escalaSabado.getDate();
        if (diaAtual !== diaPlantao) {
            console.info('dia mudou para ' + diaAtual);
            console.warn(diaPlantao);
            plantaoService.proximoPlantao();
        }
        return console.info('dia continua o mesmo do plantão ' + diaPlantao);

    } else {
        result = await Repository.getByStatusDomingal();
        diaPlantao = result.escalaDomingo.getDate();
        if (diaAtual !== diaPlantao) {
            console.info('dia mudou para ' + diaAtual);
            console.warn(diaPlantao);
            plantaoService.proximoPlantao();
        }
        return console.info('dia continua o mesmo do plantão ' + diaPlantao);
    }
}

const minutes = 1;
const interval = minutes * 60 * 1000;

(setInterval(function () {
    console.warn('Monitorando Data -->');
    verificaData(new Date().getDate()).catch(console.warn);
}, interval));
