/* globals users:true */
users = {
  keyFromPassword(password) {
    check({
      password
    }, {
      password: String
    });

    const encoded = utils.encode(password);
    const hashed = nacl.hash(encoded);

    return hashed.slice(0, 32);
  },
  createAndEncrypt(password) {
    const key = this.keyFromPassword(password);
    const keyPair = utils.keyPair();
    const nonce = utils.nonce();
    const encryptedSecretKey = sym.encrypt(keyPair.secretKey, nonce, key);

    return {
      nonce,
      publicKey: keyPair.publicKey,
      secretKey: encryptedSecretKey
    };
  },
  decryptSecretKey(encSecretKey, nonce, password) {
    check({
      encSecretKey, nonce, password
    }, {
      encSecretKey: Uint8Array,
      nonce: Uint8Array,
      password: String
    });

    const key = this.keyFromPassword(password);

    return sym.decrypt(encSecretKey, nonce, key);
  }
};
