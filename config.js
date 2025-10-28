import { watchFile, unwatchFile, readFileSync } from "fs";
import { fileURLToPath } from "url";
import log from "#lib/logger.js";
import pkg from "./package.json" with { type: "json" };

// saran aja ni klo mau edit nonaktifkan bungkus kata🗿 takut comment nya ngeganggu hehe
global.pkg = pkg;
global.qtext = {
	key: {
		remoteJid: "status@broadcast",
		participant: "18002428478@s.whatsapp.net"
	},
	message: { extendedTextMessage: { text: "Simple WeA bot by Alfarz" } }
};
global.readsw = {
	active: false,
	react: false,
	emoji: ["🔥", "💀", "☠️", "🥀", "🥶"]
};
/*============= Konfigurasi =============*/
global.cfg = {
	pairing: 6282135288134 /* [ Nomor bot ] */,
	code: "VERATEAM" /* [ Kode pairing mu ] */,
	db: "beta-db" /* [ Buat tarok database ] */,
	tz: "Asia/Jakarta" /* [ Atur aja ] */,
	zone: "WIB",
	user: {
		limit: 50
	},
	bot: {
		name: "VeraWeA bot" /* [ Nama bot ] */,
		owner: [
			"6285133801810"
		] /* [ Klo mau tambah tinggal [ ...03', '62x' ] ] */,
		ownerUrl: "https://veracloud.biz.id/myprofile" /* [ Bebas mau link apah ] */,
		version: global.pkg.version,
		footer: "Vera is My WeA bot" /* [ Well ya ] */,
		prefix: ["/", "#", "?", ".", "~"] /* [ Mendukubg multi pretix ] */,
		thumb: readFileSync("./media/bot.jpg") /* [ Atut aja sesuka lu ] */,
		thumbvid: "" /* [ Buat versi video nya bisa pke url atau buffer ] */,
		audio: readFileSync("./media/pedih.mp3"),
		self: false /* [ default status bot] */,
		on: false
	},
	ads: {
		title: "Vera-WeA boT",
		body: "Verabot a simple WeA Bot",
		source: "https://kua.lat/ikamLah"
	},
	mess: {
		wait: "`[-]` Tunggu sebentar yah, sekitar 3 tahun lagi..." /* [ Pesan tunggu ] */,
		owner: "`[!]` Fifur khusus Owner tercintah" /* [ Pesan khusus ] */,
		group: "`[!]` Cuma bisa di group" /* [ Pesan hanya di grup ] */,
		admin: "`[!]` Khusus admin tersyang..." /* [ Pesan khusus admin ] */,
		botAdmin:
			"`[=]` Jadikan bot admin dulu..." /* [ Pesan bot harus jadi admin ] */,
		private:
			"`[×]` Hanya bisa di private chat" /* [ Pesan bot hanya dipakai di pc ] */,
		premium: "`[×]` Dibuat untuk user prem" /* [ Pesan khusus premium ] */,
		free: "`[!]` Anda user premium dilarang pakai" /* [ Ada Ada saja😅 ] */
	},
	s: {
		pack: "" /* [ setiker pack ] */,
		auth: "[!] Aku mau Makan Roti Belah Dua" /* [ Author nya ] */
	},
	apiKey: {
		ryhar: "p2pe75mrois182180i6y" /* [ buat naro macam macam apiKey taro di sini aja biar enakh ] */,
		gemini: "AIzaSyAFZuYs9iu4lRrR_cWY8jelar9CUMyvL5o" /* [ Ambil di ai.google.studio katanya ] */,
		vera: "Api_Alfarezzv"
	}
};

// Hot reload config.js ketika ada perubahan
const file = fileURLToPath(import.meta.url);
watchFile(file, () => {
	unwatchFile(file);
	log.info("berhasil relooad file config.");
	import(`${file}?update=${Date.now()}`);
});
