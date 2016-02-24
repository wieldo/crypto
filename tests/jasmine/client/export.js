describe('Encryption', () => {
  it('should contain utils', () => {
    expect(Encryption.utils).toBeDefined();
  });

  it('should contain sym', () => {
    expect(Encryption.sym).toBeDefined();
  });

  it('should contain asym', () => {
    expect(Encryption.asym).toBeDefined();
  });
});
