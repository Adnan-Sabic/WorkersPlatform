
db.createCollection( 'message', {validator: {$jsonSchema: {bsonType: 'object',title:'message',required: [         'senderId',          'receiverId',          'sentDate',          'text',          'seen'],properties: {senderId: {bsonType: 'objectId'},receiverId: {bsonType: 'objectId'},sentDate: {bsonType: 'timestamp'},text: {bsonType: 'string'},seen: {bsonType: 'bool'}}         }      }});  