const browser = mp.browsers.new("package://speedo/index.html");

mp.events.add('render', () => {
    const player = mp.players.local;
    const veh = player.vehicle;

    if (veh && browser) {
        // Ambil kecepatan pemain (m/s -> km/h)
        const speed = veh.getSpeed() * 3.6;

        // RPM, Gear, dll
        const rpm = veh.rpm * 8000;
        const gear = veh.gear;
        const fuel = 90; // contoh nilai dummy
        const health = veh.getBodyHealth() / 10; // ubah jadi 0–100
        const nitro = 0;

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
