"use strict";
const Repository = require('../repositories/plantaoRepository');
const plantaoService = require('../services/plantaoService');
const moment = require('moment');

//Definindo o intervalo
const minutos = 3;
const intervalo = minutos * 60 * 1000;

setInterval(() => {
    console.warn(`Monitorando Data --> 
    ${moment().utcOffset('-03:00').format('DD/MM/YYYY - H:mm:ss A')}`);
    monitoraData(moment().utcOffset('-03:00').date()).catch(console.warn);
}, intervalo);

const monitoraData = async (diaAtual) => {

    let plantaoAtual = null;
    let diaPlantao = null;
    const dia = moment().utcOffset('-03:00').day();
    const sabado = 6;
    const domingo = 0;
    const EscalaEnum = Object.freeze({ "semanal": 1, "sabadal": 2, "domingal": 3, })

    //SEMANAL
    if (dia > domingo && dia < sabado) {
        plantaoAtual = await Repository.getByStatusSemanal();
        diaPlantao = moment(plantaoAtual.escalaSemanal).utcOffset('-03:00').date();
        if (diaAtual > diaPlantao) {
            console.debug(`O dia mudou para ${diaAtual}. Alteração do plantão em andamento...`);
            console.debug(`Plantão anterior: ${plantaoAtual.name} alterando para o próximo.`);
            plantaoService.proximoPlantao(EscalaEnum.semanal, plantaoAtual);
            return;
        }
        console.info(`Dia do plantão: ${diaPlantao} *** Dia atual: ${diaAtual}`);

    } //SABADAL 
    else if (dia === sabado) {
        plantaoAtual = await Repository.getByStatusSabadal();
        diaPlantao = plantaoAtual.escalaSabado.getDate();
        if (diaAtual > diaPlantao) {
            console.debug(`O dia mudou para ${diaAtual}. Alteração do plantão em andamento...`);
            console.debug(`Plantão anterior: ${plantaoAtual.name} alterando para o próximo.`);
            plantaoService.proximoPlantao(EscalaEnum.sabadal, plantaoAtual);
            return;
        }
        console.info(`Dia do plantão: ${diaPlantao} *** Dia atual: ${diaAtual}`);

    } //DOMINGAL
    else {
        plantaoAtual = await Repository.getByStatusDomingal();
        diaPlantao = plantaoAtual.escalaDomingo.getDate();
        if (diaAtual > diaPlantao) {
            console.debug(`O dia mudou para ${diaAtual}. Alteração do plantão em andamento...`);
            console.debug(`Plantão anterior: ${plantaoAtual.name} alterando para o próximo.`);
            plantaoService.proximoPlantao(EscalaEnum.domingal, plantaoAtual);
            return;
        }
        console.info(`Dia do plantão: ${diaPlantao} *** Dia atual: ${diaAtual}`);
    }
}

module.exports = app => app.use(monitoraData);

