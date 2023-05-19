export default (req, res, next) => {
  // Verifica se o usuário possui permissão de administrador
  if (req.user.permissao !== 'administrador') {
    return res
      .status(403)
      .send({ error: 'Acesso negado. Permissão de administrador requerida.' });
  }

  // Se o usuário estiver autenticado e for administrador, permite o acesso à rota
  next();
};
