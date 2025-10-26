class Cmd {
    constructor() {
        this.name = "randomloli";
        this.category = "anime";
        this.command = ["randomloli", "loli"];
        this.cooldown = 15;
    }
        run = async (m, { conn }) => {
            try {
                m.reply({
                        image: {
                            url: "https://api.zenzxz.my.id/api/random/loli"
                        },
                        caption: "[√] Selseai",
                        footer: cfg.bot.footer,
                        buttons: [
                    {
                        buttonId: m.cmd,
                        buttonText: {
                            displayText: "Lanjut"
                        }
                    }
                ]
                    },
                    { quoted: qtext }
                );
            } catch (err) {
                m.reply(err.message);
            }
        };
    }

export default new Cmd();
