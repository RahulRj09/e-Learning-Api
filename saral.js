const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json())
app.get('/courses', (req, res, next) =>{
    fs.readFile( __dirname + "/" + "courses.json", 'utf8', function (err, data) {
        console.log( data );
        res.end( data );
     });
})                

app.get('/courses/:id', (req, res, next) =>{
    fs.readFile( __dirname + "/" + "courses.json", 'utf8', (err, data) => {
        let coures_data = JSON.parse( data );
        for(let i = 0; i < coures_data.length; i++){
            if (coures_data[i]['id'] == req.params.id){
                console.log("aggya hai json m");
                let coures_data_byId = coures_data[i];
                console.log( coures_data_byId );
                res.end( JSON.stringify(coures_data_byId));
            }else{
                res.status(404).send("data not found");
            }
        }
     });
})

app.post('/courses', (req, res, next) =>{
    fs.access(__dirname + "/" + "courses.json", fs.F_OK, (err) => {
        if (err) {
          console.error(err)
        
        }else{
            console.log("hai file");
            fs.readFile( __dirname + "/" + "courses.json", 'utf8', (err, data) => {
                if (err) {
                  console.error("open error:  " + err);
                } else if(req.body.name && req.body.description && Object.keys(req.body).length == 2) {
                    let coures_data = JSON.parse(data);
                  console.log("Successfully opened",coures_data);
                 const coures_name ={
                    "name": req.body.name,
                    "description": req.body.description,
                    "id": coures_data.length+1
                  }
                  coures_data.push(coures_name)
                  console.log(coures_data)
                  fs.writeFile( __dirname + "/"+"courses.json", JSON.stringify(coures_data,null, 2),   (err) => {
                    if (err) 
                        return console.log(err);
                });
                  res.end( JSON.stringify(coures_data));
                }else{
                    res.send("aapki key sahi nahi hai")
                }
              });
        }
      
    });
});

app.put('/courses/:id', (req, res, next) =>{
    fs.readFile( __dirname + "/" + "courses.json", 'utf8', (err, data) => {
        let coures_data = JSON.parse( data );
            if (req.params.id -1 < coures_data.length && req.params.id >=0){
                console.log("aggya hai json m");
                if(req.body.hasOwnProperty('name')){
                    coures_data[req.params.id -1]['name'] = req.body.name;
                }
                if(req.body.hasOwnProperty('description')){
                    coures_data[req.params.id -1]['description'] = req.body.description;
                }

                fs.writeFile( __dirname + "/"+"courses.json", JSON.stringify(coures_data,null, 2),(err) => {
                    if (err){return console.log(err);} 
                        
                res.send( JSON.stringify(coures_data));
                });
            }else{
                res.status(404).send("data not found");
            }
        
     });
})

app.get('/courses/:id/exercises', (req,res,next) =>{
    fs.readFile( __dirname + "/" + "excercise.json", 'utf8', (err, data) => {
        console.log("aagya hai")
        let data1 = []
        let coures_exercises = JSON.parse( data );
        for(let i = 0; i < coures_exercises.length; i++){
            console.log("ssss")
            if(req.params.id == coures_exercises[i]['courseId']){
            console.log(coures_exercises)
            data1.push(coures_exercises[i])
            }
        }
        res.send(data1)
    });

});



app.listen(5005);