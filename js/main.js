// ==========================================================
// COMPONENTE HEADER (INTELIGENTE E RESPONSIVO)
// ==========================================================
class AquaHeader extends HTMLElement {
  connectedCallback() {
    const path = window.location.pathname;
    const page = path.split("/").pop() || "index.html";

    this.innerHTML = `
    <div class="top-bar">
        <div class="container">
            <span>Nossos especialistas estão esperando por você.</span>
            <span>Fale conosco: <a href="tel:+5521981416653">(21) 98141-6653</a></span>
        </div>
    </div>

    <header class="header">
        <div class="container">
          <a href="/">
            <div class="logo">
                <img src="../img/logo sem circulo.png" alt="Aqua Engenharia">
            </div>
          </a>

            <button class="menu-toggle" id="btnMenu"><i class="fas fa-bars"></i></button>

            <nav class="nav-menu" id="menuNavegacao">
                <a href="/quem-somos/">QUEM SOMOS</a>

                <div class="dropdown">
                    <a href="#solucoes" class="drop-btn">SOLUÇÕES <i class="fas fa-chevron-down"></i></a>
                    <ul class="dropdown-content">
                      <li><a href="/ferro/">Filtro para ferro e manganês</a></li>
                      <li><a href="/abrandadores/">Filtro para água dura</a></li>
                      <li><a href="/osmose/">Dessalinizador (osmose)</a></li>
                      <li><a href="/filtros-centrais/">Filtro Central</a></li>
                      <li><a href="/nitrato/">Filtro para Nitrato</a></li>
                    </ul>
                </div>

                <a href="/contato/">CONTATO</a>
                <a href="/loja/" class="btn" style="padding: 10px 20px; margin-top: 5px;">LOJA VIRTUAL</a>
            </nav>
        </div>
    </header>
        `;

  }
}
customElements.define('aqua-header', AquaHeader);

// ==========================================================
// COMPONENTE FOOTER
// ==========================================================
class AquaFooter extends HTMLElement {
  connectedCallback() {
    // const anoAtual = new Date().getFullYear();
    this.innerHTML = `
        <footer class="footer">
        <div class="container footer-grid">
            <div class="footer-col">
                <img src="../img/logo sem circulo.png" alt="Logo" style="height: 65px; margin-bottom: 10px;">
                <p>Especialistas em engenharia de tratamento de água com alto desempenho.</p>
            </div>
            <div class="footer-col">
                <h4>HORÁRIO DE FUNCIONAMENTO</h4>
                <ul>
                    <li>Seg a Sex: 8h às 18h</li>
                    <li>Sáb: 8h às 12h</li>
                    <li>Dom e Feriados: Fechado</li>
                    <li>Atendimento de emergência 24h</li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>CONTATO</h4>
                <ul>
                    <li>Telefone: <a href="tel:+552126588496">(21) 2658-8496</a></li>
                    <li>WhatsApp: <a href="https://wa.me/5521981416653" target="_blank">(21) 98141-6653</a></li>
                    <li>E-mail: <a href="mailto:contato@aquaengenharia.com.br">contato@aquaengenharia.com.br</a></li>
                </ul>
                <div class="redes-sociais">
                    <a href="https://www.facebook.com/profile.php?id=61564195798798">
                        <div><i class="fab fa-facebook-f"></i></div>
                    </a>
                    <a href="https://www.instagram.com/aquaengenhariarj/">
                        <div><i class="fab fa-instagram"></i></div>
                    </a>
                    <a href="https://www.youtube.com/channel/UCCB28YHe7hQiGfT33Rm4LNw">
                        <div><i class="fab fa-youtube"></i></div>
                    </a>
                </div>
                <p style="text-align: right;">Desenvolvido por Mellonry</p>
            </div>
            </div>
    </footer>

        <a href="https://wa.me/5521995571452?text=Olá! Vim através do site e gostaria de mais informações sobre tratamento de água." class="whatsapp-fixo" target="_blank"
        rel="noopener noreferrer">
        <i class="fab fa-whatsapp"></i>

    </a>
        `;
  }
}
customElements.define('aqua-footer', AquaFooter);

// INICIALIZAR ANIMAÇÃO DE ROLAGEM (AOS)
AOS.init({
  duration: 900, // Tempo de duração da animação (0.9s)
  once: true,    // Anima apenas na primeira vez que rolar a página
  offset: 120    // Inicia a animação um pouco antes de o card aparecer por completo
});

// MENU MOBILE
const btnMenu = document.getElementById('btnMenu');
const menuNavegacao = document.getElementById('menuNavegacao');
btnMenu.addEventListener('click', () => {
  menuNavegacao.classList.toggle('ativo');
});

