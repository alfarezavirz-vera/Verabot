export default {
    name: "mediafire",
    category: "dowloader",
    command: ["mediafire", "mfdl"],
    settings: {
        limit: true,
        loading: true
    },
    cooldown: 15,
    run: async (conn, m, { Api, Func }) => {
        if (!m.text)
            return m.reply(
                "[×] Failed to dowload! Silakan masukann link mediafire"
            );
        try {
            let apis = await Api.request("zenz", "/api/downloader/mediafire", {
                url: m.text
            });
            const { filename, filesize, mimetype, uploaded, download_url } =
                apis.data;
            const cap =
                "[#] Mediafire download\n" +
                `Nama: ${filename}\n` +
                `Size: ${filesize}\n` +
                `Mimetype: ${mimetype}\n` +
                `di Upload: ${Func.ago(uploaded)}`;
            conn.sendMessage(
                m.chat,
                {
                    document: { url: download_url },
                    caption: cap,
                    mimetype: mimetype,
                    fileName: filename
                },
                { quoted: qtext }
            );
        } catch (err) {
            m.reply(err.message);
        }
    }
};
