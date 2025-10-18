import axios from "axios";

const handler = {
    name: "gitraw",
    category: "tools",
    command: ["gitraw"],
    settings: {
        react: true
    },
    run: async (conn, m) => {
        if (!m.args[0])
            m.reply`⚠️ Contoh penggunaan:\n${m.cmd} https://github.com/GilangSan/myscraper/blob/main/ytChannelAnalyzer.js`;
        let url = m.args[0];
        let finalUrl = url;
        try {
            if (url.includes("github.com") && url.includes("/blob/")) {
                finalUrl = url
                    .replace("github.com", "raw.githubusercontent.com")
                    .replace("/blob/", "/");
            }
            if (finalUrl.includes("/refs/heads/")) {
                finalUrl = finalUrl.replace("/refs/heads", "");
            }
            const { data } = await axios.get(finalUrl, {
                headers: { "User-Agent": "Mozilla/5.0" }
            });
            if (data.length > 4000) {
                await conn.sendMessage(
                    m.chat,
                    {
                        document: Buffer.from(data, "utf-8"),
                        fileName: "content.log",
                        mimetype: "text/plain",
                        caption: `✅ Berhasil mengambil isi file dari:\n${finalUrl}`
                    },
                    { quoted: m }
                );
            } else {
                await conn.sendMessage(
                    m.chat,
                    {
                        text: "[!] Berhasil menyapin konten klik salin di bawah",
                        footer: "GetGit - Github",
                        interactiveButtons: [
                            {
                                name: "cta_copy",
                                buttonParamsJson: JSON.stringify({
                                    display_text: "Salin",
                                    copy_code: data
                                })
                            }
                        ]
                    },
                    { quoted: qtext }
                );
            }
        } catch (err) {
            console.error(err);
            m.reply(
                "❌ Gagal mengambil isi file, pastikan link valid dan file publik."
            );
        }
    }
};

export default handler;
