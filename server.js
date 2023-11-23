const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/contactmanager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
});

const Contact = mongoose.model('Contact', contactSchema);

app.get('/api/contacts', async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

app.post('/api/contacts', async (req, res) => {
  const newContact = new Contact(req.body);
  const savedContact = await newContact.save();
  res.json(savedContact);
});

app.put('/api/contacts/:id', async (req, res) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedContact);
});

app.delete('/api/contacts/:id', async (req, res) => {
  const deletedContact = await Contact.findByIdAndDelete(req.params.id);
  res.json(deletedContact);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
