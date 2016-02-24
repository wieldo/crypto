/* globals Users:true */
Users = {
  keyFromPassword(password) {
    check({
      password
    }, {
      password: String
    });

    const encoded = Utils.encode(password);
    const hashed = nacl.hash(encoded);

    return hashed.slice(0, 32);
  },
  createAndEncrypt(password) {
    const key = this.keyFromPassword(password);
    const keyPair = Utils.keyPair();
    const nonce = Utils.nonce();
    const encryptedSecretKey = Sym.encrypt(keyPair.secretKey, nonce, key);

    return {
      nonce,
      publicKey: keyPair.publicKey,
      secretKey: encryptedSecretKey
    };
  }
};
