"use strict";
const Repository = require('../repositories/plantaoRepository');
const plantaoService = require('../services/plantaoService');
const moment = require('moment');

//Definindo o intervalo
const minutos = 120;
const intervalo = minutos * 60 * 1000;

setInterval(() => {
    console.warn(`Monitorando --> 
    Data atual: ${moment().utcOffset('-03:00').format('DD/MM/YYYY - H:mm:ss A')}`);
    const diaAtual = moment().utcOffset('-03:00');
    monitorThread(diaAtual).catch(console.warn);
}, intervalo);

const monitorThread = async (diaAtual) => {

    const EscalaEnum = Object.freeze({ "semanal": 1, "sabadal": 2, "domingal": 3, })
    let plantaoAtual = null;
    const dia = diaAtual.day();
    const sabado = 6, domingo = 0;

    //SEMANAL
    if (dia > domingo && dia < sabado) {
        plantaoAtual = await Repository.getByStatusSemanal();
        const { escalaSemanal } = plantaoAtual;
        checkDate(plantaoAtual, diaAtual, EscalaEnum.semanal, escalaSemanal);

    } //SABADAL 
    else if (dia === sabado) {
        plantaoAtual = await Repository.getByStatusSabadal();
        const { escalaSabado } = plantaoAtual;
        checkDate(plantaoAtual, diaAtual, EscalaEnum.sabadal, escalaSabado);

    } //DOMINGAL
    else {
        plantaoAtual = await Repository.getByStatusDomingal();
        const { escalaDomingo } = plantaoAtual;
        checkDate(plantaoAtual, diaAtual, EscalaEnum.domingal, escalaDomingo);
    }
}

const checkDate = (plantaoAtual, diaAtual, EscalaEnum, dataEscala) => {
    const diaPlantao = moment(dataEscala).utcOffset('-03:00');

    if (diaAtual.year() > diaPlantao.year() || diaAtual.dayOfYear() > diaPlantao.dayOfYear()) {
        //Troca plantão
        logInfo(plantaoAtual.name, diaAtual)
        return plantaoService.getNextGroup(EscalaEnum, plantaoAtual);
    }
    console.info(`Data do plantão: ${diaPlantao.format('DD/MM/YYYY - H:mm:ss A')}`);

}

const logInfo = (name, diaAtual) => {
    console.info(`O dia mudou para ${diaAtual.format('DD/MM/YYYY')}. Alteração do plantão em andamento...`);
    console.info(`Plantão anterior: ${name} alterando para o próximo.`);
}

module.exports = { monitorThread };

