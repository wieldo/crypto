/* globals Encryption:true, nacl:true */

// globalize it
nacl = this.nacl;

Encryption = class Encryption {
  /**
   * Generates random pair of keys
   * @return {Object} with publicKey and secretKey
   */
  static keyPair() {
    return nacl.box.keyPair();
  }

  /**
   * Generates random 24 length nonce
   * @return {Uint8Array}
   */
  static nonce() {
    return Encryption.random(24);
  }

  /**
   * Generates random 32 length key
   * @return {Uint8Array}
   */
  static key() {
    return Encryption.random(32);
  }

  /**
   * Generates random n-length bytes
   * @param  {Integer}   length (24 by default)
   * @return {Uint8Array}   n-length bytes
   */
  static random(n = 24) {
    check(n, Match.Where((x) => {
      check(x, Match.Integer);
      return x > 0;
    }));

    return nacl.randomBytes(n);
  }

  /**
   * Stringifies an object and converts it to Uint8Array
   * @param  {Object|Uint8Array} message message to be encoded
   * @return {Uint8Array}         encoded message
   */
  static encode(message) {
    check({
      message
    }, {
      message: Match.OneOf(Object, Uint8Array)
    });

    if (message instanceof Uint8Array) {
      return message;
    }

    return nacl.util.decodeUTF8(JSON.stringify(message));
  }

  /**
   * Decodes a messages and coverts it to JSON object
   * @param  {Uint8Array} message encoded json object
   * @return {Object}         decoded json object
   */
  static decode(message) {
    check({
      message
    }, {
      message: Uint8Array
    });

    return JSON.parse(nacl.util.encodeUTF8(message));
  }

  /**
   * Encrypts message symetrically
   * @param  {*} message          message you want to encrypt
   * @param  {Uint8Array} nonce
   * @param  {Uint8Array} key
   * @return {Uint8Array}         decrypted message
   */
  static symEncrypt(message, nonce, key) {
    check({
      message, nonce, key
    }, {
      message: Match.Where((x) => x !== undefined && x !== null),
      nonce: Uint8Array,
      key: Uint8Array
    });

    return nacl.secretbox(Encryption.encode(message), nonce, key);
  }

  /**
   * Decrypts message symetrically
   * @param  {Uint8Array} message   encrypted message
   * @param  {Uint8Array} nonce
   * @param  {Uint8Array} key
   * @return {*}                    decrypted message
   */
  static symDecrypt(message, nonce, key) {
    check({
      message, nonce, key
    }, {
      message: Uint8Array,
      nonce: Uint8Array,
      key: Uint8Array
    });

    return Encryption.decode(nacl.secretbox.open(message, nonce, key));
  }

  /**
   * Encrypts message asymetrically
   * @param  {*} message            Message to encrypt
   * @param  {Uint8Array} nonce
   * @param  {Uint8Array} publicKey their public key
   * @param  {Uint8Array} secretKey your private key
   * @return {Uint8Array}           encrypted message
   */
  static asymEncrypt(message, nonce, publicKey, secretKey) {
    check({
      message, nonce, publicKey, secretKey
    }, {
      message: Match.Where((x) => x !== undefined && x !== null),
      nonce: Uint8Array,
      publicKey: Uint8Array,
      secretKey: Uint8Array
    });

    return nacl.box(Encryption.encode(message), nonce, publicKey, secretKey);
  }

  /**
   * Decrypts message asymetrically
   * @param  {Uint8Array} message     encrypted message
   * @param  {Uint8Array} nonce
   * @param  {Uint8Array} publicKey   their public key
   * @param  {Uint8Array} secretKey   your private key
   * @return {*}                      decrypted message
   */
  static asymDecrypt(message, nonce, publicKey, secretKey) {
    check({
      message, nonce, publicKey, secretKey
    }, {
      message: Uint8Array,
      nonce: Uint8Array,
      publicKey: Uint8Array,
      secretKey: Uint8Array
    });

    return Encryption.decode(nacl.box.open(message, nonce, publicKey, secretKey));
  }
};
