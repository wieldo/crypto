describe('utils.decode()', () => {
  it('should fail on non Uint8Array', () => {
    expect(() => {
      Crypto.utils.decode('test');
    }).toThrowError(Match.Error, /message/i);
  });

  it('should convert object', () => {
    const obj = {
      foo: 'bar'
    };
    const encoded = Crypto.utils.encode(obj);
    const result = Crypto.utils.decode(encoded);

    expect(result).toEqual(obj);
  });

  it('should convert string', () => {
    const message = 'test';
    const encoded = Crypto.utils.encode(message);
    const result = Crypto.utils.decode(encoded, false);

    expect(result).toEqual(message);
  });
});
