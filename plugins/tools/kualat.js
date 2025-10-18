import kualatshort from "#scrape/shorturl.js";

export default {
    name: "kualat",
    category: "tools",
    command: ["kualat"],
    settings: {
        limit: true,
        premium: true
    },
    run: async (conn, m, { Func }) => {
        const url = Func.isUrl(m.text.trim());
        if (!url)
            return m.reply(Func.ex(m.cmd, null, "url", "github.com/Adzy-xyz"));
        try {
            const result = await kualatshort(m.text);
            conn.sendMessage(m.chat, {
                text: "`[#]` Url berhasil di short klik button ini untuk salin",
                footer: "Kualat - Short",
                interactiveButtons: [
                    {
                        name: "cta_copy",
                        buttonParamsJson: JSON.stringify({
                            display_text: "[!] Klik",
                            copy_code: result.data.shorturl
                        })
                    }
                ]
            }, {quoted:qtext});
        } catch (err) {
            console.log(err);
            m.reply("Upss:\n" + err.message);
        }
    }
};
