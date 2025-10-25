// Credits: Vrypt: EternityBot

export default {
    name: "time",
    category: "utility",
    command: ["time", "jam"],
    run: async (m, { conn }) => {
        const now = new Date();
        const text = now.toLocaleString("id-ID", { timeZone: cfg.tz });
        m.reply(`[!] Sekarang jam *${text}* ${cfg.zone}`);
    }
};
