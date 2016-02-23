describe('Encryption', () => {
  it('should contain Utils', () => {
    expect(Encryption.utils).toBeDefined();
  });

  it('should contain Sym', () => {
    expect(Encryption.sym).toBeDefined();
  });

  it('should contain Asym', () => {
    expect(Encryption.asym).toBeDefined();
  });
});
