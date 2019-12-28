"use strict";
const Repository = require('../repositories/plantaoRepository');
const plantaoService = require('../services/plantaoService');

exports.diaAtualSemana = () => {
    Date.prototype.addHours = function (value) {
        this.setHours(this.getHours() + value);
    }
    const date = new Date();
    date.addHours(-3);
    return date.getDay();
}

const verificaData = async (diaAtual) => {

    let plantaoAtual = null;
    let diaPlantao = null;
    const dia = this.diaAtualSemana();
    const sabado = 6;
    const EscalaEnum = Object.freeze({ "semanal": 1, "sabadal": 2, "domingal": 3, })

    //SEMANAL
    if (dia > 0 && dia < sabado) {
        plantaoAtual = await Repository.getByStatusSemanal();
        diaPlantao = plantaoAtual.escalaSemanal.getDate();
        if (diaAtual > diaPlantao) {
            console.info(`O dia mudou para ${diaAtual}. Alteração do plantão em andamento...`);
            console.info(`Plantão anterior: ${plantaoAtual.name} alterando para o próximo.`);
            plantaoService.proximoPlantao(EscalaEnum.semanal, plantaoAtual);
        }
        return console.warn(`Dia do plantão: ${diaPlantao} *** Dia atual: ${diaAtual}`);

    } //SÁBADAL 
    else if (dia === sabado) {
        plantaoAtual = await Repository.getByStatusSabadal();
        diaPlantao = plantaoAtual.escalaSabado.getDate();
        if (diaAtual > diaPlantao) {
            console.info(`O dia mudou para ${diaAtual}. Alteração do plantão em andamento...`);
            console.info(`Plantão anterior: ${plantaoAtual.name} alterando para o próximo.`);
            plantaoService.proximoPlantao(EscalaEnum.sabadal, plantaoAtual);
        }
        return console.warn(`Dia do plantão: ${diaPlantao} *** Dia atual: ${diaAtual}`);

    } //DOMINGAL
    else {
        plantaoAtual = await Repository.getByStatusDomingal();
        diaPlantao = plantaoAtual.escalaDomingo.getDate();
        if (diaAtual > diaPlantao) {
            console.info(`O dia mudou para ${diaAtual}. Alteração do plantão em andamento...`);
            console.info(`Plantão anterior: ${plantaoAtual.name} alterando para o próximo.`);
            plantaoService.proximoPlantao(EscalaEnum.domingal, plantaoAtual);
        }
        return console.info('dia continua o mesmo do plantão ' + diaPlantao);
    }
}

//Definindo o intervalo
const minutos = 1;
const intervalo = minutos * 60 * 2000;

(setInterval(function () {
    console.warn('Monitorando Data -->');
    verificaData(new Date().getDate()).catch(console.warn);
}, intervalo));

