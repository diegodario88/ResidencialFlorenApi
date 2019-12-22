const Repository = require('../repositories/plantaoRepository');

function dataAtualFormatada() {
    Date.prototype.addHours = function (value) {
        this.setHours(this.getHours() + value);
    }

    const data = new Date();
    data.addHours(-3);
    dia = data.getDate().toString();
    diaF = (dia.length == 1) ? '0' + dia : dia;
    mes = (data.getMonth() + 1).toString(); //+1 pois no getMonth Janeiro começa com zero.
    mesF = (mes.length == 1) ? '0' + mes : mes;
    anoF = data.getFullYear();

    return diaF + "/" + mesF + "/" + anoF;
}




function diaAtualSemana() {
    const date = new Date();
    return date.getDay();
}

exports.atualizaDataPlantao = async function ({ data }) {

    TODO:
    //Funcão verifica e atualiza data da escala do plantão
    try {

        const dia = diaAtualSemana();

        if (dia > 0 && dia < 6) {
            await Repository
                .updateDatePlantao({ _id: data._id }, { escalaSemanal: date }, { upsert: true, new: true });

        } if (dia == 6) {
            await Repository
                .updateDatePlantao({ _id: data._id }, { escalaSabado: date }, { upsert: true, new: true });

        }
        await Repository
            .updateDatePlantao({ _id: data._id }, { escalaDomingo: date }, { upsert: true, new: true });
    } catch (err) {
        return ({ error: 'Error when trying to update' });
    }
}


TODO:
//Implementar uma função para setar o plantão atual como false e passar o retorno 
//de proximoPlantao para o controller.
//Em uma determinada condição que será a troca do dateTime.
//Talvez implementar status semanal/sabadal e domingal???
exports.proximoPlantao = async function (plantao) {
    try {
        const dia = diaAtualSemana();
        const sabado = 6;
        const ultimoGrupo = 13;
        const inicioGrupo = 1;

        if (dia > 0 && dia < sabado) {
            //Semanal
            let contadorSemanal = plantao.numero;

            if (plantao.numero === contadorSemanal) {

                if (contadorSemanal > 0 && contadorSemanal < ultimoGrupo) {
                    const numeroProximoPlantao = contadorSemanal + 1;
                    return await Repository.getByNumber(numeroProximoPlantao);
                }

                const numeroProximoPlantao = inicioGrupo;
                return await Repository.getByNumber(numeroProximoPlantao);
            }

        } if (dia === sabado) {
            //Sábado
            let contadorSabado = plantao.numero;
            if (plantao.numero === contadorSabado) {
                if (contadorSemanal > 0 && contadorSemanal < ultimoGrupo) {
                    const numeroProximoPlantao = contadorSemanal + 1;
                    return await Repository.getByNumber(numeroProximoPlantao)
                }
                const numeroProximoPlantao = inicioGrupo;
                return await Repository.getByNumber(numeroProximoPlantao);
            }
        }
        //Domingo
        let contadorDomingo = plantao.numero;
        if (plantao.numero === contadorDomingo) {
            if (contadorSemanal > 0 && contadorSemanal < ultimoGrupo) {
                const numeroProximoPlantao = contadorSemanal + 1;
                return Repository.getByNumber(numeroProximoPlantao)
            }
            const numeroProximoPlantao = inicioGrupo;
            return Repository.getByNumber(numeroProximoPlantao);
        }

    } catch (err) {
        return ({ error: 'Error when trying to set next Plantão' });
    }
}

exports.getByStatus = async function () {
    const plantao = await Repository.findWhere();
    const proximo = await this.proximoPlantao(plantao);
    return proximo;
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