/**
FanzCode();
**/

export default {
    name: "ytmp4",
    category: "downloader",
    command: ["ytmp4", "ytv"],
    settings: {
        react: true
    },
    run: async (conn, m, { Api, Func }) => {
        if (!m.text)
            return m.reply(
                Func.ex(
                    m.cmd,
                    "YOUTUBE DOWNLOAD",
                    "url",
                    "https://youtu.be/xxxx"
                )
            );

        await m.reply("Sabar yaa");

        try {
            // Pemanggilan API dengan 4 argumen: argumen ke-4 adalah headers/options.
            let api = await Api.request("vera", "/api/dl/youtube-v3", {
                // Query parameters (Argumen ke-3)
                url: m.text,
                format: "720"
            }, {
                // Options/Headers (Argumen ke-4)
                headers: {
                    "X-API-Key": cfg.apiKey.vera // Sintaks dan Case Sensitivity sudah benar
                }
            });

            // Pengecekan kegagalan API atau jika 'api' null (Anti-Crash)
            if (!api || !api.status || !api.result || !api.result.download) {
                // api.message akan tersedia jika status: false dari API
                let errorMsg = api && api.message ? api.message : "Gagal mendapatkan data video atau link download dari API. Coba pastikan URL valid.";
                return m.reply(`❌ ${errorMsg}`);
            }

            let result = api.result;

            // Mengirim thumbnail dan caption
            await m.reply({
                image: {
                    url: result.thumbnail
                },
                caption: `Yt video di temukan:\n> Judul: *${result.title}*\n> Kualitas: ${result.quality}\n\n*Status: mendownload video*`
            });

            // Mengirim file video
            m.reply({
                video: {
                    url: result.download // Menggunakan properti API baru
                },
                caption: "Done terdownload puh"
            });
            
        } catch (e) {
            console.error(e);
            m.reply("❌ Terjadi kesalahan internal saat memproses data: " + e.message);
        }
    }
};