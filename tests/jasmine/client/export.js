describe('Crypto', () => {
  it('should contain utils', () => {
    expect(Crypto.utils).toBeDefined();
  });

  it('should contain sym', () => {
    expect(Crypto.sym).toBeDefined();
  });

  it('should contain asym', () => {
    expect(Crypto.asym).toBeDefined();
  });
});
