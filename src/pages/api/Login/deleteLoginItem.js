    var AWS = require("aws-sdk");
    AWS.config.update({
        region: 'us-west-1',
        accessKeyId: 'accessKeyId',
        secretAccessKey: 'secretAccessKey',
        endpoint: new AWS.Endpoint('http://localhost:8000'),
    });
    var docClient = new AWS.DynamoDB.DocumentClient();
        var table = "login";
        var customer_id = 3;
        var user_name = "reception_gyne2";
        var password = "gyne@12345";
        var email = "gynesono.official@gmail.com";
        var role = "doctor";
        var returnMessage = "";
        var params = {
            TableName:table,
            Key:{
                "user_name": user_name,
                "customer_email" : email
                 },
                 ConditionExpression:"customer_id = :cid",
                 ExpressionAttributeValues: {
                    ":cid": customer_id
                }
        };  
        try{
            console.log("Login...");
            docClient.delete(params, function(err, data) {
                if (err) {
                    console.error("Unable to delete item. Error JSON", JSON.stringify(err, null, 2));
                } else {
                    console.log("DeleteItem succeeded: ", JSON.stringify(data, null, 2));
                }
            }); 
            var returnMessage = "Login Successfully : ";
            //res.status(200).json({ returnMessage })
            } catch(err){
                console.log("Error: ", err)
            }
