const bcrypt = require("bcrypt");
const { User } = require("../../../models");
module.exports = async (req, res) => {
  //nama, email, password
  const { body } = req;

  //validate user input
  if (!body.name || !body.email || !body.password)
    return res.status(400).json({
      message: "Name, email, password must be provided",
    });

  //check if email already exists
  const isEmailUsed = await User.findOne({
    where: { email: body.email },
  });

  if (isEmailUsed) {
    return res.status(400).json({
      message: "Email has already been used",
    });
  }

  const password = bcrypt.hashSync(body.password, 10);
  const user = await User.create({
    name: body.name,
    email: body.email,
    password,
  });

  return res.json({
    id: user.id,
    name: user.name,
    email: user.email,
  });
};
