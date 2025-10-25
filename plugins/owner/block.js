export default {
    name: "block",
    category: "owner",
    command: ["block"],
    settings: { owner: true, private: true },
    cooldown: 0,
    run: async (m, { conn, }) => {
        await m.reply("Melaksanakan perintah...");
        if (!m.text)
            return m.reply(
                "Gagal [!], Berikan perintahnya misal " + m.cmd + " true/false/list"
            );
        if (m.text === "true") {
            await conn.updateBlockStatus(m.chat, "block");
            m.reply("Berhasil memblokit user!");
        } else if (m.text === "false") {
            await conn.updateBlockStatus(m.chat, "un_block");
            m.reply("Berhasil membuka blokiran");
        } else if (m.text === "list") {
        	let txt = await conn.fetchBlocklist()
        	m.reply(txt)
        } else
        {
            return;
        }
    }
};
