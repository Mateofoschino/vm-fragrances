// /* ========= CONFIG — EDITAR ACÁ ========= */
// const WHATSAPP = "5492494511024"; // Número real de VM Fragances (Tandil)
// const NEGOCIO = "VM Fragances";

// /* ========= COLORES POR FAMILIA (para frasco placeholder) ========= */
// const FAM_COLOR = {
//   "Oriental":["#3a2410","#a86a28","#5a3a16"],
//   "Amaderado":["#2e1d10","#8a5a2e","#4a3018"],
//   "Dulce":["#3a2614","#c98a3c","#6a4420"],
//   "Fresco":["#1a2620","#8aa86a","#3a4a36"],
//   "Floral":["#3a1c22","#c9748a","#6a3440"]
// };

// /* ========= CATÁLOGO ========= */
// /* p = precio en pesos · g = género · f = familia · img = (opcional) URL de foto */


// /* ===== CATEGORÍAS ===== */
// PRODUCTS.forEach(p=>p.cat="Árabe");

// /* Diseñador y Nicho: tomados de tu Instagram. Precio "Consultar" hasta que cargues el valor. */
// const DISENADOR=[
//  {n:"Born in Roma Uomo",b:"Valentino",ml:"100ml",p:null,g:"Hombre",f:"Amaderado"},
//  {n:"Born in Roma Uomo Intense",b:"Valentino",ml:"100ml",p:null,g:"Hombre",f:"Oriental"},
//  {n:"Y Eau de Parfum",b:"Yves Saint Laurent",ml:"100ml",p:null,g:"Hombre",f:"Fresco"},
//  {n:"Stronger With You",b:"Emporio Armani",ml:"100ml",p:null,g:"Hombre",f:"Dulce"},
//  {n:"Stronger With You Intensely",b:"Emporio Armani",ml:"100ml",p:null,g:"Hombre",f:"Oriental"},
//  {n:"Stronger With You Absolutely",b:"Emporio Armani",ml:"100ml",p:null,g:"Hombre",f:"Oriental"},
// ];
// DISENADOR.forEach(p=>p.cat="Diseñador");

// const NICHO=[
//  {n:"Aventus",b:"Creed",ml:"100ml",p:null,g:"Hombre",f:"Amaderado"},
//  {n:"Haltane",b:"Parfums de Marly",ml:"125ml",p:null,g:"Hombre",f:"Amaderado"},
//  {n:"Ombré Leather",b:"Tom Ford",ml:"100ml",p:null,g:"Unisex",f:"Amaderado"},
//  {n:"Black Orchid",b:"Tom Ford",ml:"100ml",p:null,g:"Unisex",f:"Oriental"},
// ];
// NICHO.forEach(p=>p.cat="Nicho");

// const ALL=[...PRODUCTS,...DISENADOR,...NICHO];
// const CATS=[
//  {id:"arabe",name:"Árabe",eyebrow:"Origen · Medio Oriente",desc:"Lattafa, Armaf, Afnan, Rasasi y más. Estela potente, dulzor oriental y una proyección que no pasa desapercibida."},
//  {id:"disenador",name:"Diseñador",eyebrow:"Las grandes maisons",desc:"Los íconos de las casas de moda. Clásicos versátiles para el día a día y las ocasiones que importan."},
//  {id:"nicho",name:"Nicho",eyebrow:"Alta perfumería",desc:"Creaciones de autor, exclusivas y difíciles de conseguir. Para quienes buscan algo realmente único."}
// ];

// /* ========= STATE ========= */
// let cart = [];
// let activeMeta = "Todos";
// let searchQ = "";

// /* ========= HELPERS ========= */
// const fmt = n => (n==null ? "Consultar" : "$" + n.toLocaleString("es-AR"));
// const $ = s => document.querySelector(s);
// const waLink = txt => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(txt)}`;

