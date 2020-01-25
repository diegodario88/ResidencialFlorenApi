"use strict";
const Repository = require('../repositories/plantaoRepository');
const plantaoService = require('../services/plantaoService');
const moment = require('moment');
const twitterService = require('./twitterService');
const printService = require('./API-Flash/printService');

//Definindo o intervalo
const minutes = 120;
const interval = minutes * 60 * 1000;

setInterval(() => {
    console.warn(`Monitorando --> 
    Data atual: ${moment().utcOffset('-03:00').format('DD/MM/YYYY - H:mm:ss A')}`);
    const diaAtual = moment().utcOffset('-03:00');
    monitorThread(diaAtual).catch(console.warn);
}, interval);

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

const checkDate = async (plantaoAtual, diaAtual, EscalaEnum, dataEscala) => {
    const diaPlantao = moment(dataEscala).utcOffset('-03:00');

    if (diaAtual.year() > diaPlantao.year() || diaAtual.dayOfYear() > diaPlantao.dayOfYear()) {
        //Troca plantão
        logInfo(plantaoAtual.name, diaAtual)

        plantaoService.getNextGroup(EscalaEnum, plantaoAtual);
        printService.printScrenn();

        return
    }

    console.info(`Data do plantão: ${diaPlantao.format('DD/MM/YYYY - H:mm:ss A')}`);

    if (diaAtual.hours() >= 18 && diaAtual.hours() <= 21) {
        postTweet(plantaoAtual);
    }
}

const postTweet = (plantaoAtual) => {

    const altTtext = `${plantaoAtual.farmacias[0].name}
    ${plantaoAtual.farmacias[1].name}`;

    twitterService.makeTweet(altTtext);
}

const logInfo = (name, diaAtual) => {
    console.info(`O dia mudou para ${diaAtual.format('DD/MM/YYYY')}. Alteração do plantão em andamento...`);
    console.info(`Plantão anterior: ${name} alterando para o próximo.`);
}

module.exports = { monitorThread };

