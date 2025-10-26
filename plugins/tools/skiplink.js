import { TutwuriBypassClient } from "#scrape";

const handler = {
    name: "skiplink",
    category: "tools",
    command: ["skiplink"],
    settings: {
        loading: true
    },
    run: async (m, { conn, Func }) => {
        if (!m.text)
            return m.reply(`[>] Penggunaan Salah:
> ${m.cmd} url
> ${m.cmd} https:/sfl.gl/xx`);
        let args = m.text;
        try {
            let url = await TutwuriBypassClient.get(m.text);

            const interactiveButtons = [
                {
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: "Pencet",
                        url: url.linkGo,
                        merchant_url: url.linkGo
                    })
                }
            ];
            m.reply(
                {
                    text: "[!] ShortUrl berhasil",
                    footer: cfg.bot.footer,
                    interactiveButtons
                },
                { quoted: qtext }
            );
        } catch (err) {
            m.reply(err.message);
        }
    }
};

export default handler;
