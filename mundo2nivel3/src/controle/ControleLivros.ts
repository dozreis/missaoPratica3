import { Livro } from "../modelo/Livro";

const livros: Array<Livro> = [
    new Livro(1, 1, "Livro 1", "Resumo do Livro 1", ["Autor A"]),
    new Livro(2, 2, "Livro 2", "Resumo do Livro 2", ["Autor B"]),
    new Livro(3, 3, "Livro 3", "Resumo do Livro 3", ["Autor C"]),
  ];

  export class ControleLivro {
    obterLivros(): Array<Livro> {
      return livros;
    }
  
    incluir(livro: Livro): void {
      const novoCodigo = livros.length > 0 ? livros[livros.length - 1].codigo + 1 : 1;
      livro.codigo = novoCodigo;
      livros.push(livro);
    }
  
    excluir(codigo: number): void {
      const indice = livros.findIndex(l => l.codigo === codigo);
      if (indice >= 0) {
        livros.splice(indice, 1);
      }
    }
  }
  