// ===== Sempre abrir a página no topo =====
// O navegador guarda a posição da rolagem e o #ancora da URL.
// Sem isso, ao atualizar a página ela pulava direto para "Contato".
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
if (window.location.hash) {
  history.replaceState(null, '', window.location.pathname + window.location.search);
}
window.addEventListener('load', () => {
  window.scrollTo({ top: 0, behavior: 'instant' });
});

// ===== O que eu sei fazer com cada habilidade =====
const habilidades = {
  html: {
    titulo: 'HTML',
    itens: [
      'Estrutura semântica de páginas (header, main, section, article)',
      'Formulários de cadastro, login e agendamento',
      'Páginas organizadas e acessíveis',
      'Projetos publicados: Projeto Android e Projeto Cordel'
    ]
  },
  css: {
    titulo: 'CSS',
    itens: [
      'Layouts com Flexbox e Grid',
      'Sites responsivos com media queries',
      'Transições, animações e efeitos de hover',
      'Imagens de fundo e tipografia personalizada'
    ]
  },
  javascript: {
    titulo: 'JavaScript',
    itens: [
      'Manipulação do DOM e eventos',
      'Interações na página, como este mini card',
      'Validação de formulários',
      'Consumo de APIs com fetch e JSON'
    ]
  },
  node: {
    titulo: 'Node.js',
    itens: [
      'JavaScript no back-end',
      'Instalação de pacotes com npm',
      'Criação de servidores e rotas simples'
    ]
  },
  php: {
    titulo: 'PHP',
    itens: [
      'Sistemas em PHP puro, sem frameworks',
      'Cadastro, login e páginas restritas com sessões',
      'Arquitetura em camadas e regras de negócio',
      'Proteção contra ataques comuns da web e testes automatizados'
    ]
  },
  laravel: {
    titulo: 'Laravel',
    itens: [
      'Rotas, controllers e views com Blade',
      'Banco de dados com Eloquent e migrations',
      'Organização de projetos no padrão MVC'
    ]
  },
  apis: {
    titulo: 'APIs',
    itens: [
      'Consumo de APIs REST',
      'Troca de dados em formato JSON',
      'Integração entre front-end e back-end'
    ]
  },
  python: {
    titulo: 'Python',
    itens: [
      'Lógica de programação e estruturas de dados',
      'Funções, condicionais e laços de repetição',
      'Scripts para automatizar tarefas'
    ]
  },
  mysql: {
    titulo: 'MySQL',
    itens: [
      'Modelagem de tabelas e relacionamentos',
      'Consultas SQL (SELECT, INSERT, UPDATE, DELETE, JOIN)',
      'CRUD completo integrado com PHP',
      'Bancos para agendamentos, usuários e controle financeiro'
    ]
  },
  git: {
    titulo: 'Git e GitHub',
    itens: [
      'Versionamento de código com commits',
      'Repositórios remotos no GitHub',
      'Publicação de sites com GitHub Pages'
    ]
  },
  office: {
    titulo: 'Pacote Office',
    itens: [
      'Word, Excel e PowerPoint',
      'Ferramentas do Microsoft 365 (Teams, OneDrive, Forms)',
      'Suporte a usuários no uso das ferramentas',
      'Criação de conteúdos e apresentações educacionais'
    ]
  }
};

const card = document.getElementById('card-habilidade');
const cardTitulo = document.getElementById('card-titulo');
const cardLista = document.getElementById('card-lista');

document.querySelectorAll('[data-habilidade]').forEach((botao) => {
  botao.addEventListener('click', () => {
    const habilidade = habilidades[botao.dataset.habilidade];
    if (!habilidade) return;

    cardTitulo.textContent = habilidade.titulo;
    cardLista.innerHTML = '';
    habilidade.itens.forEach((texto) => {
      const li = document.createElement('li');
      li.textContent = texto;
      cardLista.appendChild(li);
    });

    card.showModal();
  });
});

// Fecha no "x" ou clicando fora do card (a tecla Esc já fecha sozinha)
card.querySelector('.fechar').addEventListener('click', () => card.close());
card.addEventListener('click', (evento) => {
  if (evento.target === card) card.close();
});

// ===== Menu: rolagem suave sem colocar #ancora na URL =====
const linksMenu = document.querySelectorAll('.nav a');

document.querySelectorAll('.nav a, .logo').forEach((link) => {
  link.addEventListener('click', (evento) => {
    const destino = document.querySelector(link.getAttribute('href'));
    if (!destino) return;
    evento.preventDefault();
    fecharMenu();
    destino.scrollIntoView({ behavior: 'smooth' });
  });
});

// ===== Menu de celular (botão ☰) =====
const menu = document.getElementById('menu');
const menuBotao = document.querySelector('.menu-botao');

function fecharMenu() {
  menu.classList.remove('aberto');
  menuBotao.setAttribute('aria-expanded', 'false');
  menuBotao.setAttribute('aria-label', 'Abrir menu');
}

menuBotao.addEventListener('click', () => {
  const abrir = !menu.classList.contains('aberto');
  menu.classList.toggle('aberto', abrir);
  menuBotao.setAttribute('aria-expanded', abrir);
  menuBotao.setAttribute('aria-label', abrir ? 'Fechar menu' : 'Abrir menu');
});

// Fecha ao clicar fora do menu ou apertar Esc
document.addEventListener('click', (evento) => {
  if (!evento.target.closest('.header')) fecharMenu();
});
document.addEventListener('keydown', (evento) => {
  if (evento.key === 'Escape') fecharMenu();
});

// ===== Destacar no menu a seção que está na tela =====
const secoes = document.querySelectorAll('main section');

const observadorMenu = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (!entrada.isIntersecting) return;
    linksMenu.forEach((link) => {
      link.classList.toggle('ativo', link.getAttribute('href') === '#' + entrada.target.id);
    });
  });
}, { rootMargin: '-45% 0px -50% 0px' });

secoes.forEach((secao) => observadorMenu.observe(secao));

// ===== Cabeçalho com sombra e botão "voltar ao topo" =====
const header = document.querySelector('.header');
const botaoTopo = document.getElementById('voltar-topo');

function aoRolar() {
  const rolou = window.scrollY > 80;
  header.classList.toggle('rolado', rolou);
  botaoTopo.classList.toggle('visivel', window.scrollY > 600);
}
window.addEventListener('scroll', aoRolar, { passive: true });
aoRolar();

botaoTopo.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Elementos aparecem suavemente ao rolar =====
const animados = document.querySelectorAll(
  '.sobre-container, .card, .experiencia, .lista li, .categoria, .social'
);

const observadorAnimacao = new IntersectionObserver((entradas, observador) => {
  entradas.forEach((entrada) => {
    if (!entrada.isIntersecting) return;
    entrada.target.classList.add('aparecer');
    observador.unobserve(entrada.target);
    // Depois de aparecer, tira o atraso para não atrapalhar outros efeitos
    entrada.target.addEventListener('transitionend', () => {
      entrada.target.style.transitionDelay = '';
    }, { once: true });
  });
}, { threshold: 0.15 });

animados.forEach((elemento, i) => {
  elemento.classList.add('animar');
  // Pequeno atraso em sequência para itens do mesmo grupo
  elemento.style.transitionDelay = (i % 3) * 0.1 + 's';
  observadorAnimacao.observe(elemento);
});
