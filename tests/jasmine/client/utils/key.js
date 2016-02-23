describe('Utils.key()', () => {
  it('should call random(32)', () => {
    const spy = spyOn(Encryption.utils, 'random').and.returnValue('test');
    const result = Encryption.utils.key();

    expect(spy).toHaveBeenCalledWith(32);
    expect(result).toEqual('test');
  });
});