// function bottleSVG(fam){
//   const c = FAM_COLOR[fam] || FAM_COLOR["Oriental"];
//   const id = "b"+Math.random().toString(36).slice(2,7);
//   return `<svg class="bottle" viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
//     <defs>
//       <linearGradient id="${id}liq" x1="0" y1="0" x2="0" y2="1">
//         <stop offset="0" stop-color="${c[1]}"/><stop offset="1" stop-color="${c[0]}"/>
//       </linearGradient>
//       <linearGradient id="${id}cap" x1="0" y1="0" x2="1" y2="1">
//         <stop offset="0" stop-color="#f0d79a"/><stop offset="0.5" stop-color="#c9a25b"/><stop offset="1" stop-color="#8a5e28"/>
//       </linearGradient>
//       <linearGradient id="${id}gl" x1="0" y1="0" x2="1" y2="0">
//         <stop offset="0" stop-color="rgba(255,255,255,.35)"/><stop offset="0.3" stop-color="rgba(255,255,255,0)"/>
//       </linearGradient>
//     </defs>
//     <rect x="40" y="14" width="20" height="16" rx="2" fill="url(#${id}cap)"/>
//     <rect x="43" y="28" width="14" height="8" fill="${c[2]}"/>
//     <path d="M30 40 Q30 36 36 36 L64 36 Q70 36 70 40 L72 130 Q72 142 60 142 L40 142 Q28 142 28 130 Z" fill="url(#${id}liq)" stroke="rgba(201,162,91,.3)" stroke-width="1"/>
//     <path d="M34 50 L34 128 Q34 134 40 134" fill="none" stroke="url(#${id}gl)" stroke-width="5" stroke-linecap="round"/>
//     <rect x="38" y="92" width="24" height="30" rx="2" fill="rgba(11,9,7,.35)" stroke="rgba(201,162,91,.25)" stroke-width="0.5"/>
//     <text x="50" y="104" font-family="Marcellus,serif" font-size="6" letter-spacing="1" fill="rgba(240,215,154,.85)" text-anchor="middle">VM</text>
//     <line x1="42" y1="110" x2="58" y2="110" stroke="rgba(240,215,154,.4)" stroke-width="0.5"/>
//     <text x="50" y="118" font-family="Jost,sans-serif" font-size="3" letter-spacing="1.5" fill="rgba(240,215,154,.6)" text-anchor="middle">FRAGANCES</text>
//   </svg>`;
// }

// /* ========= RENDER FILTERS ========= */
// function initFilters(){
//   const metas=["Todos","Hombre","Mujer","Unisex"];
//   $("#metaFilters").innerHTML=metas.map(m=>`<button class="chip ${m===activeMeta?'active':''}" data-meta="${m}">${m}</button>`).join("");
//   document.querySelectorAll("[data-meta]").forEach(c=>c.onclick=()=>{activeMeta=c.dataset.meta;refreshChips();render();});
// }
// function refreshChips(){
//   document.querySelectorAll("[data-meta]").forEach(c=>c.classList.toggle("active",c.dataset.meta===activeMeta));
// }

// /* ===== build category blocks ===== */
// function initCatBlocks(){
//   $("#catBlocks").innerHTML = CATS.map(c=>`
//     <div class="cat-block" id="${c.id}">
//       <div class="cat-head">
//         <span class="cat-line"></span>
//         <div class="cat-titles">
//           <span class="eyebrow">${c.eyebrow}</span>
//           <h3>Perfumería <em>${c.name}</em></h3>
//           <p>${c.desc}</p>
//         </div>
//         <span class="cat-line r"></span>
//       </div>
//       <div class="grid" id="grid-${c.id}"></div>
//     </div>`).join("");
// }


// function initMarquee(){
//   const brands = [...new Set(ALL.map(p=>p.b))];
//   const html = brands.map(b=>`<span>${b}</span>`).join("");
//   $("#marquee").innerHTML = html + html; // duplicado para loop
// }

// /* ========= FILTER LOGIC ========= */
// function filtered(){
//   return ALL.filter(p=>{
//     if(activeMeta!=="Todos" && p.g!==activeMeta && p.f!==activeMeta) return false;
//     if(searchQ){
//       const q=searchQ.toLowerCase();
//       if(!(`${p.n} ${p.b} ${p.f} ${p.g} ${p.cat}`.toLowerCase().includes(q))) return false;
//     }
//     return true;
//   });
// }


