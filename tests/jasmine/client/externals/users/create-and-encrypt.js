describe('users.createAndEncrypt()', () => {
  const password = 'foobar';

  it('should call keyFromPassword()', () => {
    const spy = spyOn(Encryption.users, 'keyFromPassword').and.callThrough();

    Encryption.users.createAndEncrypt(password);

    expect(spy).toHaveBeenCalledWith(password);
  });

  describe('result', () => {
    const result = Encryption.users.createAndEncrypt(password);

    it('should return 24 length nonce', () => {
      expect(result.nonce).toEqual(jasmine.any(Uint8Array));
      expect(result.nonce.length).toEqual(24);
    });

    it('should return 32 length publicKey', () => {
      expect(result.publicKey).toEqual(jasmine.any(Uint8Array));
      expect(result.publicKey.length).toEqual(32);
    });

    it('should return encrypted secretKey', () => {
      expect(result.secretKey).toEqual(jasmine.any(Uint8Array));
      expect(result.secretKey.length).toEqual(48);
    });

    it('should return decryptable secretKey', () => {
      const passwordKey = Encryption.users.keyFromPassword(password);
      const secretKey = Encryption.sym.decrypt(
        result.secretKey, result.nonce, passwordKey
      );

      expect(secretKey).toEqual(jasmine.any(Uint8Array));
      expect(secretKey.length).toEqual(32);
    });
  });
});
