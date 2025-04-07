import { useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';

export default function Home() {
  const [resposta, setResposta] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const [historico, setHistorico] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  function exibirMensagem(texto) {
    setMensagem(texto);
    setTimeout(() => setMensagem(''), 3000);
  }

  function adicionarHistorico(acao) {
    setHistorico((prev) => [...prev, `[${acao}] ${new Date().toLocaleTimeString()}`]);
  }

  async function enviarPost() {
    const res = await fetch('/api/comidas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: 'Roberto',
        calorias: 250,
        descricao: 'Prato novo criado com PATCH'
      })
    });
    const data = await res.json();
    setResposta(data);
    exibirMensagem('✅ Comida criada com sucesso!');
    adicionarHistorico('POST');
  }

  async function atualizarComida() {
    const res = await fetch('/api/comidas?id=1', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: 'Tigela Vegana',
        calorias: 220,
        descricao: 'Arroz integral, grão-de-bico e legumes no vapor.'
      })
    });
    const data = await res.json();
    setResposta(data);
    exibirMensagem('✅ Comida atualizada com sucesso!');
    adicionarHistorico('PUT');
  }

  async function patchComida() {
    const res = await fetch('/api/comidas?id=1', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        descricao: 'Atualizado: agora com molho de iogurte.'
      })
    });
    const data = await res.json();
    setResposta(data);
    exibirMensagem('✅ Descrição atualizada com sucesso!');
    adicionarHistorico('PATCH');
  }

  async function deletarComida() {
    const res = await fetch('/api/comidas?id=1', {
      method: 'DELETE'
    });
    const data = await res.json();
    setResposta(data);
    exibirMensagem('✅ Comida removida com sucesso!');
    adicionarHistorico('DELETE');
  }

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white py-10 px-4 flex flex-col items-center font-sans transition-colors duration-300">
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`text-2xl px-4 py-2 rounded-full transition-all duration-300 shadow-md
            ${darkMode
              ? 'bg-gray-800 text-yellow-300 hover:shadow-yellow-400'
              : 'bg-slate-200 text-slate-600 hover:text-gray-900'
            }`}
          aria-label="Alternar modo escuro"
          data-tip={darkMode ? 'Modo Claro ☀️' : 'Modo Escuro 🌙'}
        >
          {darkMode ? '☀️' : <span className="animate-pulse">🌙</span>}
        </button>
      </div>

      <h1 className="text-3xl font-bold text-blue-800 dark:text-blue-300 mb-6">
        Testes de API - POST / PUT / PATCH / DELETE
      </h1>

      {mensagem && (
        <div className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-lg mb-6 transition-all duration-300">
          {mensagem}
        </div>
      )}

      <div className="flex flex-wrap gap-4 mb-8 text-center">
        <button
          onClick={enviarPost}
          aria-label="Cadastra nova comida usando POST"
          data-tip="Cria nova comida (POST)"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition duration-200"
        >
          Enviar Nova Comida
        </button>

        <button
          onClick={atualizarComida}
          aria-label="Atualiza toda a comida com PUT"
          data-tip="Atualiza comida completa (PUT)"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md transition duration-200"
        >
          Atualizar Comida
        </button>

        <button
          onClick={patchComida}
          aria-label="Atualiza parcialmente a comida com PATCH"
          data-tip="Atualiza descrição (PATCH)"
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg shadow-md transition duration-200"
        >
          Atualizar Descrição
        </button>

        <button
          onClick={deletarComida}
          aria-label="Remove a comida com DELETE"
          data-tip="Remove comida (DELETE)"
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow-md transition duration-200"
        >
          Remover Comida
        </button>

        <ReactTooltip
          effect="solid"
          place="top"
          className="rounded-lg text-sm px-3 py-2 bg-black text-white shadow-lg"
        />
      </div>

      {resposta && (
        <pre className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-4 rounded shadow max-w-xl w-full transition">
          {JSON.stringify(resposta, null, 2)}
        </pre>
      )}

      {historico.length > 0 && (
        <div className="mt-8 max-w-xl w-full">
          <h2 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">
            Histórico de ações:
          </h2>
          <ul className="bg-white dark:bg-gray-800 p-4 rounded shadow space-y-1 text-sm text-gray-700 dark:text-gray-100 transition">
            {historico.map((item, i) => (
              <li key={i}>👉 {item}</li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
