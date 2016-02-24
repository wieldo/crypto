describe('sym.encrypt()', () => {
  const message = {
    foo: 'bar'
  };
  const encodedMessage = Encryption.utils.encode(message);

  it('should use nacl.secretbox', () => {
    const spySec = spyOn(nacl, 'secretbox').and.returnValue('encrypted');
    const nonce = Encryption.utils.nonce();
    const key = Encryption.utils.key();
    const result = Encryption.sym.encrypt(encodedMessage, nonce, key);

    expect(result).toEqual('encrypted');
    expect(spySec).toHaveBeenCalledWith(encodedMessage, nonce, key);
  });

  it('should encrypt Uint8Array', () => {
    const messageBytes = Encryption.utils.key();
    const nonce = Encryption.utils.nonce();
    const key = Encryption.utils.key();
    const result = Encryption.sym.encrypt(messageBytes, nonce, key);

    expect(result).toEqual(jasmine.any(Uint8Array));
  });

  // fail

  it('should fail on missing message', () => {
    expect(() => {
      Encryption.sym.encrypt();
    }).toThrowError(Match.Error, /message/i);
  });

  it('should fail on missing nonce', () => {
    expect(() => {
      Encryption.sym.encrypt(encodedMessage);
    }).toThrowError(Match.Error, /nonce/i);
  });

  it('should fail on non Uint8Array nonce', () => {
    expect(() => {
      Encryption.sym.encrypt(encodedMessage, 'test');
    }).toThrowError(Match.Error, /nonce/i);
  });

  it('should fail on missing key', () => {
    expect(() => {
      Encryption.sym.encrypt(encodedMessage, new Uint8Array);
    }).toThrowError(Match.Error, /key/i);
  });

  it('should fail on non Uint8Array key', () => {
    expect(() => {
      Encryption.sym.encrypt(encodedMessage, new Uint8Array, 'test');
    }).toThrowError(Match.Error, /key/i);
  });
});
