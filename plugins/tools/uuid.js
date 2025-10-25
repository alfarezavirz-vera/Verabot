// Credits: Vrypt: EternityBot
import { randomUUID } from "crypto";

export default {
    name: "uuid",
    category: "tools",
    command: ["uuid", "guid"],
    run: async (m, { conn }) => {
        const id = randomUUID();
        m.reply(`[!] *UUID Generated:*\n${id}`);
    }
};
