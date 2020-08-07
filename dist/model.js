"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const mongoose = require('mongoose');
const moment = require('moment');
const { Validator } = require('node-input-validator');
exports.find = function (myModel, where, or) {
    return __awaiter(this, void 0, void 0, function* () {
        var query = myModel.where(where);
        if (or == null || or == undefined)
            return yield query.find(where);
        else
            return yield query.find(where).or(or);
    });
};
exports.find2 = function (myModel, where, or) {
    return __awaiter(this, void 0, void 0, function* () {
        var query = null;
        if (or == null || or == undefined)
            query = myModel.find(where);
        else
            query = myModel.find(where).or(or);
        let p = yield query.exec();
        console.log("test");
        console.log(p);
        return p;
    });
};
mongoose.connect('mongodb://admin:adminpwd@localhost/appli', { useNewUrlParser: true, useUnifiedTopology: true });
//***********it**************************************************************
// Users
//*************************************************************************
var userSchema = new mongoose.Schema({
    lastName: String,
    firstName: String,
    email: String,
    username: String,
    password: String,
    phone: String,
    allowGdpr: Boolean,
    isCheck: Boolean,
    created: { type: Date, default: moment().utc() },
    updated: { type: Date, default: moment().utc() },
    lastConnect: Date,
    group: { type: String, default: 'user' }
});
const AppUsers = mongoose.model('Users', userSchema);
exports.AppUsers = AppUsers;
exports.AppUsersValidator = {
    email: 'required|email',
    lastName: 'required',
    firstName: 'required',
    username: 'required|minLength:3',
    password: 'required|minLength:5',
    phone: 'required',
    group: 'required',
    isCheck: 'required'
};
//*************************************************************************
// UersKey
//*************************************************************************
var userKeySchema = new mongoose.Schema({
    idUser: String,
    privateKey: String,
    publicKey: String,
});
const UsersKey = mongoose.model('UsersKey', userKeySchema);
exports.UsersKey = UsersKey;
exports.UsersKeyValidator = {
    idUser: 'required',
    privateKey: 'required',
    publicKey: 'required'
};
//*************************************************************************
// Errors
//*************************************************************************
var errorSchema = new mongoose.Schema({
    code: String,
    url: String,
    message: String,
    error: String,
    created: { type: Date, default: moment().utc() }
});
const Errors = mongoose.model('Errors', errorSchema);
exports.Errors = Errors;
//*************************************************************************
// Logs
//*************************************************************************
var logSchema = new mongoose.Schema({
    code: String,
    message: String,
    idUser: String,
    created: { type: Date, default: moment().utc() }
});
const Logs = mongoose.model('Logs', logSchema);
exports.Logs = Logs;
//*************************************************************************
// Items
//*************************************************************************
var itemsSchema = new mongoose.Schema({
    type: String,
    code: String,
    title: String,
    description: String,
    idUser: String,
    created: { type: Date, default: moment().utc() },
    updated: { type: Date, default: moment().utc() },
    deleted: { type: Boolean, default: false }
});
const Items = mongoose.model('Items', itemsSchema);
exports.Items = Items;
exports.ItemsValidator = {
    type: 'required',
    code: 'required',
    title: 'required',
    description: 'required',
    idUser: 'required',
    deleted: 'required'
};
var tourismeItemsSchema = new mongoose.Schema({
    externalId: String,
    name: String,
    type: String,
    description: String,
    createdBy: String,
    updated: Date,
    periods: Array,
    categories: Array,
    longitude: Number,
    latitude: Number,
    contactsName: Array,
    contactsPhone: Array,
    contactsMail: Array,
    contactsUrl: Array,
    address: String,
    zipCode: String,
    city: String,
    typeLabel: String,
    systemUpdated: Date,
    search: String
});
const TourismeItems = mongoose.model('TourismeItems', tourismeItemsSchema);
exports.TourismeItems = TourismeItems;
