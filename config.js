import { watchFile, unwatchFile } from "fs";
import { fileURLToPath } from "url";
import log from "#lib/logger.js";
import pkg from "./package.json" with { type: "json" };

// saran aja ni klo mau edit nonaktifkan bungkus kata🗿 takut comment nya ngeganggu hehe
global.pkg = pkg;
global.qtext = {
    key: {
        remoteJid: "status@broadcast",
        participant: "0@s.whatsapp.net"
    },
    message: { extendedTextMessage: { text: "MyWeA bot - Multi Depis" } }
};

/*============= Konfigurasi =============*/
global.cfg = {
    pairing: 962796121703 /* [ Nomor bot ] */,
    code: "FANZBETA" /* [ Kode pairing mu ] */,
    db: "fanz-db" /* [ Buat tarok database ] */,
    tz: "Asia/Makassar" /* [ Atur sesuai sama Daerah lu gua si wita] */,
    zone: "WITA",
    bot: {
        name: "FanzWeA bot" /* [ Nama bot ] */,
        owner: [
            "962796121703",
            "6283899616999"
        ] /* [ Klo mau tambah tinggal [ ...03', '62x' ] ] */,
        version: global.pkg.version,
        footer: "Fanz is My WeA bot" /* [ Well ya ] */,
        prefix: [":", "!", "#", "-"],
        thumb: "https://github.com/Adzy-xyz.png"
    },
    ads: {
    	title: "FanzWeA Bot",
    	body: "Powered by Adzy",
    	source: "https://nefu.life/adzy"
    },
    mess: {
        wait: "`[#]` Harap tunggu sebentar..." /* [ Pesan tunggu ] */,
        owner: "`[#]` Fitur ini hanya bisa digunakan oleh Owner." /* [ Pesan khusus ] */,
        group: "`[#]` Fitur ini hanya bisa digunakan dalam Group." /* [ Pesan hanya di grup ] */,
        admin: "`[#]` Fitur ini hanya bisa digunakan oleh Admin Group." /* [ Pesan khusus admin ] */,
        botAdmin:
            "`[#]` Bot harus menjadi Admin terlebih dahulu." /* [ Pesan bot harus jadi admin ] */,
        private:
            "`[#]` Fitur ini hanya bisa digunakan di chat pribadi." /* [ Pesan bot hanya dipakai di pc ] */,
        premium:
            "`[#]` Maaf, Khusus Premium saja" /* [ Pesan khusus premium ] */,
        free: "`[#]` Maaf yah fitur ini udah di buat khusus buat user Free, lagian lu kan dah Premium 🗿" /* [ Ada Ada saja😅 ] */
    },
    s: {
        pack: `Lolot` /* [ setiker pack ] */,
        auth: "" /* [ Author nya ] */
    },
    apiKey: {
        ryhar: "p2pe75mrois182180i6y" /* [ buat naro macam macam apiKey taro di sini aja biar enakh ] */,
        gemini: "AIzaSyAFZuYs9iu4lRrR_cWY8jelar9CUMyvL5o" /* [ Ambil di ai.google.studio katanya ] */
    }
};

// Hot reload config.js ketika ada perubahan
const file = fileURLToPath(import.meta.url);
watchFile(file, () => {
    unwatchFile(file);
    log.info("berhasil relooad file config.");
    import(`${file}?update=${Date.now()}`);
});
