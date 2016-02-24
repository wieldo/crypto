describe('sym.encryptString()', () => {
  const message = 'foo';
  const encodedMessage = Crypto.utils.encode(message);
  const nonce = Crypto.utils.nonce();
  const key = Crypto.utils.key();

  it('should encode and return encrypted', () => {
    const spyEncrypt = spyOn(Crypto.sym, 'encrypt')
      .and.returnValue('encrypted');
    const result = Crypto.sym.encryptString(message, nonce, key);

    expect(spyEncrypt).toHaveBeenCalledWith(encodedMessage, nonce, key);
    expect(result).toEqual('encrypted');
  });

  it('should fail on non string', () => {
    expect(() => {
      Crypto.sym.encryptString(123);
    }).toThrowError(Match.Error, /message/i);
  });
});
