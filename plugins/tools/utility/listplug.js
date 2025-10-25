export default {
    name: "listplug",
    category: "utility",
    command: ["listplug"],
    run: async (m, { conn }) => {
        let list = Object.values(plugins);
        let total = list.length;

        let txt = `\`[=]\` DAFTAR PLUGIN ${cfg.bot.name.toUpperCase()}*\n`;
        txt += `> Total plugin: ${total}\n\n`;

        // List plugin command
        txt += `*[!] COMMAND PLUGIN*\n`;
        list.filter(p => p.command) // cuma yang punya command
            .forEach((p, i) => {
                txt += `> ${i + 1}. ${m.prefix}${p.name}\n`;
            });

        // List plugin event
        let eventList = list.filter(p => p.on && !p.command);
        if (eventList.length > 0) {
            txt += `\n*[#] EVENT PLUGIN*\n`;
            eventList.forEach((p, i) => {
                txt += `> ${i + 1}. ${p.name}\n`;
            });
        }

        m.reply(txt);
    }
};
