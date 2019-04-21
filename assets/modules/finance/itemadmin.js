layui.define(["table", "form"],
    function(e) {
        var t = layui.$,
            table = layui.table,
            setter = layui.setter,
            financeSetter = layui.financeSetter,
            reqSetter = layui.reqSetter,
            element = layui.element,
            form = layui.form;
        //初始化项目信息分页
        table.render({
            elem: "#PAGE-item-list",
            url: reqSetter.requestPath.itemPageApi,
            loading:true,
            headers:{
                username: layui.data(setter.appIdKey).appIdKey,
                deviceInfo:layui.device('myapp').os,
                authorization:layui.data(setter.jwtKey).jwtKey
            },
            text:{
                none: '暂无项目信息'
            },
            page:true,
            parseData: function(res){ //res 即为原始返回的数据
                if (setter.accessStatus(res,this)) {
                    return false;
                }
                return {
                    "code": 0, //解析接口状态
                    "msg": '获取数据成功', //解析提示文本
                    "count": res.data.total, //解析数据长度
                    "data": res.data.rows //解析数据列表
                };
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
                    }
                },
                {
                    field: "itemName",
                    title: "项目名称"
                },
                {
                    field: "companyName",
                    title: "公司名称"
                },
                {
                    field: "earning",
                    title: "项目收入"
                },
                {
                    field: "expense",
                    title: "项目支出"
                },
                {
                    field: "createTime",
                    title: "项目创建日期",
                    width:180,
                    sort: false
                },
                {
                    field: "status",
                    title: "状态",
                    templet: "#statusTpl",
                    minWidth: 80,
                    align: "center"
                },
                {
                    title: "操作",
                    width: 270,
                    align: "center",
                    fixed: "right",
                    toolbar: "#table-useradmin-admin"
                }]]
        }),
            table.on("tool(PAGE-item-list)",
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
                                body.find('[name="username"]').val(data.username);
                                body.find('[name="roleId"]').val(data.roleId);
                                body.find('[name="email"]').val(data.email);
                                body.find('[name="realName"]').val(data.realName);
                                body.find('[name="password"]').val(data.password);
                                body.find('[name="phone"]').val(data.phone);
                                body.find('[name="sex"]').val(data.sex);
                                if(data.status==1){
                                    body.find('[name="status"]').attr("checked","checked");
                                }
                                form.render();
                            }
                        })
                    }else if ("info" === e.event) {
                        t(e.tr);
                        var itemName = data.itemName+"项目-资金明细";
                        var infoLayer = layer.open({
                            type: 2,
                            title: itemName,
                            skin:"layui-layer-lan",
                            content: "../../../views/finance/items/info.html",
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
                                body.find("#ID-itemId").val(data.id);
                                // form.render();
                            }
                        });
                        layer.full(infoLayer);
                    }
                }),
            e("finance/itemadmin", {})
    });