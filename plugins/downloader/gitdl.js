export default {
    name: "gitdl",
    category: "downloader",
    command: ["gitclone", "gitdl"],
    settings: {
        react: true,
        loading: true
    },
    run: async ( m, { conn,Func, log }) => {
        if (!m.text) return m.reply("[!] Masukan link github!");
        try {
            const regex =
                /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;
            let [_, user, repo] = m.args[0].match(regex) || [];
            repo = repo.replace(/.git$/, "");

            const api = `https://api.github.com/repos/${user}/${repo}/zipball`;
            m.reply({
                document: {
                    url: api
                },
                caption: Func.style("komen", "Succes download: ✅"),
                fileName: `${repo}.zip`,
                mimetype: "application/zip",
                contextInfo: {
                    externalAdReply: {
                        title: "Github Download || gitclone",
                        thumbnail: cfg.bot.thumb
                    }
                }
            });
        } catch (err) {
            log.error(err);
            m.reply(err?.message);
        }
    }
};
