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
    var docClient = new AWS.DynamoDB.DocumentClient();
    var tableName = "patientbilling";
    var bill_id = 7;
    var customer_id = 3;
    //var returnMessage = "";
    var params = {
            TableName: tableName,
            KeyConditionExpression: "#cid = :customer_id and bill_id = :bid",
            ExpressionAttributeNames:{
                "#cid": "customer_id"
            },
            ExpressionAttributeValues: {
                ":customer_id": customer_id,
                ":bid": bill_id
            }
        };
    try{
        var returnMessage = "Fetching the information";
        docClient.query(params, function(err, data) {
       if (err) {
             console.error("Unable to get records from table. Error JSON:", JSON.stringify(err, null, 2));
         } else {
             console.log("Fetched information", JSON.stringify(data, null, 2));
             res.json(JSON.stringify(data, null, 2))
         }        
     });
        } catch(err){
            console.log("Error: ", err)
        }
        res.status(200);  
}