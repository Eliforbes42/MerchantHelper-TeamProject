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
            var returnObj = {name:"",locale:"",message:"",status:""};
            dbo.collection('merchantDB').find({"isFort":true}).toArray(function(err,res){
                if(res.length == 0){
                    returnObj.message = "Failed to find gunpowder for the given location...";
                    returnObj.status = "Failure";
                    result(returnObj);
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
                    returnObj.name = minDistFort.name;
                    returnObj.locale = minDistFort.row+minDistFort.col.toString();
                    returnObj.message = "Successfully retrieved closest gunpowder location."
                    returnObj.status = "Success";        
                    result(returnObj);
                }
            });
        });
    },
    selectAnimals: (animals, curLocale, result) => {
        var returnObj = {name:"",locale:"",message:""}
        var query = "";
        mongoClient.connect(url, function(err,db) {
            if(err) throw err;
            var dbo = db.db('merchantDB');
            animals[0] = animals[0].charAt(0).toUpperCase() + animals[0].slice(1);
            if(animals.length == 3){
                animals[1] = animals[1].charAt(0).toUpperCase() + animals[1].slice(1);
                animals[2] = animals[2].charAt(0).toUpperCase() + animals[2].slice(1);
                query = JSON.parse('{ "has' + animals[0] + '" : true, "has' + animals[1] + '" : true, "has' + animals[2] + '" : true }');
            } else if(animals.length == 2){
                animals[1] = animals[1].charAt(0).toUpperCase() + animals[1].slice(1);
                query = JSON.parse('{ "has' + animals[0] + '" : true, "has' + animals[1] + '" : true }');
               
            } else if(animals.length == 1){
                query = JSON.parse('{ "has' + animals[0] + '" : true }');
            }
            console.log(query);
            dbo.collection('merchantDB').find(query).toArray(function(err, res){
                if(res.length == 0){
                    returnObj.message = "Error: Could not find a location with the specified animals...";
                    result(returnObj);
                } else{
                    let curRow = GetRowNum(curLocale[0]);
                    let curCol = parseInt(curLocale.substring(1), 10);
                    let dist = 0;
                    let distances = [];
                    let minDist = 2147483645;
                    let minDistAnimals = null;

                    for(var i = 0; i < res.length; i++){
                        let poss = res[i];
                        dist = Math.sqrt(Math.pow((GetRowNum(poss.row) - curRow), 2) + Math.pow((poss.col - curCol), 2));
                        if(dist < minDist) {
                            minDist = dist;
                            minDistAnimals = poss;
                        }
                        if(!distances[dist]) {
                            distances[dist] = poss;
                        }
                    }
                    returnObj.name = minDistAnimals.name;
                    returnObj.locale = minDistAnimals.row+minDistAnimals.col.toString();
                    returnObj.message = "Success";
                    result(returnObj);
                }
            })
        });
    }
} //export

let GetRowNum = (char) => {
    var charToNum = {'A':1,'B':2,'C':3,'D':4,'E':5,'F':6,
                     'G':7,'H':8,'I':9,'J':10,'K':11,
                     'L':12,'M':13,'N':14,'O':15,'P':16,
                     'Q':17,'R':18,'S':19,'T':20,'U':21,
                     'V':22,'W':23,'X':24,'Y':25,'Z':26,
                     'a':1,'b':2,'c':3,'d':4,'e':5,'f':6,
                     'g':7,'h':8,'i':9,'j':10,'k':11,
                     'l':12,'m':13,'n':14,'o':15,'p':16,
                     'q':17,'r':18,'s':19,'t':20,'u':21,
                     'v':22,'w':23,'x':24,'y':25,'z':26};
    return charToNum[char];
};