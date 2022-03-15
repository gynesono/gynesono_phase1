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
exports.id = "pages/api/Billing/postBillingMasterData";
exports.ids = ["pages/api/Billing/postBillingMasterData"];
exports.modules = {

/***/ "aws-sdk":
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("aws-sdk");

/***/ }),

/***/ "(api)/./src/pages/api/Billing/postBillingMasterData.js":
/*!********************************************************!*\
  !*** ./src/pages/api/Billing/postBillingMasterData.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\nfunction handler(req, res) {\n    var AWS = __webpack_require__(/*! aws-sdk */ \"aws-sdk\");\n    AWS.config.update({\n        region: 'us-west-1',\n        accessKeyId: 'accessKeyId',\n        secretAccessKey: 'secretAccessKey',\n        endpoint: new AWS.Endpoint('http://localhost:8000')\n    });\n    var docClient = new AWS.DynamoDB.DocumentClient();\n    var table = \"billingmasterdata\";\n    var serviceID = 1;\n    var customerID = 3;\n    var serviceCategory = \"Bloodtest\";\n    var serviceName = \"CBC\";\n    var serviceCost = 1000;\n    var returnMessage = \"\";\n    var params = {\n        TableName: table,\n        Item: {\n            \"service_id\": serviceID,\n            \"customer_id\": customerID,\n            \"service_category\": serviceCategory,\n            \"service_name\": serviceName,\n            \"service_cost\": serviceCost\n        }\n    };\n    try {\n        console.log(\"Posting...\");\n        docClient.put(params, function(err, data) {\n            if (err) {\n                console.error(\"Unable to Post Billing Data. Error JSON : \", JSON.stringify(err, null, 2));\n            } else {\n                console.log(\"Posting Data : \", JSON.stringify(data, null, 2));\n            }\n        });\n        var returnMessage = \"data posted : \";\n        res.status(200).json({\n            returnMessage\n        });\n    } catch (err) {\n        console.log(\"Error: \", err);\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL0JpbGxpbmcvcG9zdEJpbGxpbmdNYXN0ZXJEYXRhLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBZSxRQUFRLENBQUNBLE9BQU8sQ0FBQ0MsR0FBRyxFQUFFQyxHQUFHLEVBQUUsQ0FBQztJQUN2QyxHQUFHLENBQUNDLEdBQUcsR0FBR0MsbUJBQU8sQ0FBQyx3QkFBUztJQUMzQkQsR0FBRyxDQUFDRSxNQUFNLENBQUNDLE1BQU0sQ0FBQyxDQUFDO1FBQ2ZDLE1BQU0sRUFBRSxDQUFXO1FBQ25CQyxXQUFXLEVBQUUsQ0FBYTtRQUMxQkMsZUFBZSxFQUFFLENBQWlCO1FBQ2xDQyxRQUFRLEVBQUUsR0FBRyxDQUFDUCxHQUFHLENBQUNRLFFBQVEsQ0FBQyxDQUF1QjtJQUN0RCxDQUFDO0lBQ0QsR0FBRyxDQUFDQyxTQUFTLEdBQUcsR0FBRyxDQUFDVCxHQUFHLENBQUNVLFFBQVEsQ0FBQ0MsY0FBYztJQUMzQyxHQUFHLENBQUNDLEtBQUssR0FBRyxDQUFtQjtJQUMvQixHQUFHLENBQUNDLFNBQVMsR0FBRyxDQUFDO0lBQ2pCLEdBQUcsQ0FBQ0MsVUFBVSxHQUFHLENBQUM7SUFDbEIsR0FBRyxDQUFDQyxlQUFlLEdBQUcsQ0FBVztJQUNqQyxHQUFHLENBQUNDLFdBQVcsR0FBRyxDQUFLO0lBQ3ZCLEdBQUcsQ0FBQ0MsV0FBVyxHQUFHLElBQUk7SUFDdEIsR0FBRyxDQUFDQyxhQUFhLEdBQUcsQ0FBRTtJQUN0QixHQUFHLENBQUNDLE1BQU0sR0FBRyxDQUFDO1FBQ1ZDLFNBQVMsRUFBQ1IsS0FBSztRQUNmUyxJQUFJLEVBQUMsQ0FBQztZQUNGLENBQVksYUFBRVIsU0FBUztZQUN2QixDQUFhLGNBQUVDLFVBQVU7WUFDekIsQ0FBa0IsbUJBQUVDLGVBQWU7WUFDbkMsQ0FBYyxlQUFHQyxXQUFXO1lBQzVCLENBQWMsZUFBR0MsV0FBVztRQUNoQyxDQUFDO0lBQ0wsQ0FBQztJQUNELEdBQUcsRUFBQztRQUNBSyxPQUFPLENBQUNDLEdBQUcsQ0FBQyxDQUFZO1FBQ3hCZCxTQUFTLENBQUNlLEdBQUcsQ0FBQ0wsTUFBTSxFQUFFLFFBQVEsQ0FBQ00sR0FBRyxFQUFFQyxJQUFJLEVBQUUsQ0FBQztZQUN2QyxFQUFFLEVBQUVELEdBQUcsRUFBRSxDQUFDO2dCQUNOSCxPQUFPLENBQUNLLEtBQUssQ0FBQyxDQUE0Qyw2Q0FBRUMsSUFBSSxDQUFDQyxTQUFTLENBQUNKLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQztZQUMzRixDQUFDLE1BQU0sQ0FBQztnQkFDSkgsT0FBTyxDQUFDQyxHQUFHLENBQUMsQ0FBaUIsa0JBQUVLLElBQUksQ0FBQ0MsU0FBUyxDQUFDSCxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7WUFDL0QsQ0FBQztRQUNMLENBQUM7UUFDRCxHQUFHLENBQUNSLGFBQWEsR0FBRyxDQUFnQjtRQUNwQ25CLEdBQUcsQ0FBQytCLE1BQU0sQ0FBQyxHQUFHLEVBQUVDLElBQUksQ0FBQyxDQUFDO1lBQUNiLGFBQWE7UUFBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQyxLQUFLLEVBQUNPLEdBQUcsRUFBQyxDQUFDO1FBQ1RILE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLENBQVMsVUFBRUUsR0FBRztJQUM5QixDQUFDO0FBQ2IsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2d5bmVzb25vcGhhc2UyLy4vc3JjL3BhZ2VzL2FwaS9CaWxsaW5nL3Bvc3RCaWxsaW5nTWFzdGVyRGF0YS5qcz8xZmNjIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGhhbmRsZXIocmVxLCByZXMpIHtcclxuICAgIHZhciBBV1MgPSByZXF1aXJlKFwiYXdzLXNka1wiKTtcclxuICAgIEFXUy5jb25maWcudXBkYXRlKHtcclxuICAgICAgICByZWdpb246ICd1cy13ZXN0LTEnLFxyXG4gICAgICAgIGFjY2Vzc0tleUlkOiAnYWNjZXNzS2V5SWQnLFxyXG4gICAgICAgIHNlY3JldEFjY2Vzc0tleTogJ3NlY3JldEFjY2Vzc0tleScsXHJcbiAgICAgICAgZW5kcG9pbnQ6IG5ldyBBV1MuRW5kcG9pbnQoJ2h0dHA6Ly9sb2NhbGhvc3Q6ODAwMCcpLFxyXG4gICAgfSk7XHJcbiAgICB2YXIgZG9jQ2xpZW50ID0gbmV3IEFXUy5EeW5hbW9EQi5Eb2N1bWVudENsaWVudCgpO1xyXG4gICAgICAgIHZhciB0YWJsZSA9IFwiYmlsbGluZ21hc3RlcmRhdGFcIjtcclxuICAgICAgICB2YXIgc2VydmljZUlEID0gMTtcclxuICAgICAgICB2YXIgY3VzdG9tZXJJRCA9IDM7XHJcbiAgICAgICAgdmFyIHNlcnZpY2VDYXRlZ29yeSA9IFwiQmxvb2R0ZXN0XCI7XHJcbiAgICAgICAgdmFyIHNlcnZpY2VOYW1lID0gXCJDQkNcIjtcclxuICAgICAgICB2YXIgc2VydmljZUNvc3QgPSAxMDAwO1xyXG4gICAgICAgIHZhciByZXR1cm5NZXNzYWdlID0gXCJcIjtcclxuICAgICAgICB2YXIgcGFyYW1zID0ge1xyXG4gICAgICAgICAgICBUYWJsZU5hbWU6dGFibGUsXHJcbiAgICAgICAgICAgIEl0ZW06e1xyXG4gICAgICAgICAgICAgICAgXCJzZXJ2aWNlX2lkXCI6IHNlcnZpY2VJRCxcclxuICAgICAgICAgICAgICAgIFwiY3VzdG9tZXJfaWRcIjogY3VzdG9tZXJJRCxcclxuICAgICAgICAgICAgICAgIFwic2VydmljZV9jYXRlZ29yeVwiOiBzZXJ2aWNlQ2F0ZWdvcnksXHJcbiAgICAgICAgICAgICAgICBcInNlcnZpY2VfbmFtZVwiIDogc2VydmljZU5hbWUsXHJcbiAgICAgICAgICAgICAgICBcInNlcnZpY2VfY29zdFwiIDogc2VydmljZUNvc3RcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07ICBcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUG9zdGluZy4uLlwiKTtcclxuICAgICAgICAgICAgZG9jQ2xpZW50LnB1dChwYXJhbXMsIGZ1bmN0aW9uKGVyciwgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJVbmFibGUgdG8gUG9zdCBCaWxsaW5nIERhdGEuIEVycm9yIEpTT04gOiBcIiwgSlNPTi5zdHJpbmdpZnkoZXJyLCBudWxsLCAyKSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUG9zdGluZyBEYXRhIDogXCIsIEpTT04uc3RyaW5naWZ5KGRhdGEsIG51bGwsIDIpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7IFxyXG4gICAgICAgICAgICB2YXIgcmV0dXJuTWVzc2FnZSA9IFwiZGF0YSBwb3N0ZWQgOiBcIjtcclxuICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyByZXR1cm5NZXNzYWdlIH0pXHJcbiAgICAgICAgICAgIH0gY2F0Y2goZXJyKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiLCBlcnIpXHJcbiAgICAgICAgICAgIH1cclxufSJdLCJuYW1lcyI6WyJoYW5kbGVyIiwicmVxIiwicmVzIiwiQVdTIiwicmVxdWlyZSIsImNvbmZpZyIsInVwZGF0ZSIsInJlZ2lvbiIsImFjY2Vzc0tleUlkIiwic2VjcmV0QWNjZXNzS2V5IiwiZW5kcG9pbnQiLCJFbmRwb2ludCIsImRvY0NsaWVudCIsIkR5bmFtb0RCIiwiRG9jdW1lbnRDbGllbnQiLCJ0YWJsZSIsInNlcnZpY2VJRCIsImN1c3RvbWVySUQiLCJzZXJ2aWNlQ2F0ZWdvcnkiLCJzZXJ2aWNlTmFtZSIsInNlcnZpY2VDb3N0IiwicmV0dXJuTWVzc2FnZSIsInBhcmFtcyIsIlRhYmxlTmFtZSIsIkl0ZW0iLCJjb25zb2xlIiwibG9nIiwicHV0IiwiZXJyIiwiZGF0YSIsImVycm9yIiwiSlNPTiIsInN0cmluZ2lmeSIsInN0YXR1cyIsImpzb24iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/Billing/postBillingMasterData.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/Billing/postBillingMasterData.js"));
module.exports = __webpack_exports__;

})();