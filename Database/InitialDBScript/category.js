
db.createCollection( 'category', {validator: {$jsonSchema: {bsonType: 'object',title:'category',required: [         'name'],properties: {name: {bsonType: 'string'}}         }      }});  