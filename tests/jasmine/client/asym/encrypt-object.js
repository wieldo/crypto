describe('asym.encryptObject()', () => {
  const message = {
    foo: 'bar'
  };
  const encodedMessage = Crypto.utils.encode(message);
  const nonce = Crypto.utils.nonce();
  const keyPair = Crypto.utils.keyPair();

  it('should encode and return encrypted', () => {
    const spyEncrypt = spyOn(Crypto.asym, 'encrypt')
      .and.returnValue('encrypted');
    const result = Crypto.asym.encryptObject(
      message, nonce, keyPair.publicKey, keyPair.secretKey
    );

    expect(spyEncrypt).toHaveBeenCalledWith(
      encodedMessage, nonce, keyPair.publicKey, keyPair.secretKey
    );
    expect(result).toEqual('encrypted');
  });

  it('should fail on non object', () => {
    expect(() => {
      Crypto.asym.encryptObject('test');
    }).toThrowError(Match.Error, /obj/i);
  });
});
