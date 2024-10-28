import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ControleLivro } from "./controle/ControleLivros";
import { ControleEditora } from "./controle/ControleEditora";

const controleLivro = new ControleLivro();
const controleEditora = new ControleEditora();

const LivroDados = () => {
  const [titulo, setTitulo] = useState("");
  const [resumo, setResumo] = useState("");
  const [autores, setAutores] = useState("");
  const [codEditora, setCodEditora] = useState(1);
  const navigate = useNavigate();

  // Função para tratar a seleção de editora
  const tratarCombo = (event) => {
    setCodEditora(Number(event.target.value));
  };

  // Função para incluir um novo livro
  const incluir = (event) => {
    event.preventDefault();
    const livro = {
      codigo: 0,
      codEditora,
      titulo,
      resumo,
      autores: autores.split("\n"),
    };
    controleLivro.incluir(livro);
    navigate("/");
  };

  return (
    <main>
      <h1>Cadastro de Livro</h1>
      <form onSubmit={incluir}>
        <div>
          <label>Título:</label>
          <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        </div>
        <div>
          <label>Resumo:</label>
          <textarea value={resumo} onChange={(e) => setResumo(e.target.value)} />
        </div>
        <div>
          <label>Autores (separados por linha):</label>
          <textarea value={autores} onChange={(e) => setAutores(e.target.value)} />
        </div>
        <div>
          <label>Editora:</label>
          <select value={codEditora} onChange={tratarCombo}>
            {controleEditora.getEditoras().map((editora) => (
              <option key={editora.codEditora} value={editora.codEditora}>
                {editora.nome}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Salvar</button>
      </form>
    </main>
  );
};

export default LivroDados;
