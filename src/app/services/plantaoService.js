const Repository = require('../repositories/plantaoRepository');
const ContadorRepo = require('../repositories/contadorRepository');
function dataAtualFormatada() {
    Date.prototype.addHours = function (value) {
        this.setHours(this.getHours() + value);
    }

    let data = new Date();
    data.addHours(-3);
    dia = data.getDate().toString();
    diaF = (dia.length == 1) ? '0' + dia : dia;
    mes = (data.getMonth() + 1).toString(); //+1 pois no getMonth Janeiro começa com zero.
    mesF = (mes.length == 1) ? '0' + mes : mes;
    anoF = data.getFullYear();

    return diaF + "/" + mesF + "/" + anoF;
}

exports.diaAtualSemana = () => {
    Date.prototype.addHours = function (value) {
        this.setHours(this.getHours() + value);
    }
    let date = new Date();
    date.addHours(-3);
    return date.getDay();
}

exports.atualizaDadosPlantao = async function (plantaoAnterior, plantaoAtual, tipo) {

    try {
        //Corrigi data para UTC -3
        Date.prototype.addHours = function (value) {
            this.setHours(this.getHours() + value);
        }
        let date = new Date();
        date.addHours(-3);

        console.log(`Atualizando dados --> 
            Data: ${date} 
            Tipo: ${tipo}
            _____________

            Plantão anterior: ${plantaoAnterior.name}
            Plantão atual: ${plantaoAtual.name}
       
            `);

        if (tipo === 1) {
            await Repository
                .updatePlantao({ _id: plantaoAnterior._id }, { statusSemanal: false }
                    , { upsert: true, new: true });
            console.debug(`Atualizando status semanal do plantão ${plantaoAnterior.name}`);

            await Repository
                .updatePlantao(
                    { _id: plantaoAtual._id }, { escalaSemanal: date, statusSemanal: true }
                    , { upsert: true, new: true });
            console.debug(`Atualizando data e status semanal do novo plantão ${plantaoAtual.name}`);

        } if (tipo === 2) {
            await Repository
                .updatePlantao({ _id: plantaoAnterior._id }, { statusSabado: false }
                    , { upsert: true, new: true });
            console.debug(`Atualizando status sabadal do plantão ${plantaoAnterior.name}`);

            await Repository
                .updatePlantao(
                    { _id: plantaoAtual._id }, { escalaSabado: date, statusSabado: true }
                    , { upsert: true, new: true });
            console.debug(`Atualizando data e status sabadal do novo plantão ${plantaoAtual.name}`);

        } else if (tipo === 3) {
            await Repository
                .updatePlantao({ _id: plantaoAnterior._id }, { statusDomingo: false }
                    , { upsert: true, new: true });
            console.debug(`Atualizando status domingal do plantão ${plantaoAnterior.name}`);

            await Repository
                .updatePlantao(
                    { _id: plantaoAtual._id }, { escalaDomingo: date, statusDomingo: true }
                    , { upsert: true, new: true });
            console.debug(`Atualizando data e status domingal do novo plantão ${plantaoAtual.name}`);
        }

    } catch (err) {
        return ({ error: 'Ops surgiu um erro enquanto tentava atualizar os dados do plantão!' });
    }
}

