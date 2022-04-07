
db.createCollection( 'city', {validator: {$jsonSchema: {bsonType: 'object',title:'city',required: [         'name'],properties: {name: {bsonType: 'string'}}         }      }});  