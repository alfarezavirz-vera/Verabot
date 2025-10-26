export default {
    name: "gitdl",
    category: "downloader",
    command: ["gitclone", "gitdl"],
    settings: {
        react: true,
        loading: true
    },
    run: async (m, {conn, Func, log }) => {
        if (!m.text) return m.reply("Url github nya?");
        try {
            const regex =
                /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;
            let [, user, repo] = m.args[0].match(regex) || [];
            repo = repo.replace(/.git$/, "");

            const api = `https://api.github.com/repos/${user}/${repo}/zipball`;
            m.reply({
                document: {
                    url: api
                },
                caption: "Succes download: √",
                fileName: `${repo}.zip`,
                mimetype: "application/zip",
                contextInfo: {
                    externalAdReply: {
                        title: "Github Download || gitclone",
                        thumbnailUrl: cfg.bot.thumb
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