// function cardHTML(p,i){
//   const idx=ALL.indexOf(p);
//   const visual=p.img?`<img class="photo" src="${p.img}" alt="${p.n}">`:bottleSVG(p.f);
//   const isConsult=p.p==null;
//   const priceHTML=isConsult?`<span class="price consult">Consultar</span>`:`<span class="price">${fmt(p.p)}</span>`;
//   const btnHTML=isConsult
//     ? `<button class="add" data-consult="${idx}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.4 8.4 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.4 8.4 0 01-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 01-.9-3.8 8.5 8.5 0 014.7-7.6A8.4 8.4 0 0112.5 3H13a8.5 8.5 0 018 8z"/></svg>Consultar</button>`
//     : `<button class="add" data-idx="${idx}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>Agregar</button>`;
//   return `<article class="card" style="transition-delay:${(i%12)*40}ms">
//     <div class="imgwrap"><span class="fam-tag">${p.f}</span><span class="gen-tag">${p.g}</span>${visual}</div>
//     <div class="body">
//       <span class="brand-lbl">${p.b}</span>
//       <h3 class="name">${p.n}</h3>
//       <span class="ml">${p.ml} · Eau de Parfum</span>
//       <div class="foot">${priceHTML}${btnHTML}</div>
//     </div></article>`;
// }

// function render(){
//   const list=filtered();
//   $("#resultCount").textContent=list.length+" "+(list.length===1?"fragancia":"fragancias");
//   let anyShown=false;
//   CATS.forEach(cat=>{
//     const items=list.filter(p=>p.cat===cat.name);
//     const block=$("#"+cat.id);
//     const grid=$("#grid-"+cat.id);
//     if(!block||!grid) return;
//     if(items.length){
//       anyShown=true; block.style.display="block";
//       grid.innerHTML=items.map((p,i)=>cardHTML(p,i)).join("");
//     } else { block.style.display="none"; }
//   });
//   $("#globalEmpty").style.display=anyShown?"none":"block";
//   document.querySelectorAll(".add[data-idx]").forEach(b=>b.onclick=()=>addToCart(+b.dataset.idx,b));
//   document.querySelectorAll(".add[data-consult]").forEach(b=>b.onclick=()=>consultProduct(+b.dataset.consult));
//   observeCards();
// }

// function consultProduct(idx){
//   const p=ALL[idx];
//   const msg=`¡Hola ${NEGOCIO}! 👋 Me interesa este perfume:\n\n• ${p.b} ${p.n} (${p.ml})\n\n¿Me pasás precio y disponibilidad? ¡Gracias!`;
//   window.open(waLink(msg),"_blank");
// }


// let io;
// function observeCards(){
//   if(io) io.disconnect();
//   io = new IntersectionObserver((es)=>{
//     es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target);} });
//   },{threshold:.12});
//   document.querySelectorAll(".card").forEach(c=>io.observe(c));
// }

// /* ========= CART ========= */
// function addToCart(idx,btn){
//   const p = ALL[idx];
//   const key = p.n+p.b+p.ml;
//   const ex = cart.find(c=>c.key===key);
//   if(ex) ex.q++; else cart.push({...p,key,q:1});
//   updateCart();
//   if(btn){
//     const orig = btn.innerHTML;
//     btn.classList.add("added");
//     btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 13l4 4L19 7"/></svg> Agregado`;
//     setTimeout(()=>{btn.classList.remove("added");btn.innerHTML=orig;},1300);
//   }
//   toast(`${p.n} agregado a tu selección`);
// }
// function changeQty(key,d){
//   const it=cart.find(c=>c.key===key); if(!it)return;
//   it.q+=d; if(it.q<=0) cart=cart.filter(c=>c.key!==key);
//   updateCart();
// }
// function removeItem(key){ cart=cart.filter(c=>c.key!==key); updateCart(); }
// function cartTotal(){ return cart.reduce((s,i)=>s+i.p*i.q,0); }

