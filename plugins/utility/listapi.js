export default {
  name: "listapi",
  category: "utility",
  command: ["listapi"],
  run: async (conn, m, { Api }) => {
    try {
      const listUrl = Api.listUrl();
      if (!listUrl) throw new Error("Api.listUrl() mengembalikan nilai null atau undefined");
      
      const teks = Object.entries(listUrl)
        .map(([name, { baseURL }]) => `${name}: ${baseURL}`)
        .join("\n");
      
      let res = `List API yang tersedia:\n${teks}`;
      m.reply(res);
    } catch (error) {
      m.reply(`Error: ${error.message}`);
    }
  }
};