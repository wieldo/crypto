describe('sym.encryptObject()', () => {
  const message = {
    foo: 'bar'
  };
  const encodedMessage = Crypto.utils.encode(message);
  const nonce = Crypto.utils.nonce();
  const key = Crypto.utils.key();

  it('should encode and return encrypted', () => {
    const spyEncrypt = spyOn(Crypto.sym, 'encrypt')
      .and.returnValue('encrypted');
    const result = Crypto.sym.encryptObject(message, nonce, key);

    expect(spyEncrypt).toHaveBeenCalledWith(encodedMessage, nonce, key);
    expect(result).toEqual('encrypted');
  });

  it('should fail on non object', () => {
    expect(() => {
      Crypto.sym.encryptObject('test');
    }).toThrowError(Match.Error, /obj/i);
  });
});
