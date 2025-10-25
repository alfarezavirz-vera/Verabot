export default {
    name: "afk",
    category: "group",
    command: ["afk"],
    settings: {
        group: true
    },
    run: async ( m,{conn}) => {
        let user = db.list().user;
        user.afk = +new Date();
        user.afkAlasan = m.text;
        m.reply(
            `Lu afk dengan alasan: ${
                m.text ? m.text : "Ga ada alasan hmmm mencurigakan"
            }`
        );
    }
};
