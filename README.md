# wieldo:crypto
## Abstraction layer for Tweetnacl

```
meteor add wieldo:crypto
```

## API

### Utils

#### keyPair *()* : *Object*

Generates pair of keys: `publicKey` and `secretKey`

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
