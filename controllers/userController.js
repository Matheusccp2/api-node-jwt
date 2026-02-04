const User = require("../models/User");

// Get User by ID
exports.getUser = async (req, res) => {
 try {
    const { id } = req.params;

    // ✅ ID já foi validado pelo middleware validateObjectId
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ 
        message: "Usuário não encontrado" 
      });
    }

    // ✅ Retorna o objeto diretamente, sem envolver em { user: ... }
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).json({ 
      message: "Erro ao buscar usuário" 
    });
  }
};