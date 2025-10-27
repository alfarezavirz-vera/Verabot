import { APIFlashClient } from "#scrape";

export default {
    name: "ssweb",
    command: ["ssweb"],
    category: "tools",
    run: async (m, { conn, Func }) => {
        const url = m.text.trim();
        if (!url)
            return m.reply(`[>] Penggunaan Salah:
> ${m.cmd} [url]
> ${m.cmd} github.com`);
        try {
            const client = new APIFlashClient();
            const result = await client.capture(url, { full_page: true });
            await conn.sendMessage(
                m.chat,
                {
                    image: result.buffer,
                    caption: `[√] screenshot dari ${url}`
                },
                { quoted: qtext }
            );
        } catch (err) {
            m.reply("[×] Gagal ambil screenshot: " + err.message);
        }
    }
};
