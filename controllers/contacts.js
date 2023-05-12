const { HttpError, funcWrapper } = require('../helpers/');
const { Contact } = require('../models/contact');

const getAllContacts = async (req, res) => {
    const { _id } = req.user;
    const { page = 1, limit = 20, favorite } = req.query;
    const skip = (page - 1);
    if (favorite) {
        const contacts = await Contact.find({ owner: _id, favorite }, "-owner", { skip, limit });
        res.status(200).json(contacts);
    }
    else{
        const contacts = await Contact.find({ owner: _id }, "-owner", { skip, limit });
    res.status(200).json(contacts);
    }
 };

const getContact = async (req, res) => {
    const { id } = req.params;
    const { _id } = req.user;
    const contact = await Contact.findOne({ _id: id, owner: _id },"-owner");
    if (contact) return res.status(201).json(contact);
    throw HttpError(404, 'not found');
};

const addNewContact = async (req, res) => {
    const { _id } = req.user;
    const contact = await Contact.create({ ...req.body, owner: _id });
    res.status(201).json(contact);
};

const deleteContact = async (req, res) => {
    const { id } = req.params;
    const { _id } = req.user;
    const contact = await Contact.findByIdAndDelete({ _id: id, owner: _id });
    if (contact === null) throw HttpError(404, 'not found');
    return res.status(200).json({ message: "contact deleted" });
};

const updateContactById = async (req, res) => {
    const {body} = req
    const { id } = req.params;
    const { _id } = req.user;
    const contact = await Contact.findOneAndUpdate({ _id: id, owner: _id }, body,{ new: true });
    if (!contact) throw HttpError(404, 'not found');
    res.status(200).json(contact);
};

const updateStatusContact = async (req, res) => {
    const {body} = req;
    const { id } = req.params;
    const { _id } = req.user;
    const contact = await Contact.findOneAndUpdate({ _id: id, owner: _id }, body, { new: true });
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