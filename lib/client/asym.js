/* globals Asym:true */
Asym = {
  /**
   * Encrypts message asymetrically
   * @param  {Uint8Array} message     message to encrypt
   * @param  {Uint8Array} nonce
   * @param  {Uint8Array} publicKey   their public key
   * @param  {Uint8Array} secretKey   your private key
   * @return {Uint8Array}             encrypted message
   */
  encrypt(message, nonce, publicKey, secretKey) {
    check({
      message, nonce, publicKey, secretKey
    }, {
      message: Uint8Array,
      nonce: Uint8Array,
      publicKey: Uint8Array,
      secretKey: Uint8Array
    });

    return nacl.box(message, nonce, publicKey, secretKey);
  },
  encryptString(message, ...args) {
    check({
      message
    }, {
      message: String
    });

    return this.encrypt(Utils.encode(message), ...args);
  },
  encryptObject(obj, ...args) {
    check({
      obj
    }, {
      obj: Object
    });

    return this.encrypt(Utils.encode(obj), ...args);
  },
  /**
   * Decrypts message asymetrically
   * @param  {Uint8Array} message     encrypted message
   * @param  {Uint8Array} nonce
   * @param  {Uint8Array} publicKey   their public key
   * @param  {Uint8Array} secretKey   your private key
   * @return {Uint8Array}             decrypted message
   */
  decrypt(message, nonce, publicKey, secretKey) {
    check({
      message, nonce, publicKey, secretKey
    }, {
      message: Uint8Array,
      nonce: Uint8Array,
      publicKey: Uint8Array,
      secretKey: Uint8Array
    });

    return nacl.box.open(message, nonce, publicKey, secretKey);
  },
  decryptString(message, ...args) {
    return Utils.decode(this.decrypt(message, ...args));
  },
  decryptObject(obj, ...args) {
    return Utils.decode(this.decrypt(obj, ...args));
  }
};
