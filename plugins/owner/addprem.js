class Cmd {
    constructor() {
        this.name = "addpremium";
        this.category = "owner";
        this.command = ["addpremium", "addprem"];
        this.settings = { owner: true };
    }
    run = async (m, { conn, quoted }) => {
        let who = m.isQuoted
            ? quoted?.sender
            : m.text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
        try {
            if (!who)
                return m.reply(
                    "[×] User tidak di temukan! \n> Tag/Reply atau tulis nomor user"
                );
            let user = db.list().user[who].premium;
            let txt = m.args[1];
            if (!txt) return m.reply("[?] Berapa hari?");
            if (isNaN(txt)) return m.reply("Format hari tidak valid (isNaN)");
            let jumlahHari = 86400000 * txt;
            let now = Date.now();
            user.expired =
                now < user.status
                    ? user.expired + jumlahHari
                    : now + jumlahHari;
            user.status = true;
            let timers = user.expired - now;
            let countdown = formatCountdown(timers);
            const cap = `> [ Berhasil! ditambahkan] 
Sekarang @${who.split("@")[0]} sudah berstatus premium!

> Info
Status premium: true
Berlaku ${txt} Hari
Expired ${countdown}`;
            m.reply(cap);
        } catch (err) {
            m.reply("[×]\n\n" + err.message);
        }
    };
}
export default new Cmd();

//credits - liora
function formatCountdown(ms) {
    let days = Math.floor(ms / 86400000);
    let hours = Math.floor(ms / 3600000) % 24;
    let minutes = Math.floor(ms / 60000) % 60;
    let seconds = Math.floor(ms / 1000) % 60;
    return `${days} hari ${hours} jam ${minutes} menit ${seconds} detik`;
}
