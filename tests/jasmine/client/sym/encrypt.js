describe('sym.encrypt()', () => {
  const message = {
    foo: 'bar'
  };
  const encodedMessage = Crypto.utils.encode(message);

  it('should use nacl.secretbox', () => {
    const spySec = spyOn(nacl, 'secretbox').and.returnValue('encrypted');
    const nonce = Crypto.utils.nonce();
    const key = Crypto.utils.key();
    const result = Crypto.sym.encrypt(encodedMessage, nonce, key);

    expect(result).toEqual('encrypted');
    expect(spySec).toHaveBeenCalledWith(encodedMessage, nonce, key);
  });

  it('should encrypt Uint8Array', () => {
    const messageBytes = Crypto.utils.key();
    const nonce = Crypto.utils.nonce();
    const key = Crypto.utils.key();
    const result = Crypto.sym.encrypt(messageBytes, nonce, key);

    expect(result).toEqual(jasmine.any(Uint8Array));
  });

  // fail

  it('should fail on missing message', () => {
    expect(() => {
      Crypto.sym.encrypt();
    }).toThrowError(Match.Error, /message/i);
  });

  it('should fail on missing nonce', () => {
    expect(() => {
      Crypto.sym.encrypt(encodedMessage);
    }).toThrowError(Match.Error, /nonce/i);
  });

  it('should fail on non Uint8Array nonce', () => {
    expect(() => {
      Crypto.sym.encrypt(encodedMessage, 'test');
    }).toThrowError(Match.Error, /nonce/i);
  });

  it('should fail on missing key', () => {
    expect(() => {
      Crypto.sym.encrypt(encodedMessage, new Uint8Array);
    }).toThrowError(Match.Error, /key/i);
  });

  it('should fail on non Uint8Array key', () => {
    expect(() => {
      Crypto.sym.encrypt(encodedMessage, new Uint8Array, 'test');
    }).toThrowError(Match.Error, /key/i);
  });
});
