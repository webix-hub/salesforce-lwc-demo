# Webix demo for SalesForce

## How to start

- Change login url (sfdcLoginUrl) in sfdx-project.json to url of your SalesForce organization

- Create scratch org

```sh
sfdx force:auth:web:login -d
sfdx force:org:create -f project-scratch-def.json -s
```

- Publish code

```sh
sfdx force:source:push
sfdx force:data:tree:import -f ./data/Division_Manager__c.json
```

- Open scratch org in browser

```
sfdx force:org:open
```

The scratch org already has Webix app which you can check, or go to "Setup : Lighting Apps", create a new Lighting App and drop the salesReport from the list of available components.

## How to configure / modify

### Backend

getRecords in force-app/main/default/classes/SalesData.cls returns list of records for the app, adjust this query as necessary. 

### Frontend

force-app/main/default/lwc/salesReport/salesReport.js contains code of web component

```js
function unwrap(data) {
  return data.map(a => ({
```

**unwrap** functions controls how data from SalesForce is converted to Webix compatible objects. You will need to modify this code if you will want to provide some additional data properties from SalesForce to the Webix based app

```js
  initializeUI() {
    if (webix.CustomScroll) webix.CustomScroll.init();

    const ui = {
      container: this.template.querySelector(".theapp"),
      height: this.height,
	    type: "space",
	    rows: [list, { type:"wide", cols: [grid, form] }]
    };

    webix.ui(ui);

    getRecords().then(d => {
      const list = webix.$$("list");
      list.parse(unwrap(d.records));
      if (list.count())
        list.select(list.data.order[0]);
    });
  }
```

**initializeUI** instantiates the Webix app. It defines the layout of widgets and triggers the data loading


```js
// views/form.js
{ view:"button", width: 100, value:"Save", click:function(){
    const data = $$("form").getValues();
    updateRecord({ fields:{
```

**click** handler in views/form.js triggers the data saving, here we need to map back webix fields to their SalesForce conterparts.


### Version of the Webix


force-app/main/default/staticresources/webix71.zip contains a limited version of the Webix ( it will show a warning message on load ). For production usage you will need to replace js and css files in this archive with ones from commercial Webix package.
