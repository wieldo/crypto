describe('sym.decrypt()', () => {
  const message = {
    foo: 'bar'
  };
  const encodedMessage = Encryption.utils.encode(message);
  const Uint8ArrayMock = new Uint8Array;

  it('should use nacl.secretbox.open', () => {
    const spy = spyOn(nacl.secretbox, 'open').and.returnValue('test');
    const nonce = Encryption.utils.nonce();
    const key = Encryption.utils.key();
    const encryptedMessage = Encryption.sym.encrypt(encodedMessage, nonce, key);
    const result = Encryption.sym.decrypt(encryptedMessage, nonce, key);

    expect(result).toEqual('test');
    expect(spy).toHaveBeenCalledWith(encryptedMessage, nonce, key);
  });

  // fail

  it('should fail on missing message', () => {
    expect(() => {
      Encryption.sym.decrypt();
    }).toThrowError(Match.Error, /message/i);
  });

  it('should fail on missing nonce', () => {
    expect(() => {
      Encryption.sym.decrypt(Uint8ArrayMock);
    }).toThrowError(Match.Error, /nonce/i);
  });

  it('should fail on non Uint8Array nonce', () => {
    expect(() => {
      Encryption.sym.decrypt(Uint8ArrayMock, 'test');
    }).toThrowError(Match.Error, /nonce/i);
  });

  it('should fail on missing key', () => {
    expect(() => {
      Encryption.sym.decrypt(Uint8ArrayMock, Uint8ArrayMock);
    }).toThrowError(Match.Error, /key/i);
  });

  it('should fail on non Uint8Array key', () => {
    expect(() => {
      Encryption.sym.decrypt(Uint8ArrayMock, Uint8ArrayMock, 'test');
    }).toThrowError(Match.Error, /key/i);
  });

  describe('e2e', () => {
    const messageUint = Encryption.utils.key();
    const nonce = Encryption.utils.nonce();
    const key = Encryption.utils.key();
    const encrypted = Encryption.sym.encrypt(messageUint, nonce, key);
    const decrypted = Encryption.sym.decrypt(encrypted, nonce, key);

    it('should decrypt', () => {
      expect(decrypted).toEqual(messageUint);
    });
  });
});
