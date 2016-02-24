describe('asym.encrypt()', () => {
  const message = {
    foo: 'bar'
  };
  const encodedMessage = Crypto.utils.encode(message);
  const nonce = Crypto.utils.nonce();
  const keyPair = Crypto.utils.keyPair();

  it('should use nacl.box', () => {
    const spySec = spyOn(nacl, 'box').and.returnValue('encrypted');
    const result = Crypto.asym.encrypt(
      encodedMessage, nonce, keyPair.publicKey, keyPair.secretKey
    );

    expect(result).toEqual('encrypted');
    expect(spySec).toHaveBeenCalledWith(
      encodedMessage, nonce, keyPair.publicKey, keyPair.secretKey
    );
  });

  it('should encrypt Uint8Array', () => {
    const messageBytes = Crypto.utils.key();
    const result = Crypto.asym.encrypt(
      messageBytes, nonce, keyPair.publicKey, keyPair.secretKey
    );

    expect(result).toEqual(jasmine.any(Uint8Array));
  });

  // fail

  it('should fail on missing message', () => {
    expect(() => {
      Crypto.asym.encrypt();
    }).toThrowError(Match.Error, /message/i);
  });

  it('should fail on missing nonce', () => {
    expect(() => {
      Crypto.asym.encrypt(encodedMessage);
    }).toThrowError(Match.Error, /nonce/i);
  });

  it('should fail on non Uint8Array nonce', () => {
    expect(() => {
      Crypto.asym.encrypt(encodedMessage, 'test');
    }).toThrowError(Match.Error, /nonce/i);
  });

  it('should fail on missing public key', () => {
    expect(() => {
      Crypto.asym.encrypt(encodedMessage, new Uint8Array);
    }).toThrowError(Match.Error, /publicKey/i);
  });

  it('should fail on non Uint8Array public key', () => {
    expect(() => {
      Crypto.asym.encrypt(encodedMessage, new Uint8Array, 'test');
    }).toThrowError(Match.Error, /publicKey/i);
  });

  it('should fail on missing secret key', () => {
    expect(() => {
      Crypto.asym.encrypt(encodedMessage, new Uint8Array, new Uint8Array);
    }).toThrowError(Match.Error, /secretKey/i);
  });

  it('should fail on non Uint8Array secret key', () => {
    expect(() => {
      Crypto.asym.encrypt(
        encodedMessage, new Uint8Array, new Uint8Array, 'test'
      );
    }).toThrowError(Match.Error, /secretKey/i);
  });
});
