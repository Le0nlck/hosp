var ObjectID = require('mongodb').ObjectID;

const baseName = "testbase";

module.exports = function(app, client) {
    app.post('/addDoctor', (req, res) => {
        let doctor = {
            spec: req.body.spec ? req.body.spec : "",
            number: req.body.name ? req.body.name : "",
            name: req.body.name ? req.body.name : "",
            d1: req.body.d1 ? req.body.d1 : "",
            d2: req.body.d2 ? req.body.d2 : "",
            d3: req.body.d3 ? req.body.d3 : "",
            d4: req.body.d4 ? req.body.d4 : "",
            d5: req.body.d5 ? req.body.d5 : "",
        };

        let db = client.db(baseName); //название базы
        db.collection('doctors').insert(doctor, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {

                res.send(result.ops[0]);
            }
        });
    });

    app.get('/getDoctors', (req, res) => {

        let db = client.db(baseName); //название базы
        db.collection('doctors').find().toArray(function(err, results){

            res.send(results);
        });
    });

    app.get('/getSpecialty', (req, res) => {
        let db = client.db(baseName); //название базы
        db.collection('spec').find().toArray(function(err, results){

            res.send(results);
        });
    });

    app.post('/getDoctorById', (req, res) => {

        let id = req.body._id;
        if(id){
            let db = client.db(baseName); //название базы
            db.collection('doctors').findOne({_id: id}).toArray(function(err, result){
                res.send(result);
            });
        }
        else{
            res.send({ 'error': 'Can not find _id in collection' });
        }
    });
    app.post('/saveDoctors', (req, res) => {


        let awaitUpdates = [];
        let doctors = req.body.doctors;
        let doctorsToAdd = doctors.filter(doc => !doc._id);
        let doctorsToUpdate = doctors.filter(doc => doc._id);
        let doctorsToDelete = doctors.filter(doc => doc.isDeleted);

        let db = client.db(baseName);

        doctorsToAdd.forEach((doc)=>{
            let newObj = {
                spec: doc.spec,
                number: doc.number,
                name: doc.name,
                d1: doc.d1,
                d2: doc.d2,
                d3: doc.d3,
                d4: doc.d4,
                d5: doc.d5,
                image: doc.image
            }
            awaitUpdates.push(db.collection('doctors').insert(newObj))
        });

        doctorsToUpdate.forEach((doc)=>{
            awaitUpdates.push(db.collection('doctors').findOneAndUpdate({"_id" : ObjectID(doc._id)}, {$set:{
                    spec: doc.spec,
                    number: doc.number,
                    name: doc.name,
                    d1: doc.d1,
                    d2: doc.d2,
                    d3: doc.d3,
                    d4: doc.d4,
                    d5: doc.d5,
                    image: doc.image
                }}));
        });
        doctorsToDelete.forEach((doc)=>{
            awaitUpdates.push(db.collection('doctors').findOneAndDelete({"_id" : ObjectID(doc._id)}));
        });

        Promise.all(awaitUpdates).then(()=>{
            res.send("Сохранение прошло успешно")
        }).catch((err) => {
            res.send({'err': err});
        })

    });
};


