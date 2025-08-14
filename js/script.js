/* ====== Carrinho funcional simples ====== */
/* Mantém o carrinho em memória (session) enquanto a página estiver aberta.
   Funcionalidades: add, remove, change qty, total, toggle panel, checkout. */
 
document.addEventListener('DOMContentLoaded', () => {
  // elementos (podem estar em muitas páginas; usar querySelectors seguros)
  window.cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
  window.updateCart = updateCart;
 
  // ligar eventos (se houver elementos)
  document.querySelectorAll('.add').forEach(btn => {
    // já possuem onclick inline em produtos, mas mantemos aqui caso queira data-attrs
  });
 
  // inicializa contagem
  updateCart();
});
 
/* UTIL helpers */
function formatBRL(num){
  return 'R$ ' + num.toFixed(2).replace('.', ',');
}
 
/* abrir/fechar painel */
function toggleCart(){
  const panel = document.getElementById('cart');
  if(!panel) return;
  panel.classList.toggle('open');
}
 
/* adicionar ao carrinho */
function addToCart(name, price){
  // procura item igual -> incrementa qty
  const idx = window.cart.findIndex(i => i.name === name);
  if(idx > -1){
    window.cart[idx].qty += 1;
  } else {
    window.cart.push({ name, price: Number(price), qty: 1 });
  }
  saveAndUpdate();
  // feedback rápido
  const icon = document.getElementById('cart-count');
  if(icon) {
    icon.classList.add('bump');
    setTimeout(()=> icon.classList.remove('bump'), 280);
  }
}
 
/* remover item */
function removeFromCart(index){
  if(index < 0 || index >= window.cart.length) return;
  window.cart.splice(index, 1);
  saveAndUpdate();
}
 
/* alterar quantidade */
function changeQty(index, delta){
  if(index < 0 || index >= window.cart.length) return;
  window.cart[index].qty += delta;
  if(window.cart[index].qty <= 0) window.cart.splice(index,1);
  saveAndUpdate();
}
 
/* salvar e atualizar UI */
function saveAndUpdate(){
  sessionStorage.setItem('cart', JSON.stringify(window.cart));
  updateCart();
}
 
/* renderiza o carrinho e total */
function updateCart(){
  // contar e mostrar
  const countEl = document.getElementById('cart-count');
  const itemsEl = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  if(!itemsEl || !totalEl || !countEl) return;
 
  // limpar
  itemsEl.innerHTML = '';
  let total = 0;
  window.cart.forEach((item, i) => {
    total += item.price * item.qty;
    const li = document.createElement('li');
 
    const info = document.createElement('div');
    info.className = 'item-info';
    info.innerHTML = `<strong>${item.name}</strong><br><small>R$ ${item.price.toFixed(2).replace('.',',')} x ${item.qty}</small>`;
 
    const controls = document.createElement('div');
    controls.className = 'item-controls';
    controls.innerHTML = `
      <button onclick="changeQty(${i}, -1)" class="small-btn">−</button>
      <span style="margin:0 8px">${item.qty}</span>
      <button onclick="changeQty(${i}, 1)" class="small-btn">+</button>
      <button onclick="removeFromCart(${i})" class="remove">Remover</button>
    `;
 
    li.appendChild(info);
    li.appendChild(controls);
    itemsEl.appendChild(li);
  });
 
  totalEl.textContent = formatBRL(total || 0);
  countEl.textContent = window.cart.reduce((s,i)=>s+i.qty,0);
}
 
/* finalizar compra (simples) */
function checkout(){
  if(!window.cart || window.cart.length === 0){
    alert('Seu carrinho está vazio!');
    return;
  }
  // aqui você pode integrar com backend / gateway
  alert('Compra finalizada com sucesso! Obrigada ❤️');
  window.cart = [];
  saveAndUpdate();
  toggleCart();
}
/* ====== Carrinho funcional simples ====== */
/* Mantém o carrinho em memória (session) enquanto a página estiver aberta.
   Funcionalidades: add, remove, change qty, total, toggle panel, checkout. */
 
document.addEventListener('DOMContentLoaded', () => {
  // elementos (podem estar em muitas páginas; usar querySelectors seguros)
  window.cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
  window.updateCart = updateCart;
 
  // ligar eventos (se houver elementos)
  document.querySelectorAll('.add').forEach(btn => {
    // já possuem onclick inline em produtos, mas mantemos aqui caso queira data-attrs
  });
 
  // inicializa contagem
  updateCart();
});
 
/* UTIL helpers */
function formatBRL(num){
  return 'R$ ' + num.toFixed(2).replace('.', ',');
}
 
/* abrir/fechar painel */
function toggleCart(){
  const panel = document.getElementById('cart');
  if(!panel) return;
  panel.classList.toggle('open');
}
 
/* adicionar ao carrinho */
function addToCart(name, price){
  // procura item igual -> incrementa qty
  const idx = window.cart.findIndex(i => i.name === name);
  if(idx > -1){
    window.cart[idx].qty += 1;
  } else {
    window.cart.push({ name, price: Number(price), qty: 1 });
  }
  saveAndUpdate();
  // feedback rápido
  const icon = document.getElementById('cart-count');
  if(icon) {
    icon.classList.add('bump');
    setTimeout(()=> icon.classList.remove('bump'), 280);
  }
}
 
/* remover item */
function removeFromCart(index){
  if(index < 0 || index >= window.cart.length) return;
  window.cart.splice(index, 1);
  saveAndUpdate();
}
 
/* alterar quantidade */
function changeQty(index, delta){
  if(index < 0 || index >= window.cart.length) return;
  window.cart[index].qty += delta;
  if(window.cart[index].qty <= 0) window.cart.splice(index,1);
  saveAndUpdate();
}
 
/* salvar e atualizar UI */
function saveAndUpdate(){
  sessionStorage.setItem('cart', JSON.stringify(window.cart));
  updateCart();
}
 
/* renderiza o carrinho e total */
function updateCart(){
  // contar e mostrar
  const countEl = document.getElementById('cart-count');
  const itemsEl = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  if(!itemsEl || !totalEl || !countEl) return;
 
  // limpar
  itemsEl.innerHTML = '';
  let total = 0;
  window.cart.forEach((item, i) => {
    total += item.price * item.qty;
    const li = document.createElement('li');
 
    const info = document.createElement('div');
    info.className = 'item-info';
    info.innerHTML = `<strong>${item.name}</strong><br><small>R$ ${item.price.toFixed(2).replace('.',',')} x ${item.qty}</small>`;
 
    const controls = document.createElement('div');
    controls.className = 'item-controls';
    controls.innerHTML = `
      <button onclick="changeQty(${i}, -1)" class="small-btn">−</button>
      <span style="margin:0 8px">${item.qty}</span>
      <button onclick="changeQty(${i}, 1)" class="small-btn">+</button>
      <button onclick="removeFromCart(${i})" class="remove">Remover</button>
    `;
 
    li.appendChild(info);
    li.appendChild(controls);
    itemsEl.appendChild(li);
  });
 
  totalEl.textContent = formatBRL(total || 0);
  countEl.textContent = window.cart.reduce((s,i)=>s+i.qty,0);
}
 
/* finalizar compra (simples) */
function checkout(){
  if(!window.cart || window.cart.length === 0){
    alert('Seu carrinho está vazio!');
    return;
  }
  // aqui você pode integrar com backend / gateway
  alert('Compra finalizada com sucesso! Obrigada ');
  window.cart = [];
  saveAndUpdate();
  toggleCart();
}
 