export default {
    name: "npmdl",
    category: "downloader",
    command: ["npmdl"],
    settings: {
        loading: true
    },
    cooldown: 15,
    run: async (m, { conn, Api }) => {
        if (!m.text)
            return m.reply(
                "[×] Failed to download silab masukan query\n> Misal: naruyaizumi"
            );
        try {
            const endpoint = "/api/downloader/npm";
            const params = {
                query: m.text
            };
            const apis = await Api.request("zenz", endpoint, params);
            m.reply({
                document: { url: apis.data.url },
                caption: "Done downloads",
                fileName: m.text.trim() + ".tar.gz",
                mimetype: "application/gzip"
            });
        } catch (err) {
            m.reply(err.message);
        }
    }
};
