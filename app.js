fetch('http://localhost/retrieve.php')
  .then(response => response.json())
  .then(data => {
    const direction = data.direction;
    const distance = data.distance * 10;

    draw(direction, distance);
  })
  .catch(error => {
    console.error(error);
  });

  
function isCanvasBlank(canvas) {
  return (
    !canvas.getContext('2d')
      .getImageData(0, 0, canvas.width, canvas.height)
      .data.some(channel => channel !== 0)
  );
};

function draw( direction, distance) {

  const canvas = document.querySelector('#canvas');
  if (!canvas.getContext) {
    return;
  }
  const ctx = canvas.getContext('2d');

  if (isCanvasBlank(canvas)) {
    ctx.translate(canvas.width / 2, canvas.height / 2);
  }

  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2;

  const lastX = parseInt(localStorage.getItem('lastX')) || 0;
  const lastY = parseInt(localStorage.getItem('lastY')) || 0;

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);

  if (direction === 'forward') {
    ctx.lineTo(lastX, lastY - distance);
    localStorage.setItem('lastY', lastY - distance);
  } else if (direction === 'left') {
    ctx.lineTo(lastX - distance, lastY);
    localStorage.setItem('lastX', lastX - distance);
  } else if (direction === 'right') {
    ctx.lineTo(lastX + distance, lastY);
    localStorage.setItem('lastX', lastX + distance);
  } else if (direction === 'backward') {
    ctx.lineTo(lastX, lastY + distance);
    localStorage.setItem('lastY', lastY + distance);
  }

  ctx.stroke();

};

