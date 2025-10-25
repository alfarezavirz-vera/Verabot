const Lapanball = {
    name: "8ball",
    category: "fun",
    command: ["8ball"],
    run: async (m, { conn, Func }) => {
        if (!m.text) {
            return m.reply(
                "!= Silah masukan soalan misal\n> Apakah aku bisa jadi dev?"
            );
        }
        // Disini tempat buat kamu atur result nya
        const result = {
            question: m.text.trim(),
            answers: [
                // dibikin array biar bisa di pickRandom kalo object ya ga bisa haha
                "Mungkin",
                "Iyah bener sekali",
                "hmm bisa iya bisa tidak",
                "tidak",
                "ya tentu saja",
                "Jangan mimpi ;)",
                "Ga tau tanya kok tanya saya ;!"
            ]
        };
        let resp = `Jawaban yang kamu dapat\n> Pertanyaan : ${
            result.question
        }\n> Jawaban: ${Func.pickRandom(result.answers)}`;
        m.reply(resp);
    }
};

export default { Lapanball };
