export default {
    name: "close",
    category: "group",
    command: ["close"],
    settings: { admin: true, botAdmin: true, group: true },
    run: async (m,{conn}) => {
        const data = await conn.groupMetadata(m.chat);
        let isClose = (data.announce === true);
        if (isClose) {
            return m.reply("[!] Grup udah tutup sejak tadi");
        }
        // only allow admins to send messages
        await conn.groupSettingUpdate(m.chat, "announcement");
        m.reply("Done tutup grup");
    }
};
