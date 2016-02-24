describe('sym.decryptString()', () => {
  const message = 'foobar';
  const decodedMessage = Crypto.utils.encode(message);
  const nonce = Crypto.utils.nonce();
  const key = Crypto.utils.key();

  it('should call decrypt and return decoded', () => {
    const spy = spyOn(Crypto.sym, 'decrypt').and.returnValue(decodedMessage);
    const result = Crypto.sym.decryptString(message, nonce, key);

    expect(spy).toHaveBeenCalledWith(message, nonce, key);
    expect(result).toEqual(message);
  });

  describe('e2e', () => {
    const encrypted = Crypto.sym.encryptString(message, nonce, key);
    const decrypted = Crypto.sym.decryptString(encrypted, nonce, key);

    it('should decrypt', () => {
      expect(decrypted).toEqual(message);
    });
  });
});
