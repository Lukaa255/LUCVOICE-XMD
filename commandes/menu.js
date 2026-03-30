const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

zokou({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    let { cm } = require(__dirname + "/../framework/zokou");
    let coms = {};
    let mode = s.MODE.toLowerCase() === "yes" ? "public" : "private";

    // Organiser commands par catégorie
    cm.forEach(com => {
        if (!coms[com.categorie]) coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    // Header info
    let infoMsg = `
╭━━━〔 *${s.BOT}* 〕━━━┈⊷
┃ 👑 Owner   : ${s.OWNER_NAME}
┃ ⚡ Prefix  : [ ${s.PREFIXE} ] 
┃ 🔐 Mode    : *${mode}*
┃ 📅 Date    : *${date}*
┃ ⏱️ Time    : *${temps}*
┃ 💾 RAM     : 8/132 GB
┃ 🖥️ Platform: Chrome Linux
┃ 💡 Creator : Lucvoice
╰────────────────┈⊷\n${readmore}`;

    // Menu content
    let menuMsg = `💫 *LUCVOICE-XMD COMMANDS* 💫\n`;

    for (const cat in coms) {
        menuMsg += `\n╭──「 *${cat.toUpperCase()}* 」──┈⊷\n`;
        coms[cat].forEach(cmd => {
            menuMsg += `┃ ✦ ${prefixe}${cmd}\n`;
        });
        menuMsg += `╰──────────────┈⊷\n`;
    }

    menuMsg += `\n✨ Powered by LUKA iT\n`;

    // Send with image/video if exists
    let lien = mybotpic();

    try {
        if (lien.match(/\.(mp4|gif)$/i)) {
            await zk.sendMessage(dest, {
                video: { url: lien },
                caption: infoMsg + menuMsg,
                footer: "Je suis *Beltahmd*, développeur Beltah Tech",
                gifPlayback: true
            }, { quoted: ms });
        } else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
            await zk.sendMessage(dest, {
                image: { url: lien },
                caption: infoMsg + menuMsg,
                footer: "Je suis *Beltahmd*, développeur Beltah Tech"
            }, { quoted: ms });
        } else {
            await repondre(infoMsg + menuMsg);
        }
    } catch (e) {
        console.log("🥵 Menu erreur: " + e);
        repondre("🥵 Menu erreur: " + e);
    }
});
