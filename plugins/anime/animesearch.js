// Credits: Vrypt: EternityBot
import { fetch } from 'undici'
export default class Cmd {
    name= "animesearch"
    category= "anime"
    command= ["animesearch", "anime-s"]
    async run(m, { conn }){
        const query = m.text.trim();
        if (!query)
            return m.reply(
                "[!] Masukkan judul anime.\nContoh: .anime One Piece"
            );

        const res = await fetch(
            `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(
                query
            )}&limit=1`
        );
        const data = await res.json();
        const anime = data.data[0];
        if (!anime) return m.reply("`[×]` Anime tidak ditemukan.");

        const caption = `> *${anime.title}*\n\`[!]\` Rilis: ${
            anime.year
        }\n> ★ Skor: ${anime.score}\n[n] Genre: ${anime.genres
            .map(v => v.name)
            .join(", ")}\n[s] Sinopsis:\n${anime.synopsis}`;
        await conn.sendMessage(m.chat, {
            image: { url: anime.images.jpg.image_url },
            caption
        });
    }
};
