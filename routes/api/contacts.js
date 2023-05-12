const express = require('express');
const router = express.Router();
const { getAllContacts, getContact, addNewContact, deleteContact, updateContactById, updateStatusContact } = require('../../controllers/contacts');
const { validated, authentificate, isValid } = require('../../middlewares/');
const { schemas } = require('../../models/contact');


router.get('/',authentificate , getAllContacts);
router.get('/:id',authentificate , isValid, getContact);
router.post('/',authentificate , validated(schemas.addContactShema), addNewContact);
router.delete('/:id',authentificate , isValid, deleteContact);
router.put('/:id',authentificate , isValid, validated(schemas.addContactShema), updateContactById);
router.patch('/:id/favorite',authentificate , isValid, validated(schemas.updateFavoriteShema), updateStatusContact);

module.exports = router;