describe('utils.key()', () => {
  it('should call random(32)', () => {
    const spy = spyOn(Crypto.utils, 'random').and.returnValue('test');
    const result = Crypto.utils.key();

    expect(spy).toHaveBeenCalledWith(32);
    expect(result).toEqual('test');
  });
});
