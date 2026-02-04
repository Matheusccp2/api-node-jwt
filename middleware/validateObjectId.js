const mongoose = require("mongoose");

const validateObjectId = (paramName = "id") => {
  return (req, res, next) => {
    const id = req.params[paramName];

    // Verifica se o ID existe
    if (!id) {
      return res.status(400).json({
        error: "ID não fornecido",
        message: `O parâmetro '${paramName}' é obrigatório`,
      });
    }

    // Valida se é um ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "ID inválido",
        message: `O parâmetro '${paramName}' não é um ObjectId válido do MongoDB`,
      });
    }

    next();
  };
};

module.exports = validateObjectId;