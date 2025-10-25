const handler = {
    name: "bot",
    category: "owner",
    command: ["bot"],
    settings: {
        owner: true
    },
    run: async (m, { conn, }) => {
        if (!m.text) return m.reply("ketik .self `true/false/status`");

        let text = m.text.toLowerCase();
        if (text === "off") {
            db.list().settings.self = true;
            await db.save();
            m.reply(
                "Done ke mode " +
                    `${db.list().settings.self ? "Self" : "Public"}`
            );
        } else if (text === "on") {
            db.list().settings.self = false;
            await db.save();
            m.reply(
                "Done ke mode " +
                    `${db.list().settings.self ? "Self" : "Public"}`
            );
        } else if (text === "status") {
            m.reply(
                `Sekarang ini status bot adalah ${
                    db.list().settings.self ? "Self" : "Public"
                }`
            );
        } else {
            return;
        }
    }
};

export default handler;
