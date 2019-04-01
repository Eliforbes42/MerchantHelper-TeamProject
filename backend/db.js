let mongoClient = require('mongodb').MongoClient;
const url = `mongodb://localhost:27017/merchantDB`;

module.exports = {
    insert: (data, collection)=>{
        mongoClient.connect(url, function(err, db) {
            if (err) throw err;
            const dbo = db.db('merchantDB');
            dbo.collection(collection).insertMany([data],function(err, res){
                if (err) throw err;
            });
        });
    },
    insertUser: (data, collection, result)=>{
        mongoClient.connect(url, function(err, db) {
            if (err) throw err;
            const dbo = db.db('merchantDB');
            const pk = {"name": data.name};
            var returnObj = {name: data.name, added: false, message:""};
            dbo.collection(collection).find(pk).toArray(function(err,res){
                if (err) throw err;
                else {
                    if(res.length == 0){
                        mongoClient.connect(url, function(err, db) {
                            if (err) throw err;
                            const dbo = db.db('merchantDB');
                            dbo.collection(collection).insertMany([data],function(err, res){
                                if (err) throw err;
                                else {
                                    returnObj.added = true;
                                    returnObj.message = "User was added to the database.";
                                    result(returnObj);
                                }
                            });
                        });                        
                    } else{
                        returnObj.message = "Error: User already exists in database.";
                        result(returnObj);
                    }
                }
            });
        });
    },
    update: (id, data, collection)=>{
        mongoClient.connect(url, function(err, db) {
            if (err) throw err;
            const dbo = db.db('merchantDB');
            const pk = {id: id};
            const updates = {$set: data};
            dbo.collection(collection).updateOne(pk, updates,function(err, res){
                if (err) throw err;
            });
        });
    },
    select: (id, data, collection)=>{
        mongoClient.connect(url, function(err, db) {
            if (err) throw err;
            const dbo = db.db('merchantDB');
            const pk = {[id]: data};
            //const updates = {$set: data};
            dbo.collection(collection).find(pk).toArray(function(err,res){
                if (err) throw err;
                else return res;
            });
        });
    },
    selectGp: (curLocale, result)=>{
        mongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db('merchantDB');
            dbo.collection('merchantDB').find({"isFort":true}).toArray(function(err,res){
                if(res.length == 0){
                    result("Failed to find gunpowder for the given location...");
                } else {
                    var curRow = GetRowNum(curLocale[0]);
                    var curCol = parseInt(curLocale.substring(1),10);
                    var dist = 0;
                    var distances = [];
                    var minDist = 2147483645;
                    let minDistFort = null;            
                                
                    for(var i = 0; i < res.length; i++){
                        var poss = res[i];
                        dist = Math.sqrt(Math.pow((GetRowNum(poss.row) - curRow), 2) + Math.pow((poss.col - curCol), 2));
                        if (dist < minDist) {
                            minDist = dist;
                            minDistFort = poss;
                        }
                        if (!distances[dist]) {
                            distances[dist] = poss;
                        }
                    }                
                    result({"name":minDistFort.name, "locale":minDistFort.row + minDistFort.col.toString()});
                }
            });
        });
    }
} //export

let GetRowNum = (char) => {
    switch(char) {
        case 'A': return 0;
        case 'B': return 1;
        case 'C': return 2;
        case 'D': return 3;
        case 'E': return 4;
        case 'F': return 5;
        case 'G': return 6;
        case 'H': return 7;
        case 'I': return 8;
        case 'J': return 9;
        case 'K': return 10;
        case 'L': return 11;
        case 'M': return 12;
        case 'N': return 13;
        case 'O': return 14;
        case 'P': return 15;
        case 'Q': return 16;
        case 'R': return 17;
        case 'S': return 18;
        case 'T': return 19;
        case 'U': return 20;
        case 'V': return 21;
        case 'W': return 22;
        case 'X': return 23;
        case 'Y': return 24;
        case 'Z': return 25;
        default: break;
    }
};