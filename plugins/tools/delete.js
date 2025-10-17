export default {
    name: "delete",
    category: "tools",
    command: ["delete", "del"],
    run: async (conn, m, { isAdmin, isBotAdmin }) => {
        if (!m.quoted)
            return m.reply(
                `Reply pesan yang ingin dihapus dengan caption ${m.cmd}`
            );
        if (m.quoted.fromMe) {
            m.reply({ delete: m.quoted.key });
        } else {
            if (!m.isGroup) return;
            if (!isBotAdmin) return m.reply(cfg.mess.botAdmin);
            if (!isAdmin) return m.reply(cfg.mess.admin);
            m.reply({ delete: m.quoted.key });
        }
    }
};
