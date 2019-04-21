layui.define(["table", "form"],
    function(e) {
        var t = layui.$,
            table = layui.table,
            setter = layui.setter,
            financeSetter = layui.financeSetter,
            reqSetter = layui.reqSetter,
            element = layui.element,
            form = layui.form;
//初始化项目现金入账信息分页
table.render({
    elem: "#PAGE-cash-list",
    url: reqSetter.requestPath.itemEarningPageApi,
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
        none:'暂无现金入账记录'
    },
    where:{
        earningType:financeSetter.financeType.moneyIn
    },
    parseData: function(res){ //res 即为原始返回的数据
        if (setter.accessStatus(res,this)) {
            return false;
        }
        var result =  {
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
            field: "earningName",
            title: "入账款项名称"
        },
        {
            field: "moneyEarning",
            title: "入账金额",
            totalRow: true
        },
        {
            field: "createPerson",
            title: "入账人员"
        },
        {
            field: "createTime",
            title: "入账日期",
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
            toolbar: "#table-cash-admin"
        }]]
}),
    table.on("tool(PAGE-cash-list)",
        function(e) {
            var data =e.data;
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
                        var l = window["layui-layer-iframe" + e],
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
                        var body = layui.layer.getChildFrame('body', index);
                        var roleList = layui.sessionData(layui.setter.roleKey);
                        if(roleList){
                            var list = roleList.roleKey;
                            for (let i = 0; i < list.length; i++) {
                                var option = '<option value="'+list[i].id+'">'+list[i].name+'</option>';
                                body.find("select[name='roleId']").append(option);
                            };
                        }
                        form.render("select");
                        // console.log(data);
                        form.render();
                    }
                })
            }
        }),
//初始化项目欠款入账信息分页
table.render({
    elem: "#PAGE-debt-list",
    url: reqSetter.requestPath.itemEarningPageApi,
    loading:true,
    headers:{
        username: layui.data(setter.appIdKey).appIdKey,
        deviceInfo:layui.device('myapp').os,
        authorization:layui.data(setter.jwtKey).jwtKey
    },
    totalRow:true,
    page:true,
    text:{
        none:'暂无欠款入账记录'
    },
    height: setter.tableHeight,
    where:{
        earningType:financeSetter.financeType.debtIn
    },
    parseData: function(res){ //res 即为原始返回的数据
        if (setter.accessStatus(res,this)) {
            return false;
        }
        var result =  {
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
            field: "earningName",
            title: "入账款项名称"
        },
        {
            field: "moneyEarning",
            title: "入账金额",
            totalRow: true
        },
        {
            field: "createPerson",
            title: "入账人员"
        },
        {
            field: "createTime",
            title: "入账日期",
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
            toolbar: "#table-debt-admin"
        }]]
}),
    table.on("tool(PAGE-debt-list)",
        function(e) {
            var data =e.data;
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
                        var l = window["layui-layer-iframe" + e],
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
                        var body = layui.layer.getChildFrame('body', index);
                        var roleList = layui.sessionData(layui.setter.roleKey);
                        if(roleList){
                            var list = roleList.roleKey;
                            for (let i = 0; i < list.length; i++) {
                                var option = '<option value="'+list[i].id+'">'+list[i].name+'</option>';
                                body.find("select[name='roleId']").append(option);
                            };
                        }
                        form.render("select");
                        // console.log(data);
                        form.render();
                    }
                })
            }
        }),
    e("finance/itemearning", {})
});