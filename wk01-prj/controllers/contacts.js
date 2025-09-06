// const { application, json } = require('express');
const database = require('../data/database');
const mongodb = require('mongodb');
const { ObjectId } = mongodb;

// const getAll = async (req, res) => {
//     const result = database.getDatabase().db('cse341-wk01').collection('contacts').find();
//     result.toArray().then((contact) => {
//         res.setHeader('Content-Type', 'application/json');
//         res.status(200).json(contact[0]);
//     });
// }
// const getSingle = async (req, res) => {
//     const contactId = new ObjectId.createFromHexString(req.params.id); // Convert the string in 'req.params.id' to 'ObjectId' object to easy matching
//     const result = database.getDatabase().db('cse341-wk01').collection('contacts').findOne({_id: contactId});
//     result.toArray().then((contact) => {
//         res.setHeader('Content-Type', 'application/json');
//         res.status(200).json(contact[0]);
//     });
// }

const getAll = async (req, res) => {
  try {
    // if (!ObjectId.isValid(req.params.id)) {
    //   return res.status(400).json({ message: "Invalid ID format" });
    // }

    // const contactId = ObjectId.createFromHexString(req.params.id); // Convert the string in 'req.params.id' to 'ObjectId' object to easy matching
    const db = database.getDatabase();
    const contacts = await db.collection("contacts").find().toArray();
    console.log(contacts);

    if (!contacts) {
      return res.status(404).json({ message: "Contacts not found" });
    }

    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const contactId = ObjectId.createFromHexString(req.params.id); // Convert the string in 'req.params.id' to 'ObjectId' object to easy matching
    const db = database.getDatabase();
    const contact = await db.collection("contacts").findOne({ _id: contactId });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {getAll, getSingle};