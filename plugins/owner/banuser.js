const bans = {
	name: "ban",
	category: "owner",
	command: ["ban"],
	settings: {
		owner: true
	},
	run: async (m, { conn }) => {
		const ya = m.isQuoted
			? m.quoted.sender
			: m.text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
		if (!ya)
			return m.reply(
				`[×] Masukkan nomor target!\nContoh: ${m.prefix}ban 6281234567890`
			);
		try {
			let target = db.list().user[ya];
			let bans = target.banned;
			let args = m.args[1];
			if (!args)
				return m.reply(
					"[+] Tambahkan Hari nya misal\n" + m.cmd + " <target> 2"
				);
			let hari = 86400000 * args;
			let now = Date.now();
			bans.expired = now < bans.status ? bans.expired + args : now + args;
			bans.status = true;
			let time = bans.expired - now;
			let jaji = formatCountdown(time);
			let jija = `> [ -- USER BERHASIL DI BANNED -- ]
User di banned selama ${args} hari
User tidak akan bisa menggunakan ${cfg.bot.name} selama di banned!
\`Status Banned\`:
Selama: ${txt} hari
Durasi: ${jaji}
User: @${ya.split("@")[0]}`;
			m.reply(jija);
		} catch (err) {
			m.reply("??\n" + err.message);
		}
	}
};

export default bans;

//credits - liora
function formatCountdown(ms) {
	let days = Math.floor(ms / 86400000);
	let hours = Math.floor(ms / 3600000) % 24;
	let minutes = Math.floor(ms / 60000) % 60;
	let seconds = Math.floor(ms / 1000) % 60;
	return `${days} hari ${hours} jam ${minutes} menit ${seconds} detik`;
}
