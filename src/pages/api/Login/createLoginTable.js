var AWS = require("aws-sdk");

AWS.config.update({
    region: 'us-west-1',
    accessKeyId: 'accessKeyId',
    secretAccessKey: 'secretAccessKey',
    endpoint: new AWS.Endpoint('http://localhost:8000'),
});

var dynamodb = new AWS.DynamoDB();
//AWS.config.update({accessKeyId: "fakeMyKeyId", secretAccessKey: "fakeSecretAccessKey", region: "REGION"});

var params = {
    TableName : "login",
    KeySchema: [       
        { AttributeName: "customer_email", KeyType: "HASH"},  //Partition key
        { AttributeName: "user_name", KeyType: "RANGE" }  //Sort key
    ],
    LocalSecondaryIndexes: [
        {
            IndexName: "LoginCustomerIDIndex",
            KeySchema: [
                { AttributeName: "customer_email", KeyType: "HASH"},  //Partition key
                { AttributeName: "customer_id", KeyType: "RANGE" },  //Sort key

            ],
            Projection: {
                ProjectionType: "ALL"
            }
        }
    ],
    AttributeDefinitions: [       
        { AttributeName: "customer_id", AttributeType: "N" },
        { AttributeName: "user_name", AttributeType: "S" },
        { AttributeName: "customer_email", AttributeType: "S" },
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};
dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});