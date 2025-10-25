class Cmd {
	constructor() {
    this.name = "javeesai";
        this.category = "ai-chat";
        this.command = ["javeesai", "jai"];
        this.settings = {
            react: true
        };
	}
    run= async (m, { conn,Api }) => {
        let input = m.isQuoted ? m.quoted?.body : m.text;
        if (!input) return m.reply("[×] Sila katakan sesuastu...");

        try {
            let f = {
                endpoint: "/api/ai/jeevesai",
                param: {
                    prompt: input
                }
            };
            let api = await Api.request("zenz", f.endpoint, f.param);
            const { response } = api.data;
            m.reply(response);
        } catch (err) {
            m.reply(err.message);
        }
    }
};

export default new Cmd()
