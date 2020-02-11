import { updateRecord } from 'lightning/uiRecordApi';

const info = (webix) => {
  return {
    width: 400,
    rows: [
      { view:"toolbar", padding:{ left: 8 }, cols:[
        { view:"label", id:"form_header", label: "Abigale Lee Profile" },
        { view:"button", width: 100, value:"Save", click:function(){
          const data = $$("form").getValues();
          updateRecord({ fields:{
            Id: data.id,
            Name : data.name,
            Color__c: data.color,
            Country__c: data.country,
            Tags__c: data.tags.toString().replace(/,/g, ";"),
            Assigned_To__c: data.assigned,
            Status__c: data.status,
          }}).then(() => webix.message("Data was saved."));
        }}
      ]},
      {
        type: "clean",
        rows: [
          {
            view: "template",
            css:"wbx_info_template",
            height: 300,
            template:
              "<div class='wbx_photo'></div><div class='wbx_name'>Abigale Lee</div>"
          },
          {
            view: "form", id: "form",
            elementsConfig: { labelPosition: "top" },
            rows: [
              { view: "text", label: "Name", name: "name" },
              {
                view: "multicombo",
                options: ["Software", "Hardware", "US", "Europe", "Asia"],
                label: "Tags",
                placeholder: "Click to select",
                name: "tags"
              },
              {
                view: "text",
                label: "Assigned To",
                placeholder: "Email",
                name: "assigned"
              },
              {
                view: "colorpicker",
                label: "Color",
                placeholder: "Click to select",
                name: "color"
              },
              {
                view: "richselect",
                options: ["Active", "Not Active"],
                label: "Status",
                placeholder: "Click to select",
                name: "status"
              },
              {}
            ]
          }
        ]
      }
    ]
  };
}

export default info;