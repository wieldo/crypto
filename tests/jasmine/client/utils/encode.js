describe('Utils.encode()', () => {
  it('should convert object', () => {
    const obj = {
      test: 12
    };
    const spyJson = spyOn(JSON, 'stringify').and.returnValue('foo');
    const spyDec = spyOn(nacl.util, 'decodeUTF8').and.returnValue('bar');
    const result = Encryption.utils.encode(obj);

    expect(spyJson).toHaveBeenCalledWith(obj);
    expect(spyDec).toHaveBeenCalledWith('foo');
    expect(result).toEqual('bar');
  });

  it('shoudl convert string', () => {
    const message = 'test';
    const spyJson = spyOn(JSON, 'stringify').and.returnValue('foo');
    const spyDec = spyOn(nacl.util, 'decodeUTF8').and.returnValue('bar');
    const result = Encryption.utils.encode(message);

    expect(spyJson).not.toHaveBeenCalled();
    expect(spyDec).toHaveBeenCalledWith(message);
    expect(result).toEqual('bar');
  });

  it('should not convert Uint8Array', () => {
    const obj = new Uint8Array();
    expect(Encryption.utils.encode(obj)).toBe(obj);
  });
});
