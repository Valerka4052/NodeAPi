const express = require('express');
const router = express.Router();
const { getAllContacts, getContact, addNewContact, deleteContact, updateContactById, updateStatusContact } = require('../../controllers/contacts');
const {validated, validteStatus, isValid} = require('../../middlewares/');
const { schemas } = require('../../models/contact');

router.get('/', getAllContacts);
router.get('/:id', isValid, getContact);
router.post('/', validated(schemas.addContactShema), addNewContact);
router.delete('/:id', isValid, deleteContact);
router.put('/:id', isValid, validated(schemas.addContactShema), updateContactById);
router.patch('/:id/favorite', isValid, validteStatus(schemas.updateFavoriteShema), updateStatusContact);

module.exports = router;