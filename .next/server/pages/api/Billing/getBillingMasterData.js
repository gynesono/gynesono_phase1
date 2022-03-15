"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/Billing/getBillingMasterData";
exports.ids = ["pages/api/Billing/getBillingMasterData"];
exports.modules = {

/***/ "aws-sdk":
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("aws-sdk");

/***/ }),

/***/ "(api)/./src/pages/api/Billing/getBillingMasterData.js":
/*!*******************************************************!*\
  !*** ./src/pages/api/Billing/getBillingMasterData.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\nfunction handler(req, res) {\n    var AWS = __webpack_require__(/*! aws-sdk */ \"aws-sdk\");\n    AWS.config.update({\n        region: \"us-west-1\",\n        accessKeyId: \"accessKeyId\",\n        secretAccessKey: \"secretAccessKey\",\n        endpoint: new AWS.Endpoint(\"http://localhost:8000\")\n    });\n    var docClient = new AWS.DynamoDB.DocumentClient();\n    var table = \"billingmasterdata\";\n    var serviceID = 0; //req.body.serviceID;//2;\n    var customerID = req.body.customerID //3; \n    ;\n    var serviceCategory = req.body.serviceCategory; //\"Bloodtest\"; \n    var serviceName; //req.body.serviceName;//\"CRP\"; \n    var serviceCost; //req.body.serviceCost;\n    var returnMessage = \"\";\n    console.log(\"service category\", req.body.serviceCategory);\n    var params = {\n        TableName: table,\n        KeyConditionExpression: \"#si >= :si and customer_id = :ci\",\n        ExpressionAttributeNames: {\n            \"#si\": \"service_id\",\n            \"#sc\": \"service_category\"\n        },\n        ExpressionAttributeValues: {\n            \":si\": serviceID,\n            \":ci\": customerID,\n            \":sc\": serviceCategory\n        },\n        FilterExpression: \"#sc =:sc\"\n    };\n    try {\n        var returnMessage = \"Fetching the information\";\n        docClient.query(params, function(err, data) {\n            if (err) {\n                console.error(\"Unable to get records from table. Error JSON:\", JSON.stringify(err, null, 2));\n            } else {\n                console.log(\"Fetched information\", JSON.stringify(data, null, 2));\n                res.json(JSON.stringify(data, null, 2));\n            }\n        });\n    } catch (err) {\n        console.log(\"Error: \", err);\n    }\n    res.status(200);\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL0JpbGxpbmcvZ2V0QmlsbGluZ01hc3RlckRhdGEuanMuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFlLFFBQVEsQ0FBQ0EsT0FBTyxDQUFDQyxHQUFHLEVBQUVDLEdBQUcsRUFBRSxDQUFDO0lBQ3pDLEdBQUcsQ0FBQ0MsR0FBRyxHQUFHQyxtQkFBTyxDQUFDLHdCQUFTO0lBQzNCRCxHQUFHLENBQUNFLE1BQU0sQ0FBQ0MsTUFBTSxDQUFDLENBQUM7UUFDakJDLE1BQU0sRUFBRSxDQUFXO1FBQ25CQyxXQUFXLEVBQUUsQ0FBYTtRQUMxQkMsZUFBZSxFQUFFLENBQWlCO1FBQ2xDQyxRQUFRLEVBQUUsR0FBRyxDQUFDUCxHQUFHLENBQUNRLFFBQVEsQ0FBQyxDQUF1QjtJQUNwRCxDQUFDO0lBQ0QsR0FBRyxDQUFDQyxTQUFTLEdBQUcsR0FBRyxDQUFDVCxHQUFHLENBQUNVLFFBQVEsQ0FBQ0MsY0FBYztJQUMvQyxHQUFHLENBQUNDLEtBQUssR0FBRyxDQUFtQjtJQUMvQixHQUFHLENBQUNDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBeUI7SUFDM0MsR0FBRyxDQUFDQyxVQUFVLEdBQUdoQixHQUFHLENBQUNpQixJQUFJLENBQUNELFVBQVUsQ0FBSzs7SUFDekMsR0FBRyxDQUFDRSxlQUFlLEdBQUdsQixHQUFHLENBQUNpQixJQUFJLENBQUNDLGVBQWUsQ0FBQyxDQUFlO0lBQzlELEdBQUcsQ0FBQ0MsV0FBVyxDQUFDLENBQWdDO0lBQ2hELEdBQUcsQ0FBQ0MsV0FBVyxDQUFDLENBQXVCO0lBQ3ZDLEdBQUcsQ0FBQ0MsYUFBYSxHQUFHLENBQUU7SUFDdEJDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLENBQWtCLG1CQUFDdkIsR0FBRyxDQUFDaUIsSUFBSSxDQUFDQyxlQUFlO0lBQ3ZELEdBQUcsQ0FBQ00sTUFBTSxHQUFHLENBQUM7UUFDWkMsU0FBUyxFQUFFWCxLQUFLO1FBQ2hCWSxzQkFBc0IsRUFBRSxDQUFrQztRQUMxREMsd0JBQXdCLEVBQUUsQ0FBQztZQUN6QixDQUFLLE1BQUUsQ0FBWTtZQUNuQixDQUFLLE1BQUUsQ0FBa0I7UUFDM0IsQ0FBQztRQUNEQyx5QkFBeUIsRUFBRSxDQUFDO1lBQzFCLENBQUssTUFBRWIsU0FBUztZQUNoQixDQUFLLE1BQUVDLFVBQVU7WUFDakIsQ0FBSyxNQUFFRSxlQUFlO1FBRXhCLENBQUM7UUFDRFcsZ0JBQWdCLEVBQUUsQ0FBVTtJQUM5QixDQUFDO0lBQ0QsR0FBRyxDQUFDLENBQUM7UUFDSCxHQUFHLENBQUNSLGFBQWEsR0FBRyxDQUEwQjtRQUM5Q1YsU0FBUyxDQUFDbUIsS0FBSyxDQUFDTixNQUFNLEVBQUUsUUFBUSxDQUFFTyxHQUFHLEVBQUVDLElBQUksRUFBRSxDQUFDO1lBQzVDLEVBQUUsRUFBRUQsR0FBRyxFQUFFLENBQUM7Z0JBQ1JULE9BQU8sQ0FBQ1csS0FBSyxDQUNYLENBQStDLGdEQUMvQ0MsSUFBSSxDQUFDQyxTQUFTLENBQUNKLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQztZQUUvQixDQUFDLE1BQU0sQ0FBQztnQkFDTlQsT0FBTyxDQUFDQyxHQUFHLENBQUMsQ0FBcUIsc0JBQUVXLElBQUksQ0FBQ0MsU0FBUyxDQUFDSCxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQy9EL0IsR0FBRyxDQUFDbUMsSUFBSSxDQUFDRixJQUFJLENBQUNDLFNBQVMsQ0FBQ0gsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO1lBQ3ZDLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQyxDQUFDLEtBQUssRUFBRUQsR0FBRyxFQUFFLENBQUM7UUFDYlQsT0FBTyxDQUFDQyxHQUFHLENBQUMsQ0FBUyxVQUFFUSxHQUFHO0lBQzVCLENBQUM7SUFDRDlCLEdBQUcsQ0FBQ29DLE1BQU0sQ0FBQyxHQUFHO0FBQ2hCLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9neW5lc29ub3BoYXNlMi8uL3NyYy9wYWdlcy9hcGkvQmlsbGluZy9nZXRCaWxsaW5nTWFzdGVyRGF0YS5qcz9lNzhiIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGhhbmRsZXIocmVxLCByZXMpIHtcclxuICB2YXIgQVdTID0gcmVxdWlyZShcImF3cy1zZGtcIik7XHJcbiAgQVdTLmNvbmZpZy51cGRhdGUoe1xyXG4gICAgcmVnaW9uOiBcInVzLXdlc3QtMVwiLFxyXG4gICAgYWNjZXNzS2V5SWQ6IFwiYWNjZXNzS2V5SWRcIixcclxuICAgIHNlY3JldEFjY2Vzc0tleTogXCJzZWNyZXRBY2Nlc3NLZXlcIixcclxuICAgIGVuZHBvaW50OiBuZXcgQVdTLkVuZHBvaW50KFwiaHR0cDovL2xvY2FsaG9zdDo4MDAwXCIpLFxyXG4gIH0pO1xyXG4gIHZhciBkb2NDbGllbnQgPSBuZXcgQVdTLkR5bmFtb0RCLkRvY3VtZW50Q2xpZW50KCk7XHJcbiAgdmFyIHRhYmxlID0gXCJiaWxsaW5nbWFzdGVyZGF0YVwiO1xyXG4gIHZhciBzZXJ2aWNlSUQgPSAwOy8vcmVxLmJvZHkuc2VydmljZUlEOy8vMjtcclxuICB2YXIgY3VzdG9tZXJJRCA9IHJlcS5ib2R5LmN1c3RvbWVySUQvLzM7IFxyXG4gIHZhciBzZXJ2aWNlQ2F0ZWdvcnkgPSByZXEuYm9keS5zZXJ2aWNlQ2F0ZWdvcnk7Ly9cIkJsb29kdGVzdFwiOyBcclxuICB2YXIgc2VydmljZU5hbWU7Ly9yZXEuYm9keS5zZXJ2aWNlTmFtZTsvL1wiQ1JQXCI7IFxyXG4gIHZhciBzZXJ2aWNlQ29zdDsvL3JlcS5ib2R5LnNlcnZpY2VDb3N0O1xyXG4gIHZhciByZXR1cm5NZXNzYWdlID0gXCJcIjtcclxuICBjb25zb2xlLmxvZyhcInNlcnZpY2UgY2F0ZWdvcnlcIixyZXEuYm9keS5zZXJ2aWNlQ2F0ZWdvcnkpO1xyXG4gIHZhciBwYXJhbXMgPSB7XHJcbiAgICBUYWJsZU5hbWU6IHRhYmxlLFxyXG4gICAgS2V5Q29uZGl0aW9uRXhwcmVzc2lvbjogXCIjc2kgPj0gOnNpIGFuZCBjdXN0b21lcl9pZCA9IDpjaVwiLFxyXG4gICAgRXhwcmVzc2lvbkF0dHJpYnV0ZU5hbWVzOiB7XHJcbiAgICAgIFwiI3NpXCI6IFwic2VydmljZV9pZFwiLFxyXG4gICAgICBcIiNzY1wiOiBcInNlcnZpY2VfY2F0ZWdvcnlcIlxyXG4gICAgfSxcclxuICAgIEV4cHJlc3Npb25BdHRyaWJ1dGVWYWx1ZXM6IHtcclxuICAgICAgXCI6c2lcIjogc2VydmljZUlELFxyXG4gICAgICBcIjpjaVwiOiBjdXN0b21lcklELFxyXG4gICAgICBcIjpzY1wiOiBzZXJ2aWNlQ2F0ZWdvcnlcclxuICAgICAgLy9cIjpzblwiOiBzZXJ2aWNlTmFtZSAgXHJcbiAgICB9LFxyXG4gICAgRmlsdGVyRXhwcmVzc2lvbjogXCIjc2MgPTpzY1wiXHJcbiAgfTtcclxuICB0cnkge1xyXG4gICAgdmFyIHJldHVybk1lc3NhZ2UgPSBcIkZldGNoaW5nIHRoZSBpbmZvcm1hdGlvblwiO1xyXG4gICAgZG9jQ2xpZW50LnF1ZXJ5KHBhcmFtcywgZnVuY3Rpb24gKGVyciwgZGF0YSkge1xyXG4gICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcclxuICAgICAgICAgIFwiVW5hYmxlIHRvIGdldCByZWNvcmRzIGZyb20gdGFibGUuIEVycm9yIEpTT046XCIsXHJcbiAgICAgICAgICBKU09OLnN0cmluZ2lmeShlcnIsIG51bGwsIDIpXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkZldGNoZWQgaW5mb3JtYXRpb25cIiwgSlNPTi5zdHJpbmdpZnkoZGF0YSwgbnVsbCwgMikpO1xyXG4gICAgICAgIHJlcy5qc29uKEpTT04uc3RyaW5naWZ5KGRhdGEsIG51bGwsIDIpKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiwgZXJyKTtcclxuICB9XHJcbiAgcmVzLnN0YXR1cygyMDApO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJoYW5kbGVyIiwicmVxIiwicmVzIiwiQVdTIiwicmVxdWlyZSIsImNvbmZpZyIsInVwZGF0ZSIsInJlZ2lvbiIsImFjY2Vzc0tleUlkIiwic2VjcmV0QWNjZXNzS2V5IiwiZW5kcG9pbnQiLCJFbmRwb2ludCIsImRvY0NsaWVudCIsIkR5bmFtb0RCIiwiRG9jdW1lbnRDbGllbnQiLCJ0YWJsZSIsInNlcnZpY2VJRCIsImN1c3RvbWVySUQiLCJib2R5Iiwic2VydmljZUNhdGVnb3J5Iiwic2VydmljZU5hbWUiLCJzZXJ2aWNlQ29zdCIsInJldHVybk1lc3NhZ2UiLCJjb25zb2xlIiwibG9nIiwicGFyYW1zIiwiVGFibGVOYW1lIiwiS2V5Q29uZGl0aW9uRXhwcmVzc2lvbiIsIkV4cHJlc3Npb25BdHRyaWJ1dGVOYW1lcyIsIkV4cHJlc3Npb25BdHRyaWJ1dGVWYWx1ZXMiLCJGaWx0ZXJFeHByZXNzaW9uIiwicXVlcnkiLCJlcnIiLCJkYXRhIiwiZXJyb3IiLCJKU09OIiwic3RyaW5naWZ5IiwianNvbiIsInN0YXR1cyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/Billing/getBillingMasterData.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/Billing/getBillingMasterData.js"));
module.exports = __webpack_exports__;

})();