// ACCORDION
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  const pergunta = item.querySelector('.faq-pergunta');
  pergunta.addEventListener('click', () => {
    if (item.classList.contains('ativo')) {
      item.classList.remove('ativo');
    } else {
      faqItems.forEach(outro => outro.classList.remove('ativo'));
      item.classList.add('ativo');
    }
  });
});

// ANIMAÇÃO DOS COPOS (MANUAL)
document.addEventListener("DOMContentLoaded", function () {
  const copos = document.getElementById('imagemCopos');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visivel');
      }
    });
  }, { threshold: 0.3 });

  if (copos) observer.observe(copos);
  iniciarCarrossel();
});

// CARROSSEL
let indiceCarrossel = 0;
let intervaloCarrossel;
const track = document.getElementById('trackCarrossel');
const cards = document.querySelectorAll('.card-solucao');
const totalCards = cards.length;

function iniciarCarrossel() {
  function atualizarVisor() {
    let cardsVisiveis = 4;
    if (window.innerWidth <= 600) cardsVisiveis = 1;
    else if (window.innerWidth <= 900) cardsVisiveis = 2;

    let limite = totalCards - cardsVisiveis;
    if (limite < 0) limite = 0;
    if (indiceCarrossel > limite) indiceCarrossel = 0;

    let porcentagem = 100 / cardsVisiveis;
    track.style.transform = `translateX(-${indiceCarrossel * porcentagem}%)`;

    const nav = document.getElementById('pontosCarrossel');
    nav.innerHTML = '';
    for (let i = 0; i <= limite; i++) {
      const ponto = document.createElement('div');
      ponto.className = 'ponto' + (i === indiceCarrossel ? ' ativo' : '');
      ponto.onclick = () => {
        indiceCarrossel = i;
        atualizarVisor();
        resetarTempo();
      };
      nav.appendChild(ponto);
    }
  }

  function proximoCard() {
    let cardsVisiveis = window.innerWidth <= 600 ? 1 : (window.innerWidth <= 900 ? 2 : 4);
    let limite = totalCards - cardsVisiveis;

    indiceCarrossel++;
    if (indiceCarrossel > limite) {
      indiceCarrossel = 0;
    }
    atualizarVisor();
  }

  function resetarTempo() {
    clearInterval(intervaloCarrossel);
    intervaloCarrossel = setInterval(proximoCard, 3000);
  }

  atualizarVisor();
  resetarTempo();

  window.addEventListener('resize', () => {
    indiceCarrossel = 0;
    atualizarVisor();
  });
}

// ==========================================================
// FORMULÁRIOS
// ==========================================================
document.querySelectorAll('.web3form-dinamico').forEach(form => {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const btn = form.querySelector('button');
    const statusDiv = form.querySelector('.status-envio');
    const originalBtnText = btn.textContent;

    // 1. Identificação Automática da Página
    const campoOrigem = form.querySelector('input[name="origem_servico"]');
    if (campoOrigem) {
      campoOrigem.value = `Página: ${document.title} (${window.location.href})`;
    }

    // 2. Feedback de carregamento
    btn.disabled = true;
    btn.textContent = "ENVIANDO...";
    if (statusDiv) statusDiv.textContent = "";

    // 3. Captura os dados (inclusive múltiplos checkboxes)
    const formData = new FormData(form);
    const object = {};

    formData.forEach((value, key) => {
      // Se for um campo com múltiplos valores (como problemas[]), organiza em lista
      if (key.includes('[]')) {
        const cleanKey = key.replace('[]', '');
        if (!object[cleanKey]) {
          object[cleanKey] = value;
        } else {
          object[cleanKey] = `${object[cleanKey]}, ${value}`;
        }
      } else {
        object[key] = value;
      }
    });

    const json = JSON.stringify(object);

    // 4. Envio via Fetch
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: json
    })
      .then(async (response) => {
        let res = await response.json();
        if (response.status == 200) {
          if (statusDiv) {
            statusDiv.innerHTML = "<b style='color: #28a745;'>Solicitação enviada com sucesso! Aguarde nosso contato.</b>";
          }
          form.reset();
        } else {
          if (statusDiv) {
            statusDiv.innerHTML = "<b style='color: #dc3545;'>Erro: " + res.message + "</b>";
          }
        }
      })
      .catch(error => {
        if (statusDiv) {
          statusDiv.innerHTML = "<b style='color: #dc3545;'>Erro na conexão. Verifique sua internet.</b>";
        }
      })
      .finally(() => {
        btn.disabled = false;
        btn.textContent = originalBtnText;
      });
  });
});