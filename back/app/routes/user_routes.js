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

    app.post('/loadImage', (req, res) => {

        let image = req.body;
        if(image){
            res.send(image);
        }
        else{
            res.send({ 'error': 'Can not find _id in collection' });
        }
    });

    app.post('/saveDoctors', (req, res) => {

        let doctors = req.body.doctors;
        let doctorsToAdd = doctors.filter(doc => !doc._id);
        let doctorsToUpdate = doctors.filter(doc => doc._id);

        if (doctorsToUpdate) {
            let db = client.db(baseName); //название базы
            db.collection('doctors').findOneAndUpdate({"_id" : "5c0c1271e7179a2e27050069"}, {$set: {"name" : "Пипирка1"}},(err,result) => {
                if (err) {
                    res.send({'error': 'An error has occurred'});
                } else {

                    res.send(result);
                }
            })
        }
        else {
            if (doctorsToAdd) {
                let db = client.db(baseName); //название базы
                db.collection('doctors').insertMany(doctors, (err, result) => {
                    if (!err) {
                        res.send(result.ops[0]);
                    } else {
                        res.send({'error': 'An error has occurred'});
                    }
                });
            };
        };
    });
};


