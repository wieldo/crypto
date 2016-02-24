describe('asym.encrypt()', () => {
  const message = {
    foo: 'bar'
  };
  const encodedMessage = Encryption.utils.encode(message);
  const nonce = Encryption.utils.nonce();
  const keyPair = Encryption.utils.keyPair();

  it('should use nacl.box', () => {
    const spySec = spyOn(nacl, 'box').and.returnValue('encrypted');
    const result = Encryption.asym.encrypt(
      encodedMessage, nonce, keyPair.publicKey, keyPair.secretKey
    );

    expect(result).toEqual('encrypted');
    expect(spySec).toHaveBeenCalledWith(
      encodedMessage, nonce, keyPair.publicKey, keyPair.secretKey
    );
  });

  it('should encrypt Uint8Array', () => {
    const messageBytes = Encryption.utils.key();
    const result = Encryption.asym.encrypt(
      messageBytes, nonce, keyPair.publicKey, keyPair.secretKey
    );

    expect(result).toEqual(jasmine.any(Uint8Array));
  });

  // fail

  // Encryption.asymEncrypt( X )
  it('should fail on missing message', () => {
    expect(() => {
      Encryption.asym.encrypt();
    }).toThrowError(Match.Error, /message/i);
  });

  // Encryption.asymEncrypt( + , X )
  it('should fail on missing nonce', () => {
    expect(() => {
      Encryption.asym.encrypt(encodedMessage);
    }).toThrowError(Match.Error, /nonce/i);
  });

  // Encryption.asymEncrypt( + , X )
  it('should fail on non Uint8Array nonce', () => {
    expect(() => {
      Encryption.asym.encrypt(encodedMessage, 'test');
    }).toThrowError(Match.Error, /nonce/i);
  });

  // Encryption.asymEncrypt( + , + , X )
  it('should fail on missing public key', () => {
    expect(() => {
      Encryption.asym.encrypt(encodedMessage, new Uint8Array);
    }).toThrowError(Match.Error, /publicKey/i);
  });

  // Encryption.asymEncrypt( + , + , X )
  it('should fail on non Uint8Array public key', () => {
    expect(() => {
      Encryption.asym.encrypt(encodedMessage, new Uint8Array, 'test');
    }).toThrowError(Match.Error, /publicKey/i);
  });

  // Encryption.asymEncrypt( + , + , + , X )
  it('should fail on missing secret key', () => {
    expect(() => {
      Encryption.asym.encrypt(encodedMessage, new Uint8Array, new Uint8Array);
    }).toThrowError(Match.Error, /secretKey/i);
  });

  // Encryption.asymEncrypt( + , + , + , X )
  it('should fail on non Uint8Array secret key', () => {
    expect(() => {
      Encryption.asym.encrypt(
        encodedMessage, new Uint8Array, new Uint8Array, 'test'
      );
    }).toThrowError(Match.Error, /secretKey/i);
  });
});
