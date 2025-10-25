export default {
    name: "block",
    category: "owner",
    command: ["block"],
    settings: { owner: true, private: true, react: true },
    cooldown: 0,
    run: async (m, { conn }) => {
       await conn.updateBlockStatus(m.chat, "block");
        m.reply("Berhasil memblokit user!");
    }
};
