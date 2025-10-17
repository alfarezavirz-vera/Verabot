const handler = {
    name: "self",
    category: "owner",
    command: ["self"],
    settings: {
        owner: true
    },
    run: async (conn, m) => {
        if (!m.text) return m.reply("ketik .self `true/false/status`");

        let text = m.text.toLowerCase();
        if (text === "true") {
            db.list().settings.self = true;
            m.reply(
                "Done ke mode " +
                    `${db.list().settings.self ? "Self" : "Public"}`
            );
        } else if (text === "false") {
            db.list().settings.self = false;
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
