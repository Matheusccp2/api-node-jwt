const jwt = require("jsonwebtoken");

function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Acesso negado",
    });
  }

  try {
    const secret = process.env.SECRET;
    const decoded = jwt.verify(token, secret);
    
    // Adiciona as informações do usuário na requisição
    req.userId = decoded.userId;
    req.user = decoded;
    
    next();
  } catch (error) {
    // Trata especificamente token expirado
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expirado!",
      });
    }
    
    // Trata token inválido
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Token inválido!",
      });
    }
    
    // Outros erros
    return res.status(400).json({
      message: "Erro na autenticação",
    });
  }
}

module.exports = checkToken;