// function updateCart(){
//   const count = cart.reduce((s,i)=>s+i.q,0);
//   const cc=$("#cartCount");
//   cc.textContent=count; cc.classList.toggle("show",count>0);
//   const body=$("#cartBody");
//   if(!cart.length){
//     body.innerHTML=`<div class="cart-empty">
//       <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c9a25b" stroke-width="1"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><path d="M3 6h18M16 10a4 4 0 01-8 0"/></svg>
//       <div class="serif">Tu selección está vacía</div>
//       <p>Explorá la colección y empezá a elegir tus fragancias.</p></div>`;
//     $("#drawerFoot").style.display="none";
//     return;
//   }
//   body.innerHTML = cart.map(i=>{
//     const visual = i.img?`<img src="${i.img}" alt="">`:bottleSVG(i.f);
//     return `<div class="ci">
//       <div class="ci-img">${visual}</div>
//       <div class="ci-info">
//         <span class="b">${i.b}</span>
//         <div class="n">${i.n}</div>
//         <span class="pr">${fmt(i.p)} · ${i.ml}</span>
//         <div class="ci-ctrl">
//           <div class="qty">
//             <button onclick="changeQty('${i.key}',-1)">−</button>
//             <span>${i.q}</span>
//             <button onclick="changeQty('${i.key}',1)">+</button>
//           </div>
//           <button class="ci-rm" onclick="removeItem('${i.key}')">Quitar</button>
//         </div>
//       </div>
//     </div>`;
//   }).join("");
//   $("#cartTotal").textContent=fmt(cartTotal());
//   $("#drawerFoot").style.display="block";
// }

// function openCart(){ $("#drawer").classList.add("open"); $("#overlay").classList.add("open"); document.body.classList.add("no-scroll"); }
// function closeCart(){ $("#drawer").classList.remove("open"); $("#overlay").classList.remove("open"); document.body.classList.remove("no-scroll"); }

// function checkout(){
//   if(!cart.length) return;
//   let msg = `¡Hola ${NEGOCIO}! Quiero hacer un pedido:\n\n`;
//   cart.forEach(i=>{ msg+=`• ${i.q}x ${i.b} ${i.n} (${i.ml}) — ${fmt(i.p*i.q)}\n`; });
//   msg+=`\n*Total estimado: ${fmt(cartTotal())}*\n\n¿Me confirmás stock, formas de pago y envío? ¡Gracias!`;
//   window.open(waLink(msg),"_blank");
// }

// /* ========= TOAST ========= */
// let toastT;
// function toast(m){
//   $("#toastMsg").textContent=m;
//   const t=$("#toast"); t.classList.add("show");
//   clearTimeout(toastT); toastT=setTimeout(()=>t.classList.remove("show"),2200);
// }

// /* ========= WA LINKS ========= */
// function setWaLinks(){
//   const generic = waLink(`¡Hola ${NEGOCIO}! Estoy viendo la página y quería hacer una consulta.`);
//   ["waMain","waFoot","waFloat","waLoc"].forEach(id=>{const el=$("#"+id); if(el) el.href=generic;});
// }

// /* ========= INIT ========= */
// $("#search").addEventListener("input",e=>{searchQ=e.target.value;render();});
// $("#yr").textContent=new Date().getFullYear();
// window.addEventListener("scroll",()=>{
//   const s=window.scrollY>40;
//   $("#hdr").classList.toggle("scrolled",s);
//   $("#waFloat").classList.toggle("show",window.scrollY>500);
// });
// function toggleMenu(){ $("#mobileMenu").classList.toggle("open"); }

// initFilters();
// initMarquee();
// setWaLinks();
// initCatBlocks();
// render();
// updateCart();
/* ========= CONFIG — EDITAR ACÁ ========= */
const WHATSAPP = "5492494370913"; // Número real de VM Fragances (Tandil)
const NEGOCIO  = "VM Fragances";

// ── SUPABASE ──────────────────────────────────────────────────
const SUPABASE_URL  = 'https://vmlytkidcbjjnpubtgwa.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtbHl0a2lkY2Jqam5wdWJ0Z3dhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2ODE3MDYsImV4cCI6MjA5NjI1NzcwNn0.vt_idckFAuWaCIJWtzaJ0Y2jkgriN9i5av9FEyvsGLU';

async function fetchPerfumes() {
  const res = await fetch(
    SUPABASE_URL + '/rest/v1/perfumes?activo=eq.true&order=cat.asc,b.asc,n.asc&select=*',
    {
      headers: {
        'apikey':        SUPABASE_ANON,
        'Authorization': 'Bearer ' + SUPABASE_ANON,
      }
    }
  );
  if (!res.ok) throw new Error('Error al cargar perfumes');
  return res.json();
}

/* ========= COLORES POR FAMILIA (para frasco placeholder) ========= */
const FAM_COLOR = {
  "Oriental": ["#3a2410","#a86a28","#5a3a16"],
  "Amaderado":["#2e1d10","#8a5a2e","#4a3018"],
  "Dulce":    ["#3a2614","#c98a3c","#6a4420"],
  "Fresco":   ["#1a2620","#8aa86a","#3a4a36"],
  "Floral":   ["#3a1c22","#c9748a","#6a3440"]
};

