let browser = mp.browsers.new("package://speedo/index.html");

mp.events.add('updateSpeedo', (speed, rpm, fuel, health, nitro, gear) => {
  browser.execute(`updateSpeedometer({
    speed: ${speed}, rpm: ${rpm}, fuel: ${fuel},
    health: ${health}, nitro: ${nitro}, gear: '${gear}'
  })`);
});
