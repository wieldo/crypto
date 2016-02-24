describe('Sym.decryptString()', () => {
  const message = 'foobar';
  const decodedMessage = Encryption.utils.encode(message);
  const nonce = Encryption.utils.nonce();
  const key = Encryption.utils.key();

  it('should call decrypt and return decoded', () => {
    const spy = spyOn(Encryption.sym, 'decrypt').and.returnValue(decodedMessage);
    const result = Encryption.sym.decryptString(message, nonce, key);

    expect(spy).toHaveBeenCalledWith(message, nonce, key);
    expect(result).toEqual(message);
  });

  describe('e2e', () => {
    const encrypted = Encryption.sym.encryptString(message, nonce, key);
    const decrypted = Encryption.sym.decryptString(encrypted, nonce, key);

    it('should decrypt', () => {
      expect(decrypted).toEqual(message);
    });
  });
});
