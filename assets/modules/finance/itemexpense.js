layui.define(["table", "form"],
    function(e) {
        let t = layui.$,
            table = layui.table,
            setter = layui.setter,
            financeSetter = layui.financeSetter,
            reqSetter = layui.reqSetter,
            element = layui.element,
            form = layui.form;

        //初始化项目材料采购信息分页
        table.render({
            elem: "#PAGE-materials-list",
            url: reqSetter.requestPath.itemExpensePageApi,
            loading:true,
            headers:{
                username: layui.data(setter.appIdKey).appIdKey,
                deviceInfo:layui.device('myapp').os,
                authorization:layui.data(setter.jwtKey).jwtKey
            },
            height: setter.tableHeight,
            totalRow:true,
            page:true,
            text:{
                none:'暂无材料采购记录'
            },
            where:{
                expenseType:financeSetter.financeType.materialsOut
            },
            parseData: function(res){ //res 即为原始返回的数据
                if (setter.accessStatus(res,this)) {
                    return false;
                }
                let result =  {
                    code: 0, //解析接口状态
                    msg: '获取数据成功', //解析提示文本
                    count: res.data.total, //解析数据长度
                    data: res.data.rows //解析数据列表
                };
                return result;
            },
            cols: [[{
                type: "checkbox",
                fixed: "left"
            },
                {
                    field: "",
                    width: 60,
                    title: "序号",
                    align: 'center',
                    // sort: !0,
                    templet: function(obj){
                        return '<span>'+ obj.LAY_INDEX +'</span>'
                    },
                    totalRowText:"合计"
                },
                {
                    field: "expenseName",
                    title: "支出款项名称"
                },
                {
                    field: "moneyExpense",
                    title: "支出金额",
                    totalRow: true
                },
                {
                    field: "createPerson",
                    title: "支出人员"
                },
                {
                    field: "createTime",
                    title: "支出日期",
                    width:180,
                    sort: false
                },
                {
                    field: "remark",
                    title: "备注"
                },
                {
                    title: "操作",
                    width: 270,
                    align: "center",
                    fixed: "right",
                    toolbar: "#table-materials-admin"
                }]]
        }),
            table.on("tool(PAGE-materials-list)",
                function(e) {
                    let data =e.data;
                    if ("del" === e.event) layer.prompt({
                            formType: 1,
                            title: "敏感操作，请验证口令"
                        },
                        function(t, i) {
                            layer.close(i),
                                layer.confirm("确定删除此管理员？",
                                    function(t) {
                                        console.log(e),
                                            e.del(),
                                            layer.close(t)
                                    })
                        });
                    else if ("edit" === e.event) {
                        t(e.tr);
                        layer.open({
                            type: 2,
                            title: "编辑用户",
                            content: "../../../views/user/administrators/adminform.html",
                            area: ["440px", "540px"],
                            btn: ["确定", "取消"],
                            yes: function(e, t) {
                                let l = window["layui-layer-iframe" + e],
                                    r = "LAY-user-back-submit",
                                    n = t.find("iframe").contents().find("#" + r);
                                l.layui.form.on("submit(" + r + ")",
                                    function(t) {
                                        t.field;
                                        console.log(t.field);
                                        i.reload("LAY-user-front-submit"),
                                            layer.close(e)
                                    }),
                                    n.trigger("click")
                            },
                            success: function(layero, index) {
                                let body = layui.layer.getChildFrame('body', index);

                            }
                        })
                    }
                }),
            //初始化项目灶务采购信息分页
            table.render({
                elem: "#PAGE-repast-list",
                url: reqSetter.requestPath.itemExpensePageApi,
                loading:true,
                headers:{
                    username: layui.data(setter.appIdKey).appIdKey,
                    deviceInfo:layui.device('myapp').os,
                    authorization:layui.data(setter.jwtKey).jwtKey
                },
                totalRow:true,
                page:true,
                text:{
                    none:'暂无灶务采购记录'
                },
                height: setter.tableHeight,
                where:{
                    expenseType:financeSetter.financeType.repastOut
                },
                parseData: function(res){ //res 即为原始返回的数据
                    if (setter.accessStatus(res,this)) {
                        return false;
                    }
                    let result =  {
                        code: 0, //解析接口状态
                        msg: '获取数据成功', //解析提示文本
                        count: res.data.total, //解析数据长度
                        data: res.data.rows //解析数据列表
                    };
                    return result;
                },
                cols: [[{
                    type: "checkbox",
                    fixed: "left"
                },
                    {
                        field: "",
                        width: 60,
                        title: "序号",
                        align: 'center',
                        // sort: !0,
                        templet: function(obj){
                            return '<span>'+ obj.LAY_INDEX +'</span>'
                        },
                        totalRowText:"合计"
                    },
                    {
                        field: "expenseName",
                        title: "支出款项名称"
                    },
                    {
                        field: "moneyExpense",
                        title: "支出金额",
                        totalRow: true
                    },
                    {
                        field: "createPerson",
                        title: "支出人员"
                    },
                    {
                        field: "createTime",
                        title: "支出日期",
                        width:180,
                        sort: false
                    },
                    {
                        field: "remark",
                        title: "备注"
                    },
                    {
                        title: "操作",
                        width: 270,
                        align: "center",
                        fixed: "right",
                        toolbar: "#table-repast-admin"
                    }]]
            }),
            table.on("tool(PAGE-repast-list)",
                function(e) {
                    let data =e.data;
                    if ("del" === e.event) layer.prompt({
                            formType: 1,
                            title: "敏感操作，请验证口令"
                        },
                        function(t, i) {
                            layer.close(i),
                                layer.confirm("确定删除此管理员？",
                                    function(t) {
                                        console.log(e),
                                            e.del(),
                                            layer.close(t)
                                    })
                        });
                    else if ("edit" === e.event) {
                        t(e.tr);
                        layer.open({
                            type: 2,
                            title: "编辑用户",
                            content: "../../../views/user/administrators/adminform.html",
                            area: ["440px", "540px"],
                            btn: ["确定", "取消"],
                            yes: function(e, t) {
                                let l = window["layui-layer-iframe" + e],
                                    r = "LAY-user-back-submit",
                                    n = t.find("iframe").contents().find("#" + r);
                                l.layui.form.on("submit(" + r + ")",
                                    function(t) {
                                        t.field;
                                        console.log(t.field);
                                        i.reload("LAY-user-front-submit"),
                                            layer.close(e)
                                    }),
                                    n.trigger("click")
                            },
                            success: function(layero, index) {
                                let body = layui.layer.getChildFrame('body', index);

                            }
                        })
                    }
                }),
            //初始化项目杂工工资信息分页
            table.render({
                elem: "#PAGE-backMan-list",
                url: reqSetter.requestPath.itemExpensePageApi,
                loading:true,
                headers:{
                    username: layui.data(setter.appIdKey).appIdKey,
                    deviceInfo:layui.device('myapp').os,
                    authorization:layui.data(setter.jwtKey).jwtKey
                },
                totalRow:true,
                page:true,
                text:{
                    none:'暂无杂工工资记录'
                },
                height: setter.tableHeight,
                where:{
                    expenseType:financeSetter.financeType.backManOut
                },
                parseData: function(res){ //res 即为原始返回的数据
                    if (setter.accessStatus(res,this)) {
                        return false;
                    }
                    let result =  {
                        code: 0, //解析接口状态
                        msg: '获取数据成功', //解析提示文本
                        count: res.data.total, //解析数据长度
                        data: res.data.rows //解析数据列表
                    };
                    return result;
                },
                cols: [[{
                    type: "checkbox",
                    fixed: "left"
                },
                    {
                        field: "",
                        width: 60,
                        title: "序号",
                        align: 'center',
                        // sort: !0,
                        templet: function(obj){
                            return '<span>'+ obj.LAY_INDEX +'</span>'
                        },
                        totalRowText:"合计"
                    },
                    {
                        field: "expenseName",
                        title: "支出款项名称"
                    },
                    {
                        field: "moneyExpense",
                        title: "支出金额",
                        totalRow: true
                    },
                    {
                        field: "createPerson",
                        title: "支出人员"
                    },
                    {
                        field: "createTime",
                        title: "支出日期",
                        width:180,
                        sort: false
                    },
                    {
                        field: "remark",
                        title: "备注"
                    },
                    {
                        title: "操作",
                        width: 270,
                        align: "center",
                        fixed: "right",
                        toolbar: "#table-backMan-admin"
                    }]]
            }),
            table.on("tool(PAGE-backMan-list)",
                function(e) {
                    let data =e.data;
                    if ("del" === e.event) layer.prompt({
                            formType: 1,
                            title: "敏感操作，请验证口令"
                        },
                        function(t, i) {
                            layer.close(i),
                                layer.confirm("确定删除此管理员？",
                                    function(t) {
                                        console.log(e),
                                            e.del(),
                                            layer.close(t)
                                    })
                        });
                    else if ("edit" === e.event) {
                        t(e.tr);
                        layer.open({
                            type: 2,
                            title: "编辑用户",
                            content: "../../../views/user/administrators/adminform.html",
                            area: ["440px", "540px"],
                            btn: ["确定", "取消"],
                            yes: function(e, t) {
                                let l = window["layui-layer-iframe" + e],
                                    r = "LAY-user-back-submit",
                                    n = t.find("iframe").contents().find("#" + r);
                                l.layui.form.on("submit(" + r + ")",
                                    function(t) {
                                        t.field;
                                        console.log(t.field);
                                        i.reload("LAY-user-front-submit"),
                                            layer.close(e)
                                    }),
                                    n.trigger("click")
                            },
                            success: function(layero, index) {
                                let body = layui.layer.getChildFrame('body', index);

                            }
                        })
                    }
                }),

            //初始化项目管理工资信息分页
            table.render({
                elem: "#PAGE-manage-list",
                url: reqSetter.requestPath.itemExpensePageApi,
                loading:true,
                headers:{
                    username: layui.data(setter.appIdKey).appIdKey,
                    deviceInfo:layui.device('myapp').os,
                    authorization:layui.data(setter.jwtKey).jwtKey
                },
                totalRow:true,
                page:true,
                text:{
                    none:'暂无管理工资记录'
                },
                height: setter.tableHeight,
                where:{
                    expenseType:financeSetter.financeType.manageOut
                },
                parseData: function(res){ //res 即为原始返回的数据
                    if (setter.accessStatus(res,this)) {
                        return false;
                    }
                    let result =  {
                        code: 0, //解析接口状态
                        msg: '获取数据成功', //解析提示文本
                        count: res.data.total, //解析数据长度
                        data: res.data.rows //解析数据列表
                    };
                    return result;
                },
                cols: [[{
                    type: "checkbox",
                    fixed: "left"
                },
                    {
                        field: "",
                        width: 60,
                        title: "序号",
                        align: 'center',
                        // sort: !0,
                        templet: function(obj){
                            return '<span>'+ obj.LAY_INDEX +'</span>'
                        },
                        totalRowText:"合计"
                    },
                    {
                        field: "expenseName",
                        title: "支出款项名称"
                    },
                    {
                        field: "moneyExpense",
                        title: "支出金额",
                        totalRow: true
                    },
                    {
                        field: "createPerson",
                        title: "支出人员"
                    },
                    {
                        field: "createTime",
                        title: "支出日期",
                        width:180,
                        sort: false
                    },
                    {
                        field: "remark",
                        title: "备注"
                    },
                    {
                        title: "操作",
                        width: 270,
                        align: "center",
                        fixed: "right",
                        toolbar: "#table-manage-admin"
                    }]]
            }),
            table.on("tool(PAGE-manage-list)",
                function(e) {
                    let data =e.data;
                    if ("del" === e.event) layer.prompt({
                            formType: 1,
                            title: "敏感操作，请验证口令"
                        },
                        function(t, i) {
                            layer.close(i),
                                layer.confirm("确定删除此管理员？",
                                    function(t) {
                                        console.log(e),
                                            e.del(),
                                            layer.close(t)
                                    })
                        });
                    else if ("edit" === e.event) {
                        t(e.tr);
                        layer.open({
                            type: 2,
                            title: "编辑用户",
                            content: "../../../views/user/administrators/adminform.html",
                            area: ["440px", "540px"],
                            btn: ["确定", "取消"],
                            yes: function(e, t) {
                                let l = window["layui-layer-iframe" + e],
                                    r = "LAY-user-back-submit",
                                    n = t.find("iframe").contents().find("#" + r);
                                l.layui.form.on("submit(" + r + ")",
                                    function(t) {
                                        t.field;
                                        console.log(t.field);
                                        i.reload("LAY-user-front-submit"),
                                            layer.close(e)
                                    }),
                                    n.trigger("click")
                            },
                            success: function(layero, index) {
                                let body = layui.layer.getChildFrame('body', index);

                            }
                        })
                    }
                }),
            //初始化项目差旅招待信息分页
            table.render({
                elem: "#PAGE-travel-list",
                url: reqSetter.requestPath.itemExpensePageApi,
                loading:true,
                headers:{
                    username: layui.data(setter.appIdKey).appIdKey,
                    deviceInfo:layui.device('myapp').os,
                    authorization:layui.data(setter.jwtKey).jwtKey
                },
                totalRow:true,
                page:true,
                text:{
                    none:'暂无差旅招待记录'
                },
                height: setter.tableHeight,
                where:{
                    expenseType:financeSetter.financeType.travelOut
                },
                parseData: function(res){ //res 即为原始返回的数据
                    if (setter.accessStatus(res,this)) {
                        return false;
                    }
                    let result =  {
                        code: 0, //解析接口状态
                        msg: '获取数据成功', //解析提示文本
                        count: res.data.total, //解析数据长度
                        data: res.data.rows //解析数据列表
                    };
                    return result;
                },
                cols: [[{
                    type: "checkbox",
                    fixed: "left"
                },
                    {
                        field: "",
                        width: 60,
                        title: "序号",
                        align: 'center',
                        // sort: !0,
                        templet: function(obj){
                            return '<span>'+ obj.LAY_INDEX +'</span>'
                        },
                        totalRowText:"合计"
                    },
                    {
                        field: "expenseName",
                        title: "支出款项名称"
                    },
                    {
                        field: "moneyExpense",
                        title: "支出金额",
                        totalRow: true
                    },
                    {
                        field: "createPerson",
                        title: "支出人员"
                    },
                    {
                        field: "createTime",
                        title: "支出日期",
                        width:180,
                        sort: false
                    },
                    {
                        field: "remark",
                        title: "备注"
                    },
                    {
                        title: "操作",
                        width: 270,
                        align: "center",
                        fixed: "right",
                        toolbar: "#table-travel-admin"
                    }]]
            }),
            table.on("tool(PAGE-travel-list)",
                function(e) {
                    let data =e.data;
                    if ("del" === e.event) layer.prompt({
                            formType: 1,
                            title: "敏感操作，请验证口令"
                        },
                        function(t, i) {
                            layer.close(i),
                                layer.confirm("确定删除此管理员？",
                                    function(t) {
                                        console.log(e),
                                            e.del(),
                                            layer.close(t)
                                    })
                        });
                    else if ("edit" === e.event) {
                        t(e.tr);
                        layer.open({
                            type: 2,
                            title: "编辑用户",
                            content: "../../../views/user/administrators/adminform.html",
                            area: ["440px", "540px"],
                            btn: ["确定", "取消"],
                            yes: function(e, t) {
                                let l = window["layui-layer-iframe" + e],
                                    r = "LAY-user-back-submit",
                                    n = t.find("iframe").contents().find("#" + r);
                                l.layui.form.on("submit(" + r + ")",
                                    function(t) {
                                        t.field;
                                        console.log(t.field);
                                        i.reload("LAY-user-front-submit"),
                                            layer.close(e)
                                    }),
                                    n.trigger("click")
                            },
                            success: function(layero, index) {
                                let body = layui.layer.getChildFrame('body', index);

                            }
                        })
                    }
                }),

            //初始化项目办公用品信息分页
            table.render({
                elem: "#PAGE-work-list",
                url: reqSetter.requestPath.itemExpensePageApi,
                loading:true,
                headers:{
                    username: layui.data(setter.appIdKey).appIdKey,
                    deviceInfo:layui.device('myapp').os,
                    authorization:layui.data(setter.jwtKey).jwtKey
                },
                totalRow:true,
                page:true,
                text:{
                    none:'暂无办公用品记录'
                },
                height: setter.tableHeight,
                where:{
                    expenseType:financeSetter.financeType.workOut
                },
                parseData: function(res){ //res 即为原始返回的数据
                    if (setter.accessStatus(res,this)) {
                        return false;
                    }
                    let result =  {
                        code: 0, //解析接口状态
                        msg: '获取数据成功', //解析提示文本
                        count: res.data.total, //解析数据长度
                        data: res.data.rows //解析数据列表
                    };
                    return result;
                },
                cols: [[{
                    type: "checkbox",
                    fixed: "left"
                },
                    {
                        field: "",
                        width: 60,
                        title: "序号",
                        align: 'center',
                        // sort: !0,
                        templet: function(obj){
                            return '<span>'+ obj.LAY_INDEX +'</span>'
                        },
                        totalRowText:"合计"
                    },
                    {
                        field: "expenseName",
                        title: "支出款项名称"
                    },
                    {
                        field: "moneyExpense",
                        title: "支出金额",
                        totalRow: true
                    },
                    {
                        field: "createPerson",
                        title: "支出人员"
                    },
                    {
                        field: "createTime",
                        title: "支出日期",
                        width:180,
                        sort: false
                    },
                    {
                        field: "remark",
                        title: "备注"
                    },
                    {
                        title: "操作",
                        width: 270,
                        align: "center",
                        fixed: "right",
                        toolbar: "#table-work-admin"
                    }]]
            }),
            table.on("tool(PAGE-work-list)",
                function(e) {
                    let data =e.data;
                    if ("del" === e.event) layer.prompt({
                            formType: 1,
                            title: "敏感操作，请验证口令"
                        },
                        function(t, i) {
                            layer.close(i),
                                layer.confirm("确定删除此管理员？",
                                    function(t) {
                                        console.log(e),
                                            e.del(),
                                            layer.close(t)
                                    })
                        });
                    else if ("edit" === e.event) {
                        t(e.tr);
                        layer.open({
                            type: 2,
                            title: "编辑用户",
                            content: "../../../views/user/administrators/adminform.html",
                            area: ["440px", "540px"],
                            btn: ["确定", "取消"],
                            yes: function(e, t) {
                                let l = window["layui-layer-iframe" + e],
                                    r = "LAY-user-back-submit",
                                    n = t.find("iframe").contents().find("#" + r);
                                l.layui.form.on("submit(" + r + ")",
                                    function(t) {
                                        t.field;
                                        console.log(t.field);
                                        i.reload("LAY-user-front-submit"),
                                            layer.close(e)
                                    }),
                                    n.trigger("click")
                            },
                            success: function(layero, index) {
                                let body = layui.layer.getChildFrame('body', index);

                            }
                        })
                    }
                }),
            //初始化项目机械消耗信息分页
            table.render({
                elem: "#PAGE-car-list",
                url: reqSetter.requestPath.itemExpensePageApi,
                loading:true,
                headers:{
                    username: layui.data(setter.appIdKey).appIdKey,
                    deviceInfo:layui.device('myapp').os,
                    authorization:layui.data(setter.jwtKey).jwtKey
                },
                totalRow:true,
                page:true,
                text:{
                    none:'暂无机械消耗记录'
                },
                height: setter.tableHeight,
                where:{
                    expenseType:financeSetter.financeType.carOut
                },
                parseData: function(res){ //res 即为原始返回的数据
                    if (setter.accessStatus(res,this)) {
                        return false;
                    }
                    let result =  {
                        code: 0, //解析接口状态
                        msg: '获取数据成功', //解析提示文本
                        count: res.data.total, //解析数据长度
                        data: res.data.rows //解析数据列表
                    };
                    return result;
                },
                cols: [[{
                    type: "checkbox",
                    fixed: "left"
                },
                    {
                        field: "",
                        width: 60,
                        title: "序号",
                        align: 'center',
                        // sort: !0,
                        templet: function(obj){
                            return '<span>'+ obj.LAY_INDEX +'</span>'
                        },
                        totalRowText:"合计"
                    },
                    {
                        field: "expenseName",
                        title: "支出款项名称"
                    },
                    {
                        field: "moneyExpense",
                        title: "支出金额",
                        totalRow: true
                    },
                    {
                        field: "createPerson",
                        title: "支出人员"
                    },
                    {
                        field: "createTime",
                        title: "支出日期",
                        width:180,
                        sort: false
                    },
                    {
                        field: "remark",
                        title: "备注"
                    },
                    {
                        title: "操作",
                        width: 270,
                        align: "center",
                        fixed: "right",
                        toolbar: "#table-car-admin"
                    }]]
            }),
            table.on("tool(PAGE-car-list)",
                function(e) {
                    let data =e.data;
                    if ("del" === e.event) layer.prompt({
                            formType: 1,
                            title: "敏感操作，请验证口令"
                        },
                        function(t, i) {
                            layer.close(i),
                                layer.confirm("确定删除此管理员？",
                                    function(t) {
                                        console.log(e),
                                            e.del(),
                                            layer.close(t)
                                    })
                        });
                    else if ("edit" === e.event) {
                        t(e.tr);
                        layer.open({
                            type: 2,
                            title: "编辑用户",
                            content: "../../../views/user/administrators/adminform.html",
                            area: ["440px", "540px"],
                            btn: ["确定", "取消"],
                            yes: function(e, t) {
                                let l = window["layui-layer-iframe" + e],
                                    r = "LAY-user-back-submit",
                                    n = t.find("iframe").contents().find("#" + r);
                                l.layui.form.on("submit(" + r + ")",
                                    function(t) {
                                        t.field;
                                        console.log(t.field);
                                        i.reload("LAY-user-front-submit"),
                                            layer.close(e)
                                    }),
                                    n.trigger("click")
                            },
                            success: function(layero, index) {
                                let body = layui.layer.getChildFrame('body', index);

                            }
                        })
                    }
                }),
            //初始化项目机械耗油信息分页
            table.render({
                elem: "#PAGE-oilConsumption-list",
                url: reqSetter.requestPath.itemExpensePageApi,
                loading:true,
                headers:{
                    username: layui.data(setter.appIdKey).appIdKey,
                    deviceInfo:layui.device('myapp').os,
                    authorization:layui.data(setter.jwtKey).jwtKey
                },
                totalRow:true,
                page:true,
                text:{
                    none:'暂无机械耗油记录'
                },
                height: setter.tableHeight,
                where:{
                    expenseType:financeSetter.financeType.oilConsumptionOut
                },
                parseData: function(res){ //res 即为原始返回的数据
                    if (setter.accessStatus(res,this)) {
                        return false;
                    }
                    let result =  {
                        code: 0, //解析接口状态
                        msg: '获取数据成功', //解析提示文本
                        count: res.data.total, //解析数据长度
                        data: res.data.rows //解析数据列表
                    };
                    return result;
                },
                cols: [[{
                    type: "checkbox",
                    fixed: "left"
                },
                    {
                        field: "",
                        width: 60,
                        title: "序号",
                        align: 'center',
                        // sort: !0,
                        templet: function(obj){
                            return '<span>'+ obj.LAY_INDEX +'</span>'
                        },
                        totalRowText:"合计"
                    },
                    {
                        field: "expenseName",
                        title: "支出款项名称"
                    },
                    {
                        field: "moneyExpense",
                        title: "支出金额",
                        totalRow: true
                    },
                    {
                        field: "createPerson",
                        title: "支出人员"
                    },
                    {
                        field: "createTime",
                        title: "支出日期",
                        width:180,
                        sort: false
                    },
                    {
                        field: "remark",
                        title: "备注"
                    },
                    {
                        title: "操作",
                        width: 270,
                        align: "center",
                        fixed: "right",
                        toolbar: "#table-oilConsumption-admin"
                    }]]
            }),
            table.on("tool(PAGE-oilConsumption-list)",
                function(e) {
                    let data =e.data;
                    if ("del" === e.event) layer.prompt({
                            formType: 1,
                            title: "敏感操作，请验证口令"
                        },
                        function(t, i) {
                            layer.close(i),
                                layer.confirm("确定删除此管理员？",
                                    function(t) {
                                        console.log(e),
                                            e.del(),
                                            layer.close(t)
                                    })
                        });
                    else if ("edit" === e.event) {
                        t(e.tr);
                        layer.open({
                            type: 2,
                            title: "编辑用户",
                            content: "../../../views/user/administrators/adminform.html",
                            area: ["440px", "540px"],
                            btn: ["确定", "取消"],
                            yes: function(e, t) {
                                let l = window["layui-layer-iframe" + e],
                                    r = "LAY-user-back-submit",
                                    n = t.find("iframe").contents().find("#" + r);
                                l.layui.form.on("submit(" + r + ")",
                                    function(t) {
                                        t.field;
                                        console.log(t.field);
                                        i.reload("LAY-user-front-submit"),
                                            layer.close(e)
                                    }),
                                    n.trigger("click")
                            },
                            success: function(layero, index) {
                                let body = layui.layer.getChildFrame('body', index);

                            }
                        })
                    }
                }),
            //初始化项目其他费用信息分页
            table.render({
                elem: "#PAGE-elseExpense-list",
                url: reqSetter.requestPath.itemExpensePageApi,
                loading:true,
                headers:{
                    username: layui.data(setter.appIdKey).appIdKey,
                    deviceInfo:layui.device('myapp').os,
                    authorization:layui.data(setter.jwtKey).jwtKey
                },
                totalRow:true,
                page:true,
                text:{
                    none:'暂无其他费用记录'
                },
                height: setter.tableHeight,
                where:{
                    expenseType:financeSetter.financeType.elseExpenseOut
                },
                parseData: function(res){ //res 即为原始返回的数据
                    if (setter.accessStatus(res,this)) {
                        return false;
                    }
                    let result =  {
                        code: 0, //解析接口状态
                        msg: '获取数据成功', //解析提示文本
                        count: res.data.total, //解析数据长度
                        data: res.data.rows //解析数据列表
                    };
                    return result;
                },
                cols: [[{
                    type: "checkbox",
                    fixed: "left"
                },
                    {
                        field: "",
                        width: 60,
                        title: "序号",
                        align: 'center',
                        // sort: !0,
                        templet: function(obj){
                            return '<span>'+ obj.LAY_INDEX +'</span>'
                        },
                        totalRowText:"合计"
                    },
                    {
                        field: "expenseName",
                        title: "支出款项名称"
                    },
                    {
                        field: "moneyExpense",
                        title: "支出金额",
                        totalRow: true
                    },
                    {
                        field: "createPerson",
                        title: "支出人员"
                    },
                    {
                        field: "createTime",
                        title: "支出日期",
                        width:180,
                        sort: false
                    },
                    {
                        field: "remark",
                        title: "备注"
                    },
                    {
                        title: "操作",
                        width: 270,
                        align: "center",
                        fixed: "right",
                        toolbar: "#table-elseExpense-admin"
                    }]]
            }),
            table.on("tool(PAGE-elseExpense-list)",
                function(e) {
                    let data =e.data;
                    if ("del" === e.event) layer.prompt({
                            formType: 1,
                            title: "敏感操作，请验证口令"
                        },
                        function(t, i) {
                            layer.close(i),
                                layer.confirm("确定删除此管理员？",
                                    function(t) {
                                        console.log(e),
                                            e.del(),
                                            layer.close(t)
                                    })
                        });
                    else if ("edit" === e.event) {
                        t(e.tr);
                        layer.open({
                            type: 2,
                            title: "编辑用户",
                            content: "../../../views/user/administrators/adminform.html",
                            area: ["440px", "540px"],
                            btn: ["确定", "取消"],
                            yes: function(e, t) {
                                let l = window["layui-layer-iframe" + e],
                                    r = "LAY-user-back-submit",
                                    n = t.find("iframe").contents().find("#" + r);
                                l.layui.form.on("submit(" + r + ")",
                                    function(t) {
                                        t.field;
                                        console.log(t.field);
                                        i.reload("LAY-user-front-submit"),
                                            layer.close(e)
                                    }),
                                    n.trigger("click")
                            },
                            success: function(layero, index) {
                                let body = layui.layer.getChildFrame('body', index);

                            }
                        })
                    }
                }),
            e("finance/itemexpense", {})
    });