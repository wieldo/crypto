/* globals Sym:true */
Sym = {
  /**
   * Encrypts message symetrically
   * @param  {Uint8Array} message   message you want to encrypt
   * @param  {Uint8Array} nonce
   * @param  {Uint8Array} key
   * @return {Uint8Array}           decrypted message
   */
  encrypt(message, nonce, key) {
    check({
      message, nonce, key
    }, {
      message: Uint8Array,
      nonce: Uint8Array,
      key: Uint8Array
    });
    return nacl.secretbox(message, nonce, key);
  },
  /**
   * Encrypts strings symetrically
   * @param  {String} message         message to encrypt
   */
  encryptString(message, ...args) {
    check({
      message
    }, {
      message: String
    });

    const encoded = Utils.encode(message);
    return this.encrypt(encoded, ...args);
  },
  /**
   * Encrypts strings symetrically
   * @param  {Object} obj         obj to encrypt
   */
  encryptObject(obj, ...args) {
    check({
      obj
    }, {
      obj: Object
    });

    const encoded = Utils.encode(obj);
    return this.encrypt(encoded, ...args);
  },
  /**
   * Decrypts message symetrically
   * @param  {Uint8Array} message   encrypted message
   * @param  {Uint8Array} nonce
   * @param  {Uint8Array} key
   * @return {*}                    decrypted message
   */
  decrypt(message, nonce, key) {
    check({
      message, nonce, key
    }, {
      message: Uint8Array,
      nonce: Uint8Array,
      key: Uint8Array
    });

    return nacl.secretbox.open(message, nonce, key);
  },
  /**
   * Decrypts strings symetrically
   * @return {String}
   */
  decryptString(message, ...args) {
    const result = this.decrypt(message, ...args);
    return Utils.decode(result);
  },
  /**
   * Decrypts objects symetrically
   * @return {Object}
   */
  decryptObject(obj, ...args) {
    const result = this.decrypt(obj, ...args);
    return Utils.decode(result);
  }
};
