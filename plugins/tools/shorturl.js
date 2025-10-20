import shorturl from "#scrape/abelashort.js";

export default {
    name: "shorturl",
    category: "tools",
    command: ["shorturl"],
    settings: {
        limit: true,
        premium: true
    },
    run: async (conn, m, { Func }) => {
        const url = Func.isUrl(m.text.trim());
        if (!url) return m.reply("[!] Masukin link yg nak di short");
        try {
            const result = await shorturl(m.text);
            conn.sendMessage(
                m.chat,
                {
                    text: "`[#]` Url berhasil di short klik button ini untuk salin",
                    footer: "Shorturl - Feature",
                    interactiveButtons: [
                        {
                            name: "cta_url",
                            buttonParamsJson: JSON.stringify({
                                display_text: "[!] Klik",
                                url: result.shortUrl,
                                merchant_url: result.shortUrl
                            })
                        }
                    ]
                },
                { quoted: qtext }
            );
        } catch (err) {
            console.log(err);
            m.reply("Upss:\n" + err.message);
        }
    }
};
