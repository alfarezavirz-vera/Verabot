export default {
    name: "stikwm",
    category: "sticker",
    command: ["swm", "stikwm"],
    cooldown: 10,
    run: async (conn, m, { quoted, Func }) => {
        if (/image|video|webp/.test(quoted.msg?.mimetype) && m.text) {
            let media = await quoted.download();
            if (quoted.msg?.seconds > 10) {
                return m.reply("tidak boleh lebih dari 10 detik");
            }
            let text = m.text;
            let [packname, ...author] = (text || "").split("|");
            author = (author || []).join("|");
            conn.sendSticker(m.chat, media, m, {
                packname: packname,
                packpublish: author
            });
        } else {
            m.reply("[!] Invalid query! try it > " + m.cmd + " txt|txt2")
        }
    }
};
