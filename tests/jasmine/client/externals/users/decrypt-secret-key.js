describe('Users.decryptSecretKey()', () => {
  const password = 'foobar';
  const encrypted = Encryption.users.createAndEncrypt(password);

  it('should use generate key from password', () => {
    const spy = spyOn(Encryption.users, 'keyFromPassword').and.callThrough();

    Encryption.users.decryptSecretKey(
      encrypted.secretKey, encrypted.nonce, password
    );

    expect(spy).toHaveBeenCalledWith(password);
  });

  it('should decrypt secretKey', () => {
    const result = Encryption.users.decryptSecretKey(
      encrypted.secretKey, encrypted.nonce, password
    );

    expect(result).toEqual(jasmine.any(Uint8Array));
    expect(result.length).toEqual(32);
  });

  // fail

  // encSecretKey
  it('should fail on missing encrypted secretKey', () => {
    expect(() => {
      Encryption.users.decryptSecretKey();
    }).toThrowError(Match.Error, /encSecretKey/i);
  });

  it('should fail on non Uint8Array encrypted secretKey', () => {
    expect(() => {
      Encryption.users.decryptSecretKey('test');
    }).toThrowError(Match.Error, /encSecretKey/i);
  });

  // nonce
  it('should fail on missing nonce', () => {
    expect(() => {
      Encryption.users.decryptSecretKey(encrypted.secretKey);
    }).toThrowError(Match.Error, /nonce/i);
  });

  it('should fail on non Uint8Array nonce', () => {
    expect(() => {
      Encryption.users.decryptSecretKey(encrypted.secretKey, 'test');
    }).toThrowError(Match.Error, /nonce/i);
  });

  // password
  it('should fail on missing password', () => {
    expect(() => {
      Encryption.users.decryptSecretKey(encrypted.secretKey, encrypted.nonce);
    }).toThrowError(Match.Error, /password/i);
  });

  it('should fail on non String password', () => {
    expect(() => {
      Encryption.users.decryptSecretKey(
        encrypted.secretKey, encrypted.nonce, new Uint8Array
      );
    }).toThrowError(Match.Error, /password/i);
  });
});
