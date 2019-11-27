const Farmacia = require('../farmacia')

class PlantaoDTO {
    constructor(name, principal, secundaria) {
        this.name = name;
        this.principal = principal;
        this.secundaria = secundaria;
    }
};



module.exports = PlantaoDTO;