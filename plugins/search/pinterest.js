/* 
Dengan bantuan Ey Ay
 */

export default {
    name: "pinterest",
    category: "search",
    command: ["pinterest", "pin"],
    settings: { loading: true },
    cooldown: 10,
    run: async (conn, m, { Api }) => {
        if (!m.text) return m.reply("[?] Nyari gambar apa");

        try {
            const end = "/api/search/pinterest";
            const prm = { query: m.text };
            const apis = await Api.request("zenz", end, prm);

            if (!apis || apis.statusCode !== 200) {
                return m.reply("Error " + apis?.statusCode);
            }

            const data = apis.data;
            if (!data || data.length === 0)
                return m.reply("Gambar tidak ditemukan");

            // batasi hanya 10 gambar biar gak spam
            const limit = data.slice(0, 10);

            if (limit.length === 1) {
                // kalau cuma 1 gambar, kirim langsung
                await m.reply({ image: { url: limit[0].directLink } });
            } else {
                // kalau lebih dari 1 gambar, kirim dalam bentuk album
                const media = limit.map(img => ({
                    image: { url: img.directLink }
                }));
                await conn.sendAlbumMessage(m.chat, media, { quoted: m });
            }
            m.reply("Berhasil mengirim 10 gambar")
        } catch (err) {
            m.reply("Error");
            console.error(err);
        }
    }
};
