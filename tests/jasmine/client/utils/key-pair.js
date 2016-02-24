describe('utils.keyPair()', () => {
  it('should generate public and secret key', () => {
    const result = Encryption.utils.keyPair();

    expect(result.publicKey).toEqual(jasmine.any(Uint8Array));
    expect(result.secretKey).toEqual(jasmine.any(Uint8Array));
  });
});
