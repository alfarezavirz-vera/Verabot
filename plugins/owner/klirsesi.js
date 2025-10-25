import { readdirSync, statSync, unlinkSync } from "fs";
import { join } from "path";

export default {
    name: "clearsesi",
    category: "owner",
    command: ["clearsesi", "csesi"],
    settings: {
        owner: true
    },
    run: async (m, { conn, }) => {
        const sesi = ["./sessions"];
        const array = [];

        sesi.forEach(dirname => {
            readdirSync(dirname).forEach(file => {
                if (file !== "creds.json") {
                    array.push(join(dirname, file));
                }
            });
        });

        const deletedFiles = [];

        array.forEach(file => {
            const stats = statSync(file);

            if (stats.isDirectory()) {
                console.log(`skipping directory: ${file}`);
            } else {
                unlinkSync(file);
                deletedFiles.push(file);
            }
        });

        m.reply("success");

        if (deletedFiles.length > 0) {
            console.log("Deleted files:", deletedFiles);
        }

        if (deletedFiles.length === 0) {
            m.reply("[×] tidak ada file yang tersisa di folder session");
        }
    }
};
