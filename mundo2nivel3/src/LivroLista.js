import React, { useState, useEffect } from "react"; // Certifique-se de que useState e useEffect estão sendo importados corretamente
import { ControleLivro } from "./controle/ControleLivros";
import { ControleEditora } from "./controle/ControleEditora";

// Instancia os controladores
const controleLivro = new ControleLivro();
const controleEditora = new ControleEditora();

// Componente LinhaLivro
const LinhaLivro = ({ livro, excluir }) => {
  const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

  return (
    <tr>
      <td>{livro.titulo}</td>
      <td>{nomeEditora}</td>
      <td>{livro.resumo}</td>
      <td>
        <ul>
          {livro.autores.map((autor, index) => (
            <li key={index}>{autor}</li>
          ))}
        </ul>
      </td>
      <td>
        <button onClick={() => excluir(livro.codigo)}>Excluir</button>
      </td>
    </tr>
  );
};

// Componente principal LivroLista
const LivroLista = () => {
  const [livros, setLivros] = useState([]); // Cria o estado dos livros
  const [carregado, setCarregado] = useState(false); // Cria o estado de carregamento

  // useEffect para carregar os livros na montagem do componente
  useEffect(() => {
    if (!carregado) {
      const livrosObtidos = controleLivro.obterLivros(); // Obtém os livros
      setLivros(livrosObtidos); // Atualiza o estado com os livros obtidos
      setCarregado(true); // Define como carregado
    }
  }, [carregado]); // O efeito depende de 'carregado'

  // Função para excluir um livro e atualizar o estado
  const excluir = (codigo) => {
    controleLivro.excluir(codigo); // Exclui o livro do controlador
    setCarregado(false); // Redefine 'carregado' para forçar o redesenho
  };

  return (
    <main>
      <h1>Lista de Livros</h1>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Editora</th>
            <th>Resumo</th>
            <th>Autores</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {livros.map((livro) => (
            <LinhaLivro key={livro.codigo} livro={livro} excluir={excluir} />
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default LivroLista;
