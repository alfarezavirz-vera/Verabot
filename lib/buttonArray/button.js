const rowMenu = [
    {
        title: "All Menu",
        description: "Melihat semua menu",
        id: `menu all`
    },
    {
        title: "Mains Menu",
        description: "Menampilkan menu utama",
        id: `menu main`
    },
    {
        title: "Ais Menu",
        description: "Menampilkan menu AI",
        id: `menu ai-chat`
    },
    {
        title: "Downloader",
        description: "Menampilkan Fitur² downloads",
        id: `menu downloader`
    },
    {
        title: "Anime",
        description: "Menampilkan menu anime",
        id: `menu anime`
    },
    {
        title: "Menu gabutz",
        description: "Menampilkan menu gabut",
        id: `menu gabut`
    },
    {
        title: "Funny",
        description: "Menampilkan menu funs",
        id: `menu fun`
    },
    {
        title: "Games menu",
        description: "Menampilkan menu games",
        id: `menu game`
    },
    {
        title: "Maker menu",
        description: "Menampilkan menu maker",
        id: `menu maker`
    },
    {
        title: "Groups",
        description: "Menampilkan menu grups",
        id: `menu group`
    },
    {
        title: "Informations",
        description: "Menampilkan menu info",
        id: `menu info`
    },
    {
        title: "Owner menu",
        description: "Menampilkan menu owner/devloper",
        id: `menu owner`
    },
    {
        title: "stickermenu",
        description: "Menampilkan menu stiker",
        id: `menu sticker`
    },
    {
        title: "Searching....",
        description: "Menampilkan menu search",
        id: `menu search`
    },
    {
        title: "Tools",
        description: "Menampilkan menu tools",
        id: `menu tools`
    },
    {
        title: "Formatter text",
        description: "Menampilkan menu Formatter",
        id: `menu formatter`
    },
    {
        title: "Utility fitur",
        description: "Menampilkan menu utility",
        id: `menu utility`
    }
];

const rowPop = [
    {
        title: "brat",
        description: "Buat sticker teks",
        id: `brat`
    },
    {
        title: "bratvid",
        description: "Buat sticker teks gif",
        id: `bratvid`
    },
    {
        title: "play",
        description: "Mencari dan play music",
        id: `play`
    }
];

const sections = [
    {
        title: "[!] Daftar menu",
        highlight_label: "All Category",
        rows: rowMenu
    },
    {
        title: "[!] Menu yg di pin",
        highlight_label: "Paling populer",
        rows: rowPop
    }
];

const rowSalah = [
    {
        name: "single_select",
        buttonParamsJson: JSON.stringify({
            title: "Click Me!",
            sections: [
                {
                    title: "Sila pilih satu",
                    highlight_label: "Paling Umum",
                    rows: [
                        {
                            title: "Menu",
                            description: "Menampilkan List Category",
                            id: `menu`
                        },
                        {
                            title: "Mains",
                            description: "Menampilkan Menu utama",
                            id: `menu main`
                        },
                        {
                            title: "Menu All",
                            description: "Menampilkan semua menu",
                            id: `menu all`
                        }
                    ]
                }
            ]
        })
    }
];

const interAktif = [
    {
        name: "single_select",
        buttonParamsJson: JSON.stringify({
            title: "[!] Pencet",
            sections
        })
    },
    {
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
            display_text: "Info Script",
            id: `script`
        })
    },
    {
        name: "open_webview",
        buttonParamsJson: JSON.stringify({
            title: "Owner",
            link: {
                url: cfg.bot.ownerUrl
            }
        })
    }
];
export default { interAktif, rowSalah };
