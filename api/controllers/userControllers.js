const { user, securityQuestion, role, emailVerification, userStatus } = require('../models');
const { QueryTypes } = require('sequelize');
const sequelize = require('../database');

// choose one of these
// belongsTo || hasOne/hasMany
user.belongsTo(securityQuestion, {
  // custom foreign key attribute/column name on users model's
  foreignKey: {
    name: 'security_question_id',
  },
});
// securityQuestions.hasOne(users, {
//   foreignKey: {
//     name: 'security_question_id',
//   },
// });
user.belongsTo(role, {
  // custom foreign key attribute/column name on users model's
  foreignKey: {
    name: 'role_id',
  },
});
user.belongsTo(emailVerification, {
  // custom foreign key attribute/column name on users model's
  foreignKey: {
    name: 'email_verification_id',
  },
});
user.belongsTo(userStatus, {
  // custom foreign key attribute/column name on users model's
  foreignKey: {
    name: 'user_status_id',
  },
});

const test = async (req, res) => {
  try {
    // How to join with query
    // const [getUsers] = await sequelize.query(
    //   `SELECT sq.question FROM users u JOIN security_questions sq on sq.id = u.security_question_id`
    // );

    // How to join with sequelize method
    const getUsers = await user.findAll({
      raw: true,
      attributes: [
        //   'id',
        'email',
        'full_name',
        //   'password',
        //   'imagepath',
        //   'security_answer',
        //   'phone',
        //   'role_id',
        //   'security_question_id',
        //   'email_verification_id',
        //   'user_status_id',
        'user_status.status',
        'email_verification.status',
        'role.role',
        'security_question.question',
      ],
      include: [
        {
          model: securityQuestion,
          attributes: [],
        },
        {
          model: role,
          attributes: [],
        },
        {
          model: userStatus,
          attributes: [],
        },
        {
          model: emailVerification,
          attributes: [],
        },
      ],
    });
    return res.status(200).send(getUsers);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const getAll = async (req, res) => {
  try {
    const [getUsers] = await users.findAll();
    return res.status(200).send(getUsers);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const login = async (req, res) => {
  try {
    const getUser = await users.findAll({
      where: {
        username: req.body.username,
        password: req.body.password,
      },
    });
    return res.status(200).send(getUser);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    console.log(req.body);
    const addUser = await users.create({
      username,
      password,
      email,
    });
    const getUser = await users.findByPk(addUser.id);
    return res.status(200).send(getUser);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const deleteAccount = async (req, res) => {
  try {
    await users.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).send('success delete account');
  } catch (err) {
    return res.status(500).send(err);
  }
};

const changeUsername = async (req, res) => {
  try {
    await users.update(
      {
        username: req.body.username,
      },
      where
    );
    return res.status(200).send('success delete account');
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = { test, login, register, deleteAccount, getAll };
