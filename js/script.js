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
  '.sobre-container, .card, .experiencia, .formacao-card, .lista li, .categoria, .social'
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

// ===== Barra de progresso do curso =====
// Calcula a porcentagem pelo tempo entre o início e o fim do curso,
// então ela se atualiza sozinha com o passar dos meses.
document.querySelectorAll('.progresso').forEach((progresso) => {
  let porcentagem = 100;

  if (progresso.dataset.inicio) {
    const inicio = new Date(progresso.dataset.inicio);
    const fim = new Date(progresso.dataset.fim);
    const conta = (Date.now() - inicio) / (fim - inicio) * 100;
    porcentagem = Math.round(Math.min(100, Math.max(0, conta)));
  }

  const preenchido = progresso.querySelector('.progresso-preenchido');
  const valor = progresso.querySelector('.progresso-valor');

  // Só anima quando a barra aparece na tela
  const observador = new IntersectionObserver((entradas) => {
    if (!entradas[0].isIntersecting) return;
    observador.disconnect();
    preenchido.style.width = porcentagem + '%';

    // Número subindo junto com a barra
    let atual = 0;
    const passo = Math.max(1, Math.ceil(porcentagem / 50));
    const contador = setInterval(() => {
      atual = Math.min(porcentagem, atual + passo);
      valor.textContent = atual + '%';
      if (atual >= porcentagem) clearInterval(contador);
    }, 30);
  }, { threshold: 0.5 });

  observador.observe(progresso);
});

// ===== Detalhes dos projetos =====
// Para adicionar outro projeto: crie uma entrada aqui e coloque
// <button class="btn-detalhes" data-projeto="nome"> no card dele.
const projetos = {
  formulario: {
    titulo: 'Sistema de Cadastro e Login',
    tecnologias: ['PHP', 'MySQL'],
    imagens: [
      { src: 'imagens/formulario.png', legenda: 'Tela de login' },
      { src: 'imagens/formulario-cadastro.png', legenda: 'Formulário de cadastro com os dados pessoais' },
      { src: 'imagens/formulario-restrita.png', legenda: 'Página restrita, que só aparece depois do login' }
    ],
    secoes: [
      {
        titulo: 'O objetivo',
        texto: 'Praticar desenvolvimento web com PHP construindo a base de quase todo sistema: criar conta, entrar e proteger páginas que só usuários logados podem ver.'
      },
      {
        titulo: 'Como funciona',
        itens: [
          'O usuário se cadastra com nome, e-mail, senha, data de nascimento, telefone, sexo, CPF e cidade.',
          'A senha é guardada no banco com hash, nunca em texto puro.',
          'O login é feito com e-mail e senha.',
          'Depois de entrar, o usuário vê uma página restrita com o nome dele e pode sair da conta.'
        ]
      },
      {
        titulo: 'O que eu aprendi',
        itens: [
          'Ligar o PHP ao banco de dados MySQL para salvar e buscar usuários.',
          'Guardar senhas com segurança usando hash.',
          'Usar sessões para controlar quem está logado e bloquear o acesso de quem não está.'
        ]
      }
    ]
  },
  ipads: {
    titulo: 'Sistema de Agendamento de iPads',
    tecnologias: ['PHP', 'JavaScript'],
    imagens: [
      { src: 'imagens/emprestimo.png', legenda: 'Tela inicial do sistema' },
      { src: 'imagens/ipads-professor.png', legenda: 'Área do professor: nova reserva, calendário e minhas reservas' },
      { src: 'imagens/ipads-calendario.png', legenda: 'Calendário da equipe de tecnologia, com as reservas da semana por aula e local' }
    ],
    secoes: [
      {
        titulo: 'O objetivo',
        texto: 'Hoje o professor pede os iPads ou uma sala, e a equipe de tecnologia confere a disponibilidade, agenda e responde, tudo manualmente. O sistema vai deixar o próprio professor ver os horários livres e fazer a reserva, enquanto a equipe só acompanha e aprova.'
      },
      {
        titulo: 'Como funciona',
        itens: [
          'O professor reserva iPads, o Laboratório ou o Espaço Maker para uma aula.',
          'Ele vê os horários livres da semana e acompanha ou cancela as próprias reservas.',
          'A equipe de tecnologia vê um calendário semanal com todas as reservas, separadas por aula e por local, e pode imprimir.',
          'Reservas novas ficam em análise até a equipe responder.',
          'Há áreas para gerenciar espaços, iPads, usuários e o histórico de reservas.'
        ]
      },
      {
        titulo: 'O que estou aprendendo',
        itens: [
          'Criar um sistema com dois tipos de usuário, cada um vendo telas e permissões diferentes.',
          'Evitar reservas em conflito no mesmo horário e local.',
          'Levantar requisitos com quem vai usar o sistema no dia a dia.'
        ]
      }
    ]
  },
  perfumaria: {
    titulo: 'Sistema Perfumaria',
    tecnologias: ['PHP', 'JavaScript'],
    imagens: [
      { src: 'imagens/Login.jpg', legenda: 'Tela de login' },
      { src: 'imagens/perfumaria-clientes.png', legenda: 'Cadastro de clientes, com busca por nome ou telefone (nomes borrados para proteger os clientes)' },
      { src: 'imagens/perfumaria-pagamentos.png', legenda: 'Controle de pagamentos: quanto cada venda já recebeu e quanto falta (nomes borrados)' }
    ],
    secoes: [
      {
        titulo: 'O objetivo',
        texto: 'Substituir as anotações de uma pequena loja de perfumes por um sistema que organiza vendas, clientes e pagamentos em um só lugar. O sistema é usado no dia a dia da loja.'
      },
      {
        titulo: 'Como funciona',
        itens: [
          'Cadastro de clientes e perfumes, com busca por nome ou telefone.',
          'Registro de vendas, ligando cada venda ao cliente e aos perfumes vendidos.',
          'Controle de pagamentos: mostra o total, o valor pago e o que ainda falta receber, com filtro das vendas com saldo em aberto.',
          'Cálculo das margens de lucro de cada produto.'
        ]
      },
      {
        titulo: 'O que eu aprendi',
        itens: [
          'Modelar dados de um negócio real: clientes, produtos, vendas e pagamentos.',
          'Lidar com valores em dinheiro sem erros de arredondamento.',
          'Criar telas simples para quem não é da área de tecnologia usar todo dia.'
        ]
      }
    ]
  },
  barbearia: {
    titulo: 'Site Barbearia',
    tecnologias: ['PHP', 'MySQL'],
    imagens: [
      { src: 'imagens/barbearia.png', legenda: 'Página inicial da barbearia' },
      { src: 'imagens/barbearia-servicos.png', legenda: 'Escolha dos serviços, com preço e duração de cada um' },
      { src: 'imagens/barbearia-agenda.png', legenda: 'Painel do profissional com a agenda da semana' }
    ],
    secoes: [
      {
        titulo: 'O objetivo',
        texto: 'Construir um sistema de agendamento completo, como os que barbearias usam de verdade, em PHP puro e sem frameworks. A ideia era entender cada parte de um sistema web, do banco de dados à tela.'
      },
      {
        titulo: 'Como funciona',
        itens: [
          'O cliente marca um ou mais serviços e já vê o preço e o tempo de cada um.',
          'Depois escolhe o dia, o profissional e um horário livre.',
          'Cada profissional vê a agenda da semana, com os agendamentos e o horário de almoço bloqueado.',
          'Pelo painel dá para gerenciar serviços, profissionais, avaliações e horário de funcionamento.'
        ]
      },
      {
        titulo: 'O que eu aprendi',
        itens: [
          'Arquitetura em camadas, separando regras de negócio, acesso ao banco e telas.',
          'Documentar regras de negócio e escrever testes automatizados.',
          'Proteger o sistema contra os ataques mais comuns da web.'
        ]
      }
    ]
  }
};

