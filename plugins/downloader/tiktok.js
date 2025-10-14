import axios from "axios";

export default {
  name: "tiktok",
  category: "downloader",
  command: ["tt", "tiktok"],
  cooldown: 15, 
  run: async (conn, m, { Func }) => {
    try {
      const input = m.isQuoted ? m.quoted.body : m.text;
      const regex = /(https:\/\/(vt|vm)\.tiktok\.com\/[^\s]+|https:\/\/www\.tiktok\.com\/@[\w.-]+\/video\/\d+)/;

      const parseUrl = input.match(regex)?.[0];
      if (parseUrl) {
        let res = await Func.fetchJson(`https://www.tikwm.com/api/?url=${parseUrl}&hd=1`)
        if (!res || !res.data) return m.reply('Gagal mengambil data dari TikTok.')

        let data = res.data
        await m.reply(`${Func.style("komen", "TIKTOK DOWNLOADER")}

> *Judul*: ${data.title}
> *Region*: ${data.region}
> *Durasi*: ${Func.formatDuration(data.duration)}
> *Views*: ${Func.formatNumber(data.play_count)}
> *Komentar*: ${Func.formatNumber(data.comment_count)}
> *Share*: ${Func.formatNumber(data.share_count)}
> *Uploader*: ${data.author.nickname || data.author.unique_id}

Mengirim.....`)

        if (data.images && data.images.length > 0) {
          if (data.images.length < 2) {
            for (let img of data.images) {
              await m.reply({ image: { url: img } })
            }
          } else {
            let media = data.images.map(img => ({
              image: { url: img },
            }))
            await conn.sendAlbumMessage(m.chat, media, { quoted: m })
          }
        } else {
          await m.reply({ video: { url: data.play } })
        }

        if (data.music_info.play) {
          await m.reply({ audio: { url: data.music_info.play }, mimetype: "audio/mpeg" })
        } else {
          m.reply('Musik tidak ditemukan, hanya akan mengirimkan media itu saja.')
        }

      } else if (input) {
        let search = await Func.fetchJson(`https://www.tikwm.com/api/feed/search?keywords=${input}&count=1&cursor=0&web=1&hd=1`)
        let video = search?.data?.videos[0]
        if (!video) return m.reply(`Video tidak ditemukan untuk pencarian "${input}".`)

        let caption = `${Func.style("komen", "TIKTOK PLAYER")}

> *Judul:* ${video.title}
> *Region:* ${video.region}
> *Durasi:* ${Func.formatDuration(video.duration)}
> *Views:* ${Func.formatNumber(video.play_count)}
> *Komentar:* ${Func.formatNumber(video.comment_count)}
> *Share:* ${Func.formatNumber(video.share_count)}
> *Uploader:* ${video.author.nickname || video.author.unique_id}
`.trim()

        m.reply({ video: { url: 'https://www.tikwm.com' + video.play }, caption })

      } else {
        m.reply(`*TIKTOK DOWNLOADER*
> _*• Search:*_ \`${m.cmd} [query]\`
> _*• Download:*_ \`${m.cmd} [link]\`

*C O N T O H:*
> *• ${m.cmd}* cosplayer
> *• ${m.cmd}* \`https://vt.tiktok.com/xxxxx\``)
      }
    } catch (err) {
      console.error(err);
      m.reply("Terjadi kesalahan saat memproses permintaan");
    }
  },
};

