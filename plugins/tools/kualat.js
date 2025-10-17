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
            m.reply(`ini dia kak Short url nya ${result.data.shorturl}`);
        } catch (err) {
            console.log(err);
            m.reply("Upss:\n" + err.message);
        }
    }
};
