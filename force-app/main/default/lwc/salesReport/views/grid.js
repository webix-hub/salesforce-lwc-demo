const sales = (webix) => {
    const spline = webix.Sparklines.getTemplate("splineArea");

    return {
        rows: [
        { type: "header", id:"table_header", template: " " },
        {
            view: "treetable",
            id: "table_data",
            columns: [
            { id: "name", header: "", width: 150 },
            {
                id: "jan2020",
                header: "Jan 2020",
                css: "centered",
                template: obj => obj.info[0]
            },
            {
                id: "feb2020",
                header: "Feb 2020",
                css: "centered",
                template: obj => obj.info[1]
            },
            {
                id: "mar2020",
                header: "Mar 2020",
                css: "centered",
                template: obj => obj.info[2]
            },
            {
                id: "apr2020",
                header: "Apr 2020",
                css: "centered",
                template: obj => obj.info[3]
            },
            {
                id: "may2020",
                header: "May 2020",
                css: "centered",
                template: obj => obj.info[4]
            },
            {
                id: "jun2020",
                header: "Jun 2020",
                css: "centered",
                template: obj => obj.info[5]
            },
            {
                id: "info",
                fillspace: true,
                minWidth: 300,
                header: "",
                template: (obj, c, data, col) => {
                if (obj.title) return obj.title;
                if (obj.plus)
                    return `<span style='color:green;'>${obj.plus}</span>`;
                if (obj.minus)
                    return `<span style='color:red;'>${obj.minus}</span>`;

                return spline(obj, c, data, col);
                }
            }
            ],
            data: []
        }
        ]
    };  
}

export default sales;