/* ===== CATEGORÍAS ===== */
const CATS = [
  {id:"arabe",    name:"Árabe",     eyebrow:"Origen · Medio Oriente", desc:"Lattafa, Armaf, Afnan, Rasasi y más. Estela potente, dulzor oriental y una proyección que no pasa desapercibida."},
  {id:"disenador",name:"Diseñador", eyebrow:"Las grandes maisons",    desc:"Los íconos de las casas de moda. Clásicos versátiles para el día a día y las ocasiones que importan."},
  {id:"nicho",    name:"Nicho",     eyebrow:"Alta perfumería",         desc:"Creaciones de autor, exclusivas y difíciles de conseguir. Para quienes buscan algo realmente único."}
];

/* ========= STATE ========= */
let ALL    = [];
let cart   = [];
let activeMeta = "Todos";
let searchQ    = "";

/* ========= HELPERS ========= */
const fmt     = n => (n == null ? "Consultar" : "$" + n.toLocaleString("es-AR"));
const $       = s => document.querySelector(s);
const waLink  = txt => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(txt)}`;

function bottleSVG(fam){
  const c  = FAM_COLOR[fam] || FAM_COLOR["Oriental"];
  const id = "b" + Math.random().toString(36).slice(2,7);
  return `<svg class="bottle" viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="${id}liq" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${c[1]}"/><stop offset="1" stop-color="${c[0]}"/>
      </linearGradient>
      <linearGradient id="${id}cap" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#f0d79a"/><stop offset="0.5" stop-color="#c9a25b"/><stop offset="1" stop-color="#8a5e28"/>
      </linearGradient>
      <linearGradient id="${id}gl" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="rgba(255,255,255,.35)"/><stop offset="0.3" stop-color="rgba(255,255,255,0)"/>
      </linearGradient>
    </defs>
    <rect x="40" y="14" width="20" height="16" rx="2" fill="url(#${id}cap)"/>
    <rect x="43" y="28" width="14" height="8" fill="${c[2]}"/>
    <path d="M30 40 Q30 36 36 36 L64 36 Q70 36 70 40 L72 130 Q72 142 60 142 L40 142 Q28 142 28 130 Z" fill="url(#${id}liq)" stroke="rgba(201,162,91,.3)" stroke-width="1"/>
    <path d="M34 50 L34 128 Q34 134 40 134" fill="none" stroke="url(#${id}gl)" stroke-width="5" stroke-linecap="round"/>
    <rect x="38" y="92" width="24" height="30" rx="2" fill="rgba(11,9,7,.35)" stroke="rgba(201,162,91,.25)" stroke-width="0.5"/>
    <text x="50" y="104" font-family="Marcellus,serif" font-size="6" letter-spacing="1" fill="rgba(240,215,154,.85)" text-anchor="middle">VM</text>
    <line x1="42" y1="110" x2="58" y2="110" stroke="rgba(240,215,154,.4)" stroke-width="0.5"/>
    <text x="50" y="118" font-family="Jost,sans-serif" font-size="3" letter-spacing="1.5" fill="rgba(240,215,154,.6)" text-anchor="middle">FRAGANCES</text>
  </svg>`;
}

/* ========= RENDER FILTERS ========= */
function initFilters(){
  const metas = ["Todos","Hombre","Mujer","Unisex"];
  $("#metaFilters").innerHTML = metas.map(m =>
    `<button class="chip ${m===activeMeta?'active':''}" data-meta="${m}">${m}</button>`
  ).join("");
  document.querySelectorAll("[data-meta]").forEach(c =>
    c.onclick = () => { activeMeta = c.dataset.meta; refreshChips(); render(); }
  );
}
function refreshChips(){
  document.querySelectorAll("[data-meta]").forEach(c =>
    c.classList.toggle("active", c.dataset.meta === activeMeta)
  );
}

/* ===== build category blocks ===== */
function initCatBlocks(){
  $("#catBlocks").innerHTML = CATS.map(c => `
    <div class="cat-block" id="${c.id}">
      <div class="cat-head">
        <span class="cat-line"></span>
        <div class="cat-titles">
          <span class="eyebrow">${c.eyebrow}</span>
          <h3>Perfumería <em>${c.name}</em></h3>
          <p>${c.desc}</p>
        </div>
        <span class="cat-line r"></span>
      </div>
      <div class="grid" id="grid-${c.id}"></div>
    </div>`).join("");
}

function initMarquee(){
  const brands = [...new Set(ALL.map(p => p.b))];
  const html   = brands.map(b => `<span>${b}</span>`).join("");
  $("#marquee").innerHTML = html + html;
}

/* ========= FILTER LOGIC ========= */
function filtered(){
  return ALL.filter(p => {
    if (activeMeta !== "Todos" && p.g !== activeMeta && p.f !== activeMeta) return false;
    if (searchQ){
      const q = searchQ.toLowerCase();
      if (!(`${p.n} ${p.b} ${p.f} ${p.g} ${p.cat}`.toLowerCase().includes(q))) return false;
    }
    return true;
  });
}

function cardHTML(p, i){
  const idx        = ALL.indexOf(p);
  const visual     = p.img ? `<img class="photo" src="${p.img}" alt="${p.n}">` : bottleSVG(p.f);
  const imgStyle   = p.img ? ` style="--img-bg:url('${p.img}')"` : '';
  const isConsult  = p.p == null;
  const priceHTML  = isConsult
    ? `<span class="price consult">Consultar</span>`
    : `<span class="price">${fmt(p.p)}</span>`;
  const btnHTML    = isConsult
    ? `<button class="add" data-consult="${idx}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.4 8.4 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.4 8.4 0 01-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 01-.9-3.8 8.5 8.5 0 014.7-7.6A8.4 8.4 0 0112.5 3H13a8.5 8.5 0 018 8z"/></svg>Consultar</button>`
    : `<button class="add" data-idx="${idx}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>Agregar</button>`;
  return `<article class="card" style="transition-delay:${(i%12)*40}ms">
    <div class="imgwrap"${imgStyle}><span class="fam-tag">${p.f}</span><span class="gen-tag">${p.g}</span>${visual}</div>
    <div class="body">
      <span class="brand-lbl">${p.b}</span>
      <h3 class="name">${p.n}</h3>
      <span class="ml">${p.ml} · Eau de Parfum</span>
      <div class="foot">${priceHTML}${btnHTML}</div>
    </div></article>`;
}

