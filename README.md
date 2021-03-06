# wieldo:crypto
## Abstraction layer for Tweetnacl

```
meteor add wieldo:crypto
```

## Dependencies

```
tweetnacl 0.14.0
tweetnacl-util 0.13.3
```

## API

### Utils - `Crypto.utils`

#### keyPair *()* : *Object*

Generates pair of keys: `publicKey` and `secretKey`

```javascript
const keyPair = Crypto.utils.keyPair();
```

#### nonce *()* : *Uint8Array*

Generates random 24 length nonce

#### key *()* : *Uint8Array*

Generates random 32 length key

#### random *()* : *Uint8Array*

Generates random n-length bytes

- *n* : *Integer* - length

#### encode *()* : *Uint8Array*

Stringifies an object or uses string directly and converts it to Uint8Array

- *message* : Object | Uint8Array | String - message to encode


#### decode *()* : *Object | String*

Decodes a messages and coverts it to JSON object or String

- *message* : *Uint8Array* encoded message

---

### Symetrically - `Crypto.sym`

#### encrypt *()* : *Uint8Array*

Encrypts message symetrically

- **message** : *Uint8Array* - message you want to encrypt
- **nonce** : *Uint8Array*
- **key** : *Uint8Array*

```javascript
Crypto.sym.encrypt(message, nonce, key);
```

#### encryptString *()* : *Uint8Array*

Encrypts strings symetrically

- **message** : *String* - message you want to encrypt
- **nonce** : *Uint8Array*
- **key** : *Uint8Array*

#### encryptObject *()* : *Uint8Array*

Encrypts objects symetrically

- **message** : *object* - message you want to encrypt
- **nonce** : *Uint8Array*
- **key** : *Uint8Array*

#### decrypt *()* : *Uint8Array | String | Object*

Decrypts message symetrically

- **message** : *Uint8Array* - encrypted message
- **nonce** : *Uint8Array*
- **key** : *Uint8Array*

#### decryptString *()* : *String*

Decrypts strings symetrically

- **message** : *Uint8Array* - encrypted message
- **nonce** : *Uint8Array*
- **key** : *Uint8Array*

#### decryptObject *()* : *Object*

Decrypts objects symetrically

- **message** : *Uint8Array* - encrypted message
- **nonce** : *Uint8Array*
- **key** : *Uint8Array*

---

### Asymetrically - `Crypto.asym`

#### encrypt *()* : *Uint8Array*

Encrypts message asymetrically

- **message** : *Uint8Array* - message to encrypt
- **nonce** : *Uint8Array*
- **publicKey** : *Uint8Array* - their public key
- **secretKey** : *Uint8Array* - your secret key

```javascript
Crypto.asym.encrypt(message, nonce, publicKey, secretKey);
```

#### encryptString *()* : *Uint8Array*

Encrypts strings asymetrically

- **message** : *String* - message to encrypt
- **nonce** : *Uint8Array*
- **publicKey** : *Uint8Array* - their public key
- **secretKey** : *Uint8Array* - your secret key

#### encryptObject *()* : *Uint8Array*

Encrypts objects asymetrically

- **message** : *Object* - message to encrypt
- **nonce** : *Uint8Array*
- **publicKey** : *Uint8Array* - their public key
- **secretKey** : *Uint8Array* - your secret key

#### decrypt *()* : *Uint8Array | String | Object*

Decrypts message asymetrically

- **message** : *Uint8Array* - encrypted message
- **nonce** : *Uint8Array*
- **publicKey** : *Uint8Array* - their public key
- **secretKey** : *Uint8Array* - your secret key

#### decryptString *()* : *String*

Decrypts strings asymetrically

- **message** : *Uint8Array* - encrypted message
- **nonce** : *Uint8Array*
- **publicKey** : *Uint8Array* - their public key
- **secretKey** : *Uint8Array* - your secret key

#### decryptObject *()* : *Object*

Decrypts objects asymetrically

- **message** : *Uint8Array* - encrypted message
- **nonce** : *Uint8Array*
- **publicKey** : *Uint8Array* - their public key
- **secretKey** : *Uint8Array* - your secret key

## Donate
If you want to help our developers create software donate please.  

[![](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=V98VLPSG6NQA6)
