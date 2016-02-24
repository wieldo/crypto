describe('utils.nonce()', () => {
  it('should call random(24)', () => {
    const spy = spyOn(Crypto.utils, 'random').and.returnValue('test');
    const result = Crypto.utils.nonce();

    expect(spy).toHaveBeenCalledWith(24);
    expect(result).toEqual('test');
  });
});
