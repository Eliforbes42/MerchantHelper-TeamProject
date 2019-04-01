'user strict'
var {selectGp} = require('./db');

var Island = function(island) {
    this.name = island.name;
    this.row = island.row;
    this.col = island.col;
    this.locale = island.row+island.col.toString();
    this.hasChicken = island.hasChicken;
    this.hasPig = island.hasPig;
    this.hasSnake = island.hasSnake;
    this.isFort = island.isFort;
};

Island.getGunpowder = function(curLocale, result) {
    selectGp(curLocale,result);
};

module.exports = {Island};