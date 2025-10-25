export default {
    name: "code",
    category: "owner",
    command: ["code"],
    settings: {
        owner: true
    },
    run: async (m, { conn }) => {
        let code = `export default {
	name: '',
	category: '',
	command: [''],
	settings: {},
	cooldown: 0,
	run: async (m, { conn }) => {
		//logic nya
	}
}`;
        conn.sendMessage(
            m.chat,
            {
                text: "[!] Silah salin example code nya",
                footer: "Example code for Devloper",
                interactiveButtons: [
                    {
                        name: "cta_copy",
                        buttonParamsJson: JSON.stringify({
                            display_text: "[+] Copy",
                            copy_code: code
                        })
                    }
                ]
            },
            { quoted: qtext }
        );
    }
};
