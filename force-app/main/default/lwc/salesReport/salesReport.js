/* eslint-disable guard-for-in */
import { LightningElement, api } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { loadStyle, loadScript } from "lightning/platformResourceLoader";

// Static resources
import Webix from "@salesforce/resourceUrl/webix71";
import AppStyles from "@salesforce/resourceUrl/styles";

// Controllers
import getRecords from "@salesforce/apex/SalesData.getRecords";

// Views
import form from "./views/form";
import list from "./views/list";
import grid from "./views/grid";

function unwrap(data) {
  return data.map(a => ({
    id: a.Id,
    name: a.Name,
    color: a.Color__c || "",
    country: a.Country__c || "",
    tags: (a.Tags__c || "").split(";"),
    assigned: a.Assigned_To__c || "",
    status: a.Status__c || "",
    data: (a.Stats_Data__c ? JSON.parse(a.Stats_Data__c).data : [])
  }));
}
export default class ManagerReports extends LightningElement {
  @api height;
  webixInitialized = false;

  renderedCallback() {
    if (this.webixInitialized) {
      return;
    }
    this.webixInitialized = true;

    /* global webix */
    Promise.all([
      loadScript(this, Webix + "/webix.js"),
	  loadStyle(this, Webix + "/webix.css"),
	  loadStyle(this, AppStyles),
    ])
      .then(() => {
        this.initializeUI();
      })
      .catch(error => {
        this.dispatchEvent(
          new ShowToastEvent({
            title: "Error loading Webix",
            message: error.message,
            variant: "error"
          })
        );
      });
  }

  initializeUI() {
    if (webix.CustomScroll) webix.CustomScroll.init();

    const ui = {
      container: this.template.querySelector(".theapp"),
      height: this.height,
	    type: "space",
	    rows: [
        list(webix),
        { type:"wide", cols: [
          grid(webix), form(webix)
        ]}
      ]
    };

    webix.ui(ui);

    getRecords().then(d => {
      const list = webix.$$("list");
      list.parse(unwrap(d.records));
      if (list.count())
        list.select(list.data.order[0]);
    });
  }
}