function render(){
  const list = filtered();
  $("#resultCount").textContent = list.length + " " + (list.length === 1 ? "fragancia" : "fragancias");
  let anyShown = false;
  CATS.forEach(cat => {
    const catName = cat.name;
    const items   = list.filter(p => p.cat === catName);
    const block   = $("#" + cat.id);
    const grid    = $("#grid-" + cat.id);
    if (!block || !grid) return;
    if (items.length){
      anyShown = true; block.style.display = "block";
      grid.innerHTML = items.map((p,i) => cardHTML(p,i)).join("");
    } else {
      block.style.display = "none";
    }
  });
  $("#globalEmpty").style.display = anyShown ? "none" : "block";
  document.querySelectorAll(".add[data-idx]").forEach(b => b.onclick = () => addToCart(+b.dataset.idx, b));
  document.querySelectorAll(".add[data-consult]").forEach(b => b.onclick = () => consultProduct(+b.dataset.consult));
  observeCards();
}

function consultProduct(idx){
  const p   = ALL[idx];
  const msg = `¡Hola ${NEGOCIO}! 👋 Me interesa este perfume:\n\n• ${p.b} ${p.n} (${p.ml})\n\n¿Me pasás precio y disponibilidad? ¡Gracias!`;
  window.open(waLink(msg), "_blank");
}

