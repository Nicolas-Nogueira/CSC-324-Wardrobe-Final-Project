import express from 'express';

const app = express();

app.use(express.static('public'));

app.get('/data', function(req, res){
    // const obj1 = [
    //     {
    //         "email": "rm@rm.com",
    //         "password": "123#Orange"
    //     },
    //     {
    //         "email": "ac@ac.com",
    //         "password": "123#Apple"
    //     },
    //     {
    //         "email": "nn@nn.com",
    //         "password": "123#pear"
    //     }
    // ];
    res.set('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
    // res.json(obj1);

})

app.listen(3000, function(){
    console.log('Server listening on port 3000');
})