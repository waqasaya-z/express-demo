require('dotenv').config();
const Joi = require('joi') // returns Class
const express = require('express'); // function
const app = express(); // returns object

// return classes using capital: Joi

// parsing: middleware
app.use(express.json());

/*
Object Methods:
app.get(): fetch/ retrieve
app.post(): submit
app.put(): update
app.delete(): delete

Nodemon: don't need to restart server
*/

const courses = [
    {id: 1, name: 'waqas'},
    {id: 2, name: 'muhm'},
    {id: 3, name: 'ayaz'}
    ];


// HTTP GET REQUEST

app.get('/', (req, res) => {
 res.send('Hello World!');
})

app.get('/api/courses', (req,res) => { 
// res.send([1,2,3]);
    res.send(courses);
});

// Retrieve Single course
app.get('/api/courses/:id', (req,res) => {
  // res.send(req.params.id);
const course = courses.find(c => c.id === parseInt(req.params.id))
if(!course){
 res.status(404).send('Course not found');
   } else { 
res.send(course);
}
});

// Multiple Routes

app.get('/api/post/:years/:month', (req,res) => {
    res.send(req.params);
   // res.send(req.query);
})

// params => essential values

// query string params: add ?sortBy=name
// anything that is optional, addiotnal data

// HTTP POST REQUEST

// Joi requires schema: min character, email etc

app.post('/api/courses', (req,res) => {
 const { error } = validateCourse(req.body); 
 
  if(error) {
     res.status(400).send(error.details[0].message)
     return; 
  }  
  const course = {
  id: courses.length+1,
  name: req.body.name 
  };
  courses.push(course);
  res.send(course);
});

// HTTP PUT REQUEST
app.put('/api/courses/:id', (req,res) => {
 const course = courses.find(c => c.id === parseInt(req.params.id))
 if(!course){
  return res.status(404).send('Course Not found')

 } 
 
 const { error } = validateCourse(req.body); 
 
 if(error) {
     res.status(400).send(error.details[0].message)
     return; 
  } 
  
  course.name = req.body.name; 
  res.send(course);
});

function validateCourse(course){
 const schema = Joi.object({
 name: Joi.string().min(3).required()
 });
  
 return schema.validate(course); 
}

// HTTP DELETE REQUEST
app.delete('/api/courses/:id',(req,res)=>{
// Look up the course
const course = courses.find(c => c.id === parseInt(req.params.id))
 if(!course){
  return res.status(404).send('Course Not found')
 }
// DELETE
const index = courses.indexOf(course);
courses.splice(index, 1);
res.send(course);
})

/* Envoriment variable: PORT: PART 
 OF ENV WHERE PROCESS RUN */

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Listning on port ${port}`)
});
