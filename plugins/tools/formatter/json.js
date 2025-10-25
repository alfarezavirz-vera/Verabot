// Credits: Vrypt: EternityBot
export default {
    name: "json",
    category: "formatter",
    command: ["json"],
    run: async (m, { conn }) => {
        try {
            let input = m.isQuoted ? m.quoted?.body : m.text.trim();
            const raw = input;
            if (!raw)
                return m.reply(
                    '[!] Kirim JSON setelah command.\nContoh: .json {"hello": "world"}'
                );
            const parsed = JSON.parse(raw);
            const formatted =
                "```json\n" + JSON.stringify(parsed, null, 2) + "\n```";
            m.reply(formatted);
        } catch {
            m.reply("[×] JSON tidak valid.");
        }
    }
};
