describe('Asym.decrypt()', () => {
  const message = {
    foo: 'bar'
  };
  const encodedMessage = Encryption.utils.encode(message);
  const keyPair = Encryption.utils.keyPair();
  const nonce = Encryption.utils.nonce();

  it('should use nacl.box.open', () => {
    const spy = spyOn(nacl.box, 'open').and.returnValue('foo');
    const result = Encryption.asym.decrypt(encodedMessage, nonce, keyPair.publicKey, keyPair.secretKey);

    expect(result).toEqual('foo');
    expect(spy).toHaveBeenCalledWith(encodedMessage, nonce, keyPair.publicKey, keyPair.secretKey);
  });

  // fail

  it('should fail on missing message', () => {
    expect(() => {
      Encryption.asym.decrypt();
    }).toThrowError(Match.Error, /message/i);
  });

  it('should fail on missing nonce', () => {
    expect(() => {
      Encryption.asym.decrypt(new Uint8Array);
    }).toThrowError(Match.Error, /nonce/i);
  });

  it('should fail on non Uint8Array nonce', () => {
    expect(() => {
      Encryption.asym.decrypt(new Uint8Array, 'test');
    }).toThrowError(Match.Error, /nonce/i);
  });

  it('should fail on missing public key', () => {
    expect(() => {
      Encryption.asym.decrypt(new Uint8Array, new Uint8Array);
    }).toThrowError(Match.Error, /key/i);
  });

  it('should fail on non Uint8Array public key', () => {
    expect(() => {
      Encryption.asym.decrypt(new Uint8Array, new Uint8Array, 'test');
    }).toThrowError(Match.Error, /key/i);
  });

  it('should fail on missing secret key', () => {
    expect(() => {
      Encryption.asym.decrypt(new Uint8Array, new Uint8Array, new Uint8Array);
    }).toThrowError(Match.Error, /key/i);
  });

  it('should fail on non Uint8Array secret key', () => {
    expect(() => {
      Encryption.asym.decrypt(new Uint8Array, new Uint8Array, new Uint8Array, 'test');
    }).toThrowError(Match.Error, /key/i);
  });

  describe('e2e', () => {
    const messageUint = Encryption.utils.key();
    const my = Encryption.utils.keyPair();
    const their = Encryption.utils.keyPair();
    let encrypted;
    let decrypted;

    beforeEach(() => {
      encrypted = Encryption.asym.encrypt(messageUint, nonce, their.publicKey, my.secretKey);
      decrypted = Encryption.asym.decrypt(encrypted, nonce, my.publicKey, their.secretKey);
    });

    it('should decrypt', () => {
      expect(decrypted).toEqual(messageUint);
    });
  });
});
