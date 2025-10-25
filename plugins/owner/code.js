const Cmd = {
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
        let conss = `const Cmd = {
	name: '',
	category: '',
	command: [''],
	settings: {},
	cooldown: 0,
	run: async (m, { conn }) => {
		//logic nya
	}
}

export default Cmd;`;
        let code2 = `export default {
	name: '',
	category: '',
	command: [''],
	settings: {},
	cooldown: 0,
    async run(m, { conn }) {
		//logic nya
	}
}`;
        let code3 = `export default class Cmd {
    name: '',
	category: '',
	command: [''],
	settings: {},
	cooldown: 0,
    async run(m, { conn }) {
		//logic nya
	}
}`;
        let code4 = `class Cmd {
    constructor() {
        this.name = "";
        this.category = "";
        this.command = [""];
        this.settings = {};
        this.cooldown = 0;
        run = async (m, { conn }) => {
            //isi kode nya
        };
    }
}
export default new Cmd();
`;

        conn.sendMessage(
            m.chat,
            {
                text: "[!] Silah salin example code nya",
                footer: "Example code for Devloper",
                interactiveButtons: [
                    {
                        name: "cta_copy",
                        buttonParamsJson: JSON.stringify({
                            display_text: "[+] Copy (Ori)",
                            copy_code: code
                        })
                    },
                    {
                        name: "cta_copy",
                        buttonParamsJson: JSON.stringify({
                            display_text: "[+] Kode tipe 2",
                            copy_code: code2
                        })
                    },
                    {
                        name: "cta_copy",
                        buttonParamsJson: JSON.stringify({
                            display_text: "[+] export default class",
                            copy_code: code3
                        })
                    },
                    {
                        name: "cta_copy",
                        buttonParamsJson: JSON.stringify({
                            display_text: "[+] Class",
                            copy_code: code4
                        })
                    },
                    {
                        name: "cta_copy",
                        buttonParamsJson: JSON.stringify({
                            display_text: "[+] Const",
                            copy_code: conss
                        })
                    }
                ]
            },
            { quoted: qtext }
        );
    }
};

export default Cmd
