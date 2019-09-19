const express = require('express');
const router = express.Router();
const fs = require('fs');
router.get('/courses', (req, res, next) =>{
    fs.readFile( __dirname + "/" + "courses.json", 'utf8', function (err, data) {
        console.log( data );
        res.end( data );
     });
}) 
router.get('/courses/:id', (req, res, next) =>{
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

router.post('/courses', (req, res, next) =>{
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

router.put('/courses/:id', (req, res, next) =>{
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

router.get('/courses/:id/exercises', (req,res,next) =>{
    fs.readFile( __dirname + "/" + "exercise.json", 'utf8', (err, data) => {
        console.log("aagya hai")
        let data1 = []
        let coures_exercises = JSON.parse( data );
        console.log(data)
        for(let i = 0; i < coures_exercises.length; i++){
            if(req.params.id == coures_exercises[i]['courseId']){
            console.log(coures_exercises[i])
            data1.push(coures_exercises[i])
            }
        }
        console.log(data1)
        res.send(data1)
    });

});

router.post('/courses/:id/exercises', (req, res, next) =>{
    fs.access(__dirname + "/" + "exercise.json", fs.F_OK, (err) => {
        if (err) {
          console.error(err)
        
        }else{
            console.log("hai file");
            fs.readFile( __dirname + "/" + "exercise.json", 'utf8', (err, data) => {
                if (err) {
                  console.error("open error:  " + err);
                } else if(req.body.name && req.body.content && req.body.hint && Object.keys(req.body).length == 3) {
                    let coures_data = JSON.parse(data);
                    console.log("json hai")
                    console.log("Successfully opened",coures_data);
                    console.log(req.params.id)
                    const coures_name ={
                        "id": coures_data.length+1,
                        "courseId": parseInt(req.params.id),
                        "name": req.body.name,
                        "content": req.body.content,
                        "hint": req.body.hint
                     }
                  coures_data.push(coures_name)
                //   console.log(coures_data)
                  fs.writeFile( __dirname + "/"+"exercise.json", JSON.stringify(coures_data,null, 2),   (err) => {
                    if (err) 
                        return console.log(err);
                    });
                    res.end( JSON.stringify(coures_name));
                }else{
                    res.send("aapki key sahi nahi hai")
                }
              });
        }
      
    });
})


router.get('/courses/:cid/exercises/:eid', (req, res, next) =>{
    fs.readFile( __dirname + "/" + "exercise.json", 'utf8', (err, data) => {
        if(!err){
            let coures_exercise = JSON.parse( data );
            console.log(data)
            for(let i = 0; i < coures_exercise.length; i++){
                if (coures_exercise[i]['courseId'] === parseInt(req.params.cid)){
                    if(coures_exercise[i]['id'] === parseInt(req.params.eid)){
                        console.log("aggya hai json m");
                        console.log(coures_exercise[i])
                        return res.json(coures_exercise[i]);
                    }else if (i == coures_exercise.length -1){
                        res.json({errorMsg:"some error"})
                    
                    }    
                }else if (i == coures_exercise.length-1){
                    res.json({errorMsg:"some error"})
                
                }
            }
        } else{
            console.log(err)
        }
     });
})

router.put('/courses/:cid/exercises/:eid', (req, res, next) =>{
    fs.readFile( __dirname + "/" + "exercise.json", 'utf8', (err, data) => {
        let coures_exercise = JSON.parse( data );

            if (req.params.eid -1 < coures_exercise.length && req.params.eid >=0){
                if(req.body.hasOwnProperty('name')){
                    coures_exercise[req.params.eid-1]['name'] = req.body.name;
                }
                if(req.body.hasOwnProperty('content')){
                    coures_exercise[req.params.eid-1]['content'] = req.body.content;
                }
                if(req.body.hasOwnProperty('hint')){
                    coures_exercise[req.params.eid-1]['hint'] = req.body.hint;
                }
                fs.writeFile( __dirname + "/"+"exercise.json", JSON.stringify(coures_exercise,null, 2),(err) => {
                    if (err){return console.log(err);} 

                res.send(JSON.stringify(coures_exercise[req.body.eid-1]));
                });
            }else{
                res.status(404).send("data not found");
            }
        
     });
})

router.get('/courses/:cid/exercises/:eid/submissions', (req, res, next) =>{
    fs.readFile( __dirname + "/" + "submissions.json", 'utf8', (err, data) => {
        let coures_exercise = JSON.parse( data );
        const submissions = []
        if(!err){
            for(let i = 0; i <coures_exercise.length; i++){
                if(coures_exercise[i]['exerciseId'] === parseInt(req.params.eid) && coures_exercise[i]['courseId'] === parseInt(req.params.cid) ){
                    submissions.push(coures_exercise[i])
                }else if(i === coures_exercise.length-1 && submissions.length === 0){
                    res.send("data nahi hai")
                }
            }if(submissions.length >0){
                return res.json(submissions)
            }
            
        }else{
            return res.send("file nahi hai");
        }
        
    })
})

router.post('/courses/:cid/exercises/:eid/submissions', (req, res, next) =>{
    fs.access(__dirname + "/" + "submissions.json", fs.F_OK, (err) => {
        if (err) {
          console.error(err)
        
        }else{
            console.log("hai file");
            fs.readFile( __dirname + "/" + "submissions.json", 'utf8', (err, data) => {
                if (err) {
                  console.error("open error:  " + err);
                } else if(req.body.content && req.body.userName && Object.keys(req.body).length == 2) {
                    let coures_data = JSON.parse(data);
                    const coures_name ={
                        "id": coures_data.length+1,
                        "courseId": parseInt(req.params.cid),
                        "exerciseId": parseInt(req.params.eid),
                        "content": req.body.content,
                        "userName": req.body.userName
                     }
                  coures_data.push(coures_name)
                //   console.log(coures_data)
                  fs.writeFile( __dirname + "/"+"submissions.json", JSON.stringify(coures_data,null, 2),   (err) => {
                    if (err) 
                        return console.log(err);
                    });
                    res.end( JSON.stringify(coures_name));
                }else{
                    res.send("aapki key sahi nahi hai")
                }
              });
        }
      
    });
})
module.exports = router; 