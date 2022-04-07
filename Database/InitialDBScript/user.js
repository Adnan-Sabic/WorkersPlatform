
db.createCollection( 'user', {validator: {$jsonSchema: {bsonType: 'object',title:'user',required: [         'role',          'email',          'password'],properties: {role: {enum: 'NORMAL', 'ADMIN'},firstName: {bsonType: 'string'},lastName: {bsonType: 'string'},contactNumber: {bsonType: 'string'},email: {bsonType: 'string'},password: {bsonType: 'string'},about: {bsonType: 'string'},image: {bsonType: 'string'},address: {bsonType: 'object',
title:'address',properties: {cityId: {bsonType: 'objectId'},street: {bsonType: 'string'}}}}         }      },
capped:true,
autoIndexId:true
});  