const router = require('express').Router();
const { v4 } = require('uuid');
const fs = require('fs/promises');
const path = require('path');
const contacts = require('./contacts.json');

const contactsPath = path.join(__dirname, 'contacts.json');

router.get('/', (_, res) => {
  res.send('<h1>Router</h1>');
});

//TODO: GET all
router.get('/contacts', async (_, res) => {
  // console.log({
  //   success: true,
  //   code: 200,
  //   data: {
  //     results: contacts,
  //     total: contacts.length,
  //   },
  // });

  res.json({
    success: true,
    code: 200,
    data: {
      results: contacts,
      total: contacts.length,
    },
  });
});

//TODO: GET by id
router.get('/contacts/:id', (req, res) => {
  const { id } = req.params;
  const contact = contacts.find(contact => contact.id === id);

  // for terminal
  // console.log(
  //   'result: '.blue,
  //   !contact
  //     ? {
  //         success: false,
  //         code: 404,
  //         message: 'contact not found',
  //       }
  //     : {
  //         success: true,
  //         code: 200,
  //         data: {
  //           results: contact,
  //         },
  //       }
  // );

  // for postman
  if (!contact) {
    res.status(404).json({
      success: false,
      code: 404,
      message: 'contact not found',
    });
  }

  res.json({
    success: true,
    code: 200,
    data: {
      results: contact,
    },
  });
});

//TODO: POST request
router.post('/contacts', async (req, res) => {
  const newContact = { id: v4(), ...req.body };
  console.log(newContact);
  contacts.push(newContact);
  res.status(201).json({
    success: true,
    code: 201,
    data: {
      results: newContact,
    },
  });

  await fs.writeFile(contactsPath, JSON.stringify(contacts));
});

//TODO: DELETE request
router.delete('/contacts/:id', async (req, res) => {
  const { id } = req.params;
  const idx = contacts.findIndex(contact => contact.id === id);
  if (idx === -1) {
    console.log('Contact not found'.red);
    return null;
  }

  const [contactDeleted] = contacts.splice(idx, 1);
  console.log('contactDeleted: '.blue, contactDeleted);
  res.status(202).json({
    success: true,
    code: 202,
    data: {
      results: contactDeleted,
    },
  });

  await fs.writeFile(contactsPath, JSON.stringify(contacts));
});

module.exports = router;
