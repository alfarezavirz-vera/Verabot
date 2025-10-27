function contextInfo(mani) {
	return {
		mentionedJid: [...this.parseMention(mani)],
		externalAdReply: {
			title: cfg.ads.title,
			body: cfg.ads.body,
			thumbnail: cfg.bot.thumb,
			sourceUrl: cfg.ads.source,
			mediaType: 1,
			previewType: "VIDEO",
			renderLargerThumbnail: true
		}
	};
}

export { contextInfo };