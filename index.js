const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    {id:1, name:'courses1'},
    {id:2, name:'courses2'},
    {id:3, name:'courses3'},
]

// Get root query
app.get('/',(req,res) => {
    res.send('Hello world!!');
});             // get takes two URL where 1st argument is the root

app.get('/api/courses', (req,res)=> {
    res.send(courses);
})

// Post Query
app.post('/api/courses', (req,res) => {
    const {error} = validateCourse(req.body);  // result.error
    // 400 Bad Request
        if(error) return res.status(400).send(result.error.details[0].message);
    const course = {
        id: courses.length + 1,
        name: req.body.name,
    };
    courses.push(course);
    res.send(course);
})

// Put Query
app.put('/api/courses/:id', (req,res) => {
    
    // Look up the course
    // Send 404 if it does not exist
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send(`The course with the given ${req.params.id} was not found`);
        
    
    //Validate
    // If invalid, return 400
    // const result = validateCourse(req.body);
    const {error} = validateCourse(req.body);  // result.error
    // 400 Bad Request
        if(error) return res.status(400).send(error.details[0].message);       
    // Update course
    // Return the updated course

    course.name = req.body.name;
    // Return the updated course
    res.send(course);

})

function validateCourse(course)
{
    const schema = {
        name: Joi.string().min(3).required(),
    }
        return Joi.validate(course, schema)
}




const port = process.env.PORT || 3000

// Get course by id
app.get('/api/courses/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) res.status(404).send(`The course with the given ${req.params.id} was not found`);
    res.send(course);
})
// app.get('/api/courses/:years/:month', (req,res) => {
//     res.send(req.params)         // The params object shows {year: year in url, month: month in url}
// })

app.delete('/api/courses/:id', (req,res) => {
    //Look up the course id
    // Not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send(`The course with the given ${req.params.id} was not found`);

    //Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1); // Wow, No filter required :)

    // Return the same course
    res.send(course);
})


app.listen(port, ()=> {
    console.log(`Listening on port ${port}...`);
})


// Express gives the app a skeleton/ structure which allows you to move codeblock anywhere.
// all the app.get methods or certain methods can be moved to a different file without completely breaking the code.