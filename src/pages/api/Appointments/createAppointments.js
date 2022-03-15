/**
 * Copyright 2022 GyneSono Technologies or its affiliates. All Rights Reserved.
 *
 * This file is licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License. A copy of
 * the License is located at
 *
 * 
 *
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
*/
export default function handler(req, res) {
    var AWS = require("aws-sdk");

    AWS.config.update({
        region: 'us-west-1',
        accessKeyId: 'accessKeyId',
        secretAccessKey: 'secretAccessKey',
        endpoint: new AWS.Endpoint('http://localhost:8000'),
    });
    var dynamodb = new AWS.DynamoDB();
    var returnMessage = "";
    var params = {
        TableName : "Appointments",
        KeySchema: [       
            { AttributeName: "customer_id", KeyType: "HASH"},  //Partition key
            { AttributeName: "appointment_id", KeyType: "RANGE " }  //Sort key - RANGE
            
        ],
        LocalSecondaryIndexes: [
            {
                IndexName: "AppointmentDateTimeIndex",
                KeySchema: [
                    { AttributeName: "customer_id", KeyType: "HASH"},  //Partition key
                    { AttributeName: "appointment_date", KeyType: "RANGE" },  //Sort key

                ],
                Projection: {
                    ProjectionType: "ALL"
                }
            }
        ],
        AttributeDefinitions: [       
            { AttributeName: "customer_id", AttributeType: "N" },
            { AttributeName: "appointment_id", AttributeType: "N" },
            { AttributeName: "appointment_date", AttributeType: "S" }
            

        ],
        ProvisionedThroughput: {       
            ReadCapacityUnits: 10, 
            WriteCapacityUnits: 10
        }
    };
    try{
        dynamodb.createTable(params, function(err, data) {
       if (err) {
             console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
         } else {
             console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
         }
     });
        var returnMessage = "Table Created";
        } catch(err){
            console.log("Error: ", err)
        }

        res.status(200).json({ returnMessage })

    }




