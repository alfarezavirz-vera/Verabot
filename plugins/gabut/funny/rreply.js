const randomReply = {
    name: "randomreply",
    category: "fun",
    command: ["randomreply"],
    run: async (m, {conn, Func }) => {
        const yahhhhhh = [
            "Aku sebenarnya suka sama kamu :)",
            "Aku kesepian :(",
            "Kamu bau! Kentut yah? :[",
            "Hai, aku " + cfg.bot.name,
            "Kamu tau ga? Kamu tuh jelek :D",
            "Anda adalah orang beruntung! ketik " +
                m.pretix +
                "lacki" +
                " Sekarang!",
            "Apa? mau aku cium?",
            "Sayang, sini donks. Peluks akuu ~"
        ];
        m.reply(Func.pickRandom(yahhhhhh));
    }
};

export default randomReply;
