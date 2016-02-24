describe('asym.decryptString()', () => {
  const message = 'foobar';
  const decodedMessage = Crypto.utils.encode(message);
  const nonce = Crypto.utils.nonce();
  const keyPair = Crypto.utils.keyPair();

  it('should call decrypt and return decoded', () => {
    const spy = spyOn(Crypto.asym, 'decrypt').and
      .returnValue(decodedMessage);
    const result = Crypto.asym.decryptString(
      message, nonce, keyPair.publicKey, keyPair.secretKey
    );

    expect(spy).toHaveBeenCalledWith(
      message, nonce, keyPair.publicKey, keyPair.secretKey
    );
    expect(result).toEqual(message);
  });

  describe('e2e', () => {
    const my = Crypto.utils.keyPair();
    const their = Crypto.utils.keyPair();
    const encrypted = Crypto.asym.encryptString(
      message, nonce, their.publicKey, my.secretKey
    );
    const decrypted = Crypto.asym.decryptString(
      encrypted, nonce, my.publicKey, their.secretKey
    );

    it('should decrypt', () => {
      expect(decrypted).toEqual(message);
    });
  });
});
