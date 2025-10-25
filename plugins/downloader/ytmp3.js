/**
FanzCode();
**/

class Cmd {
    constructor() {
        this.name = "ytmp3";
        this.category = "downloader";
        this.command = ["ytmp3", "yta"];
        this.settings = {
            react: true
        };
    }
    run = async (m, { conn, Api }) => {
        if (!m.text) return m.reply("[!] Imvalids Url! masukan url yutub nya");
        await m.reply("Sabar yaa");
        const endpoint = "/api/downloader/youtube-audio";
        const kontol = {
            url: m.text,
            apikey: cfg.apiKey.ryhar
        };
        let api = await Api.request("ryhar", endpoint, kontol);
        let result = api.result;
        await m.reply({
            image: {
                url: result.thumbnail
            },
            caption: `Yt video di temukan:\n> Video ini di upload pada *${result.uploadDate} dengan view: ${result.views} | ${result.likes} like*\n> Judul: ${result.title}\n> *Status: mendownload audio*`
        });
        m.reply({
            audio: {
                url: result.link
            },
            mimetype: "audio/mpeg"
        });
    };
}

export default new Cmd();
