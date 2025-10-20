export default {
    name: "ssweb",
    command: ["ssweb"],
    category: "tools",
    run: async (conn, m, { Scrape, Func }) => {
        const url = m.text.trim();
        if (!url)
            return m.reply(`[>] Penggunaan Salah:
> ${m.cmd} [url]
> ${m.cmd} github.com`);

        // Panggil scraper dari list
        const ssweb = await Scrape.ssweb; // ini ngambil module dari scrape/src/ssweb.js

        // Karena ssweb adalah class, kita bikin instance
        const client = new ssweb.default("fdaf638490cf4d5aad5bdabe7ec23187");

        try {
            const result = await client.capture(url, { full_page: true });
            await conn.sendMessage(
                m.chat,
                {
                    image: result.buffer,
                    caption: `✅ Screenshot dari ${url}`
                },
                { quoted: qtext }
            );
        } catch (err) {
            m.reply("❌ Gagal ambil screenshot: " + err.message);
        }
    }
};
