// Credits: Vrypt: EternityBot

export default {
    name: "base64",
    category: "formatter",
    command: ["base64"],
    run: async (m, { conn }) => {
        const [mode, ...rest] = m.text.trim().split(" ");
        const input = rest.join(" ");
        if (!mode || !input) return m.reply("[>] Contoh: .base64 encode hello");

        if (mode === "encode") m.reply(Buffer.from(input).toString("base64"));
        else if (mode === "decode")
            m.reply(Buffer.from(input, "base64").toString("utf-8"));
        else m.reply("Gunakan: encode / decode");
    }
};
