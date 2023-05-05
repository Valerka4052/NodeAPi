const { HttpError, funcWrapper } = require('../helpers/');
const { Contact } = require('../models/contact');

const getAllContacts = async (req, res) => {
    const contacts = await Contact.find();
    console.log(contacts);
    res.status(200).json(contacts);
};

const getContact = async (req, res) => {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (contact) return res.status(201).json(contact);
    throw HttpError(404, 'not found');
};

const addNewContact = async (req, res) => {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
};

const deleteContact = async (req, res) => {
    const { id } = req.params;
    const contact = await Contact.findByIdAndDelete(id);
    if (contact === null) throw HttpError(404, 'not found');
    return res.status(200).json({ message: "contact deleted" });
};

const updateContactById = async (req, res) => {
    const {body} = req
    const { id } = req.params;
    const contact = await Contact.findByIdAndUpdate(id, body, { new: true });
    if (!contact) throw HttpError(404, 'not found');
    res.status(200).json(contact);
};

const updateStatusContact = async (req, res) => {
    const {body} = req;
    const { id } = req.params;
    const contact = await Contact.findByIdAndUpdate(id, body, { new: true });
    if (!contact) throw HttpError(404, 'not found');
    res.status(200).json(contact);
};

module.exports = {
    getAllContacts: funcWrapper(getAllContacts),
    getContact: funcWrapper(getContact),
    addNewContact: funcWrapper(addNewContact),
    deleteContact: funcWrapper(deleteContact),
    updateContactById: funcWrapper(updateContactById),
    updateStatusContact: funcWrapper(updateStatusContact),
};