let io;
function observeCards(){
  if (io) io.disconnect();
  io = new IntersectionObserver((es) => {
    es.forEach(e => { if (e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
  }, {threshold:.12});
  document.querySelectorAll(".card").forEach(c => io.observe(c));
}

/* ========= CART ========= */
function addToCart(idx, btn){
  const p   = ALL[idx];
  const key = p.n + p.b + p.ml;
  const ex  = cart.find(c => c.key === key);
  if (ex) ex.q++; else cart.push({...p, key, q:1});
  updateCart();
  if (btn){
    const orig = btn.innerHTML;
    btn.classList.add("added");
    btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 13l4 4L19 7"/></svg> Agregado`;
    setTimeout(() => { btn.classList.remove("added"); btn.innerHTML = orig; }, 1300);
  }
  toast(`${p.n} agregado a tu selección`);
}
function changeQty(key, d){
  const it = cart.find(c => c.key === key); if (!it) return;
  it.q += d; if (it.q <= 0) cart = cart.filter(c => c.key !== key);
  updateCart();
}
function removeItem(key){ cart = cart.filter(c => c.key !== key); updateCart(); }
function cartTotal(){ return cart.reduce((s,i) => s + i.p * i.q, 0); }

function updateCart(){
  const count = cart.reduce((s,i) => s + i.q, 0);
  const cc    = $("#cartCount");
  cc.textContent = count; cc.classList.toggle("show", count > 0);
  const body  = $("#cartBody");
  if (!cart.length){
    body.innerHTML = `<div class="cart-empty">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c9a25b" stroke-width="1"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><path d="M3 6h18M16 10a4 4 0 01-8 0"/></svg>
      <div class="serif">Tu selección está vacía</div>
      <p>Explorá la colección y empezá a elegir tus fragancias.</p></div>`;
    $("#drawerFoot").style.display = "none";
    return;
  }
  body.innerHTML = cart.map(i => {
    const visual = i.img ? `<img src="${i.img}" alt="">` : bottleSVG(i.f);
    return `<div class="ci">
      <div class="ci-img">${visual}</div>
      <div class="ci-info">
        <span class="b">${i.b}</span>
        <div class="n">${i.n}</div>
        <span class="pr">${fmt(i.p)} · ${i.ml}</span>
        <div class="ci-ctrl">
          <div class="qty">
            <button onclick="changeQty('${i.key}',-1)">−</button>
            <span>${i.q}</span>
            <button onclick="changeQty('${i.key}',1)">+</button>
          </div>
          <button class="ci-rm" onclick="removeItem('${i.key}')">Quitar</button>
        </div>
      </div>
    </div>`;
  }).join("");
  $("#cartTotal").textContent = fmt(cartTotal());
  $("#drawerFoot").style.display = "block";
}

function openCart(){ $("#drawer").classList.add("open"); $("#overlay").classList.add("open"); document.body.classList.add("no-scroll"); }
function closeCart(){ $("#drawer").classList.remove("open"); $("#overlay").classList.remove("open"); document.body.classList.remove("no-scroll"); }

function checkout(){
  if (!cart.length) return;
  let msg = `¡Hola ${NEGOCIO}! Quiero hacer un pedido:\n\n`;
  cart.forEach(i => { msg += `• ${i.q}x ${i.b} ${i.n} (${i.ml}) — ${fmt(i.p*i.q)}\n`; });
  msg += `\n*Total estimado: ${fmt(cartTotal())}*\n\n¿Me confirmás stock, formas de pago y envío? ¡Gracias!`;
  window.open(waLink(msg), "_blank");
}

/* ========= TOAST ========= */
let toastT;
function toast(m){
  $("#toastMsg").textContent = m;
  const t = $("#toast"); t.classList.add("show");
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), 2200);
}

/* ========= WA LINKS ========= */
function setWaLinks(){
  const generic = waLink(`¡Hola ${NEGOCIO}! Estoy viendo la página y quería hacer una consulta.`);
  ["waMain","waFoot","waFloat","waLoc"].forEach(id => { const el = $("#"+id); if (el) el.href = generic; });
}

/* ========= INIT ========= */
$("#search").addEventListener("input", e => { searchQ = e.target.value; render(); });
$("#yr").textContent = new Date().getFullYear();
window.addEventListener("scroll", () => {
  const s = window.scrollY > 40;
  $("#hdr").classList.toggle("scrolled", s);
  $("#waFloat").classList.toggle("show", window.scrollY > 500);
});
function toggleMenu(){ $("#mobileMenu").classList.toggle("open"); }

// ── Arrancar: cargar datos y luego inicializar UI ──
(async () => {
  try {
    ALL = await fetchPerfumes();
  } catch(e) {
    console.error('No se pudo conectar con Supabase, usando datos vacíos.', e);
    ALL = [];
  }
  initFilters();
  initMarquee();
  setWaLinks();
  initCatBlocks();
  render();
  updateCart();
})();