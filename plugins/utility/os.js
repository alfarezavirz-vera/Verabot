import os from "os";
import { performance } from "perf_hooks";

export default {
    name: "os",
    category: "utility",
    command: ["os", "ping"],
    run: async (conn, m, { Func }) => {
        const start = performance.now();
        const end = performance.now();
        const latency = (end - start).toFixed(2);
        const rtt = Date.now() - start;
        const uptime = process.uptime();
        const mem = process.memoryUsage();
        const totalMem = os.totalmem();
        const freeMem = os.freemem();

        m.reply(`
• *Latency* : ${latency} ms
• *RTT*     : ${rtt} ms
• *Uptime Bot*  : ${Func.runtime(uptime)}
• *Uptime Os*  : ${Func.runtime(os.uptime)}

💻 *Memory*
• RSS   : ${(mem.rss / 1024 / 1024).toFixed(2)} MB
• Heap  : ${(mem.heapUsed / 1024 / 1024).toFixed(2)} / ${(
            mem.heapTotal /
            1024 /
            1024
        ).toFixed(2)} MB
• Free  : ${(freeMem / 1024 / 1024).toFixed(2)} MB
• Total : ${(totalMem / 1024 / 1024).toFixed(2)} MB`);
    }
};
