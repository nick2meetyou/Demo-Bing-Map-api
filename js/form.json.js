var formobj = {
	"type": "form",
	"tags": [

	],
	"owner": "59b108bc2f1208000748704c",
	"components": [
		{
			"key": "content",
			"input": false,
			"html": "<div id=\"mapDiv\" style=\"position: relative; width: 600px; height: 300px;\">Map<\/div>\n\n<div id=\"printoutPanel\">printoutPanel<\/div>\n\n<div id=\"routeInfoPanel\">routeInfoPanel<\/div>\n",
			"type": "content",
			"tags": [

			],
			"conditional": {
				"show": "",
				"when": null,
				"eq": ""
			},
			"properties": {

			},
			"label": "content",
			"hideLabel": true
		},
		{
			"autofocus": false,
			"input": true,
			"label": "Office",
			"tableView": false,
			"key": "office",
			"size": "md",
			"leftIcon": "",
			"rightIcon": "",
			"block": false,
			"action": "custom",
			"disableOnInvalid": false,
			"theme": "primary",
			"type": "button",
			"tags": [

			],
			"conditional": {
				"show": "",
				"when": null,
				"eq": ""
			},
			"properties": {

			},
			"custom": "gotoOffice();",
			"style": {
				"margin-right": "2000px"
			}
		},
		{
			"autofocus": false,
			"input": true,
			"label": "Add More Location",
			"tableView": false,
			"key": "addMoreLocation",
			"size": "md",
			"leftIcon": "",
			"rightIcon": "",
			"block": false,
			"action": "custom",
			"disableOnInvalid": false,
			"theme": "primary",
			"type": "button",
			"tags": [

			],
			"conditional": {
				"show": "",
				"when": null,
				"eq": ""
			},
			"properties": {

			},
			"custom": "addmoreLocation();"
		},
		{
			"autofocus": false,
			"input": true,
			"label": "jump to Austria",
			"tableView": false,
			"key": "jumptoAustria",
			"size": "md",
			"leftIcon": "",
			"rightIcon": "",
			"block": false,
			"action": "custom",
			"disableOnInvalid": false,
			"theme": "primary",
			"type": "button",
			"tags": [

			],
			"conditional": {
				"show": "",
				"when": null,
				"eq": ""
			},
			"properties": {

			},
			"custom": "GetMap('at');"
		}
	],
	"revisions": "",
	"_vid": 0,
	"access": [
		{
			"roles": [
				"59b10947678919000775f8b4",
				"59b10947678919000775f8b5",
				"59b10947678919000775f8b6"
			],
			"type": "read_all"
		}
	],
	"submissionAccess": [

	],
	"created": "2018-03-10T03:25:29.142Z",
	"_id": "5aa35029fd114e8a0a1f58d4",
	"title": "bingmapForm",
	"display": "form",
	"settings": {

	},
	"name": "bingmapForm",
	"path": "bingmapform",
	"project": "59b10947678919000775f8b3",
	"modified": "2018-03-14T10:24:30.804Z",
	"machineName": "cqeekvovgtyukgf:bingmapForm"
}

function bingmap() {
	console.log('55555');
}