export default {
    name : "script",
    category : "main",
    command : ["sc", "script"],
    async run(m, { conn, Func }) {
        try {
            const res = await Func.fetchJson(
                "https://api.github.com/repos/Adzy-xyz/Fanzbot"
            );

            m.reply(
                {
                    text: `*Informasi Script*\n
> *Nama:* ${res.name}
> *Pemilik:* ${res.owner.login ?? "-"}
> *Star:* ${res.stargazers_count ?? 0}
> *Forks:* ${res.forks ?? 0}
> *Dibuat sejak:* ${Func.ago(res.created_at)}
> *Terakhir update:* ${Func.ago(res.updated_at)}
> *Terakhir publish:* ${Func.ago(res.pushed_at)}
`,
                    interactiveButtons: [
                        {
                            name: "cta_url",
                            buttonParamsJson: JSON.stringify({
                                display_text: "[#] Links",
                                url: res.html_url,
                                merchant_url: res.html_url
                            })
                        }
                    ]
                },
                { quoted: qtext }
            );
        } catch (err) {
            console.error(err);
            return m.reply("Coba lagi nanti.");
        }
    }
}
