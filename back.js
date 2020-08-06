const axios = require('axios');
//const express = require('express');

  
const express = require('express');
const { request } = require('express');
const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true}));
// app.use(logger);

// function logger (req, res, next) {
//     console.log('request fired ' + req.url + ' ' + req.method);
//     next();
// }

const products = [
    {
        id:'1',
        name: 'meat'
    },
    {
        id:'2',
        name: 'milk'
    },
    {
        id:'3',
        name: 'eggs'
    }
];
function getProductById(id){
    for(let i = 0; i < products.length; i++){
        if(products[i].id === id){
            return products[i];
        }
    }
}

// task1
app.get('/products/',((request, response) => {
    response.send(products);
}));

// task2
app.get('/products/:id',((request, response) => {
    let id = request.params.id;
    let product = getProductById(id);
    response.send(product);
}));

//task3
function uniqueid(){
    let idstr = String.fromCharCode(Math.floor((Math.random()*25)+65));
    do {                
        let ascicode = Math.floor((Math.random()*42)+48);
        if (ascicode < 58 || ascicode > 64){
            idstr +=String.fromCharCode(ascicode);    
        }                
    } while (idstr.length<32);
    newId = idstr;
    return newId;
}
app.post('/products', ((request, response) => {
    let uniqueId = uniqueid();
    request.body.id = uniqueId;
    products.push(request.body);
    response.send(request.body);
}));

//task4
app.put('/products/:id', ((request, response) => {
    let id = request.params.id;
    let product = request.body;
    response.send(updateProduct(id, product));
}));

function updateProduct(id, product){
    for (let i = 0; i < products.length; i++) {
        if(products[i].id === id){
            products[i] = product;
            return product;
        }
    }
}

// task5
app.delete('/products/:id', ((request, response) => {
    let removed = "";
    products.forEach((product) => {
        if(product.id === request.params.id)
        {
            let index = products.indexOf(product);
            let removed = products.splice(index, 1);
            response.send(removed);
        }
    })
}));



// app.post('/post', (req, res) =>{
//     console.log(req.body);
//     posts.push(req.body);
//     res.send(req.body);
//     debugger;
// });


// app.delete('/post/:id', (req, res) =>{
//     posts.forEach((post, index) =>{
//         if(post.id === req.params.id){
//             posts.splice(index, 1);
//             res.send(req.params.id + ' deleted');
//         }
//     });
// });


// app.put('/post/:id', (req, res) =>{
//     posts.forEach((post, index) =>{
//         if(post.id === req.params.id){
//             posts[index] = req.body;
//             res.send(req.body);
//         }
//     });
// });


// app.get('/post/:id', (req, res) =>{
//     for(let post of posts){
//         if(post.id === req.params.id){
//             res.send(post);
//         }
//     }
// });

// app.get('/posts', (req, res) => {
//     res.send(posts);
// });

// app.get('/', (req, res) => {
//     res.send('Hello');
// });


app.listen(3000);