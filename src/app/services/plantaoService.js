"use strict";
const dataService = require('../services/dataService');
const Repository = require('../repositories/plantaoRepository');
const ContadorRepository = require('../repositories/contadorRepository');

exports.atualizaDadosPlantao = async function (plantaoAnterior, plantaoAtual, escala) {

    try {
        //Corrigi data para UTC -3
        Date.prototype.addHours = function (value) {
            this.setHours(this.getHours() + value);
        }
        let date = new Date();
        date.addHours(-3);

        console.log(`
            Atualizando dados --> 
            Data: ${date} 
            Escala: ${escala}
            _____________

            Plantão anterior: ${plantaoAnterior.name}
            Plantão atual: ${plantaoAtual.name}
       
            `);

        switch (escala) {
            case 1:
                await Repository
                    .updatePlantao({ _id: plantaoAnterior._id }, { statusSemanal: false }
                        , { upsert: true, new: true });
                console.debug(`Atualizando status semanal do plantão anterior ${plantaoAnterior.name}`);

                await Repository
                    .updatePlantao(
                        { _id: plantaoAtual._id }, { escalaSemanal: date, statusSemanal: true }
                        , { upsert: true, new: true });
                console.debug(`Atualizando data e status semanal do novo plantão ${plantaoAtual.name}`);
                break;

            case 2:
                await Repository
                    .updatePlantao({ _id: plantaoAnterior._id }, { statusSabado: false }
                        , { upsert: true, new: true });
                console.debug(`Atualizando status sabadal do plantão anterior ${plantaoAnterior.name}`);

                await Repository
                    .updatePlantao(
                        { _id: plantaoAtual._id }, { escalaSabado: date, statusSabado: true }
                        , { upsert: true, new: true });
                console.debug(`Atualizando data e status sabadal do novo plantão ${plantaoAtual.name}`);
                break;

            case 3:
                await Repository
                    .updatePlantao({ _id: plantaoAnterior._id }, { statusDomingo: false }
                        , { upsert: true, new: true });
                console.debug(`Atualizando status domingal do plantão ${plantaoAnterior.name}`);

                await Repository
                    .updatePlantao(
                        { _id: plantaoAtual._id }, { escalaDomingo: date, statusDomingo: true }
                        , { upsert: true, new: true });
                console.debug(`Atualizando data e status domingal do novo plantão ${plantaoAtual.name}`);
                break;

            default:
                break;
        }

    } catch (err) {
        return ({ error: 'Ops surgiu um erro enquanto tentava atualizar os dados do plantão!' });
    }
}

exports.proximoPlantao = async function (escala, plantaoAtual) {
    try {

        const GrupoEnum = Object.freeze({ "inicioGrupo": 1, "ultimoGrupo": 13 })

        switch (escala) {
            case 1:
                //Semanal
                const idSemanal = '5e06e91a1c9d440000ad44f0';
                let resultSemanal = await ContadorRepository.findById(idSemanal);
                let contadorSemanal = resultSemanal.iterador;

                if (contadorSemanal <= GrupoEnum.ultimoGrupo) {
                    const numeroProximoPlantao = contadorSemanal + 1;
                    await ContadorRepository
                        .updateContador({ _id: idSemanal }, { iterador: numeroProximoPlantao }, { upsert: true, new: true });

                    const proximoPlantao = await Repository.getByNumber(numeroProximoPlantao);
                    this.atualizaDadosPlantao(plantaoAtual, proximoPlantao, escala);
                    console.debug('Próximo plantão semanal encontrado, passando dados para atualização...');

                } else {
                    await ContadorRepository
                        .updateContador({ _id: idSemanal }, { iterador: GrupoEnum.inicioGrupo }, { upsert: true, new: true });

                    const proximoPlantao = await Repository.getByNumber(numeroProximoPlantao);
                    this.atualizaDadosPlantao(plantaoAtual, proximoPlantao, escala);
                    console.debug('Plantão incial semanal encontrado, passando dados para atualização...');
                }

                break;
            case 2:
                //Sábado
                const idSabadal = '5e06e9571c9d440000ad44f1';
                let resultSabadal = await ContadorRepository.findById(idSabadal);
                let contadorSabadal = resultSabadal.iterador;

                if (contadorSabadal <= GrupoEnum.ultimoGrupo) {
                    const numeroProximoPlantao = contadorSabadal + 1;
                    await ContadorRepository
                        .updateContador({ _id: idSabadal }, { iterador: numeroProximoPlantao }, { upsert: true, new: true });

                    const proximoPlantao = await Repository.getByNumber(numeroProximoPlantao);
                    this.atualizaDadosPlantao(plantaoAtual, proximoPlantao, escala);
                    console.info('Próximo plantão sabadal encontrado, passando dados para atualização...');

                } else {
                    await ContadorRepository
                        .updateContador({ _id: idSabadal }, { iterador: GrupoEnum.inicioGrupo }, { upsert: true, new: true });

                    const proximoPlantao = await Repository.getByNumber(numeroProximoPlantao);
                    this.atualizaDadosPlantao(plantaoAtual, proximoPlantao, escala);
                    console.info('Plantão incial sabadal encontrado, passando dados para atualização...');
                }
                break;

            case 3:
                //Domingo
                const idDomingal = '5e06e97d1c9d440000ad44f2';
                let resultDomingal = await ContadorRepository.findById(idDomingal);
                let contadorDomingal = resultDomingal.iterador;

                if (contadorDomingal <= GrupoEnum.ultimoGrupo) {
                    const numeroProximoPlantao = contadorDomingal + 1;
                    await ContadorRepository
                        .updateContador({ _id: idDomingal }, { iterador: numeroProximoPlantao }, { upsert: true, new: true });

                    const proximoPlantao = await Repository.getByNumber(numeroProximoPlantao);
                    this.atualizaDadosPlantao(plantaoAtual, proximoPlantao, escala);
                    console.info('Próximo plantão domingal encontrado, passando dados para atualização...');

                } else {
                    await ContadorRepository
                        .updateContador({ _id: idDomingal }, { iterador: GrupoEnum.inicioGrupo }, { upsert: true, new: true });

                    const proximoPlantao = await Repository.getByNumber(numeroProximoPlantao);
                    this.atualizaDadosPlantao(plantaoAtual, proximoPlantao, escala);
                    console.info('Plantão incial domingal encontrado, passando dados para atualização...');
                }
                break;

            default:
                break;
        }

    } catch (err) {
        return ({ error: 'OPA! aconteceu um erro quando tentei encontrar o próximo plantão.' });
    }
}

exports.procuraPlantao = async () => {
    try {
        const dia = dataService.diaAtualSemana();
        const sabado = 6;

        if (dia > 0 && dia < sabado) return await Repository.getByStatusSemanal();

        if (dia === sabado) return await Repository.getByStatusSabadal();

        else return await Repository.getByStatusDomingal();

    } catch (err) {
        return ({ error: 'EI! esbarrei em um erro quando tentei buscar o plantão pelo status.' });
    }
}
