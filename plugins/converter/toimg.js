export default {
    name: "toimg",
    category: "converter",
    command: ["toimg"],
    cooldown: 20,
    run: async (conn, m, { quoted }) => {
        if (/image|webp/.test(quoted.msg?.mimetype)) {
            const dl = await quoted.download();
            m.reply({ image: dl, caption: "Done toimg!" });
        } else {
            let df =
                "[!] Upss, Penggunaan salah!\n> [!] Ex: " +
                m.cmd +
                " [ Quoted stiker mp4 nya]";
        }
    }
};
