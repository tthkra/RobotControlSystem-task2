var lastEndpoint = { x: 0, y: 0 };

document.querySelector('form').addEventListener('submit', function(event) {

  const direction = document.querySelector('select[name="directions"]').value;
  var distance = document.querySelector('input[name="distance"]').value;

  sendData(direction, distance);

  draw(direction, distance);
});

function isCanvasBlank(canvas) {
  return (
    !canvas.getContext('2d')
      .getImageData(0, 0, canvas.width, canvas.height)
      .data.some(channel => channel !== 0)
  );
}

function draw(direction, distance) {
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

  const lastX = lastEndpoint.x;
  const lastY = lastEndpoint.y;

  // represent every one meter distance with 10 pixels, just for visual clarification
  distance = distance * 10;

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);

  if (direction === 'forward') {
    ctx.lineTo(lastX, lastY - distance);
    lastEndpoint = { x: lastX, y: lastY - distance };
  } else if (direction === 'left') {
    ctx.lineTo(lastX - distance, lastY);
    lastEndpoint = { x: lastX - distance, y: lastY };
  } else if (direction === 'right') {
    ctx.lineTo(lastX + distance, lastY);
    lastEndpoint = { x: lastX + distance, y: lastY };
  } else if (direction === 'backward') {
    ctx.lineTo(lastX, lastY + distance);
    lastEndpoint = { x: lastX, y: lastY + distance };
  }

  ctx.stroke();
}

function sendData(direction, distance) {
  var data = {
      direction : direction,
      distance : distance
  };

  var xhr = new XMLHttpRequest();

  xhr.open("POST", "script.php", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.send(JSON.stringify(data));
}
