/* ====== CONFIGURAÇÃO — preencha aqui ====== */
const CONFIG = {
  whatsapp: "5519996466950", // (19) 99646-6950, número que aparece nas caçambas
  endereco: "R. José Antônio da Silva, 492 - Jardim Marisa, Campinas - SP, 13053-226",
  areaAtendimento: "Campinas e região",
  horario: "Seg a Sex: 7h às 17h<br>Sáb: 7h às 12h<br>Dom: fechado",
  cnpj: ""                 // Ex.: "00.000.000/0001-00"
};
const GALERIA = [
  { src: "img/caminhao-cacambas-entulho-1.jpg", alt: "Caminhão da FJA transportando caçambas laranjas para entulho" },
  { src: "img/caminhao-duas-cacambas.jpg", alt: "Caminhão FJA transportando duas caçambas" },
  { src: "img/cacamba-entulho-guindada.jpg", alt: "Caçamba para entulho FJA suspensa pelo equipamento do caminhão" },
  { src: "img/caminhao-cacambas-lateral.jpg", alt: "Caminhão FJA com caçambas para entulho" },
  { src: "img/caminhao-cacambas-entulho-2.jpg", alt: "Caminhão da FJA com caçamba sendo carregada" },
  { src: "img/caminhao-cacambas-entulho-3.jpg", alt: "Caminhão FJA com caçamba para entulho" },
  { src: "img/cacamba-rolao-basculando.jpg", alt: "Caçamba rolão da FJA sendo basculada pelo caminhão" },
  { src: "img/caminhao-cacamba-rolao.jpg", alt: "Caminhão FJA com caçamba rolão preta" },
  { src: "img/cacamba-rolao-fja.jpg", alt: "Caçamba rolão preta com logo FJA" },
  { src: "img/caminhao-com-maquina.jpg", alt: "Caminhão com carroceria transportando máquina carregadeira" },
  { src: "img/maquina-carregadeira.jpg", alt: "Máquina carregadeira apoiada em caminhão da FJA" },
  { src: "img/caminhao-rolao-frota.jpg", alt: "Caminhão FJA com caçamba rolão" }
];
/* ========================================== */

const MSG = "Olá! Vim pela página da FJA Caçambas e gostaria de solicitar um orçamento.";
const wa = t => "https://wa.me/" + CONFIG.whatsapp.replace(/\D/g,"") + "?text=" + encodeURIComponent(t || MSG);
document.querySelectorAll("[data-wa]").forEach(a => { a.href = wa(); a.target = "_blank"; a.rel = "noopener"; });

const ic = p => `<div class="ico"><svg viewBox="0 0 24 24">${p}</svg></div>`;
const DIFS = [
  ["Atendimento direto","Você fala direto com a FJA, sem intermediários.",'<path d="M21 12a8 8 0 0 1-12 7l-5 1 1-5a8 8 0 1 1 16-3z"/>'],
  ["Praticidade","Um só contato para caçamba, transporte e limpeza.",'<path d="M5 12l5 5L20 7"/>'],
  ["Transporte","Levamos e retiramos a caçamba para você.",'<rect x="1" y="7" width="13" height="9"/><path d="M14 10h4l3 3v3h-7"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>'],
  ["Soluções para cada necessidade","Entulho, madeira, plástico, limpeza: indicamos a opção certa.",'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'],
  ["Equipamentos próprios","Caminhões, caçambas e máquinas da própria FJA.",'<path d="M3 8h18l-2 10H5z"/><path d="M7 8V5h10v3"/>'],
  ["Apoio com máquinas","Quando preciso, máquinas ajudam a carregar terra e limpar.",'<path d="M2 17h14l2-6h-5l-2-4H6l-1 4"/><path d="M18 11l4 3-2 3"/><circle cx="6" cy="19" r="2"/><circle cx="14" cy="19" r="2"/>']
];
document.getElementById("difs").innerHTML = DIFS.map(d => `<article class="card reveal">${ic(d[2])}<div><h3>${d[0]}</h3><p>${d[1]}</p></div></article>`).join("");

const g = document.getElementById("gal");
g.innerHTML = GALERIA.map(f => `<figure><img src="${f.src}" alt="${f.alt}" loading="lazy"></figure>`).join("");

document.getElementById("f").addEventListener("submit", e => {
  e.preventDefault();
  const d = new FormData(e.target);
  const t = `Olá! Me chamo ${d.get("nome")}.\nServiço: ${d.get("servico")}\nMaterial: ${d.get("material") || "não informado"}\nObservações: ${d.get("obs") || "-"}`;
  window.open(wa(t), "_blank", "noopener");
});

const set = (id, arr) => { const v = arr.filter(Boolean).join("<br>"); if (v) { const el = document.getElementById(id); el.innerHTML = v; el.classList.remove("todo"); } };
set("f-tel", [CONFIG.whatsapp && CONFIG.whatsapp.replace(/^55(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3")]);
set("f-end", [CONFIG.endereco, CONFIG.areaAtendimento]);
set("f-hor", [CONFIG.horario, CONFIG.cnpj && "CNPJ " + CONFIG.cnpj]);
document.getElementById("y").textContent = new Date().getFullYear();

const io = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }), {threshold:.12}) : null;
document.querySelectorAll(".reveal").forEach(el => io ? io.observe(el) : el.classList.add("in"));
