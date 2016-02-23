describe('Sym.encryptObject()', () => {
  const message = {
    foo: 'bar'
  };
  const encodedMessage = Encryption.utils.encode(message);
  const nonce = Encryption.utils.nonce();
  const key = Encryption.utils.key();

  it('should encode and return encrypted', () => {
    const spyEncrypt = spyOn(Encryption.sym, 'encrypt')
      .and.returnValue('encrypted');
    const result = Encryption.sym.encryptObject(message, nonce, key);

    expect(spyEncrypt).toHaveBeenCalledWith(encodedMessage, nonce, key);
    expect(result).toEqual('encrypted');
  });

  it('should fail on non object', () => {
    expect(() => {
      Encryption.sym.encryptObject('test');
    }).toThrowError(Match.Error, /obj/i);
  });
});
