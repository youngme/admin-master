layui.define(["table", "form"],
    function(e) {
        var t = layui.$,
            table = layui.table,
            setter = layui.setter,
            form = layui.form,
            admin = layui.admin,
            layer = layui.layer;
        //初始化用户信息分页
        table.render({
            elem: "#PAGE-salary-list",
            url: layui.setter.reqBase + "salary/pageList",
            loading:true,
            headers:{
                username:'admin',
                deviceInfo:layui.device('myapp').os,
                authorization:layui.data(setter.jwtKey).jwtKey
            },
            text: {
                none: '当月暂无工资单' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
            },
            page: {
                prev:'上一页',
                next:'下一页',
                first:'第一页',
                last:'最后一页',
                groups:5,
                theme:'#29B6F6',
                layout:['prev', 'page', 'next','limit','count','first','last']
            }, //开启分页
            // page:true,
            parseData: function(res){ //res 即为原始返回的数据
                // console.log(res);
                if(res.code == 424){
                    location.href="../login.html";
                    return true;
                }
                _$count=res.data.total;
                // initPage();
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
                        },
                    fixed: 'left'
                },
                {
                    field: "realName",
                    title: "姓名",
                    width: 80,
                    fixed: 'left',
                    align: 'center',
                    style:'background-color: #80DEEA; color: #fff;'
                },
                {
                    field: "managePay",
                    title: "店长工资",
                    width: 90,
                    align: 'center',
                    edit: 'number'
                },
                {
                    field: "attendanceDays",
                    width: 90,
                    title: "出勤天数",
                    align: 'center',
                    edit: 'number'
                },
                {
                    field: "overtimeDays",
                    title: "加班天数",
                    width: 90,
                    align: 'center',
                    edit: 'number'
                },
                {
                    field: "basePay",
                    title: "基本工资",
                    width: 90,
                    align: 'center',
                    edit: 'number'
                },
                {
                    field: "seniorityPay",
                    title: "工龄工资",
                    width: 90,
                    align: 'center',
                    edit: 'number'
                },
                {
                    field: "allworkPay",
                    title: "全勤工资",
                    width: 90,
                    align: 'center',
                    edit: 'number'
                },
                {
                    field: "telephonePay",
                    title: "话补",
                    width: 60,
                    align: 'center',
                    edit: 'number'
                },
                {
                    field: "carPay",
                    title: "车补",
                    width: 60,
                    align: 'center',
                    edit: 'number'
                },
                {
                    field: "assistantPay",
                    title: "店助",
                    width: 70,
                    align: 'center',
                    edit: 'number'
                },
                {
                    field: "exhibitPay",
                    title: "陈列费",
                    width: 80,
                    align: 'center',
                    edit: 'number'
                },
                {
                    field: "overtimePay",
                    title: "加班费",
                    width: 80,
                    align: 'center',
                    edit: 'number'
                },
                {
                    field: "salesTask",
                    title: "销售任务",
                    width: 90,
                    align: 'center',
                    edit: 'number'
                },
                {
                    field: "salesFinish",
                    title: "本月销售",
                    width: 90,
                    align: 'center',
                    edit: 'number'
                },
                {
                    field: "",
                    title: "完成率",
                    width: 80,
                    align: 'center',
                    templet: function(obj){
                        if(obj.finishRate>=1)
                            return '<span style="color: green;">'+ (obj.finishRate*100) +'%</span>'
                        return '<span style="color: red;">'+ (obj.finishRate*100) +'%</span>'
                    }
                },
                {
                    field: "performancePay",
                    title: "绩效提成",
                    align: 'center',
                    width: 90,
                },
                {
                    field: "performanceBonus",
                    title: "绩效奖金",
                    align: 'center',
                    width: 90,
                    edit: 'number'
                },
                {
                    field: "deductFund",
                    title: "应扣款",
                    align: 'center',
                    width: 80,
                    edit: 'number'
                },
                {
                    field: "salaryPay",
                    title: "应发工资",
                    align: 'center',
                    width: 90,
                    fixed: 'right',
                    style:' color: #4CAF50;'
                },
                {
                    field: "practicalPay",
                    title: "实发工资",
                    align: 'center',
                    width: 90,
                    fixed: 'right',
                    style:'color: #9C27B0;'
                }
                // {
                //     title: "操作",
                //     width: 150,
                //     align: "center",
                //     fixed: "right",
                //     toolbar: "#table-useradmin-admin"
                // }
                ]]
            // text: "对不起，加载出现异常！"
        }), //监听单元格编辑
            table.on('edit(PAGE-salary-list)', function(obj){
                var value = obj.value //得到修改后的值
                    ,data = obj.data //得到所在行所有键值
                    ,field = obj.field; //得到字段
                if (isNaN(value)||value.length==0) {
                    layer.msg('请输入正确的值',{icon: 5});
                    obj.value=0;
                }else{
                    var param ={id:data.id};
                    for(var a in data){
                       if(a==field){
                           param[a]=value;
                       }
                    }
                    admin.req({
                        url: layui.setter.reqBase + 'salary/updateSalary' //实际使用请改成服务端真实接口
                        ,data: param
                        ,dataType:"json"
                        ,type:'POST'
                        ,timeout:5000
                        ,cache:false
                        ,crossDomain:true
                        ,beforeSend: function(xhr) {
                            xhr.withCredentials = true;
                        }
                        ,done: function(result){
                            //请求成功后，写入 access_token
                            if (result.code == 200) {
                                layer.msg('工资单更新成功',{icon: 1});
                                table.reload('PAGE-salary-list');
                            }else{
                                layer.msg('工资单更新失败',{icon: 2});
                            }
                        }
                    });
                }

            }),
            table.on("tool(PAGE-salary-list)",
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
            e("salary", {})
    });

