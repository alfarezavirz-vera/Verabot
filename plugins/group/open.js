export default {
    name: "open",
    category: "group",
    command: ["open"],
    settings: { admin: true, botAdmin: true, group: true },
    run: async (conn, m) => {
        const data = await conn.groupMetadata(m.chat);
        let isOpen = data.announce === false
        if (isOpen) {
            return m.reply("[!] Grup udah buka sejak tadi");
        }
        // only allow admins to send messages
        await conn.groupSettingUpdate(m.chat, "not_announcement");
        m.reply("Done buka grup");
    }
};
