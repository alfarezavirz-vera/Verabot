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
            year: "2-digit"
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
        const kontext = {
            mentionedJid: [...conn.parseMention(mani)],
            externalAdReply: {
                title: cfg.ads.title,
                body: cfg.ads.body,
                thumbnailUrl: cfg.bot.thumb,
                mediaType: 1,
                previewType: "VIDEO",
                renderLargerThumbnail: true
            }
        };

        // Menu Utama
        if (!jirlah) {
            mani += `${intro}\n\n`;
            mani += `👋 Halo *@${
                m.sender.split("@")[0]
            }*, ini daftar menu yang tersedia:\n\n`;
            mani += `╭─❏ *$ist Category*\n`;
            for (let category of Object.keys(grouped)) {
                mani += `│ *${m.prefix}menu ${category.toLowerCase()}*\n`;
            }
            mani += "╰─⭓\n";

            mani += `Ketik "${m.prefix}menu all" buat liat semua menu`;
            conn.sendMessage(
                m.chat,
                {
                    footer: cfg.bot.footer,
                    text: mani,
                    interactiveButtons: [
                        {
                            name: "single_select",
                            buttonParamsJson: JSON.stringify({
                                title: "Pencet!",
                                sections: [
                                    {
                                        title: "Menu yang di pin",
                                        highlight_label: "Paling byk dipke",
                                        rows: [
                                            {
                                                header: "allmenu",
                                                title: "All Menu",
                                                description:
                                                    "Melihat semua menu",
                                                id: `${m.prefix}menu all`
                                            },
                                            {
                                                header: "info os",
                                                title: "OS/Pinh",
                                                description:
                                                    "Melihat status bot/ping bot",
                                                id: `${m.prefix}os`
                                            }
                                        ]
                                    }
                                ]
                            })
                        },
                        {
                            name: "quick_reply",
                            buttonParamsJson: JSON.stringify({
                                display_text: "Info Script",
                                id: `${m.prefix}script`
                            })
                        }
                    ],
                    contextInfo: {mentionedJid: [...conn.parseMention(mani)],}
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
            m.reply({ text: mani, contextInfo: kontext }, { quoted: qtext });
        }

        // Menu per kategori
        else if (grouped[jirlah]) {
            mani += `${intro}\n\n`;
            mani += `📂 *Kategori:* ${jirlah.toUpperCase()}\n\n`;

            for (let hitem of grouped[jirlah]) {
                mani += `✦ ${m.prefix}${hitem.name}\n`;
            }
            m.reply({ text: mani, contextInfo: kontext }, { quoted: qtext });
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
