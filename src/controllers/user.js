const User = require('../models/user');
const { deleteUserAccount } = require('../services/cognitoService');
const { sendEmployeeWelcome } = require('../services/emailSender'); 

exports.createUser = async (req, res) => {
  try {
    const { body } = req;

    const user = await User.create(body);

    // no bloquea el response si SendGrid tarda o falla
    Promise.resolve()
      .then(() => sendEmployeeWelcome(user))
      .catch((err) => {
        console.error('Error enviando mail de bienvenida (employee):', err);
      });

    return res.status(201).json(user);
  } catch (error) {
    console.error('Error creating User:', error);
    return res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.findAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching Users:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.findUserByEmail = async (req, res) => {
  try {
      const { email } = req.params;
      const user = await User.findUserByEmail(email);
      if (!user) {
          return res.status(404).json({ error: 'User not found with email: ' + email });
      }
      res.status(200).json(user);
  } catch (error) {
      console.error('Error fetching user by email:', error);
      res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.findUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: `User not found with id: ${id}` });
    }
  } catch (error) {
    console.error('Error fetching User by ID:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (user) {
      await user.update(body);
      res.status(200).json(user); 
    } else {
      res.status(404).json({ error: `User not found with id: ${id}` });
    }
  } catch (error) {
    console.error('Error updating User:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (user) {
      const user_email = user.email 
      await user.destroy();
      await deleteUserAccount(user_email)
      res.status(200).json({ message: 'User successfully deleted' }); 
    } else {
      res.status(404).json({ error: `User not found with id: ${id}` });
    }
  } catch (error) {
    console.error('Error deleting User:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};
