describe('users.keyFromPassword()', () => {
  const password = 'foobar';
  const encodedPassword = Encryption.utils.encode(password);

  it('should encode, hash and return 32 length Uint8Array', () => {
    const spy = spyOn(nacl, 'hash').and.callThrough();
    const result = Encryption.users.keyFromPassword(password);

    expect(spy).toHaveBeenCalledWith(encodedPassword);
    expect(result).toEqual(jasmine.any(Uint8Array));
    expect(result.length).toEqual(32);
  });

  // fail

  it('should fail on missing password', () => {
    expect(() => {
      Encryption.users.keyFromPassword();
    }).toThrowError(Match.Error, /password/i);
  });

  it('should fail on non string password', () => {
    [123, new Uint8Array, {}].forEach((val) => {
      expect(() => {
        Encryption.users.keyFromPassword(val);
      }).toThrowError(Match.Error, /password/i);
    });
  });
});
