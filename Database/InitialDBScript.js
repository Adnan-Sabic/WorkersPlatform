db.createCollection( 'user', 
{validator: {$jsonSchema: {bsonType: 'object',title:'user',required: ['role', 'email', 'password'], properties: {role: {enum: 'NORMAL', 'ADMIN'}, firstName: {bsonType: 'string'},lastName: {bsonType: 'string'},contactNumber: {bsonType: 'string'},email: {bsonType: 'string'},password: {bsonType: 'string'},about: {bsonType: 'string'},image: {bsonType: 'string'},address: {bsonType: 'object',
title:'address',properties: {cityId: {bsonType: 'objectId'},street: {bsonType: 'string'}}}}}},
capped:true,
autoIndexId:true
});  
db.createCollection( 'notification', {validator: {$jsonSchema: {bsonType: 'object',title:'notification',required: ['userId', 'text', 'date', 'seen'],properties: {userId: {bsonType: 'objectId'},text: {bsonType: 'string'},date: {bsonType: 'timestamp'},seen: {bsonType: 'bool'}}}}});  
db.createCollection( 'message', {validator: {$jsonSchema: {bsonType: 'object',title:'message',required: ['senderId', 'receiverId', 'sentDate', 'text', 'seen'],properties: {senderId: {bsonType: 'objectId'},receiverId: {bsonType: 'objectId'},sentDate: {bsonType: 'timestamp'},text: {bsonType: 'string'},seen: {bsonType: 'bool'}}}}});  
db.createCollection( 'advertisement', {validator: {$jsonSchema: {bsonType: 'object',title:'advertisement',required: [         'userId',          'categoryId',          'publishingDate',          'name',          'images'],properties: {userId: {bsonType: 'objectId'},categoryId: {bsonType: 'objectId'},publishingDate: {bsonType: 'timestamp'},name: {bsonType: 'string'},description: {bsonType: 'string'},images: {bsonType: 'array',items: {bsonType: 'string'}},price: {bsonType: 'decimal'}}         }      }});  
db.createCollection( 'city', {validator: {$jsonSchema: {bsonType: 'object',title:'city',required: [         'name'],properties: {name: {bsonType: 'string'}}         }      }});  
db.createCollection( 'category', {validator: {$jsonSchema: {bsonType: 'object',title:'category',required: [         'name'],properties: {name: {bsonType: 'string'}}         }      }});  

/* Line 'address-city' */


/* Reference 'category_advertisement' */


/* Reference 'user_message' */


/* Reference 'user_message' */


/* Reference 'user_notice' */


/* Reference 'user_notification' */


//Pretty version

db.createCollection('user', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            title: 'user',
            required: ['role', 'email', 'password'],
            properties: {
                role: {
                    enum: 'NORMAL',
                    'ADMIN'
                },
                firstName: {
                    bsonType: 'string'
                },
                lastName: {
                    bsonType: 'string'
                },
                contactNumber: {
                    bsonType: 'string'
                },
                email: {
                    bsonType: 'string'
                },
                password: {
                    bsonType: 'string'
                },
                about: {
                    bsonType: 'string'
                },
                image: {
                    bsonType: 'string'
                },
                address: {
                    bsonType: 'object',
                    title: 'address',
                    properties: {
                        cityId: {
                            bsonType: 'objectId'
                        },
                        street: {
                            bsonType: 'string'
                        }
                    }
                }
            }
        }
    },
    capped: true,
    autoIndexId: true
});
db.createCollection('notification', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            title: 'notification',
            required: ['userId', 'text', 'date', 'seen'],
            properties: {
                userId: {
                    bsonType: 'objectId'
                },
                text: {
                    bsonType: 'string'
                },
                date: {
                    bsonType: 'timestamp'
                },
                seen: {
                    bsonType: 'bool'
                }
            }
        }
    }
});
db.createCollection('message', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            title: 'message',
            required: ['senderId', 'receiverId', 'sentDate', 'text', 'seen'],
            properties: {
                senderId: {
                    bsonType: 'objectId'
                },
                receiverId: {
                    bsonType: 'objectId'
                },
                sentDate: {
                    bsonType: 'timestamp'
                },
                text: {
                    bsonType: 'string'
                },
                seen: {
                    bsonType: 'bool'
                }
            }
        }
    }
});
db.createCollection('advertisement', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            title: 'advertisement',
            required: ['userId', 'categoryId', 'publishingDate', 'name', 'images'],
            properties: {
                userId: {
                    bsonType: 'objectId'
                },
                categoryId: {
                    bsonType: 'objectId'
                },
                publishingDate: {
                    bsonType: 'timestamp'
                },
                name: {
                    bsonType: 'string'
                },
                description: {
                    bsonType: 'string'
                },
                images: {
                    bsonType: 'array',
                    items: {
                        bsonType: 'string'
                    }
                },
                price: {
                    bsonType: 'decimal'
                }
            }
        }
    }
});
db.createCollection('city', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            title: 'city',
            required: ['name'],
            properties: {
                name: {
                    bsonType: 'string'
                }
            }
        }
    }
});
db.createCollection('category', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            title: 'category',
            required: ['name'],
            properties: {
                name: {
                    bsonType: 'string'
                }
            }
        }
    }
});