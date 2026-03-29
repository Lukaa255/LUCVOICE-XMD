const os = require("os");

module.exports = {
  name: "ping",
  alias: ["speed", "alive"],
  description: "Check bot speed and status",

  async execute(client, message, args) {
    const start = new Date().getTime();

    const sent = await client.sendMessage(message.from, {
      text: "🏓 *Checking speed...*"
    }, { quoted: message });

    const end = new Date().getTime();

    const speed = end - start;

    // Runtime
    const runtime = process.uptime();
    const hours = Math.floor(runtime / 3600);
    const minutes = Math.floor((runtime % 3600) / 60);
    const seconds = Math.floor(runtime % 60);

    // RAM Usage
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    const total = os.totalmem() / 1024 / 1024;

    const result = `
╭───〔 🤖 BOT STATUS 〕───⬣
│ 🏓 Speed: *${speed} ms*
│ ⚡ Status: *Online*
│ ⏱️ Runtime: *${hours}h ${minutes}m ${seconds}s*
│ 💾 RAM: *${used.toFixed(2)} MB / ${total.toFixed(0)} MB*
╰──────────────────⬣

✨ Powered by LUKA iT
`;

    await client.sendMessage(message.from, {
      text: result,
      edit: sent.key
    });
  }
};
