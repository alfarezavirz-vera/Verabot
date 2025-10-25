export default {
    name: "cekmute",
    category: "owner",
    command: ["cekmute", "cekbungkam"],
    settings: {
        owner: true,
        group: true
    },
    run: async (m, { conn, }) => {
        const groupName = m.isGroup
            ? conn.chats[m.chat]?.subject || "this group"
            : "this chat";
        const isMuted = db.list().group[m.chat]?.mute === true; // Check if mute property is explicitly true

        let message;
        if (isMuted) {
            message = `${cfg.bot.name} dibungkam di gruop "${groupName}"`;
        } else {
            message = `Group "${groupName}" Gak dibungkam`;
        }

        await m.reply(message);
    }
};
