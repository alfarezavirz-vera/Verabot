/**
 * CR Mifnity
 * Tourl Lunara
 * CMD  : . tourl <reply image>
 * SUMBER : https://chat.whatsapp.com/EEYblODGNuw8pvlg0bLGCH ( grup pemilik web uploader nya)
 * CH   : https://whatsapp.com/channel/0029Vay0apKJZg49rZz1OF33
 https://whatsapp.com/channel/0029Vb6FysuLo4hbhRUiQu24
 * NOTE : JANGAN HAPUS CR BANGGG!! KALO BELUM SESUAI SAMA SC KALIAN CONVERT AJA

KALO MAU GA PERMANEN KODE INI *form.append("permanent", "true")* TRUE UBAH KE FALSE

 */

import fs from "fs";
import axios from "axios";
import FormData from "form-data";
import { fileTypeFromBuffer } from "file-type";
import util from "util";

export default {
    name: "tourl",
    category: "utility",
    command: ["tourl", "upload", "lunara"],

    run: async (m, { conn }) => {
        try {
            const permanent = true;

            const q = m.quoted ? m.quoted : m;
            const mime = (q.msg || q).mimetype || q.mimetype || "";
            if (!mime)
                return m.reply(
                    "❌ *Balas media yang ingin diupload ke Lunara!*"
                );

            const loading = await m.reply("☁️ *Mengunggah ke Lunara...*");

            const buffer = await q.download?.();
            if (!buffer) return m.reply("⚠️ *Gagal mengunduh media!*");

            const detected = await fileTypeFromBuffer(buffer);
            const ext = detected?.ext || mime.split("/")[1] || "bin";
            const fileName = `upload_${Date.now()}.${ext}`;

            fs.writeFileSync(fileName, buffer);

            const form = new FormData();
            form.append("file", fs.createReadStream(fileName));

            if (permanent) {
                form.append("permanent", "true");
            } else {
                form.append("expire_value", "24");
                form.append("expire_unit", "hours");
            }

            const res = await axios.post(
                "https://lunara.drizznesiasite.biz.id/upload",
                form,
                {
                    headers: form.getHeaders(),
                    maxBodyLength: Infinity,
                    maxContentLength: Infinity
                }
            );

            const resultUrl = res?.data?.file_url;

            if (!resultUrl) {
                return conn.sendMessage(m.chat, {
                    edit: loading.key,
                    text: "❌ *Gagal mendapatkan URL dari Lunara!*"
                });
            }

            await conn.sendMessage(m.chat, {
                edit: loading.key,
                text: `✅ *Berhasil upload ke Lunara!*\n\n📄 *Nama File:* ${fileName}\n🔗 *URL:* ${resultUrl}\n🕒 *Status:* ${
                    permanent ? "Permanent" : "24 Jam"
                }`
            });

            try {
                fs.unlinkSync(fileName);
            } catch {}
        } catch (err) {
            console.error("❌ Upload error:", err);
            await m.reply(`⚠️ *Gagal upload ke Lunara!*\n${util.format(err)}`);
        }
    }
};
