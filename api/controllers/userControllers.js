const { user } = require('../models');
const { encryptToken } = require('../middlewares');
const { encryptHandler } = require('../handlers');

const register = async (req, res, next) => {
  try {
    const {
      username,
      password,
      email,
      full_name,
      security_answer,
      security_question_id,
    } = req.body;
    const addUser = await user.create({
      username,
      password: encryptHandler(password),
      email,
      full_name,
      security_answer,
      security_question_id,
    });
    const getUser = await user.findAll({
      where: {
        id: addUser.id,
      },
      attributes: { exclude: 'password' },
    });
    const response = {
      ...getUser[0].dataValues,
      token: encryptToken(getUser[0].dataValues),
    };
    return res.status(200).send(response);
  } catch (err) {
    next(err);
  }
};

module.exports = { register };
