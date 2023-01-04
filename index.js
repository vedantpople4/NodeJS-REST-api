const express = require('express')
const app = express()

const pages = [
    {id: 1, name: 'Page 1'},
    {id: 2, name: 'Page 2'},
    {id: 3, name: 'Page 3'},
    {id: 4, name: 'Page 4'},
]

app.get('/', (req,res)=>{
    res.send("Hello world!")
})

app.get('/api/pages', (req,res)=>{
    res.send(pages);
})

app.get('/api/pages/:id', (req,res)=>{
    //const id = req.params.id;
    //res.send(id);
    const page = pages.find(c=> c.id === parseInt(req.params.id));
    if(!page) res.status(404).sendStatus('Page does not exist')
    res.send(page);
});

//port assignment
const port = process.env.PORT || 3000
app.listen(port);