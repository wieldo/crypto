describe('Encryption', () => {
  describe('keyPair()', () => {
    it('should generate public and secret key', () => {
      const result = Encryption.keyPair();

      expect(result.publicKey).toEqual(jasmine.any(Uint8Array));
      expect(result.secretKey).toEqual(jasmine.any(Uint8Array));
    });
  });

  describe('random()', () => {
    // pass

    it('should return 24 length Uint8Array by default', () => {
      const result = Encryption.random();

      expect(result).toEqual(jasmine.any(Uint8Array));
      expect(result.length).toEqual(24);
    });

    it('should return 32 length Uint8Array', () => {
      const result = Encryption.random(32);

      expect(result).toEqual(jasmine.any(Uint8Array));
      expect(result.length).toEqual(32);
    });

    // fail

    it('should fail on string values', () => {
      expect(() => {
        Encryption.random('test');
      }).toThrowError(Match.Error);
    });

    it('should fail on float values', () => {
      expect(() => {
        Encryption.random(1.5);
      }).toThrowError(Match.Error);
    });

    it('should fail on lower then zero integers', () => {
      expect(() => {
        Encryption.random(-3);
      }).toThrowError(Match.Error);
    });
  });

  describe('nonce()', () => {
    it('should call Encryption.random(24)', () => {
      const spy = spyOn(Encryption, 'random').and.returnValue('test');
      const result = Encryption.nonce();

      expect(spy).toHaveBeenCalledWith(24);
      expect(result).toEqual('test');
    });
  });

  describe('key()', () => {
    it('should call Encryption.random(32)', () => {
      const spy = spyOn(Encryption, 'random').and.returnValue('test');
      const result = Encryption.key();

      expect(spy).toHaveBeenCalledWith(32);
      expect(result).toEqual('test');
    });
  });

  describe('encode()', () => {
    it('should convert object', () => {
      const obj = {
        test: 12
      };
      const spyJson = spyOn(JSON, 'stringify').and.returnValue('foo');
      const spyDec = spyOn(nacl.util, 'decodeUTF8').and.returnValue('bar');
      const result = Encryption.encode(obj);

      expect(spyJson).toHaveBeenCalledWith(obj);
      expect(spyDec).toHaveBeenCalledWith('foo');
      expect(result).toEqual('bar');
    });

    it('shoudl convert string', () => {
      const message = 'test';
      const spyJson = spyOn(JSON, 'stringify').and.returnValue('foo');
      const spyDec = spyOn(nacl.util, 'decodeUTF8').and.returnValue('bar');
      const result = Encryption.encode(message);

      expect(spyJson).not.toHaveBeenCalled();
      expect(spyDec).toHaveBeenCalledWith(message);
      expect(result).toEqual('bar');
    });

    it('should not convert Uint8Array', () => {
      const obj = new Uint8Array();
      expect(Encryption.encode(obj)).toBe(obj);
    });
  });

  describe('decode()', () => {
    it('should fail on non Uint8Array', () => {
      expect(() => {
        Encryption.decode('test');
      }).toThrowError(Match.Error, /message/i);
    });

    it('should convert object', () => {
      const obj = {
        foo: 'bar'
      };
      const encoded = Encryption.encode(obj);
      const result = Encryption.decode(encoded);

      expect(result).toEqual(obj);
    });

    it('should convert string', () => {
      const message = 'test';
      const encoded = Encryption.encode(message);
      const result = Encryption.decode(encoded, false);

      expect(result).toEqual(message);
    });
  });

  describe('symEncrypt', () => {
    const message = {
      foo: 'bar'
    };

    it('should use nacl.secretbox', () => {
      const spySec = spyOn(nacl, 'secretbox').and.returnValue('test');
      const spyEnc = spyOn(Encryption, 'encode').and.returnValue('test');
      const nonce = Encryption.nonce();
      const key = Encryption.key();
      const result = Encryption.symEncrypt(message, nonce, key);

      expect(result).toEqual('test');
      expect(spyEnc).toHaveBeenCalledWith(message);
      expect(spySec).toHaveBeenCalledWith('test', nonce, key);
    });

    // fail

    it('should fail on missing message', () => {
      expect(() => {
        Encryption.symEncrypt();
      }).toThrowError(Match.Error, /message/i);
    });

    it('should fail on missing nonce', () => {
      expect(() => {
        Encryption.symEncrypt(message);
      }).toThrowError(Match.Error, /nonce/i);
    });

    it('should fail on non Uint8Array nonce', () => {
      expect(() => {
        Encryption.symEncrypt(message, 'test');
      }).toThrowError(Match.Error, /nonce/i);
    });

    it('should fail on missing key', () => {
      expect(() => {
        Encryption.symEncrypt(message, new Uint8Array);
      }).toThrowError(Match.Error, /key/i);
    });

    it('should fail on non Uint8Array key', () => {
      expect(() => {
        Encryption.symEncrypt(message, new Uint8Array, 'test');
      }).toThrowError(Match.Error, /key/i);
    });
  });

  describe('symDecrypt', () => {
    it('should use nacl.secretbox.open', () => {
      const spy = spyOn(nacl.secretbox, 'open').and.returnValue('test');
      const spyDec = spyOn(Encryption, 'decode').and.returnValue('test');
      const message = Encryption.encode({
        foo: 'bar'
      });
      const nonce = Encryption.nonce();
      const key = Encryption.key();
      const result = Encryption.symDecrypt(message, nonce, key);

      expect(result).toEqual('test');
      expect(spy).toHaveBeenCalledWith(message, nonce, key);
      expect(spyDec).toHaveBeenCalledWith('test');
    });

    // fail

    it('should fail on missing message', () => {
      expect(() => {
        Encryption.symDecrypt();
      }).toThrowError(Match.Error, /message/i);
    });

    it('should fail on missing nonce', () => {
      expect(() => {
        Encryption.symDecrypt(new Uint8Array);
      }).toThrowError(Match.Error, /nonce/i);
    });

    it('should fail on non Uint8Array nonce', () => {
      expect(() => {
        Encryption.symDecrypt(new Uint8Array, 'test');
      }).toThrowError(Match.Error, /nonce/i);
    });

    it('should fail on missing key', () => {
      expect(() => {
        Encryption.symDecrypt(new Uint8Array, new Uint8Array);
      }).toThrowError(Match.Error, /key/i);
    });

    it('should fail on non Uint8Array key', () => {
      expect(() => {
        Encryption.symDecrypt(new Uint8Array, new Uint8Array, 'test');
      }).toThrowError(Match.Error, /key/i);
    });
  });

  describe('symEncrypt and symDecrypt', () => {
    const message = {
      foo: 'bar'
    };
    const nonce = Encryption.nonce();
    const key = Encryption.key();
    let encrypted;
    let decrypted;

    beforeEach(() => {
      encrypted = Encryption.symEncrypt(message, nonce, key);
      decrypted = Encryption.symDecrypt(encrypted, nonce, key);
    });

    it('should encrypt message', () => {
      expect(encrypted).toEqual(jasmine.any(Uint8Array));
    });

    it('should decrypt message', () => {
      expect(decrypted).toEqual(message);
    });
  });

  describe('asymEncrypt', () => {
    it('should use nacl.box', () => {
      const spy = spyOn(nacl, 'box').and.returnValue('test');
      const spyEnc = spyOn(Encryption, 'encode').and.returnValue('test');
      const message = {
        foo: 'bar'
      };
      const nonce = Encryption.nonce();
      const keyPair = Encryption.keyPair();
      const result = Encryption.asymEncrypt(message, nonce, keyPair.publicKey, keyPair.secretKey);

      expect(result).toEqual('test');
      expect(spy).toHaveBeenCalledWith('test', nonce, keyPair.publicKey, keyPair.secretKey);
      expect(spyEnc).toHaveBeenCalledWith(message);
    });

    // fail

    // Encryption.asymEncrypt( X )
    it('should fail on missing message', () => {
      expect(() => {
        Encryption.asymEncrypt();
      }).toThrowError(Match.Error, /message/i);
    });

    // Encryption.asymEncrypt( + , X )
    it('should fail on missing nonce', () => {
      expect(() => {
        Encryption.asymEncrypt('test');
      }).toThrowError(Match.Error, /nonce/i);
    });

    // Encryption.asymEncrypt( + , X )
    it('should fail on non Uint8Array nonce', () => {
      expect(() => {
        Encryption.asymEncrypt('test', 'test');
      }).toThrowError(Match.Error, /nonce/i);
    });

    // Encryption.asymEncrypt( + , + , X )
    it('should fail on missing public key', () => {
      expect(() => {
        Encryption.asymEncrypt('test', new Uint8Array);
      }).toThrowError(Match.Error, /key/i);
    });

    // Encryption.asymEncrypt( + , + , X )
    it('should fail on non Uint8Array public key', () => {
      expect(() => {
        Encryption.asymEncrypt('test', new Uint8Array, 'test');
      }).toThrowError(Match.Error, /key/i);
    });

    // Encryption.asymEncrypt( + , + , + , X )
    it('should fail on missing secret key', () => {
      expect(() => {
        Encryption.asymEncrypt('test', new Uint8Array, new Uint8Array);
      }).toThrowError(Match.Error, /key/i);
    });

    // Encryption.asymEncrypt( + , + , + , X )
    it('should fail on non Uint8Array secret key', () => {
      expect(() => {
        Encryption.asymEncrypt('test', new Uint8Array, new Uint8Array, 'test');
      }).toThrowError(Match.Error, /key/i);
    });
  });

  describe('asymDecrypt', () => {
    it('should use nacl.box.open', () => {
      const spy = spyOn(nacl.box, 'open').and.returnValue('foo');
      const spyDec = spyOn(Encryption, 'decode').and.returnValue('bar');
      const message = Encryption.encode({
        foo: 'bar'
      });
      const nonce = Encryption.nonce();
      const keyPair = Encryption.keyPair();
      const result = Encryption.asymDecrypt(message, nonce, keyPair.publicKey, keyPair.secretKey);

      expect(result).toEqual('bar');
      expect(spy).toHaveBeenCalledWith(message, nonce, keyPair.publicKey, keyPair.secretKey);
      expect(spyDec).toHaveBeenCalledWith('foo');
    });

    // fail

    // Encryption.asymEncrypt( X )
    it('should fail on missing message', () => {
      expect(() => {
        Encryption.asymEncrypt();
      }).toThrowError(Match.Error, /message/i);
    });

    // Encryption.asymEncrypt( + , X )
    it('should fail on missing nonce', () => {
      expect(() => {
        Encryption.asymEncrypt(new Uint8Array);
      }).toThrowError(Match.Error, /nonce/i);
    });

    // Encryption.asymEncrypt( + , X )
    it('should fail on non Uint8Array nonce', () => {
      expect(() => {
        Encryption.asymEncrypt(new Uint8Array, 'test');
      }).toThrowError(Match.Error, /nonce/i);
    });

    // Encryption.asymEncrypt( + , + , X )
    it('should fail on missing public key', () => {
      expect(() => {
        Encryption.asymEncrypt(new Uint8Array, new Uint8Array);
      }).toThrowError(Match.Error, /key/i);
    });

    // Encryption.asymEncrypt( + , + , X )
    it('should fail on non Uint8Array public key', () => {
      expect(() => {
        Encryption.asymEncrypt(new Uint8Array, new Uint8Array, 'test');
      }).toThrowError(Match.Error, /key/i);
    });

    // Encryption.asymEncrypt( + , + , + , X )
    it('should fail on missing secret key', () => {
      expect(() => {
        Encryption.asymEncrypt(new Uint8Array, new Uint8Array, new Uint8Array);
      }).toThrowError(Match.Error, /key/i);
    });

    // Encryption.asymEncrypt( + , + , + , X )
    it('should fail on non Uint8Array secret key', () => {
      expect(() => {
        Encryption.asymEncrypt(new Uint8Array, new Uint8Array, new Uint8Array, 'test');
      }).toThrowError(Match.Error, /key/i);
    });
  });

  describe('asymEncrypt and asymDecrypt', () => {
    const message = {
      foo: 'bar'
    };
    const nonce = Encryption.nonce();
    const my = Encryption.keyPair();
    const their = Encryption.keyPair();
    let encrypted;
    let decrypted;

    beforeEach(() => {
      encrypted = Encryption.asymEncrypt(message, nonce, their.publicKey, my.secretKey);
      decrypted = Encryption.asymDecrypt(encrypted, nonce, my.publicKey, their.secretKey);
    });

    it('should encrypt message', () => {
      expect(encrypted).toEqual(jasmine.any(Uint8Array));
    });

    it('should decrypt message', () => {
      expect(decrypted).toEqual(message);
    });
  });
});
