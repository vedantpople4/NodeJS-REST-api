const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());

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

app.post('/api/pages', (req, res)=>{
    
    const { error } = validatePage(req.body);
    if(error){
        res.status(404).send(result.error.details[0].message);
        return;
    }

    const page = {
        id: page.length+1,
        name: req.body.name 
    };
    pages.push(page);
    res.send(page);
});

app.put('/api/pages/:id', (req,res)=>{
    const page = pages.find(c=> c.id === parseInt(req.params.id));
    if(!page) {
        res.status(404).sendStatus('Page does not exist')
        return 
    }
    const { error } = validatePage(req.body);
    if(error){
        res.status(404).send(error.details[0].message);
        return;
    }

    page.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req,res)=>{
    const page = pages.find(c=> c.id === parseInt(req.params.id));
    if(!page)  return res.status(404).sendStatus('Page does not exist')

    //Delete
    const index = pages.indexOf(page);
    pages.splice(index, 1);

    res.send(page);
});

function validatePage(page){
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.valid(schema, page);
}

//port assignment
const port = process.env.PORT || 3000
app.listen(port);