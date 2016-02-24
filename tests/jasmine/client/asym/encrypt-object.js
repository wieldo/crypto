describe('Asym.encryptObject()', () => {
  const message = {
    foo: 'bar'
  };
  const encodedMessage = Encryption.utils.encode(message);
  const nonce = Encryption.utils.nonce();
  const keyPair = Encryption.utils.keyPair();

  it('should encode and return encrypted', () => {
    const spyEncrypt = spyOn(Encryption.asym, 'encrypt')
      .and.returnValue('encrypted');
    const result = Encryption.asym.encryptObject(
      message, nonce, keyPair.publicKey, keyPair.secretKey
    );

    expect(spyEncrypt).toHaveBeenCalledWith(
      encodedMessage, nonce, keyPair.publicKey, keyPair.secretKey
    );
    expect(result).toEqual('encrypted');
  });

  it('should fail on non object', () => {
    expect(() => {
      Encryption.asym.encryptObject('test');
    }).toThrowError(Match.Error, /obj/i);
  });
});