const janelaProjeto = document.getElementById('projeto-detalhe');
const projetoImagem = document.getElementById('projeto-imagem');
const projetoLegenda = document.getElementById('projeto-legenda');
const projetoMiniaturas = document.getElementById('projeto-miniaturas');
let projetoAtual = null;
let imagemAtual = 0;

function mostrarImagem(indice) {
  const imagens = projetoAtual.imagens;
  imagemAtual = (indice + imagens.length) % imagens.length; // dá a volta no fim e no começo
  projetoImagem.src = imagens[imagemAtual].src;
  projetoImagem.alt = imagens[imagemAtual].legenda;
  projetoLegenda.textContent = imagens[imagemAtual].legenda;
  projetoMiniaturas.querySelectorAll('button').forEach((botao, i) => {
    botao.classList.toggle('ativa', i === imagemAtual);
  });
}

function abrirProjeto(nome) {
  projetoAtual = projetos[nome];
  if (!projetoAtual) return;

  document.getElementById('projeto-titulo').textContent = projetoAtual.titulo;

  const tecnologias = document.getElementById('projeto-tecnologias');
  tecnologias.innerHTML = '';
  projetoAtual.tecnologias.forEach((nomeTec) => {
    const li = document.createElement('li');
    li.textContent = nomeTec;
    tecnologias.appendChild(li);
  });

  // Miniaturas embaixo da imagem principal
  projetoMiniaturas.innerHTML = '';
  projetoAtual.imagens.forEach((imagem, i) => {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.setAttribute('aria-label', imagem.legenda);
    const mini = document.createElement('img');
    mini.src = imagem.src;
    mini.alt = '';
    botao.appendChild(mini);
    botao.addEventListener('click', () => mostrarImagem(i));
    projetoMiniaturas.appendChild(botao);
  });

  // Textos: cada seção tem um parágrafo ou uma lista
  const secoes = document.getElementById('projeto-secoes');
  secoes.innerHTML = '';
  projetoAtual.secoes.forEach((secao) => {
    const titulo = document.createElement('h4');
    titulo.textContent = secao.titulo;
    secoes.appendChild(titulo);

    if (secao.texto) {
      const p = document.createElement('p');
      p.textContent = secao.texto;
      secoes.appendChild(p);
    }
    if (secao.itens) {
      const ul = document.createElement('ul');
      secao.itens.forEach((texto) => {
        const li = document.createElement('li');
        li.textContent = texto;
        ul.appendChild(li);
      });
      secoes.appendChild(ul);
    }
  });

  mostrarImagem(0);
  janelaProjeto.showModal();
  janelaProjeto.scrollTop = 0;
}

document.querySelectorAll('[data-projeto]').forEach((botao) => {
  botao.addEventListener('click', () => abrirProjeto(botao.dataset.projeto));
});

janelaProjeto.querySelector('.galeria-anterior').addEventListener('click', () => mostrarImagem(imagemAtual - 1));
janelaProjeto.querySelector('.galeria-proxima').addEventListener('click', () => mostrarImagem(imagemAtual + 1));
janelaProjeto.querySelector('.fechar').addEventListener('click', () => janelaProjeto.close());

// Fecha clicando fora da janela
janelaProjeto.addEventListener('click', (evento) => {
  if (evento.target === janelaProjeto) janelaProjeto.close();
});

// Setas do teclado trocam a imagem
janelaProjeto.addEventListener('keydown', (evento) => {
  if (evento.key === 'ArrowLeft') mostrarImagem(imagemAtual - 1);
  if (evento.key === 'ArrowRight') mostrarImagem(imagemAtual + 1);
});
