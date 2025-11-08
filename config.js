/**
 * @author   : Adzy
 * @filename : config.js
 * @created  : 2025-10-29 03:32:12
 * @version  : 1.0
 * @description: Konfigurasi bot ada di sini
 */

import { watchFile, unwatchFile, readFileSync } from "fs";
import { fileURLToPath } from "url";
import rc from "#lib/function.js";
import log from "#lib/logger.js";
import pkg from "./package.json" with { type: "json" };

/* [ Paket Json ] */
global.pkg = pkg;
/* [ Funtion kuoted ] */
global.quoted = msg => ({
	key: {
		remoteJid: "status@broadcast",
		participant: "18002428478@s.whatsapp.net"
	},
	message: { extendedTextMessage: { text: msg || "Simple WeA bot by Alfarz" } }
});
global.qtext = global.quoted();
/* [ Konfigurasi readSW ] */
global.readsw = {
	active: false,
	react: false,
	emoji: ["🔥", "💀", "☠️", "🥀", "🥶"]
};

/*[ Path audio ]*/
let path = ["./media/pedih.mp3", "./media/lonown.mp3"];

/* [ Semua Konfigurasi Anda ] */
global.cfg = {
	pairing: 6282135288134,
	code: "VERATEAM",
	db: "database",
	tz: "Asia/Jakarta",
	zone: "WIB",
	user: {
		limit: 50
	},
	bot: {
		name: "VeraWeA bot",
		owner: ["6285133801810", "6282135288134"],
		ownerUrl: "https://veracloud.biz.id/myprofie",
		version: global.pkg.version,
		footer: "Vera is My WeA bot",
		prefix: ["/", "#", "?", ".", "~"],
		thumb: readFileSync("./media/bot.jpg"),
		thumbvid: "",
		audio: readFileSync(rc.pickRandom(path)),
		self: false,
		on: false
	},
	ads: {
		title: "Vera-WeA boT",
		body: "Verabot a simple WeA Bot",
		source: "https://kua.lat/ikamLah"
	},
	mess: {
		wait: "`[-]` Tunggu sebentar yah, sekitar 3 tahun lagi...",
		owner: "`[!]` Fifur khusus Owner tercintah",
		group: "`[!]` Cuma bisa di group",
		admin: "`[!]` Khusus admin tersyang...",
		botAdmin: "`[=]` Jadikan bot admin dulu...",
		private: "`[×]` Hanya bisa di private chat",
		premium: "`[×]` Dibuat untuk user prem",
		free: "`[!]` Anda user premium dilarang pakai"
	},
	s: {
		pack: "V",
		auth: "R"
	},
	apiKey: {
		ryhar: "p2pe75mrois182180i6y",
		btz: "Btz-XoifQ",
		vera: "vera-xxx"
	}
};

// Hot reload config.js ketika ada perubahan
const file = fileURLToPath(import.meta.url);
watchFile(file, () => {
	unwatchFile(file);
	log.info("berhasil relooad file config.");
	import(`${file}?update=${Date.now()}`);
});
