const express = require('express');
const mongoose = require('mongoose');
const userauthRoutes = require('./routes/userauthRoutes');
const userRoutes = require('./routes/userRoutes');
const { getUsername } = require('./middleware/userauthMiddleware');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('views'));
app.set('view engine', 'ejs');


const port = 3000;

mongoose.connect('mongodb+srv://abc123:asdfghjkl@cluster0.agwtxb7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => console.log(err));

app.use(getUsername);
app.use(userauthRoutes);
app.use(userRoutes);

