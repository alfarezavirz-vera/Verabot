export default {
  name: "metaai",
  category: "ai-chat",
  command: ["metaai"],
  settings: {
      react: true
    },
  run: async (conn, m, { Api, Func }) => {
        const text = `[>] Upss Kamu tidak mengetikan pertanyaan!
[-] Contoh: ${m.cmd} Apa itu Whiskeysoket?`
        if (!m.text) return m.reply(text);

    try {
      let endpoint = "/api/ai/meta-ai";
      let params = {
        text: m.text,
        name: m.pushname,
        apikey: global.cfg.apiKey.ryhar
      };
      let api = await Api.request("ryhar", endpoint, params);
      let send = api.result;
      m.reply(send);
    } catch (err) {
      m.reply(`Waduh bang error\n----------------\n${err.message}`);
    }
  }
}