import fs from "fs";

class Cmd {
	constructor() {
		this.name = "getfitur";
		this.category = "owner";
		this.command = ["getfitur", "getf"];
		this.settings = { owner: true };
	}

	run = async (m, { conn }) => {
		const input = m.text.trim();
		if (!input) return m.reply("[!] Masukan nama file fitur");

		const path = `./plugins/${input}.js`;

		try {
			if (!fs.existsSync(path)) return m.reply("[!] File tidak ditemukan");

			await conn.sendMessage(m.chat, {
				document: fs.readFileSync(path),
				fileName: `${input}.js`,
				mimetype: "application/javascript",
				caption: "Done"
			}, { quoted: m });

		} catch (err) {
			m.reply("Err:\n" + err.message);
		}
	};
}

export default new Cmd();