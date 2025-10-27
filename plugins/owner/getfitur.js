import { readFileSync } from "fs";

class Cmd {
	constructor() {
		this.name = "getfitur";
		this.category = "owner";
		this.command = ["getfitur", "getf"];
		this.settings = { owner: true };
	}
	run = async (m, { conn }) => {
		if (!m.text.trim()) return m.reply("[!] Masukan path untuk get fitur");
		try {
			let path = "./plugins" + m.text.trim() + ".js";
			m.reply({
				decument: path,
				caption: "Done",
				mimetype: "application/js",
				fileName: path,
			});
		} catch (err) {
			m.reply("Err: \n" + err.message);
		}
	};
}
export default new Cmd();
