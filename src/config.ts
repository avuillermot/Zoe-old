import mongoose from 'mongoose';

mongoose.connect('mongodb://admin:adminpwd@localhost/appli', { useNewUrlParser: true, useUnifiedTopology: true });