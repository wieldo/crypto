describe('Sym.encryptString()', () => {
  const message = 'foo';
  const encodedMessage = Encryption.utils.encode(message);
  const nonce = Encryption.utils.nonce();
  const key = Encryption.utils.key();

  it('should encode and return encrypted', () => {
    const spyEncrypt = spyOn(Encryption.sym, 'encrypt')
      .and.returnValue('encrypted');
    const result = Encryption.sym.encryptString(message, nonce, key);

    expect(spyEncrypt).toHaveBeenCalledWith(encodedMessage, nonce, key);
    expect(result).toEqual('encrypted');
  });

  it('should fail on non string', () => {
    expect(() => {
      Encryption.sym.encryptString(123);
    }).toThrowError(Match.Error, /message/i);
  });
});
