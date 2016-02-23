describe('Utils.decode()', () => {
  it('should fail on non Uint8Array', () => {
    expect(() => {
      Encryption.utils.decode('test');
    }).toThrowError(Match.Error, /message/i);
  });

  it('should convert object', () => {
    const obj = {
      foo: 'bar'
    };
    const encoded = Encryption.utils.encode(obj);
    const result = Encryption.utils.decode(encoded);

    expect(result).toEqual(obj);
  });

  it('should convert string', () => {
    const message = 'test';
    const encoded = Encryption.utils.encode(message);
    const result = Encryption.utils.decode(encoded, false);

    expect(result).toEqual(message);
  });
});
