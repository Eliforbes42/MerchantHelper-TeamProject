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
            dbo.collection(collection).find(pk).toArray(function(err,res){
                if (err) throw err;
                else {
                    if(res.length == 0){
                        mongoClient.connect(url, function(err, db) {
                            if (err) throw err;
                            const dbo = db.db('merchantDB');
                            dbo.collection(collection).insertMany([data],function(err, res){
                                if (err) throw err;
                                else result("User '"+data.name+"' was added to the database.");
                            });
                        });                        
                    }
                    else{
                        result("Failed to add User '"+data.name+"' -- Already exists in database.");
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
    }
} //export