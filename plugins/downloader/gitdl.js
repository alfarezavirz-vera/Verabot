export default {
    name: "gitdl",
    category: "downloader",
    command: ["gitclone", "gitdl"],
    settings: {
        react: true,
        loading: true
    },
    run: async (conn, m, { Func, log }) => {
        if (!m.text)
            return m.reply(
                Func.ex(m.cmd, "GITHUB DOWNLOAD", "User|Repo", "Adzy-f|F-Beta")
            );
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
                        thumbnailUrl: cfg.ads.imageUrl
                    }
                }
            });
        } catch (err) {
            log.error(err);
            m.reply(
                "🗣️: Mak, ada kah Tulisan yang ada merah merah nya?:\n\nIni >> \n" +
                    err.message
            );
        }
    }
};
