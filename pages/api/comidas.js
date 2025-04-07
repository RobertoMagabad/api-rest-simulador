let bancoDeComidas = [
  { id: 1, nome: "Salada de Quinoa", calorias: 180, descricao: "Fonte de fibras e proteínas." },
  { id: 2, nome: "Frango Grelhado", calorias: 250, descricao: "Rico em proteína e baixo carboidrato." }
];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const novaComida = req.body;
    const novoId = bancoDeComidas.length + 1;
    const comidaComId = { ...novaComida, id: novoId };
    bancoDeComidas.push(comidaComId);

    return res.status(201).json({ mensagem: "Comida adicionada!", comida: comidaComId });
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    const index = bancoDeComidas.findIndex(item => item.id === Number(id));

    if (index === -1) {
      return res.status(404).json({ erro: "Comida não encontrada para exclusão." });
    }

    const comidaRemovida = bancoDeComidas.splice(index, 1)[0];

    return res.status(200).json({
      mensagem: "Comida removida com sucesso!",
      comida: comidaRemovida
    });
  }

  if (req.method === 'PUT') {
    const { id } = req.query;
    const novaComida = req.body;

    const index = bancoDeComidas.findIndex(item => item.id === Number(id));
    if (index === -1) {
      return res.status(404).json({ erro: "Comida não encontrada" });
    }

    bancoDeComidas[index] = { ...novaComida, id: Number(id) };
    return res.status(200).json({
      mensagem: "Comida substituída com sucesso!",
      comida: bancoDeComidas[index]
    });
  }

  if (req.method === 'PATCH') {
    const { id } = req.query;
    const dadosParciais = req.body;

    const index = bancoDeComidas.findIndex(item => item.id === Number(id));
    if (index === -1) {
      return res.status(404).json({ erro: "Comida não encontrada para atualização parcial." });
    }

    bancoDeComidas[index] = {
      ...bancoDeComidas[index],
      ...dadosParciais
    };

    return res.status(200).json({
      mensagem: "Comida atualizada parcialmente com sucesso!",
      comida: bancoDeComidas[index]
    });
  }

  return res.status(405).json({ erro: "Método não suportado para esta rota." });
}