exports.proximoPlantao = async function () {
    try {
        const dia = this.diaAtualSemana();
        const sabado = 6;
        const ultimoGrupo = 13;
        const inicioGrupo = 1;

        if (dia > 0 && dia < sabado) {
            //Semanal
            const id = '5e06e91a1c9d440000ad44f0';
            const plantao = await Repository.getByStatusSemanal();
            let contadorSemanal = await ContadorRepo.findById(id);

            if (plantao.numero === contadorSemanal) {
                if (contadorSemanal > 0 && contadorSemanal < ultimoGrupo) {
                    const numeroProximoPlantao = contadorSemanal + 1;
                    await ContadorRepo
                        .updateContador(id, numeroProximoPlantao, { upsert: true, new: true });

                    const proximoPlantao = await Repository.getByNumber(numeroProximoPlantao);
                    const tipoSemanal = 1;

                    this.atualizaDadosPlantao(plantao, proximoPlantao, tipoSemanal);
                    console.info('Próximo plantão semanal encontrado, passando dados para atualização...');

                } else {
                    const numeroProximoPlantao = inicioGrupo;
                    await ContadorRepo
                        .updateContador(id, numeroProximoPlantao, { upsert: true, new: true });

                    const proximoPlantao = await Repository.getByNumber(numeroProximoPlantao);
                    const tipoSemanal = 1;

                    this.atualizaDadosPlantao(plantao, proximoPlantao, tipoSemanal);
                    console.info('Plantão incial semanal encontrado, passando dados para atualização...');
                }
            }

        } if (dia === sabado) {
            //Sábado
            const id = '5e06e9571c9d440000ad44f1';
            const plantao = await Repository.getByStatusSabadal();
            let contadorSabadal = await ContadorRepo.findById(id);

            if (plantao.numero === contadorSabadal) {
                if (contadorSabadal > 0 && contadorSabadal < ultimoGrupo) {
                    const numeroProximoPlantao = contadorSabadal + 1;
                    await ContadorRepo
                        .updateContador(id, numeroProximoPlantao, { upsert: true, new: true });

                    const proximoPlantao = await Repository.getByNumber(numeroProximoPlantao);
                    const tipoSabadal = 2;

                    this.atualizaDadosPlantao(plantao, proximoPlantao, tipoSabadal);
                    console.info('Próximo plantão sabadal encontrado, passando dados para atualização...');

                } else {
                    const numeroProximoPlantao = inicioGrupo;
                    await ContadorRepo
                        .updateContador(id, numeroProximoPlantao, { upsert: true, new: true });

                    const proximoPlantao = await Repository.getByNumber(numeroProximoPlantao);
                    const tipoSabadal = 2;

                    this.atualizaDadosPlantao(plantao, proximoPlantao, tipoSabadal);
                    console.info('Plantão incial sabadal encontrado, passando dados para atualização...');
                }
            }
        }
        //Domingo
        const id = '5e06e97d1c9d440000ad44f2';
        const plantao = await Repository.getByStatusDomingal();
        let contadorDomingal = await ContadorRepo.findById(id);

        if (plantao.numero === contadorDomingal) {
            if (contadorDomingal > 0 && contadorDomingal < ultimoGrupo) {
                const numeroProximoPlantao = contadorDomingal + 1;
                await ContadorRepo
                    .updateContador(id, numeroProximoPlantao, { upsert: true, new: true });

                const proximoPlantao = await Repository.getByNumber(numeroProximoPlantao);
                const tipoDomingal = 3;

                this.atualizaDadosPlantao(plantao, proximoPlantao, tipoDomingal);
                console.info('Próximo plantão domingal encontrado, passando dados para atualização...');

            } else {
                const numeroProximoPlantao = inicioGrupo;
                await ContadorRepo
                    .updateContador(id, numeroProximoPlantao, { upsert: true, new: true });

                const proximoPlantao = await Repository.getByNumber(numeroProximoPlantao);
                const tipoDomingal = 3

                this.atualizaDadosPlantao(plantao, proximoPlantao, tipoDomingal);
                console.info('Plantão incial domingal encontrado, passando dados para atualização...');
            }
        }

    } catch (err) {
        return ({ error: 'OPA! aconteceu um erro quando tentei encontrar o próximo plantão.' });
    }
}
exports.procuraPlantao = async () => {
    try {
        const dia = this.diaAtualSemana();
        const sabado = 6;

        if (dia > 0 && dia < sabado) return await Repository.getByStatusSemanal();

        if (dia === sabado) return await Repository.getByStatusSabadal();

        else return await Repository.getByStatusDomingal();

    } catch (err) {
        return ({ error: 'EI! esbarrei em um erro quando tentei buscar o plantão pelo status.' });
    }
}
//Função devolve o plantão atual
exports.verificaPlantao = async function () {
    try {
        switch (dataAtualFormatada()) {
            case "05/12/2019":
                return await Repository.getByName("G09");

            case "06/12/2019":
                return await Repository.getByName("G10");

            case "07/12/2019":
                return await Repository.getByName("G02"); //Sábado

            case "08/12/2019":
                return await Repository.getByName("G13"); //Domingo

            case "09/12/2019":
                return await Repository.getByName("G11");

            case "10/12/2019":
                return await Repository.getByName("G12");

            case "11/12/2019":
                return await Repository.getByName("G13");

            case "12/12/2019":
                return await Repository.getByName("G01");

            case "13/12/2019":
                return await Repository.getByName("G02");

            case "14/12/2019":
                return await Repository.getByName("G03"); //Sábado

            case "15/12/2019":
                return await Repository.getByName("G01"); //Domingo

            case "16/12/2019":
                return await Repository.getByName("G03");

            case "17/12/2019":
                return await Repository.getByName("G04");

            case "18/12/2019":
                return await Repository.getByName("G05");

            case "19/12/2019":
                return await Repository.getByName("G06");

            case "20/12/2019":
                return await Repository.getByName("G07");

            case "21/12/2019":
                return await Repository.getByName("G04"); //Sábado

            case "22/12/2019":
                return await Repository.getByName("G02"); //Domingo

            case "23/12/2019":
                return await Repository.getByName("G08");

            case "24/12/2019":
                return await Repository.getByName("G09");

            case "25/12/2019":
                return await Repository.getByName("G10");

            case "26/12/2019":
                return await Repository.getByName("G11");

            case "27/12/2019":
                return await Repository.getByName("G12");

            case "28/12/2019":
                return await Repository.getByName("G05"); //Sábado

            case "29/12/2019":
                return await Repository.getByName("G03"); //Domingo

            case "30/12/2019":
                return await Repository.getByName("G13");

            case "31/12/2019":
                return await Repository.getByName("G01");

            case "01/01/2020":
                return await Repository.getByName("G02");
            case "02/01/2020":
                return await Repository.getByName("G03");

            case "03/01/2020":
                return await Repository.getByName("G04");

            case "04/01/2020":
                return await Repository.getByName("G06"); //Sábado

            case "05/01/2020":
                return await Repository.getByName("G04"); //Domingo

            case "06/01/2020":
                return await Repository.getByName("G05");

            case "07/01/2020":
                return await Repository.getByName("G06");

            case "08/01/2020":
                return await Repository.getByName("G07");

            case "09/01/2020":
                return await Repository.getByName("G08");

            case "10/01/2020":
                return await Repository.getByName("G09");

            case "11/01/2020":
                return await Repository.getByName("G07"); //Sábado

            case "12/01/2020":
                return await Repository.getByName("G05"); //Domingo

            case "13/01/2020":
                return await Repository.getByName("G10");

            case "14/01/2020":
                return await Repository.getByName("G11");

            case "15/01/2020":
                return await Repository.getByName("G12");

            case "16/01/2020":
                return await Repository.getByName("G13");

            case "17/01/2020":
                return await Repository.getByName("G01");

            case "18/01/2020":
                return await Repository.getByName("G08"); //Sábado

            case "19/01/2020":
                return await Repository.getByName("G06"); //Domingo

            case "20/01/2020":
                return await Repository.getByName("G02");

            case "21/01/2020":
                return await Repository.getByName("G03");

            case "22/01/2020":
                return await Repository.getByName("G04");

            case "23/01/2020":
                return await Repository.getByName("G05");

            case "24/01/2020":
                return await Repository.getByName("G06");

            case "25/01/2020":
                return await Repository.getByName("G09"); //Sábado

            case "26/01/2020":
                return await Repository.getByName("G07"); //Domingo

            case "27/01/2020":
                return await Repository.getByName("G07");

            case "28/01/2020":
                return await Repository.getByName("G08");

            case "29/01/2020":
                return await Repository.getByName("G09");

            case "30/01/2020":
                return await Repository.getByName("G10");

            case "31/01/2020":
                return await Repository.getByName("G11");

            default:

        }
    } catch (err) {
        console.log(err);

        return ({ error: 'Error verifying plantão' })
    }
}