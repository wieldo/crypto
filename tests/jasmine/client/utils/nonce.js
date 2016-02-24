describe('utils.nonce()', () => {
  it('should call random(24)', () => {
    const spy = spyOn(Encryption.utils, 'random').and.returnValue('test');
    const result = Encryption.utils.nonce();

    expect(spy).toHaveBeenCalledWith(24);
    expect(result).toEqual('test');
  });
});
