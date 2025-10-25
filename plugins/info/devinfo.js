export default {
    name: "dev",
    category: "info",
    command: ["dev"],
    run: async (m, { conn}) => {
        let vcard = `BEGIN:VCARD
VERSION:3.0
FN:AdzyDEV
ORG: Adzy
EMAIL;type=INTERNET:maxzi8018@gmail.com
TEL;type=CELL;waid=962796121703:+962796121703
ADR;type=WORK:;;2-chōme-7-5 Fuchūchō;Adzy;Osaka;594-0071;Yordania
URL;type=WORK:https://nefu.life/adzy
END:VCARD`;
        conn.sendMessage(
            m.chat,
            { contacts: { displayName: "Adzy.DEV", contacts: [{ vcard }] } },
            { quoted: m }
        );
    }
};
