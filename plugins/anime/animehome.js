// importfetch from "liora-lib";

export default {
    name: "animehome",
    category: "anime",
    command: ["animehome", "anime-h"],
    cooldown: 15,
    settings: {
        react: true
    },
    run: async (m, { conn, Func, quoted }) => {
        let input = m.isQuoted ? quoted?.body : m.text;
        const BaseUrl = "https://www.sankavollerei.com/anime/home";
        const apis = await Func.fetchJson(BaseUrl);
        // nst data = apis.json();
        const { ongoing_anime } = apis;
        let txt = "Berikut home Anime: \n\n";
        ongoing_anime.forEach((y, i) => {
            txt += `${i + 1}. ${y.title}\n`;
            txt += "---------------------------\n";
            txt += `=> Slug ${y.slug}\n`;
            txt += `=> Poster ${y.poster}\n`;
            txt += `=> Episode ${y.current_episode}\n`;
            txt += `=> Relese day ${y.release_day}\n`;
            txt += `=> New release date ${y.newest_release_date}\n`;
            txt += `=> Url Otakudesu ${y.otakudesu_url}\n`;
        });
        txt += "\n- Done -";
        m.reply(txt);
    }
};
