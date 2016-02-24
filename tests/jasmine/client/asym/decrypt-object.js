describe('asym.decryptObject()', () => {
  const message = {
    foo: 'bar'
  };
  const decodedMessage = Encryption.utils.encode(message);
  const nonce = Encryption.utils.nonce();
  const keyPair = Encryption.utils.keyPair();

  it('should call decrypt and return decoded', () => {
    const spy = spyOn(Encryption.asym, 'decrypt').and
      .returnValue(decodedMessage);
    const result = Encryption.asym.decryptObject(
      message, nonce, keyPair.publicKey, keyPair.secretKey
    );

    expect(spy).toHaveBeenCalledWith(
      message, nonce, keyPair.publicKey, keyPair.secretKey
    );
    expect(result).toEqual(message);
  });

  describe('e2e', () => {
    const my = Encryption.utils.keyPair();
    const their = Encryption.utils.keyPair();
    const encrypted = Encryption.asym.encryptObject(
      message, nonce, their.publicKey, my.secretKey
    );
    const decrypted = Encryption.asym.decryptObject(
      encrypted, nonce, my.publicKey, their.secretKey
    );

    it('should decrypt', () => {
      expect(decrypted).toEqual(message);
    });
  });
});
