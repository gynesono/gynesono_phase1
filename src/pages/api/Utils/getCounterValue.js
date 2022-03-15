/**
 * Comments
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
   
    var counterName =  "";//req.counterName;
    var customerId ; //req.customerID;

    //This api can be called by other API's by posting the data

    // counterName = "Appointments"
    // customerId = 3;
    if (req.method == 'POST') {
        counterName = req.body.counterName;
        customerId = req.body.customerID;
       
    }
    
    var tableName = "counter";
    var returnMessage;
    var counterValue;

    var params = {
        TableName: tableName,
        KeyConditionExpression: "#cn = :cn and customer_id = :ci",
        ExpressionAttributeNames:{
            "#cn": "counter_name"
        },
        ExpressionAttributeValues: {
            ":ci": customerId,
            ":cn" : counterName
         }
     
        };

    docClient.query(params, function(err, data) {
        if (err) {
                console.error("Unable to find appointments. Error JSON:", JSON.stringify(err, null, 2));
            } else 
            {
                console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
                //Sending the JSon object in the Response object
                data.Items.forEach(function(item) {
                    //name: 'John Doe'
                    counterValue = parseInt(item.counter_value);
                    counterValue = counterValue+1;
                    console.log("The current Counter Value: ",counterValue)
                    var params1 = {
                        TableName:tableName,
                        Key:{
                            "counter_name": counterName,
                            "customer_id": customerId
                        },
                        UpdateExpression: "set counter_value = :cv",
                        ExpressionAttributeValues:{
                            ":cv": counterValue
                            },
                        ReturnValues:"UPDATED_NEW"
                    };
                    returnMessage = "Updating the counter value...";
                    docClient.update(params1, function(err, data) {
                        if (err) {
                            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                        } else {
                            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
                        }
                    });
                });
                

                res.json(JSON.stringify(data, null, 2));   
                

                
                ////////        
            }
            //returnMessage = returnMessage + JSON.stringify(data, null, 2);

            //console.log(returnMessage);
        });

    res.status(200);
   
    
}