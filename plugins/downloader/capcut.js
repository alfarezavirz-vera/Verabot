import { wakata } from "#scrape";
class Cmd {
    constructor() {
        this.name = "capcut";
        this.category = "downloader";
        this.command = ["capcut"];
        this.settings = { limit: true };
    }
    run = async (m, { conn }) => {
        if (!m.text.trim()) return m.reply("=? Url capcut nya mana?");
        try {
            let url = await wakata(m.text);
            let {
                title,
                description,
                thumbnail,
                video,
                author,
                avatar,
                duration,
                likes,
                uses
            } = url;
            let cap = `[!] Capcut dl
Judul: ${title}
Desk: ${description}
durasi: ${duration}
likes: ${likes}
status: Mendownload`;
            await m.reply(
                { image: { url: thumbnail }, caption: cap },
                { quoted: qtext }
            );
            conn.sendMessage(m.chat, {video: {url: video}, caption: "Selesai!"}, {quoted: qtext})
        } catch (err) {
            m.reply(err?.messsge);
        }
    };
}
export default new Cmd();
