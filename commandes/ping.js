// ping.js
module.exports = {
    nomCom: "ping", // command name
    reaction: "🏓",  // optional reaction emoji

    fonction: async (origin, zk, opts) => {
        try {
            const { repondre } = opts; // from commandeOptions

            // Start timer
            const start = Date.now();

            // Send temporary message
            const tempMsg = await zk.sendMessage(origin, { text: "🏓 Pinging..." });

            // Calculate latency
            const latency = Date.now() - start;

            // Send final response
            await zk.sendMessage(origin, {
                text: `🏓 Pong!\nLatency: ${latency} ms\nBot: ${opts.idBot.split("@")[0]}\nPrefix: ${opts.prefixe}`
            }, { quoted: tempMsg });

        } catch (e) {
            console.log("Ping error:", e);
            if (opts.repondre) opts.repondre("Error executing ping command!");
        }
    }
};
