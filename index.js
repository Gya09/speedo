const browser = mp.browsers.new("package://speedo/index.html");

// Update speedometer otomatis setiap frame
mp.events.add('render', () => {
  const player = mp.players.local;
  const veh = player.vehicle;

  if (veh) {
    const speed = veh.getSpeed() * 3.6; // dari m/s ke km/h
    const rpm = veh.rpm * 8000;         // dari 0-8000
    const fuel = 100;                   // placeholder kalau belum ada sistem bensin
    const health = veh.getBodyHealth() / 10; // dari 0–100
    const nitro = 0;                    // kalau belum ada sistem NOS
    const gear = veh.gear;

    browser.execute(`updateSpeedometer({
      speed: ${speed.toFixed(1)},
      rpm: ${rpm.toFixed(0)},
      fuel: ${fuel.toFixed(0)},
      health: ${health.toFixed(0)},
      nitro: ${nitro.toFixed(0)},
      gear: '${gear}'
    })`);
  }
});
