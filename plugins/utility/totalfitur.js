/**
FanzCode();
**/

export default {
   name: "totalfitur",
   category: "utility",
   command: ["totalfitur"],
   run: async (conn, m) => {
      let total = Object.values(plugins).length
      m.reply(`> Total fitur saat ini ${total} Plugins`)
   }
}