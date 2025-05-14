
const board = document.getElementById('board');
const legend = document.getElementById('legend');
const techColors = {
  'Joe': '#F6A1A1', 'Colin': '#A2D6F9', 'Doug': '#7881C2',
  'Bobbie': '#CBB7F0', 'John': '#A1E59F', 'Lonnie': '#D3C09A',
  'Rich': '#B8E986', 'Tyler': '#FFE135'
};
const shots = [];

function createBoard() {
  board.innerHTML = '';
  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 10; c++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.coord = String.fromCharCode(65 + r) + (c + 1);
      cell.onclick = () => fireShot(cell);
      board.appendChild(cell);
    }
  }
  renderLegend();
}
function fireShot(cell) {
  const tech = prompt('Who fired? (e.g. Joe, Colin)');
  const result = prompt('Hit or Miss?').toLowerCase();
  if (!tech || !result) return;
  const color = techColors[tech] || '#ddd';
  cell.style.background = color;
  if (result === 'hit') {
    cell.classList.add('hit');
    cell.innerText = '🔥';
  } else {
    cell.classList.add('miss');
    cell.innerText = '💦';
  }
  shots.push({ cell, previousText: cell.innerText, previousClass: cell.className });
}
function undoShot() {
  const last = shots.pop();
  if (!last) return;
  last.cell.className = 'cell';
  last.cell.innerText = '';
  last.cell.style.background = '';
}
function resetBoard() {
  shots.length = 0;
  createBoard();
}
function renderLegend() {
  legend.innerHTML = '<h3>Tech Legend</h3>';
  for (const [tech, color] of Object.entries(techColors)) {
    const entry = document.createElement('div');
    entry.innerHTML = `<span style="display:inline-block;width:20px;height:20px;background:${color};margin-right:10px;"></span>${tech}`;
    legend.appendChild(entry);
  }
}
window.onload = createBoard;
    