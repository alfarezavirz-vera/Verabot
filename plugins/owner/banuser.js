const bans = {
    name: "ban",
    category: "owner",
    command: ["ban"],
    settings: {
        owner: true
    },
    run: async (m, { conn }) => {
        const number = m.isQuoted
            ? m.quoted.sender
            : m.text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
        if (!number)
            return m.reply(
                `[×] Masukkan nomor target!\nContoh: ${m.prefix}ban 6281234567890`
            );

        db.list().user[number].banned = true;
        await db.save();
        return m.reply(`[!] User *${number.split("@")[0]}* berhasil di-ban.`);
    }
};

export default bans;
