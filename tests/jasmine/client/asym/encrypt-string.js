describe('asym.encryptString()', () => {
  const message = 'foo';
  const encodedMessage = Encryption.utils.encode(message);
  const nonce = Encryption.utils.nonce();
  const keyPair = Encryption.utils.keyPair();

  it('should encode and return encrypted', () => {
    const spyEncrypt = spyOn(Encryption.asym, 'encrypt')
      .and.returnValue('encrypted');
    const result = Encryption.asym.encryptString(
      message, nonce, keyPair.publicKey, keyPair.secretKey
    );

    expect(spyEncrypt).toHaveBeenCalledWith(
      encodedMessage, nonce, keyPair.publicKey, keyPair.secretKey
    );
    expect(result).toEqual('encrypted');
  });

  it('should fail on non string', () => {
    expect(() => {
      Encryption.asym.encryptString(123);
    }).toThrowError(Match.Error, /message/i);
  });
});
