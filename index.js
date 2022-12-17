const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;


app.get('/', (req, res)=>{
    res.send('this is a fast electro web site')
})


app.listen(PORT, ()=>{
    console.log(`the ser ver is running on ${PORT}`)
})