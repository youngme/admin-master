layui.define(["table", "form"],
    function(e) {
        var t = layui.$,
            table = layui.table,
            setter = layui.setter,
            reqSetter = layui.reqSetter,
            form = layui.form;
        //初始化用户信息分页
        table.render({
                elem: "#PAGE-user-list",
                url: reqSetter.requestPath.userPageApi,
                loading:true,
                headers:{
                    username: layui.data(setter.appIdKey).appIdKey,
                    deviceInfo:layui.device('myapp').os,
                    authorization:layui.data(setter.jwtKey).jwtKey
                },
                // page: {
                //     prev:'上一页',
                //     next:'下一页',
                //     first:'第一页',
                //     last:'最后一页',
                //     groups:5,
                //     theme:'#29B6F6',
                //     layout:['prev', 'page', 'next','limit','count','first','last']
                // }, //开启分页
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
                        field: "uid",
                        width: 80,
                        title: "ID",
                        sort: !0
                    },
                    {
                        field: "username",
                        title: "用户名"
                    },
                    {
                        field: "realName",
                        title: "姓名"
                    },
                    {
                        field: "phone",
                        title: "手机"
                    },
                    {
                        field: "email",
                        title: "邮箱"
                    },
                    {
                        field: "sex",
                        title: "性别",
                        templet: "#sexTpl",
                        width: 60,
                        align: "center"
                    },
                    {
                        field: "name",
                        title: "角色"
                    },
                    {
                        field: "createTime",
                        title: "加入时间",
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
                        width: 150,
                        align: "center",
                        fixed: "right",
                        toolbar: "#table-useradmin-admin"
                    }]],
                text: "对不起，加载出现异常！"
            }),
            table.on("tool(PAGE-user-list)",
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
                                console.log(data);
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
                    }
                }),

            //初始化角色分页
            table.render({
                elem: "#PAGE-user-role",
                url: reqSetter.requestPath.rolePageApi,
                loading:true,
                headers:{
                    username: layui.data(setter.appIdKey).appIdKey,
                    deviceInfo:layui.device('myapp').os,
                    authorization:layui.data(setter.jwtKey).jwtKey
                },
                text:{
                    none:"无数据"
                },
                page: true,
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
                        field: "id",
                        width: 80,
                        title: "ID",
                        sort: !0
                    },
                    {
                        field: "code",
                        title: "角色类型"
                    },
                    {
                        field: "name",
                        title: "角色名称"
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
                        width: 150,
                        align: "center",
                        fixed: "right",
                        toolbar: "#table-useradmin-admin"
                    }]],
                text: "对不起，加载出现异常！"
            }),
            table.on("tool(LAY-user-back-role)",
                function(e) {
                    e.data;
                    if ("del" === e.event) layer.confirm("确定删除此角色？",
                        function(t) {
                            e.del(),
                                layer.close(t)
                        });
                    else if ("edit" === e.event) {
                        t(e.tr);
                        layer.open({
                            type: 2,
                            title: "编辑角色",
                            content: "../../../views/user/administrators/roleInfo.html",
                            area: ["500px", "480px"],
                            btn: ["确定", "取消"],
                            yes: function(e, t) {
                                var l = window["layui-layer-iframe" + e],
                                    r = t.find("iframe").contents().find("#LAY-user-role-submit");
                                l.layui.form.on("submit(LAY-user-role-submit)",
                                    function(t) {
                                        t.field;
                                        table.reload("LAY-user-back-role"),
                                            layer.close(e)
                                    }),
                                    r.trigger("click")
                            },
                            success: function(e, t) {}
                        })
                    }
                }),


        //初始化系统资源分页
        table.render({
            elem: "#PAGE-user-permission",
            url: reqSetter.requestPath.permissionPageApi,
            loading:true,
            headers:{
                username: layui.data(setter.appIdKey).appIdKey,
                deviceInfo:layui.device('myapp').os,
                authorization:layui.data(setter.jwtKey).jwtKey
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
                    field: "code",
                    title: "权限类型"
                },
                {
                    field: "name",
                    title: "权限名称"
                },
                {
                    field: "method",
                    title: "请求类型"
                },
                {
                    field: "uri",
                    title: "请求路径",
                    minWidth:120
                },
                {
                    field: "roleName",
                    title: "角色名称",
                    minWidth:90
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
                    width: 150,
                    align: "center",
                    fixed: "right",
                    toolbar: "#table-useradmin-admin"
                }]],
            text: "对不起，加载出现异常！"
        }),
        table.on("tool(LAY-user-back-role)",
            function(e) {
                e.data;
                if ("del" === e.event) layer.confirm("确定删除此角色？",
                    function(t) {
                        e.del(),
                            layer.close(t)
                    });
                else if ("edit" === e.event) {
                    t(e.tr);
                    layer.open({
                        type: 2,
                        title: "添加",
                        content: "../../../views/user/administrators/permissionInfo.html",
                        area: ["500px", "480px"],
                        btn: ["确定", "取消"],
                        yes: function(e, t) {
                            var l = window["layui-layer-iframe" + e],
                                r = t.find("iframe").contents().find("#LAY-user-role-submit");
                            l.layui.form.on("submit(LAY-user-role-submit)",
                                function(t) {
                                    t.field;
                                    table.reload("LAY-user-back-role"),
                                        layer.close(e)
                                }),
                                r.trigger("click")
                        },
                        success: function(e, t) {}
                    })
                }
            }),

            e("useradmin", {})
    });