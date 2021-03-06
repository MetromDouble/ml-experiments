let canvas;
let ctx;
let cw;
let ch;
let id;

function initCanvas() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  cw = canvas.width;
  ch = canvas.height;
  id = ctx.getImageData(0, 0, 1, 1);
}

async function draw() {
  let imageNumber = document.getElementById('image-number').value;
  ctx.clearRect(0, 0, cw, ch);

  const data = await getData(imageNumber);

  const normalizedData = data.split('|').map(item => item.split(','));

  normalizedData.forEach((row, y) => row.forEach((pixel, x) => {
    ctx.fillStyle = `rgba(${pixel}, ${pixel}, ${pixel}, 1)`;
    ctx.fillRect(x * 4, y * 4, 4, 4);
  }));
};

async function getData(number) {
  let response = await fetch(`/net${number ? '?number=' + number : ''}`);
  const { data } = await response.json();

  return data;
};


