import axios from "axios";

export default {
    name: "kodepos",
    category: "tools",
    command: ["kodepos", "codepos"],
    run: async (conn, m) => {
        if (!m.args[0]) {
            return m.reply(
                `📮 Masukkan nama daerah!\nContoh: ${m.cmd} Sukabumi`
            );
        }

        const kata = m.args.join(" ");
        try {
            const url = "https://api.lincah.id/api/check/zipcode";
            const { data } = await axios.post(
                url,
                { search: kata },
                {
                    headers: {
                        accept: "application/json, text/plain, */*",
                        "content-type": "application/json",
                        origin: "https://lincah.id",
                        referer: "https://lincah.id/",
                        "user-agent":
                            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36"
                    }
                }
            );

            const hasil = data?.data?.data;
            if (!hasil || !hasil.length)
                return m.reply(
                    "❌ Tidak ditemukan hasil untuk daerah tersebut."
                );

            const item = hasil[0];
            const link = `https://www.google.com/maps?q=${item.latitude},${item.longitude}`;

            const caption = `🗺️ *Kode Pos Ditemukan!*
> 🏷️ Kode: ${item.code}
> 📮 Kode Pos: ${item.postal}
> 🏠 Provinsi: ${item.province}
> 🏙️ Kota/Kab: ${item.city}
> 🏘️ Kecamatan: ${item.district}
> 🏡 Kelurahan: ${item.village}
> 📍 Koordinat: ${item.latitude}, ${item.longitude}`;

            await conn.sendMessage(
                m.chat,
                {
                    text: caption,
                    interactiveButtons: [
                        {
                            name: "cta_url",
                            buttonParamsJson: JSON.stringify({
                                display_text: "🗺️ Buka di Google Maps",
                                url: link
                            })
                        }
                    ]
                },
                { quoted: m }
            );
        } catch (err) {
            console.error("❌ Error:", err.message);
            await m.reply("⚠️ Terjadi kesalahan saat mengambil data kode pos.");
        }
    }
};
