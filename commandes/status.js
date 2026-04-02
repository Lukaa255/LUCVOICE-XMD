const fs = require('fs');

const handleGreeting = async (m, gss) => {
  try {
    const textLower = m.body.toLowerCase();
    const triggerWords = ['save','statusdown','take','sent','giv','gib','upload','send me','znt','snt','ayak','do','mee'];

    if (!triggerWords.some(word => textLower.includes(word))) return;

    const quotedMessage = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    if (!quotedMessage) return;

    // Image
    if (quotedMessage.imageMessage) {
      const imageCaption = quotedMessage.imageMessage.caption;
      const imageUrl = await gss.downloadAndSaveMediaMessage(quotedMessage.imageMessage);
      await gss.sendMessage(m.from, {
        image: { url: imageUrl },
        caption: imageCaption,
        contextInfo: { mentionedJid: [m.sender], forwardingScore: 9999, isForwarded: true },
      });
      fs.unlink(imageUrl, () => {});
    }

    // Video
    if (quotedMessage.videoMessage) {
      const videoCaption = quotedMessage.videoMessage.caption;
      const videoUrl = await gss.downloadAndSaveMediaMessage(quotedMessage.videoMessage);
      await gss.sendMessage(m.from, {
        video: { url: videoUrl },
        caption: videoCaption,
        contextInfo: { mentionedJid: [m.sender], forwardingScore: 9999, isForwarded: true },
      });
      fs.unlink(videoUrl, () => {});
    }

  } catch (error) {
    console.error('Error in handleGreeting:', error);
  }
};

module.exports = handleGreeting;
