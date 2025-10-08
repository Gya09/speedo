const browser = mp.browsers.new("package://speedo/index.html");

mp.events.add('render', () => {
  const player = mp.players.local;
  const veh = player.vehicle;

  if (veh) {
    const speed = veh.getSpeed() * 3.6; // convert m/s ke km/h
    const rpm = veh.rpm * 8000;         // rpm range 0–8000
    const fuel = 80;                    // contoh nilai statis
    const health = veh.getBodyHealth() / 10; // 0–100
    const nitro = 0;                    // jika belum punya sistem NOS
    const gear = veh.gear;

    browser.execute(`updateSpeedometer({
      speed: ${speed.toFixed(0)},
      rpm: ${rpm.toFixed(0)},
      fuel: ${fuel.toFixed(0)},
      health: ${health.toFixed(0)},
      nitro: ${nitro.toFixed(0)},
      gear: '${gear}'
    })`);
  }
});
