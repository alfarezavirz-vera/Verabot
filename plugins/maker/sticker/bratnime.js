class Cmd {
    constructor() {
        this.name = "banime";
        this.category = "sticker";
        this.command = ["banime", "bratanime"];
        this.settings = {
            limit: true
        };
    }
    run = async (m, { conn, Func }) => {
        if (!m.text) return m.reply("!> Masukan Text");
        try {
            let t = encodeURIComponent(m.text);
            let s = `https://www.veloria.my.id/imagecreator/bratanime?text=${t}`
            
            conn.sendSticker(m.chat, s, qtext);
        } catch (err) {
            m.reply(err.message);
        }
    };
}

export default new Cmd();
