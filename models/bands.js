const Band = require("./band");

class Bandas{
    constructor()
    {
        this.bandas = [] ;
    }

    addBand(band = new Band())
    {
        this.bandas.push(band);
    }

    getBandas(){
        return this.bandas;
    }

    deleteBanda(id='')
    {
        this.bandas = this.bandas.filter(band => band.id !== id);
        return this.bandas;
    }

    voteBand(id='')
    {
        this.bandas = this.bandas.map(band => {
            if(band.id == id)
            {
                band.votes++;
                return band;
            }
            else{
                return band;
            }
        });
    }
}

module.exports = Bandas;