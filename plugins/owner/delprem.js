class Cmd {
	constructor() {
		this.name = "delpremium";
		this.category = "owner";
		this.command = ["delpremium", "delprem"];
		this.settings = { owner: true };
	}
	run = async (m, { conn, quoted }) => {
		let who = m.isQuoted
			? quoted?.sender
			: m.text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
		if (!who) return m.reply("[!] Tag orang nya");
		try {
			let user = db.list().user;
			if (!user[who]) return m.reply("[×] User tidak ada di database!");
			let prem = user[who].premium;
if (!prem || !prem.status)
	return m.reply("Sepertinya dia bukan user premium");
			prem.status = false;
			prem.expired = 0;
			await m.reply("Okeh berhasil di hapus dari daftar premium");
		} catch (err) {
			m.reply(err.message);
		}
	};
}
export default new Cmd();
