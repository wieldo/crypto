describe('sym.decrypt()', () => {
  const message = {
    foo: 'bar'
  };
  const encodedMessage = Crypto.utils.encode(message);
  const Uint8ArrayMock = new Uint8Array;

  it('should use nacl.secretbox.open', () => {
    const spy = spyOn(nacl.secretbox, 'open').and.returnValue('test');
    const nonce = Crypto.utils.nonce();
    const key = Crypto.utils.key();
    const encryptedMessage = Crypto.sym.encrypt(encodedMessage, nonce, key);
    const result = Crypto.sym.decrypt(encryptedMessage, nonce, key);

    expect(result).toEqual('test');
    expect(spy).toHaveBeenCalledWith(encryptedMessage, nonce, key);
  });

  // fail

  it('should fail on missing message', () => {
    expect(() => {
      Crypto.sym.decrypt();
    }).toThrowError(Match.Error, /message/i);
  });

  it('should fail on missing nonce', () => {
    expect(() => {
      Crypto.sym.decrypt(Uint8ArrayMock);
    }).toThrowError(Match.Error, /nonce/i);
  });

  it('should fail on non Uint8Array nonce', () => {
    expect(() => {
      Crypto.sym.decrypt(Uint8ArrayMock, 'test');
    }).toThrowError(Match.Error, /nonce/i);
  });

  it('should fail on missing key', () => {
    expect(() => {
      Crypto.sym.decrypt(Uint8ArrayMock, Uint8ArrayMock);
    }).toThrowError(Match.Error, /key/i);
  });

  it('should fail on non Uint8Array key', () => {
    expect(() => {
      Crypto.sym.decrypt(Uint8ArrayMock, Uint8ArrayMock, 'test');
    }).toThrowError(Match.Error, /key/i);
  });

  describe('e2e', () => {
    const messageUint = Crypto.utils.key();
    const nonce = Crypto.utils.nonce();
    const key = Crypto.utils.key();
    const encrypted = Crypto.sym.encrypt(messageUint, nonce, key);
    const decrypted = Crypto.sym.decrypt(encrypted, nonce, key);

    it('should decrypt', () => {
      expect(decrypted).toEqual(messageUint);
    });
  });
});
