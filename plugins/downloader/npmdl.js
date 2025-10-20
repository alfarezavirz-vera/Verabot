export default {
    name: "npmdl",
    category: "downloader",
    command: ["npmdl"],
    settings: {
        loading: true
    },
    cooldown: 15,
    run: async (conn, m, { Api }) => {
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
                fileName: "NpmDL.tar.gz",
                mimetype: "application/gzip"
            });
        } catch (err) {
            m.reply(err.message);
        }
    }
};
