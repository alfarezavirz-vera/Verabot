export default class ChatGPT {
    name = "chatgpt";
    category = "ai-chat";
    command = ["chatgpt", "gpt"];
    settings = {
      react: true
    };
    async run(m, { conn, Api }) {
        const input = m.isQuoted ? m.quoted.body : m.text;
        const text = `[>] Upss Kamu tidak mengetikan pertanyaan!
[-] Contoh: ${m.cmd} Apa itu Whiskeysoket?`
        if (!input) return m.reply(text);

        try {
            let endpoint = "/ai/chatgpt";
            let prms = { prompt: input };
            let lehh = await Api.request("lanz", endpoint, prms)
            let chat = lehh.data.data.result;
            m.reply(chat.chat)
        } catch (err) {
            console.error(err);
        }
    }
};
