const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config()

const app = express();

app.use(express.json());
app.use(cors());


// Models
const Todo = require('./models/Todo');

app.get('/todos', async (req, res) => {
	const todos = await Todo.find();

	res.json(todos);
});

app.post('/todo/new', (req, res) => {
	const todo = new Todo({
		text: req.body.text
	})

	todo.save();

	res.json(todo);
});

app.delete('/todo/delete/:id', async (req, res) => {
	const result = await Todo.findByIdAndDelete(req.params.id);

	res.json({result});
});

app.get('/todo/complete/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);

	todo.complete = !todo.complete;

	todo.save();

	res.json(todo);
})

app.put('/todo/update/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);

	todo.text = req.body.text;

	todo.save();

	res.json(todo);
});


const PORT = process.env.PORT;

mongoose.connect('mongodb+srv://carlcook706:Patpat12@cluster0.aw03ggg.mongodb.net/?retryWrites=true&w=majority', {
	useNewUrlParser: true, 
	useUnifiedTopology: true 
}).then(app.listen(process.env.PORT,()=>{console.log(`Server running on port ${PORT} and Connected to DB`)}));

