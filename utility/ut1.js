let generatedCodes = new Set();

function generateRandomCode(num) {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-";
    let code;

    do {
        code = "";
        for (let i = 0; i < num; i++) {
            code += characters.charAt(
                Math.floor(Math.random() * characters.length)
            );
        }
    } while (generatedCodes.has(code));

    generatedCodes.add(code);
    return code;
}


module.exports=generateRandomCode
