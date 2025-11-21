// simple mock feed - returns a stop function
export function startPriceFeed(callback: (id: string, price: number, volume?: number) => void) {
  // list of token ids to update
  const ids = ["1", "2", "3", "4"];
  const handle = setInterval(() => {
    const id = ids[Math.floor(Math.random() * ids.length)];
    // small random walk around a base price range
    const base = Math.random() * 5 + 1;
    const jitter = (Math.random() - 0.5) * 0.4; // +/-0.2
    const price = Math.round((base + jitter) * 100) / 100;
    const volume = Math.round(Math.random() * 5000);
    callback(id, price, volume);
  }, 900); // ~1 update per second (tweak as needed)

  return () => clearInterval(handle);
}
