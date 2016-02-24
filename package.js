Package.describe({
  name: 'wieldo:crypto',
  version: '0.1.0',
  summary: 'Abstraction layer for Tweetnacl',
  git: 'https://github.com/wieldo/crypto.git'
});

Npm.depends({
  tweetnacl: '0.14.0',
  'tweetnacl-util': '0.13.3'
});

Package.onUse(function cryptoOnUse(api) {
  api.versionsFrom('METEOR@1.2.1');

  api.use([
    'ecmascript',
    'stevezhu:lodash@4.5.0',
    'check@1.1.0'
  ]);

  api.imply([
    'stevezhu:lodash@4.5.0',
    'check@1.1.0'
  ]);

  api.addFiles([
    '.npm/package/node_modules/tweetnacl/nacl-fast.js',
    '.npm/package/node_modules/tweetnacl-util/nacl-util.js'
  ], 'client');

  api.addFiles([
    'index',
    'utils',
    'sym',
    'asym',
    'export'
  ].map(function(file) {
    return 'src/' + file + '.js';
  }), 'client');

  api.export([
    'Crypto'
  ], 'client');
});

Package.onTest(function cryptoOnTest(api) {
  api.use([
    'ecmascript',
    'wieldo:crypto',
    'sanjo:jasmine@0.21.0',
    'velocity:helpers@0.5.0',
    'velocity:html-reporter@0.9.1'
  ]);

  api.addFiles([
    'export',
    // utils
    'utils/key',
    'utils/key-pair',
    'utils/nonce',
    'utils/random',
    'utils/encode',
    'utils/decode',
    // sym
    'sym/encrypt',
    'sym/encrypt-string',
    'sym/encrypt-object',
    'sym/decrypt',
    'sym/decrypt-string',
    'sym/decrypt-object',
    // asym
    'asym/encrypt',
    'asym/encrypt-string',
    'asym/encrypt-object',
    'asym/decrypt',
    'asym/decrypt-string',
    'asym/decrypt-object'
  ].map(function(file) {
    return 'tests/jasmine/client/' + file + '.js';
  }), 'client');
});
