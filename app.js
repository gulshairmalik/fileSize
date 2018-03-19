const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const path = require('path');
const fs = require('fs');
const port = process.env.PORT || 8080;
const app = express();



app.set('views', path.join(__dirname, 'views'));
app.set('view engine','pug');
app.use(express.static(path.join(__dirname, 'public')));

//Getting Root/Index page
app.get('/',function(req,res){
    res.render('index');
});

//Handle file submit and sending response
app.post('/getsize',upload.single('file'),function(req,res){
    
    var result = "";

    //Generating JSON response
    if(req.file){

        //Storing Submitted FileSize
        var fileSize = req.file.size+" bytes";

        result = {"fileSize":fileSize,"success":true};
        //Deleting file after generating response
        fs.unlink(req.file.path, (err) => {
            if (err) throw err;
          });
          
    }
    else{
        result = {"fileSize":"No file selected","success":false};
    }
    
    res.send(result);
    
});


app.listen(port, () => {
    console.log('Server started on '+port);
});