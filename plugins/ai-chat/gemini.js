export default {
  name: "gemini",
  category: "ai-chat",
  command: ["gemini", "gm"],
  settings: {
    react: true
  },
  run: async (m, { conn,
    Api
  }) => {
        const input = m.isQuoted ? m.quoted.body : m.text;
        const text = `[>] Upss Kamu tidak mengetikan pertanyaan!
[-] Contoh: ${m.cmd} Apa itu Whiskeysoket?`
        if (!input) return m.reply(text);

    try {
      let endpoint = "/ai/gemini";
      let prms = {
        text: input
      };
      let lehh = await Api.request("lanz", endpoint, prms)
      let chat = lehh.jawaban;
      m.reply(chat)
    } catch (err) {
      console.error(err);
    }
  }
};