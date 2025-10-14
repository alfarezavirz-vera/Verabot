const handler = {
  name: "skiplink",
  category: "tools",
  command: ["skiplink"],
  settings: {
    loading: true
  },
  run: async (conn, m, {
    Scrape,
    Func
  }) => {
    if (!m.text) return m.reply(`[>] Penggunaan Salah:
> ${m.cmd} url
> ${m.cmd} https:/sfl.gl/xx`);
    let args = m.text.split('|').map(a => a.trim());
    try {
      let udah = (await Scrape.skiplink).default
      let url = await udah.get(args)
      
      m.reply(`Mantap Berhasil kak uhyyy:\n${Func.styles("komen",url.linkGo)}`)
    } catch (err) {
      if (err.response) {
        m.reply(`${err.response.status}\n${err.response.statusText}`)
      } else if (err.request) {
        m.reply("Jaringan sedang error")
      } else {
        m.reply(err.message)
      }
    }
  }
}

export default handler