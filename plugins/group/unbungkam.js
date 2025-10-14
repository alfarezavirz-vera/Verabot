const handler = {
  name: "unmute", // fitur name
  category: "group", // category name
  command: ["unbungkam", "unmute"], // command name
  settings: {
    group: true,
    owner: true
  },
  run: async (conn, m) => {
    try {
      db.list().group[m.chat].mute = false
      m.reply(`Berhasil ${m.command} grup ini! \n> Sekarang semua notif di bisukan`)
      if (db.list().group[m.chat].mute === false) {
        m.reply(`Grup ini udah di ${m.command} sebelumnya`)
      }
    } catch (err) {
      m.reply(err.message)
    }
  }
}

export default handler