class Cmd {
    constructor() {
        this.name = "brat-ip";
        this.category = "maker";
        this.command = ["brat-ip"];
        this.settings = { limit: true };
        this.cooldown = 20;
    }
    run = async (m, { conn }) => {
        try {
            if (!m.text) return m.reply("*Example :* .brat-ip yapping ygy");
            let d = new Date();
            let t = new Date(d.getTime() + 7 * 3600000).toLocaleTimeString(
                "id-ID",
                { hour: "2-digit", minute: "2-digit", hour12: false }
            );
            await conn.sendMessage(
                m.chat,
                {
                    image: {
                        url: `https://brat.siputzx.my.id/iphone-quoted?time=${encodeURIComponent(
                            t
                        )}&messageText=${encodeURIComponent(
                            m.text
                        )}&carrierName=FanzBOT&batteryPercentage=${
                            Math.floor(Math.random() * 100) + 1
                        }&signalStrength=4&emojiStyle=apple`
                    },
                    caption: "Done [√]"
                },
                { quoted: qtext }
            );
        } catch (e) {
            m.reply(e.message);
        }
    };
}

export default new Cmd();
