export default {
    name: "linkgc",
    category: "group",
    command: ["link", "linkgc"],
    settings: {
        group: true,
        botAdmin: true
    },
    run: async (m, { conn }) => {
        m.reply(
            "https://chat.whatsapp.com/" + (await conn.groupInviteCode(m.chat))
        );
    }
};
