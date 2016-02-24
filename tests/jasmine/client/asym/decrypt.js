describe('asym.decrypt()', () => {
  const message = {
    foo: 'bar'
  };
  const encodedMessage = Crypto.utils.encode(message);
  const keyPair = Crypto.utils.keyPair();
  const nonce = Crypto.utils.nonce();

  it('should use nacl.box.open', () => {
    const spy = spyOn(nacl.box, 'open').and.returnValue('foo');
    const result = Crypto.asym.decrypt(
      encodedMessage, nonce, keyPair.publicKey, keyPair.secretKey
    );

    expect(result).toEqual('foo');
    expect(spy).toHaveBeenCalledWith(
      encodedMessage, nonce, keyPair.publicKey, keyPair.secretKey
    );
  });

  // fail

  it('should fail on missing message', () => {
    expect(() => {
      Crypto.asym.decrypt();
    }).toThrowError(Match.Error, /message/i);
  });

  it('should fail on missing nonce', () => {
    expect(() => {
      Crypto.asym.decrypt(new Uint8Array);
    }).toThrowError(Match.Error, /nonce/i);
  });

  it('should fail on non Uint8Array nonce', () => {
    expect(() => {
      Crypto.asym.decrypt(new Uint8Array, 'test');
    }).toThrowError(Match.Error, /nonce/i);
  });

  it('should fail on missing public key', () => {
    expect(() => {
      Crypto.asym.decrypt(new Uint8Array, new Uint8Array);
    }).toThrowError(Match.Error, /key/i);
  });

  it('should fail on non Uint8Array public key', () => {
    expect(() => {
      Crypto.asym.decrypt(new Uint8Array, new Uint8Array, 'test');
    }).toThrowError(Match.Error, /key/i);
  });

  it('should fail on missing secret key', () => {
    expect(() => {
      Crypto.asym.decrypt(new Uint8Array, new Uint8Array, new Uint8Array);
    }).toThrowError(Match.Error, /key/i);
  });

  it('should fail on non Uint8Array secret key', () => {
    expect(() => {
      Crypto.asym.decrypt(
        new Uint8Array, new Uint8Array, new Uint8Array, 'test'
      );
    }).toThrowError(Match.Error, /key/i);
  });

  describe('e2e', () => {
    const messageUint = Crypto.utils.key();
    const my = Crypto.utils.keyPair();
    const their = Crypto.utils.keyPair();
    const encrypted = Crypto.asym.encrypt(
      messageUint, nonce, their.publicKey, my.secretKey
    );
    const decrypted = Crypto.asym.decrypt(
      encrypted, nonce, my.publicKey, their.secretKey
    );

    it('should decrypt', () => {
      expect(decrypted).toEqual(messageUint);
    });
  });
});
