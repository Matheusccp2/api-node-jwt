const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register User
exports.register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Validations
  if (!name) {
    return res.status(422).json({ message: "Nome é obrigatório!" });
  }

  if (!email) {
    return res.status(422).json({ message: "Email é obrigatório!" });
  }

  if (!password) {
    return res.status(422).json({ message: "Senha é obrigatório!" });
  }

  if (password !== confirmPassword) {
    return res.status(422).json({ message: "As senhas não são iguais!" });
  }

  // Check if user exists
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    return res.status(422).json({ message: "Email já possui cadastro" });
  }

  // Create Password Hash
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  // Create User
  const user = new User({
    name,
    email,
    password: passwordHash,
  });

  try {
    await user.save();
    res.status(201).json({ message: "Usuario criado com sucesso!" });
  } catch (error) {
    res.status(500).json({
      message: "Aconteceu um erro no servidor, tente novamente mais tarde!",
    });
  }
};

// Login User
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Validations
  if (!email) {
    return res.status(422).json({ message: "Email é obrigatório!" });
  }

  if (!password) {
    return res.status(422).json({ message: "Senha é obrigatório!" });
  }

  // Check if user exists
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado!" });
  }

  // Check if password match
  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(422).json({ message: "Senha inválida!" });
  }

  try {
    const secret = process.env.SECRET;
    const token = jwt.sign({ userId: user._id }, secret, {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });

    res.status(200).json({
      message: "Autenticação realizada com sucesso",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Aconteceu um erro no servidor, tente novamente mais tarde!",
    });
  }
};
