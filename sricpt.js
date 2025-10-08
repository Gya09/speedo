const speedCircle = document.querySelector('.progress.speed');
const speedText = document.getElementById('speed');
const gearText = document.getElementById('gear');

function setCircleValue(circle, value, max) {
  const circumference = 534;
  const offset = circumference - (value / max) * circumference;
  circle.style.strokeDashoffset = offset;
}

function lerpColor(a, b, amount) {
  const ah = parseInt(a.replace(/#/g, ''), 16),
        ar = ah >> 16, ag = (ah >> 8) & 0xff, ab = ah & 0xff,
        bh = parseInt(b.replace(/#/g, ''), 16),
        br = bh >> 16, bg = (bh >> 8) & 0xff, bb = bh & 0xff,
        rr = ar + amount * (br - ar),
        rg = ag + amount * (bg - ag),
        rb = ab + amount * (bb - ab);
  return '#' + (((1 << 24) + (rr << 16) + (rg << 8) + rb) | 0).toString(16).slice(1);
}

function updateFill(id, value, colorStart, colorEnd) {
  const el = document.getElementById(id);
  const percent = Math.max(0, Math.min(value, 100));
  const color = lerpColor(colorStart, colorEnd, percent / 100);
  el.style.width = percent + '%';
  el.style.background = color;
}

function updateSpeedometer({ speed, rpm, fuel, health, nitro, gear }) {
  const maxSpeed = 240;
  const maxRpm = 8000;

  // Update digital speed
  speedText.textContent = Math.round(speed);
  setCircleValue(speedCircle, speed, maxSpeed);

  // Dynamic speed color
  const speedRatio = Math.min(speed / maxSpeed, 1);
  speedCircle.style.stroke = lerpColor('#00bfff', '#ff0040', speedRatio);

  // Update bars
  updateFill('rpm', (rpm / maxRpm) * 100, '#00ff88', '#ff0040');
  updateFill('fuel', fuel, '#00ff88', '#ff0000');
  updateFill('health', health, '#00ffcc', '#ff3300');
  updateFill('nitro', nitro, '#00ffff', '#ff00ff');

  // Gear indicator
  gearText.textContent = gear || 'N';
  gearText.style.color = speedRatio > 0.8 ? '#ff3333' : '#00bfff';
}

// 🔹 Simulasi untuk test (hapus saat dipakai di RAGE)
let testSpeed = 0, dir = 1;
setInterval(() => {
  testSpeed += dir * 4;
  if (testSpeed > 240 || testSpeed < 0) dir *= -1;
  const rpm = (testSpeed / 240) * 7000;
  const fuel = 100 - testSpeed / 3;
  const health = 100 - testSpeed / 4;
  const nitro = (testSpeed / 240) * 100;
  const gear = Math.floor(testSpeed / 40) + 1;
  updateSpeedometer({ speed: testSpeed, rpm, fuel, health, nitro, gear });
}, 120);
