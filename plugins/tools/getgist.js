import { fetch } from "undici";

export default {
    name: "getgist",
    category: "tools",
    command: ["getgist", "gistraw"],
    settings: { react: true },
    run: async (m, { conn }) => {
        if (!m.text)
            return m.reply(
                `[!] Kirim ID atau URL Gist!\n\nContoh:\n${m.cmd} 4c2db6dca3ee1e5f3eac53bd31c2f4d7`
            );
        const gistId = m.text.includes("gist.github.com")
            ? m.text.split("/").pop().split("?")[0]
            : m.text.trim();
        try {
            const res = await fetch(`https://api.github.com/gists/${gistId}`);
            if (!res.ok)
                return m.reply("`[!]` Gist tidak ditemukan atau private.");

            const json = await res.json();
            const files = json.files;
            const firstFile = Object.values(files)[0];

            if (!firstFile || !firstFile.content)
                return m.reply(
                    "[-] Isi Gist kosong atau file tidak bisa dibaca."
                );

            const namaFile = firstFile.filename;
            const isiFile = firstFile.content;
            const gistUrl = json.html_url;

            const output =
                `[#] *Gist ID:* ${gistId}\n` +
                `[#] *Nama File:* ${namaFile}\n\n` +
                "[!] Kamu bisa salin gist nya dengan klik Copy gist";

            const isi = `${isiFile.slice(
                0,
                10000
            )}\n`;

            await conn.sendMessage(
                m.chat,
                {
                    text: output.trim(),
                    footer: "Gist Viewer by Bot",
                    interactiveButtons: [
                        {
                            name: "cta_copy",
                            buttonParamsJson: JSON.stringify({
                                display_text: "[!] Copy Gist",
                                copy_code: isi
                            })
                        }
                    ]
                },
                { quoted: qtext }
            );
        } catch (err) {
            console.error(err);
            m.reply(
                `[×] Gagal ambil Gist!\n[>] *Error:* ${err.message || err}`
            );
        }
    }
};
