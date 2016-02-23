var files = {
  client: [
    'encryption.js'
  ]
};

var packages = [
  'ecmascript',
  // temp
  'anti:fake@0.4.1',
  'accounts-base',
  'stevezhu:lodash@4.5.0',
  //
  'mongo',
  'check',
  'aldeed:collection2@2.8.0',
  'aldeed:simple-schema@1.5.3',
  'dburles:collection-helpers@1.0.4',
];

var client = 'client';
var server = 'server';
var both = [client, server];

Npm.depends({
  tweetnacl: '0.14.0',
  'tweetnacl-util': '0.13.3'
});

Package.describe({
  name: 'wieldo:encryption',
  version: '0.0.1'
});

Package.onUse(function encryptionOnUse(api) {
  api.versionsFrom('METEOR@1.2.1');

  api.use(packages);
  api.imply(packages);

  api.addFiles([
    '.npm/package/node_modules/tweetnacl/nacl-fast.js',
    '.npm/package/node_modules/tweetnacl-util/nacl-util.js'
  ], client);

  api.addFiles(files.client.map(function(file) {
    return 'lib/client/' + file;
  }), client);

  api.export([
    'Encryption'
  ], client);
});

Package.onTest(function encryptionOnTest(api) {
  api.use([
    'ecmascript',
    'wieldo:encryption',
    'sanjo:jasmine@0.21.0',
    'velocity:meteor-stubs@1.1.1',
    'velocity:helpers@0.5.0',
    'velocity:html-reporter@0.9.1'
  ]);

  api.addFiles([
    'encryption.js'
  ].map(function(file) {
    return 'tests/jasmine/client/' + file;
  }), client);
});