describe('utils.random()', () => {
  // pass

  it('should return 24 length Uint8Array by default', () => {
    const result = Crypto.utils.random();

    expect(result).toEqual(jasmine.any(Uint8Array));
    expect(result.length).toEqual(24);
  });

  it('should return 32 length Uint8Array', () => {
    const result = Crypto.utils.random(32);

    expect(result).toEqual(jasmine.any(Uint8Array));
    expect(result.length).toEqual(32);
  });

  // fail

  it('should fail on string values', () => {
    expect(() => {
      Crypto.utils.random('test');
    }).toThrowError(Match.Error);
  });

  it('should fail on float values', () => {
    expect(() => {
      Crypto.utils.random(1.5);
    }).toThrowError(Match.Error);
  });

  it('should fail on lower then zero integers', () => {
    expect(() => {
      Crypto.utils.random(-3);
    }).toThrowError(Match.Error);
  });
});
