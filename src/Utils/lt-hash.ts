let _anti: any = null;

async function getAntiTampering() {
if(!_anti) {
const mod = await import('whatsapp-rust-bridge')
_anti = new mod.LTHashAntiTampering()
}
return _anti
}

export const LT_HASH_ANTI_TAMPERING = {
subtractThenAdd: async(base: Uint8Array, subtract: Uint8Array[], add: Uint8Array[]): Promise<Uint8Array> => {
const inst = await getAntiTampering()
return inst.subtractThenAdd(base, subtract, add)
}
}
