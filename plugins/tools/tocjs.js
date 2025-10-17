export default {
    name: "tocjs",
    category: "tools",
    command: ["tocjs"],
    settings: {
        owner: true
    },
    run: async (conn, m, { quoted }) => {
        if (!quoted.body) return m.reply("Quoted kode nya");
        let cjs = convertESMtoCJS(quoted.body);
        m.reply(cjs);
    }
};

function convertESMtoCJS(esmCode) {
    let cjsCode = esmCode.replace(
        /import\s+([a-zA-Z0-9{},\s*]+)\s+from\s+['"](.*)['"];?/g,
        (match, imports, module) => {
            if (imports.includes("{")) {
                const [defaultImport, namedImports] = imports.split("{");
                let result = "";
                if (defaultImport.trim()) {
                    result += `const ${defaultImport.trim()} = require('${module}');\n`;
                }
                if (namedImports) {
                    result += `const { ${namedImports
                        .replace("}", "")
                        .trim()} } = require('${module}');`;
                }
                return result;
            } else {
                return `const ${imports.trim()} = require('${module}');`;
            }
        }
    );

    cjsCode = cjsCode.replace(/export\s+default/g, "module.exports =");

    cjsCode = cjsCode.replace(
        /export\s+async\s+function\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\)\s*{/g,
        "exports.$1 = async function ($2) {"
    );

    cjsCode = cjsCode.replace(
        /export\s+function\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\)\s*{/g,
        "exports.$1 = function ($2) {"
    );

    cjsCode = cjsCode.replace(
        /export\s+const\s+([a-zA-Z0-9_]+)\s+=/g,
        "exports.$1 ="
    );

    cjsCode = cjsCode.replace(
        /export\s*{\s*([^}]+)\s*};/g,
        (match, exportedVars) => {
            return exportedVars
                .split(",")
                .map(
                    variable =>
                        `exports.${variable.trim()} = ${variable.trim()};`
                )
                .join("\n");
        }
    );

    cjsCode = cjsCode.replace(/import\((.*)\)/g, "require($1)");

    return cjsCode;
}
