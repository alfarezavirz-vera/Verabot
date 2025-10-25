// Credits: Vrypt: EternityBot
export default {
    name: "tebakemoji",
    category: "game",
    command: ["tebakemoji"],
    run: async (m,{conn}) => {
        const emojis = ["🐱", "🐶", "🐵", "🐸", "🦊", "🐯"];
        const target = emojis[Math.floor(Math.random() * emojis.length)];
        await m.reply(
            "Aku sembunyikan satu emoji hewan, coba tebak salah satunya!"
        );
        const listener = conn.ev.on("messages.upsert", ({ messages }) => {
            const msg = messages[0];
            if (msg.sender !== m.sender) return;
            conn.ev.off("messages.upsert", listener);
            if (msg.text.includes(target)) {
                m.reply(`[√] Betul! Jawabanku ${target}`);
            } else {
                m.reply(`[×] Salah! Yang benar ${target}`);
            }
        });
    }
};
