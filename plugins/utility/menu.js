import fs from "fs";

export default {
    name: "menu",
    category: "utility",
    command: ["menu"],
    run: async (conn, m, { Func }) => {
        let grouped = {};
        let jirlah = m.args[0] ? m.args[0].toLowerCase() : null;

        for (let plugin of Object.values(plugins)) {
            if (!plugin.command) continue; //buat negskip plugin event biar ga undefined
            if (!grouped[plugin.category]) grouped[plugin.category] = [];
            grouped[plugin.category].push(plugin);
        }

        const time = new Date().toLocaleString("id-ID", {
            timeZone: cfg.tz,
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
        });
        const bot = global.cfg.bot;
        let mani = "";

        const intro = `╭─❏ *${bot.name}*
│ Versi : ${bot.version},
│ Tanggal : ${time},
│ Creator : made with ❤️ by Adzy,
│ Bases: AgusXzz,
│ UserName: ${m.pushname},
│ cmd: "${m.cmd}"
╰─⭓`;

        // Menu Utama
        if (!jirlah) {
            mani += `${intro}\n\n`;
            mani += `👋 Halo *@${
                m.sender.split("@")[0]
            }*, ini daftar menu yang tersedia:\n\n`;
            mani += `╭─❏ *$List Category*\n`;
            for (let category of Object.keys(grouped)) {
                mani += `│ *${m.prefix}menu ${category.toLowerCase()}*\n`;
            }
            ("╰─⭓\n");

            mani += `Ketik "${m.prerix}menu all" buat liat semua menu`;
            conn.sendMessage(
                m.chat,
                {
                    document: fs.readFileSync("./media/bot.pdf"),
                    mimetype: "application/pdf",
                    pageCount: 2025,
                    fileName: cfg.bot.name,
                    fileLength: 1099511627776,
                    caption: mani,
                    contextInfo: {
                        mentionedJid: [...conn.parseMention(mani)],
                        externalAdReply: {
                            title: cfg.ads.title,
                            body: "Version: " + cfg.bot.version,
                            showAdAttribution: true,
                            thumbnailUrl: cfg.ads.imageUrl,
                            mediaType: 1,
                            previewType: "VIDEO",
                            renderLargerThumbnail: true
                        }
                    }
                },
                { quoted: qtext }
            );
        }

        // Menu All
        else if (jirlah === "all") {
            mani += `${intro}\n\n`;
            mani += `📊 Total Kategori: *${
                Object.keys(grouped).length
            }*\n🧰 Total Fitur: *${Object.values(grouped).flat().length}*\n\n`;

            for (let [category, items] of Object.entries(grouped)) {
                mani += `╭─❏ *${category.toUpperCase()}*\n`;
                for (let item of items) {
                    mani += `│ ✦ ${m.prefix}${item.name}\n`;
                }
                mani += `╰─⭓\n\n`;
            }
            conn.sendMessage(
                m.chat,
                {
                    document: fs.readFileSync("./media/bot.pdf"),
                    mimetype: "application/pdf",
                    pageCount: 2025,
                    fileName: cfg.bot.name,
                    fileLength: 1099511627776,
                    caption: mani,
                    contextInfo: {
                        mentionedJid: [...conn.parseMention(mani)],
                        externalAdReply: {
                            title: cfg.ads.title,
                            body: "Version: " + cfg.bot.version,
                            showAdAttribution: true,
                            thumbnailUrl: cfg.ads.imageUrl,
                            mediaType: 1,
                            previewType: "VIDEO",
                            renderLargerThumbnail: true
                        }
                    }
                },
                { quoted: qtext }
            );
        }

        // Menu per kategori
        else if (grouped[jirlah]) {
            mani += `${intro}\n\n`;
            mani += `📂 *Kategori:* ${jirlah.toUpperCase()}\n\n`;

            for (let hitem of grouped[jirlah]) {
                mani += `✦ ${m.prefix}${hitem.name}\n`;
            }
            conn.sendMessage(
                m.chat,
                {
                    document: fs.readFileSync("./media/bot.pdf"),
                    mimetype: "application/pdf",
                    pageCount: 2025,
                    fileName: cfg.bot.name,
                    fileLength: 1099511627776,
                    caption: mani,
                    contextInfo: {
                        mentionedJid: [...conn.parseMention(mani)],
                        externalAdReply: {
                            title: "Category : " + jirlah.toUpperCase(),
                            body: "Version: " + cfg.bot.version,
                            showAdAttribution: true,
                            thumbnailUrl: cfg.ads.imageUrl,
                            mediaType: 1,
                            previewType: "VIDEO",
                            renderLargerThumbnail: true
                        }
                    }
                },
                { quoted: qtext }
            );
        }

        // Kategori gak ketemu
        else {
            mani += `⚠️ Kategori *${jirlah}* gak ditemukan.\nKlik button ini untuk melihat menu lain`;
            conn.sendMessage(m.chat, {
                text: mani,
                footer: "[×] Salah ajg",
                interactiveButtons: [
                    {
                        name: "single_select",
                        buttonParamsJson: JSON.stringify({
                            title: "Click Me!",
                            sections: [
                                {
                                    title: "Sila pilih satu",
                                    highlight_label: "Paling Umum",
                                    rows: [
                                        {
                                            header: "Menu biasa",
                                            title: "Menu",
                                            description:
                                                "Menampilkan menu biasa",
                                            id: `${m.prefix}menu`
                                        },
                                        {
                                            header: "Semuah menu",
                                            title: "Menu All",
                                            description:
                                                "Menampilkan semua menu",
                                            id: `${m.prefix}menu all`
                                        }
                                    ]
                                }
                            ]
                        })
                    }
                ]
            });
        }
    }
};
