// Get the canvas and context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let circles = [];  // Array to store circle data
let startX = 0;
let startY = 0;
let endX = 0;
let endY = 0;

// Function to generate a random color in hex format
function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to draw a circle and store it
function drawCircle() {
  let radius = Math.abs(endX - startX); // Calculate radius
  let color = getRandomColor(); // Get random color

  // Save the circle data (center, radius, color)
  let circle = {
    x: startX,
    y: startY,
    radius: radius,
    color: color
  };
  circles.push(circle); // Add the circle to the array

  // Draw the circle on the canvas
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fillStyle = circle.color;
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();
}

// Event listener to get mouse positions and draw circle
canvas.addEventListener("mousedown", function (evt) {
  var rect = canvas.getBoundingClientRect();
  startX = evt.clientX - rect.left;
  startY = evt.clientY - rect.top;
});

canvas.addEventListener("mouseup", function (evt) {
  var rect = canvas.getBoundingClientRect();
  endX = evt.clientX - rect.left;
  endY = evt.clientY - rect.top;
  drawCircle();  // Draw circle on mouseup
});

// Check if click is inside a circle (for 'Hit' or 'Miss')
function isInsideCircle(x, y, circle) {
  let distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
  return distance <= circle.radius;
}

// Function to show 'Hit' or 'Miss' on the canvas
function showHitOrMissMessage(hit, clickX, clickY) {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  // Redraw all circles
  circles.forEach(function (circle) {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = circle.color;
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
  });

  // Draw the 'Hit' or 'Miss' message at the click position
  ctx.font = "20px Arial";
  ctx.fillStyle = hit ? "green" : "red";
  ctx.fillText(hit ? "Hit" : "Miss", clickX, clickY);
}

// Click event to show 'Hit' or 'Miss'
canvas.addEventListener("click", function (evt) {
  var rect = canvas.getBoundingClientRect();
  let clickX = evt.clientX - rect.left;
  let clickY = evt.clientY - rect.top;
  let hit = false;

  for (let i = 0; i < circles.length; i++) {
    if (isInsideCircle(clickX, clickY, circles[i])) {
      hit = true;
      break;
    }
  }

  showHitOrMissMessage(hit, clickX, clickY); // Show 'Hit' or 'Miss'
});

// Double-click event to delete circle
canvas.addEventListener("dblclick", function (evt) {
  var rect = canvas.getBoundingClientRect();
  let clickX = evt.clientX - rect.left;
  let clickY = evt.clientY - rect.top;

  for (let i = 0; i < circles.length; i++) {
    if (isInsideCircle(clickX, clickY, circles[i])) {
      // Remove circle from the array
      circles.splice(i, 1);
      // Clear the canvas and redraw all circles
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      circles.forEach(function (circle) {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = circle.color;
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.stroke();
      });
      break;
    }
  }
});

// Reset canvas function
function resetCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the entire canvas
  circles = [];  // Clear the circles array
}
