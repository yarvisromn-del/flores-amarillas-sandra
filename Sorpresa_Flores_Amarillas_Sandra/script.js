const screens = [...document.querySelectorAll('.screen')];
let currentScreen = 0;
const opened = new Set();
const modal = document.getElementById('message-modal');
const modalMessage = document.getElementById('modal-message');
const modalTitle = document.getElementById('modal-title');

function showScreen(index) {
  currentScreen = index;
  screens.forEach((screen, i) => screen.classList.toggle('active', i === index));
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (index === 3) makePetals(12);
  if (index === 5) makePetals(20);
}

document.querySelectorAll('[data-next]').forEach(button => button.addEventListener('click', () => showScreen(Number(button.dataset.next))));
document.querySelectorAll('[data-prev]').forEach(button => button.addEventListener('click', () => showScreen(Number(button.dataset.prev))));

document.querySelectorAll('.memory-card').forEach((card, index) => {
  card.addEventListener('click', () => {
    const titles = ['Lo que admiro de ti', 'Lo que deseo para ti', 'Por qué quise sorprenderte'];
    modalTitle.textContent = titles[index];
    modalMessage.textContent = card.dataset.message;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    card.classList.add('opened');
    card.querySelector('.memory-hint').textContent = '✦ descubierto';
    opened.add(index);
    document.getElementById('opened-count').textContent = `Has descubierto ${opened.size} de 3 detalles`;
    if (opened.size === 3) document.getElementById('to-flowers').disabled = false;
  });
});
function closeModal() { modal.classList.remove('show'); modal.setAttribute('aria-hidden', 'true'); }
document.getElementById('close-modal').addEventListener('click', closeModal);
document.getElementById('modal-done').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
document.getElementById('to-flowers').addEventListener('click', () => showScreen(3));
document.getElementById('open-letter').addEventListener('click', () => {
  document.getElementById('envelope').classList.add('open');
  setTimeout(() => showScreen(5), 850);
});
document.getElementById('restart').addEventListener('click', () => {
  opened.clear();
  document.querySelectorAll('.memory-card').forEach(card => { card.classList.remove('opened'); card.querySelector('.memory-hint').textContent = 'toca para abrir ↗'; });
  document.getElementById('opened-count').textContent = 'Has descubierto 0 de 3 detalles';
  document.getElementById('to-flowers').disabled = true;
  document.getElementById('envelope').classList.remove('open');
  showScreen(0);
});

function makePetals(count = 7) {
  const field = document.querySelector('.petal-field');
  for (let i = 0; i < count; i++) {
    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.textContent = Math.random() > .5 ? '✿' : '❋';
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.animationDuration = `${5 + Math.random() * 6}s`;
    petal.style.animationDelay = `${Math.random() * 2}s`;
    petal.style.fontSize = `${10 + Math.random() * 12}px`;
    field.appendChild(petal);
    setTimeout(() => petal.remove(), 14000);
  }
}
setInterval(() => { if (document.visibilityState === 'visible') makePetals(2); }, 4200);
