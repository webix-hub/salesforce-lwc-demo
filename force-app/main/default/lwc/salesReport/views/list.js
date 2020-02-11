const list = (webix) => {
  return {
    view: "list", id:"list",
    layout: "x",
    css: "persons_list",
    borderless: true,
    select: true,
    item: {
      height: 70,
      width: 200,
      template: obj => {
        let tags = "";
        if (obj.tags)
          tags = `<span class='wbx_tag'>${obj.tags.join(
            "</span><span class='wbx_tag'>"
          )}</span>`;
        return `<div class="wbx_name">${obj.name}</div><div class="wbx_tags">${tags}</div>`;
      }
    },
    on:{
      onAfterSelect: function(id){
        var item = this.getItem(id);
        $$("form").setValues(item);
        $$("table_header").setHTML(`${item.name} sales Cases`);
        $$("table_data").clearAll();
        $$("table_data").parse(webix.copy(item.data));
        $$("form_header").setValue(`${item.name} Profile`);
      }
    },
    data: []
  };
};

export default list;