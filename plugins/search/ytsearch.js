// import { fetch } from "undici";

export default {
    name: "ytsearch",
    category: "search",
    command: ["ytsearch", "yts"],
    cooldown: 10,
    settings: {
    	loading:true
    },
    run: async (m, { conn, Api, Func }) => {
        if (!m.text) return m.reply("[!] Masukan query buat nyari video yutub");
        try {
            let endp = "/api/search/youtube";
            let prms = {
                query: m.text
            };
            const apis = await Api.request("zenz", endp, prms);
            if (!apis || apis.statusCode !== 200) {
                return m.reply(
                    " [×] Terjadi error, status code " + apis.statusCode
                );
            }
            const { data } = apis;
            let txt = "Ini adalah hasil dari pencarian tersebut \n\n\n";
            data.slice(0, 8).forEach(
                ({
                    title,
                    url,
                    timestamp,
                    views,
                    author: { name, url: cengnel },
                    description
                }) => {
                    txt += `*${title}*\n`;
                    txt += `*Url:* ${url}\n`;
                    txt += `*Timestamp:* ${timestamp}\n`;
                    txt += `*Views:* ${Func.formatNumber(views)}\n`;
                    txt += `*Deskripsi:* ${description}\n`;
                    txt += `*Name cenel:* ${name}\n`;
                    txt += `*Linl cenel:* ${cengnel}\n`;
                    txt += `----------------------------------\n\n`; // pembatas
                }
            );

            m.reply({ text: txt });
        } catch (err) {
            m.reply("[×] -\n" + err.message);
        }
    }
};
