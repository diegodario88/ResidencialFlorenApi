const Repository = require('../repositories/plantaoRepository');

exports.atualizaPlantao = async function ({ data }) {
    TODO:
    //Funcão verifica e atualiza data da escala do plantão
    try {
        const date = new Date();
        const dia = date.getDay();

        if (dia > 0 && dia < 6) {
            const res = await Repository
                .findOneUpdate({ _id: data._id }, { escalaSemanal: date }, { upsert: true, new: true });

            return res;

        } if (dia == 6) {
            return await Repository
                .findOneUpdate({ _id: data._id }, { escalaSabado: date }, { upsert: true, new: true });

        }
        return await Repository
            .findOneUpdate({ _id: data._id }, { escalaDomingo: date }, { upsert: true, new: true });
    } catch (err) {
        return ({ error: 'Error when trying to update' });
    }
}
//Função para formatar a data
function dataAtualFormatada() {
    var data = new Date(),
        dia = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0' + dia : dia,
        mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0' + mes : mes,
        anoF = data.getFullYear();
    return diaF + "/" + mesF + "/" + anoF;
}

//Função devolve o plantão atual
exports.verificaPlantao = function () {
    try {
        switch (dataAtualFormatada()) {
            case "05/12/2019":
                return Repository.getByName("G09");

            case "06/12/2019":
                return Repository.getByName("G10");

            case "07/12/2019":
                return Repository.getByName("G02"); //Sábado

            case "08/12/2019":
                return Repository.getByName("G13"); //Domingo

            case "09/12/2019":
                return Repository.getByName("G11");

            case "10/12/2019":
                return Repository.getByName("G12");

            case "11/12/2019":
                return Repository.getByName("G13");

            case "12/12/2019":
                return Repository.getByName("G01");

            case "13/12/2019":
                return Repository.getByName("G02");

            case "14/12/2019":
                return Repository.getByName("G03"); //Sábado

            case "15/12/2019":
                return Repository.getByName("G01"); //Domingo

            case "16/12/2019":
                return Repository.getByName("G03");

            case "17/12/2019":
                return Repository.getByName("G04");

            case "18/12/2019":
                return Repository.getByName("G05");

            case "19/12/2019":
                return Repository.getByName("G06");

            case "20/12/2019":
                return Repository.getByName("G07");

            case "21/12/2019":
                return Repository.getByName("G04"); //Sábado

            case "22/12/2019":
                return Repository.getByName("G13"); //Domingo

            case "23/12/2019":
                return Repository.getByName("G08");

            case "24/12/2019":
                return Repository.getByName("G09");

            case "25/12/2019":
                return Repository.getByName("G10");

            case "26/12/2019":
                return Repository.getByName("G11");

            case "27/12/2019":
                return Repository.getByName("G12");

            case "28/12/2019":
                return Repository.getByName("G05"); //Sábado

            case "29/12/2019":
                return Repository.getByName("G01"); //Domingo

            case "30/12/2019":
                return Repository.getByName("G13");

            case "31/12/2019":
                return Repository.getByName("G01");

            case "01/01/2020":
                return Repository.getByName("G02");
            case "02/01/2020":
                return Repository.getByName("G03");

            case "03/01/2020":
                return Repository.getByName("G04");

            case "04/01/2020":
                return Repository.getByName("G06"); //Sábado

            case "05/01/2020":
                return Repository.getByName("G04"); //Domingo

            case "06/01/2020":
                return Repository.getByName("G05");

            case "07/01/2020":
                return Repository.getByName("G06");

            case "08/01/2020":
                return Repository.getByName("G07");

            case "09/01/2020":
                return Repository.getByName("G08");

            case "10/01/2020":
                return Repository.getByName("G09");

            case "11/01/2020":
                return Repository.getByName("G07"); //Sábado

            case "12/01/2020":
                return Repository.getByName("G05"); //Domingo

            case "13/01/2020":
                return Repository.getByName("G10");

            case "14/01/2020":
                return Repository.getByName("G11");

            case "15/01/2020":
                return Repository.getByName("G12");

            case "16/01/2020":
                return Repository.getByName("G13");

            case "17/01/2020":
                return Repository.getByName("G01");

            case "18/01/2020":
                return Repository.getByName("G08"); //Sábado

            case "19/01/2020":
                return Repository.getByName("G06"); //Domingo

            case "20/01/2020":
                return Repository.getByName("G02");

            case "21/01/2020":
                return Repository.getByName("G03");

            case "22/01/2020":
                return Repository.getByName("G04");

            case "23/01/2020":
                return Repository.getByName("G05");

            case "24/01/2020":
                return Repository.getByName("G06");

            case "25/01/2020":
                return Repository.getByName("G09"); //Sábado

            case "26/01/2020":
                return Repository.getByName("G07"); //Domingo

            case "27/01/2020":
                return Repository.getByName("G07");

            case "28/01/2020":
                return Repository.getByName("G08");

            case "29/01/2020":
                return Repository.getByName("G09");

            case "30/01/2020":
                return Repository.getByName("G10");

            case "31/01/2020":
                return Repository.getByName("G11");

            default:

        }
    } catch (err) {
        console.log(err);

        return ({ error: 'Error verifying plantão' })
    }
}