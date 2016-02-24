/* globals asym:true */
asym = {
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
  /**
   * Encrypts strings asymetrically
   * @param  {String} message         message to encrypt
   */
  encryptString(message, ...args) {
    check({
      message
    }, {
      message: String
    });

    return this.encrypt(utils.encode(message), ...args);
  },
  /**
   * Encrypts objects asymetrically
   * @param  {Object} obj         object to encrypt
   */
  encryptObject(obj, ...args) {
    check({
      obj
    }, {
      obj: Object
    });

    return this.encrypt(utils.encode(obj), ...args);
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
  /**
   * Decrypts strings asymetrically
   * @return {String}
   */
  decryptString(message, ...args) {
    return utils.decode(this.decrypt(message, ...args));
  },
  /**
   * Decrypts objects asymetrically
   * @return {Object}
   */
  decryptObject(obj, ...args) {
    return utils.decode(this.decrypt(obj, ...args));
  }
};
