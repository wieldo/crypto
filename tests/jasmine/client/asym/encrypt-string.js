describe('asym.encryptString()', () => {
  const message = 'foo';
  const encodedMessage = Crypto.utils.encode(message);
  const nonce = Crypto.utils.nonce();
  const keyPair = Crypto.utils.keyPair();

  it('should encode and return encrypted', () => {
    const spyEncrypt = spyOn(Crypto.asym, 'encrypt')
      .and.returnValue('encrypted');
    const result = Crypto.asym.encryptString(
      message, nonce, keyPair.publicKey, keyPair.secretKey
    );

    expect(spyEncrypt).toHaveBeenCalledWith(
      encodedMessage, nonce, keyPair.publicKey, keyPair.secretKey
    );
    expect(result).toEqual('encrypted');
  });

  it('should fail on non string', () => {
    expect(() => {
      Crypto.asym.encryptString(123);
    }).toThrowError(Match.Error, /message/i);
  });
});
