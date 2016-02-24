/* globals utils:true */
utils = {
  /**
   * Generates pair of keys: publicKey and secretKey
   * @return {Object}
   */
  keyPair() {
    return nacl.box.keyPair();
  },

  /**
   * Generates random 24 length nonce
   * @return {Uint8Array}
   */
  nonce() {
    return this.random(24);
  },

  /**
   * Generates random 32 length key
   * @return {Uint8Array}
   */
  key() {
    return this.random(32);
  },

  /**
   * Generates random n-length bytes
   * @param  {Integer}   length (24 by default)
   * @return {Uint8Array}   n-length bytes
   */
  random(n = 24) {
    check(n, Match.Where((x) => {
      check(x, Match.Integer);
      return x > 0;
    }));

    return nacl.randomBytes(n);
  },

  /**
   * Stringifies an object or uses string directly and converts it to Uint8Array
   * @param  {Object|Uint8Array|String} message message to be encoded
   * @return {Uint8Array}         encoded message
   */
  encode(message) {
    check({
      message
    }, {
      message: Match.OneOf(String, Object, Uint8Array)
    });

    if (message instanceof Uint8Array) {
      return message;
    }

    if (_.isString(message)) {
      return nacl.util.decodeUTF8(message);
    }

    // object
    return nacl.util.decodeUTF8(JSON.stringify(message));
  },

  /**
   * Decodes a messages and coverts it to JSON object or String
   * @param  {Uint8Array} message     encoded message
   * @return {Object|String}          decoded message
   */
  decode(message) {
    check({
      message
    }, {
      message: Uint8Array
    });

    const result = nacl.util.encodeUTF8(message);

    try {
      return JSON.parse(result);
    } catch (e) {
      return result;
    }
  }
};
