export default function handler(req, res) {
    var AWS = require("aws-sdk");
    AWS.config.update({
      region: "us-west-1",
      accessKeyId: "accessKeyId",
      secretAccessKey: "secretAccessKey",
      endpoint: new AWS.Endpoint("http://localhost:8000"),

    });
    var docClient = new AWS.DynamoDB.DocumentClient();
    var table = "servicemasterdata";
    var serviceID = 1;//req.body.serviceID;//2;
    var customerID = req.body.customerID//3; 
    var serviceCategory = req.body.serviceCategory;//"Bloodtest"; 
    var serviceName= req.body.serviceName;//"CRP"; 
    var serviceCost;//req.body.serviceCost;
    var returnMessage = "";
    console.log("service category", req.body.serviceCategory);
    var params = {
      TableName: table,
      KeyConditionExpression: "#si >= :si and customer_id = :ci",
      ExpressionAttributeNames: {
        "#si": "service_id",
        "#sc": "serviceCategory",
        "#sn": "serviceName"
      },
      ExpressionAttributeValues: {
        ":si": serviceID,
        ":ci": customerID,
        ":sc": serviceCategory,
        ":sn": serviceName  
      },
      FilterExpression: "#sc =:sc AND #sn =:sn"
    };
    try {
      var returnMessage = "Fetching the information";
      docClient.query(params, function (err, data) {
        if (err) {
          console.error(
            "Unable to get records from table. Error JSON:",
            JSON.stringify(err, null, 2)
          );
        } else {
          console.log("Fetched information", JSON.stringify(data, null, 2));
          res.json(JSON.stringify(data, null, 2));
        }
      });
    } catch (err) {
      console.log("Error: ", err);
    }
    res.status(200);
  }
  