export function encryptString(input) {
    // This isn't actually proper encryption, it's just supposed to defeat bots
    let key = new Uint8Array(input.length);
    crypto.getRandomValues(key);

    let encrypted = Uint8Array.from(input, (c, i) => c.charCodeAt(0) ^ key[i]);

    let enc64 = btoa(String.fromCharCode(...encrypted));
    let key64 = btoa(String.fromCharCode(...key));
    return enc64 + ' ' + key64;
}

export function decryptString(encrypted) {
    let [enc64, key64] = encrypted.split(' ');
    let key = Uint8Array.from(atob(key64), (c) => c.charCodeAt(0));
    let decrypted = Uint8Array.from(atob(enc64), (c, i) => c.charCodeAt(0) ^ key[i]);

    return String.fromCharCode(...decrypted);
}
