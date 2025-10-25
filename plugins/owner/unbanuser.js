const unbans = {
    name: "unban",
    category: "owner",
    command: ["unban"],
    settings: {
        owner: true
    },
    run: async (conn, m) => {
        const number = m.isQuoted
            ? m.quoted.sender
            : m.text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
        if (!number)
            return m.reply(
                `[×] Masukkan nomor target!\nContoh: ${m.prefix}unban 6281234567890`
            );

        db.list().user[jid].banned = false;
        await db.save();
        return m.reply(`[✓] User *@${number.split("@")[0]}* sudah di-unban.`);
    }
};

export default unbans