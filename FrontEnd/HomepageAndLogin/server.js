
/* Server related content is taken from
 https://programmingwithmosh.com/javascript/react-file-upload-proper-server-side-nodejs-easy/ */

var express = require('express');
var app = express();
var multer = require('multer')
var cors = require('cors');
var fs = require('fs');
app.use(cors())
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './Upload')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname )
    }
  })
  
  var upload = multer({ storage: storage }).array('file')


fs.readdir('./Upload', 'utf8', function(err, data) {
  if(err) throw err;
  console.log(data);
});
  
app.get('/',function(req,res){
    return res.send('Hello Server')
})
app.post('/upload',function(req, res) {
    
    upload(req, res, function (err) {
     
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
          // A Multer error occurred when uploading.
        } else if (err) {
            return res.status(500).json(err)
          // An unknown error occurred when uploading.
        } 
        
        return res.status(200).send(req.file)
        // Everything went fine.
      })
});

app.listen(8000, function() {
    console.log('App running on port 8000');
});

