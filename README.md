# Portfólio | Kauan Felix

Site pessoal de portfólio, feito para apresentar minha trajetória como desenvolvedor Full Stack em início de carreira: sobre mim, projetos, habilidades, certificados e contato.

🔗 **Acesse online:** https://kauanfelixsilva.github.io/portif-lio/

## Ferramentas e tecnologias utilizadas

- **HTML5** — estrutura semântica das seções
- **CSS3** — layout com Flexbox e CSS Grid, responsivo via media queries
- **JavaScript** (vanilla) — pequeno script para limpar o hash da URL após navegação pelo menu
- **Google Fonts** — fonte [Poppins](https://fonts.google.com/specimen/Poppins)
- **GitHub Pages** — hospedagem e deploy do site estático
- **Git/GitHub** — versionamento de código

## Estrutura do projeto

```
portifolio/
├── index.html          # Página única com todas as seções
├── style.css           # Estilos globais e responsivos
├── curriculo.pdf        # Currículo disponível para download
├── imagens/             # Fotos, imagens de fundo e thumbnails dos projetos
└── .gitignore
```

## Seções da página

- **Sobre** — apresentação pessoal e botão de download do currículo
- **Projetos** — cards com links para projetos publicados no GitHub Pages
- **Habilidades** — lista das tecnologias que domino
- **Certificados** — cursos concluídos, organizados por Front-end, Back-end e Extras
- **Contato** — e-mail, GitHub e LinkedIn

## Como rodar localmente

Por ser um site estático (sem build ou dependências), basta abrir o `index.html` diretamente no navegador, ou servir a pasta com um servidor simples:

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Autor

**Kauan Felix da Silva**
- [GitHub](https://github.com/kauanfelixsilva)
- [LinkedIn](https://www.linkedin.com/in/kauan-felix-da-silva-8a4546295)
