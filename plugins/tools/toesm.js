export default {
    name: "toesm",
    category: "tools",
    command: ["toesm"],
    settings: {
        owner: true
    },
    run: async (conn, m, { quoted }) => {
        if (!quoted.body) return m.reply("Quoted kode nya");
        let esm = convertCJStoESM(quoted.body);
        m.reply(esm);
    }
};

function convertCJStoESM(cjsCode) {
    let esmCode = cjsCode.replace(
        /const\s+([a-zA-Z0-9_]+)\s*=\s*require\(['"](.*)['"]\);?/g,
        (match, variable, module) => {
            return `import ${variable} from '${module}';`;
        }
    );

    esmCode = esmCode.replace(
        /const\s*{\s*([^}]+)\s*}\s*=\s*require\(['"](.*)['"]\);?/g,
        (match, imports, module) => {
            return `import { ${imports.trim()} } from '${module}';`;
        }
    );

    esmCode = esmCode.replace(/module\.exports\s*=\s*/g, "export default ");

    esmCode = esmCode.replace(
        /exports\.([a-zA-Z0-9_]+)\s*=\s*async\s*function\s*\(([^)]*)\)\s*{/g,
        "export async function $1($2) {"
    );

    esmCode = esmCode.replace(
        /exports\.([a-zA-Z0-9_]+)\s*=\s*function\s*\(([^)]*)\)\s*{/g,
        "export function $1($2) {"
    );

    esmCode = esmCode.replace(
        /exports\.([a-zA-Z0-9_]+)\s*=\s*/g,
        "export const $1 = "
    );

    esmCode = esmCode.replace(/require\((.*)\)/g, "import($1)");

    return esmCode;
}
