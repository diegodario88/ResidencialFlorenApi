const Repository = require('../repositories/plantaoRepository');
const plantaoService = require('../services/plantaoService');

const verificaData = async (diaAtual) => {

    let result = null;
    const dia = plantaoService.diaAtualSemana();
    const sabado = 6;

    let diaPlantao = null;

    //SEMANAL
    if (dia > 0 && dia < sabado) {
        result = await Repository.getByStatusSemanal();
        diaPlantao = result.escalaSemanal.getDate();
        if (diaAtual > diaPlantao) {
            console.info(`O dia mudou para ${diaAtual}. Alteração do plantão em andamento...`);
            console.info(`Plantão anterior: ${result.name} alterando para o próximo.`);
            plantaoService.proximoPlantao();
        }
        return console.warn(`Dia do plantão: ${diaPlantao} *** Dia atual: ${diaAtual}`);

    } //SÁBADAL 
    else if (dia === sabado) {
        result = await Repository.getByStatusSabadal();
        diaPlantao = result.escalaSabado.getDate();
        if (diaAtual > diaPlantao) {
            console.info(`O dia mudou para ${diaAtual}. Alteração do plantão em andamento...`);
            console.info(`Plantão anterior: ${result.name} alterando para o próximo.`);
            plantaoService.proximoPlantao();
        }
        return console.warn(`Dia do plantão: ${diaPlantao} *** Dia atual: ${diaAtual}`);

    } //DOMINGAL
    else {
        result = await Repository.getByStatusDomingal();
        diaPlantao = result.escalaDomingo.getDate();
        if (diaAtual > diaPlantao) {
            console.info(`O dia mudou para ${diaAtual}. Alteração do plantão em andamento...`);
            console.info(`Plantão anterior: ${result.name} alterando para o próximo.`);
            plantaoService.proximoPlantao();
        }
        return console.info('dia continua o mesmo do plantão ' + diaPlantao);
    }
}

//Definindo o intervalo
const minutes = 1;
const interval = minutes * 60 * 3000;

(setInterval(function () {
    console.warn('Monitorando Data -->');
    verificaData(new Date().getDate()).catch(console.warn);
}, interval));

module.exports = app => app.use(verificaData);