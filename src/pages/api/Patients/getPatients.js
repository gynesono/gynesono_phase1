/* *
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

    var tableName = "Patients";
    var PatientID = 1;
    var customerID=req.body.customerID;

    

    var returnMessage = "";

// Do not remove this line - shows how filter expression can be used to further
// filter the query. So the Key Condition expression used partion key and sort key
//and then one can filter the expression
//FilterExpression: "#dType = :deptType AND #ts > :daysPrior"    
var params1 = {
    TableName: tableName,
    KeyConditionExpression: "#cn = :ci and Patient_id >= :ctr",
    ExpressionAttributeNames:{
        "#cn": "customer_id"
    },
    ExpressionAttributeValues: {
        ":ci": customerID,
        ":ctr": PatientID
     }
 
    };
    
        
    try{
        var returnMessage = "Fetching the information";
        docClient.query(params1, function(err, data) {
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