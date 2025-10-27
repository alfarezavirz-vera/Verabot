/**
 * CR Mifnity
 * ToVn (Mengubah Audio Ke Voice Note)
 * CMD  : .tovn <reply pesannya>
 * API  : -
 * CH   : https://whatsapp.com/channel/0029Vay0apKJZg49rZz1OF33
 *        https://whatsapp.com/channel/0029Vb6FysuLo4hbhRUiQu24
 * NOTE : JANGAN HAPUS WM BANGGG!! KALO BELUM SESUAI SAMA SC KALIAN CONVERT AJA
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";

class Cmd {
	constructor() {
		this.name = "tovn";
		this.category = "utility";
		this.command = ["tovn", "vn"];
		this.settings = {
			owner: false
		};
	}
	run = async (m, { conn, quoted }) => {
		let args = m.args;
		let text = m.text;
		try {
			const q = m.quoted || quoted;
			if (!q)
				return m.reply(
					"[!] Balas pesan audio/voice yang ingin diubah jadi voice note.\nContoh: balas audio kemudian ketik .tovn"
				);

			const tmpDir = "./Tmp";
			if (!fs.existsSync(tmpDir))
				fs.mkdirSync(tmpDir, { recursive: true });

			const id = Date.now();
			let inputExt = ".bin";
			const inputPath = path.join(tmpDir, `input_${id}`);
			const outPath = path.join(tmpDir, `vn_${id}.ogg`);

			let mediaBuffer = null;
			try {
				mediaBuffer = await conn.downloadMediaMessage(q);
			} catch (e) {
				mediaBuffer = null;
			}

			if (!mediaBuffer) {
				try {
					const possibleUrl =
						q?.msg?.contextInfo?.externalAdReply?.mediaUrl ||
						q?.msg?.url;
					if (possibleUrl) {
						const fetched = await (
							await fetch(possibleUrl)
						).arrayBuffer();
						mediaBuffer = Buffer.from(fetched);
					}
				} catch (e) {
					mediaBuffer = null;
				}
			}

			if (!mediaBuffer)
				return m.reply(
					"[x] Gagal mendownload media. Pastikan kamu membalas pesan yang berisi audio/voice."
				);

			const mime = q.msg?.mimetype || "";
			if (mime) {
				if (mime.includes("mpeg") || mime.includes("mp3"))
					inputExt = ".mp3";
				else if (mime.includes("ogg")) inputExt = ".ogg";
				else if (mime.includes("wav")) inputExt = ".wav";
				else if (mime.includes("m4a") || mime.includes("mp4"))
					inputExt = ".m4a";
				else if (mime.includes("aac")) inputExt = ".aac";
				else inputExt = ".bin";
			}

			const fullInputPath = inputPath + inputExt;
			fs.writeFileSync(fullInputPath, mediaBuffer);

			const stat = fs.statSync(fullInputPath);
			const maxSize = 100 * 1024 * 1024; // 100 MB
			if (stat.size > maxSize) {
				fs.unlinkSync(fullInputPath);
				return m.reply("[!] File terlalu besar (max 100MB).");
			}

			await m.reply("[>] Mengonversi audio menjadi voice note...");

			let converted = false;
			try {
				execSync(
					`ffmpeg -i "${fullInputPath}" -vn -c:a libopus -b:a 64k -vbr on -application voip "${outPath}" -y`,
					{ stdio: "ignore", timeout: 60_000 }
				);
				if (fs.existsSync(outPath) && fs.statSync(outPath).size > 0)
					converted = true;
			} catch (e) {
				converted = false;
			}

			if (converted) {
				const bufferOut = fs.readFileSync(outPath);
				await conn.sendMessage(
					m.chat,
					{ audio: bufferOut, ptt: true },
					{ quoted: m }
				);
				try {
					fs.unlinkSync(outPath);
				} catch (e) {}
				try {
					fs.unlinkSync(fullInputPath);
				} catch (e) {}
			} else {
				const bufferIn = fs.readFileSync(fullInputPath);
				await conn.sendMessage(
					m.chat,
					{ audio: bufferIn, ptt: true },
					{ quoted: m }
				);
				try {
					fs.unlinkSync(fullInputPath);
				} catch (e) {}
			}
		} catch (err) {
			console.error("TOVN ERROR:", err);

			try {
				if (fs.existsSync("./Tmp")) {
					for (const f of fs.readdirSync("./Tmp")) {
						if (/^input_|^vn_/.test(f)) {
							try {
								fs.unlinkSync(path.join("./Tmp", f));
							} catch (e) {}
						}
					}
				}
			} catch (e) {}
			await m.reply(
				"[x] Terjadi kesalahan saat mengubah audio menjadi voice note."
			);
		}
	};
}

export default new Cmd();