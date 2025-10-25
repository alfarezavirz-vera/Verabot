/**
FanzCode();
**/

export default {
    name: "totalplugin",
    category: "utility",
    command: ["totalplugin"],
    run: async (m, { conn }) => {
        let total = Object.values(plugins);
        let eventList = total.filter(p => p.on && !p.command);
        let totalfitur = total.filter(p => p.command && !p.on);
        m.reply(`> \`[!!]\` Total semua plugin: ${total.length}
> [#] Total titur & event
> <Event> [ ${eventList.length || "0"} ]
> <Fiture> [ ${totalfitur.length} ]`);
    }
};
