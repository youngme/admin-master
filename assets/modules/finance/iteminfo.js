layui.define(["table", "form",'laydate'],
    function(e) {
        let $ = layui.$
            , form = layui.form
            , setter = layui.setter
            , table = layui.table
            , laydate = layui.laydate
            , admin = layui.admin
            ,financeSetter = layui.financeSetter
            , reqSetter = layui.reqSetter
            , element = layui.element; //Tab的切换功能，切换事件监听等，需要依赖element模块


        //事件
        let active = {
            delCash: function(){
                let checkStatus = table.checkStatus('PAGE-cash-list')
                    ,checkData = checkStatus.data; //得到选中的数据

                if(checkData.length === 0){
                    return layer.msg('请选择数据');
                }

                layer.prompt({
                    formType: 1
                    ,title: '敏感操作，请验证口令'
                }, function(value, index){
                    layer.close(index);

                    layer.confirm('确定删除吗？', function(index) {

                        //执行 Ajax 后重载
                        /*
                        admin.req({
                          url: 'xxx'
                          //,……
                        });
                        */
                        table.reload('PAGE-cash-list');
                        layer.msg('已删除');
                    });
                });
            }
            ,addCash: function(){/*现金入账*/
                layer.open({
                    type: 2
                    ,title: '新增现金入账'
                    ,content: 'earningAdd.html'
                    ,zIndex: layer.zIndex //重点1
                    ,area: ['440px', '470px']
                    ,btn: ['保存', '取消']
                    ,yes: function(index, layero){
                        let iframeWindow = window['layui-layer-iframe'+ index]
                            ,submitID = 'LAY-save'
                            ,submit = layero.find('iframe').contents().find('#'+ submitID);
                        //监听提交
                        iframeWindow.layui.form.on('submit('+ submitID +')', function(data){
                            let field = data.field; //获取提交的字段
                            field.itemId = $("#ID-itemId").val();
                            field.earningType = financeSetter.financeType.moneyIn;
                            //提交 Ajax 成功后，静态更新表格中的数据
                            //获取角色列表
                            admin.req({
                                url: reqSetter.requestPath.itemEarningSaveApi
                                ,dataType:"json"
                                ,data:field
                                ,type:'POST'
                                ,headers:{
                                    username: layui.data(setter.appIdKey).appIdKey,
                                    deviceInfo:layui.device('myapp').os,
                                    authorization:layui.data(setter.jwtKey).jwtKey
                                }
                                ,timeout:5000
                                ,cache:false
                                ,crossDomain:true
                                ,beforeSend: function(xhr) {
                                    xhr.withCredentials = true;
                                }
                                ,done: function(result){
                                    layer.msg('入账成功', {
                                        offset: '15px'
                                        ,icon: 1
                                        ,time: 1000
                                    });
                                    table.reload("PAGE-cash-list"); //数据刷新
                                    layer.close(index); //关闭弹层
                                }
                            });
                        });

                        submit.trigger('click');
                    }
                    ,success:function(layero,index){
                        layer.setTop(layero); //重点2
                        laydate.render({
                            elem: '#LAY-createTime'
                            ,zIndex: 99999999
                            ,format: 'yyyy年MM月dd日'
                        });

                    }
                });
            },addDebt: function(){/*欠款入账*/
                layer.open({
                    type: 2
                    ,title: '新增欠款入账'
                    ,content: 'earningAdd.html'
                    ,zIndex: layer.zIndex //重点1
                    ,area: ['440px', '470px']
                    ,btn: ['保存', '取消']
                    ,yes: function(index, layero){
                        let iframeWindow = window['layui-layer-iframe'+ index]
                            ,submitID = 'LAY-save'
                            ,submit = layero.find('iframe').contents().find('#'+ submitID);
                        //监听提交
                        iframeWindow.layui.form.on('submit('+ submitID +')', function(data){
                            let field = data.field; //获取提交的字段
                            field.itemId = $("#ID-itemId").val();
                            field.earningType = financeSetter.financeType.debtIn;
                            //提交 Ajax 成功后，静态更新表格中的数据
                            //获取角色列表
                            admin.req({
                                url: reqSetter.requestPath.itemEarningSaveApi
                                ,dataType:"json"
                                ,data:field
                                ,type:'POST'
                                ,headers:{
                                    username: layui.data(setter.appIdKey).appIdKey,
                                    deviceInfo:layui.device('myapp').os,
                                    authorization:layui.data(setter.jwtKey).jwtKey
                                }
                                ,timeout:5000
                                ,cache:false
                                ,crossDomain:true
                                ,beforeSend: function(xhr) {
                                    xhr.withCredentials = true;
                                }
                                ,done: function(result){
                                    layer.msg('入账成功', {
                                        offset: '15px'
                                        ,icon: 1
                                        ,time: 1000
                                    });
                                    table.reload("PAGE-debt-list"); //数据刷新
                                    layer.close(index); //关闭弹层
                                }
                            });
                        });

                        submit.trigger('click');
                    }
                    ,success:function(layero,index){
                        layer.setTop(layero); //重点2
                        laydate.render({
                            elem: '#LAY-createTime'
                            ,zIndex: 99999999
                            ,format: 'yyyy年MM月dd日'
                        });

                    }
                });
            },addMaterials: function(){/*材料采购*/
                layer.open({
                    type: 2
                    ,title: '新增材料采购'
                    ,content: 'expenseAdd.html'
                    ,zIndex: layer.zIndex //重点1
                    ,area: ['440px', '470px']
                    ,btn: ['保存', '取消']
                    ,yes: function(index, layero){
                        let iframeWindow = window['layui-layer-iframe'+ index]
                            ,submitID = 'LAY-save'
                            ,submit = layero.find('iframe').contents().find('#'+ submitID);
                        //监听提交
                        iframeWindow.layui.form.on('submit('+ submitID +')', function(data){
                            let field = data.field; //获取提交的字段
                            field.itemId = $("#ID-itemId").val();
                            field.expenseType = financeSetter.financeType.materialsOut;
                            //提交 Ajax 成功后，静态更新表格中的数据
                            //获取角色列表
                            admin.req({
                                url: reqSetter.requestPath.itemExpenseSaveApi
                                ,dataType:"json"
                                ,data:field
                                ,type:'POST'
                                ,headers:{
                                    username: layui.data(setter.appIdKey).appIdKey,
                                    deviceInfo:layui.device('myapp').os,
                                    authorization:layui.data(setter.jwtKey).jwtKey
                                }
                                ,timeout:5000
                                ,cache:false
                                ,crossDomain:true
                                ,beforeSend: function(xhr) {
                                    xhr.withCredentials = true;
                                }
                                ,done: function(result){
                                    layer.msg('支出成功', {
                                        offset: '15px'
                                        ,icon: 1
                                        ,time: 1000
                                    });
                                    table.reload("PAGE-materials-list"); //数据刷新
                                    layer.close(index); //关闭弹层
                                }
                            });
                        });

                        submit.trigger('click');
                    }
                    ,success:function(layero,index){
                        layer.setTop(layero); //重点2
                        laydate.render({
                            elem: '#LAY-createTime'
                            ,zIndex: 99999999
                            ,format: 'yyyy年MM月dd日'
                        });

                    }
                });
            },addRepast: function(){/*灶务采购*/
                layer.open({
                    type: 2
                    ,title: '新增灶务采购'
                    ,content: 'expenseAdd.html'
                    ,zIndex: layer.zIndex //重点1
                    ,area: ['440px', '470px']
                    ,btn: ['保存', '取消']
                    ,yes: function(index, layero){
                        let iframeWindow = window['layui-layer-iframe'+ index]
                            ,submitID = 'LAY-save'
                            ,submit = layero.find('iframe').contents().find('#'+ submitID);
                        //监听提交
                        iframeWindow.layui.form.on('submit('+ submitID +')', function(data){
                            let field = data.field; //获取提交的字段
                            field.itemId = $("#ID-itemId").val();
                            field.expenseType = financeSetter.financeType.repastOut;
                            //提交 Ajax 成功后，静态更新表格中的数据
                            //获取角色列表
                            admin.req({
                                url: reqSetter.requestPath.itemExpenseSaveApi
                                ,dataType:"json"
                                ,data:field
                                ,type:'POST'
                                ,headers:{
                                    username: layui.data(setter.appIdKey).appIdKey,
                                    deviceInfo:layui.device('myapp').os,
                                    authorization:layui.data(setter.jwtKey).jwtKey
                                }
                                ,timeout:5000
                                ,cache:false
                                ,crossDomain:true
                                ,beforeSend: function(xhr) {
                                    xhr.withCredentials = true;
                                }
                                ,done: function(result){
                                    layer.msg('支出成功', {
                                        offset: '15px'
                                        ,icon: 1
                                        ,time: 1000
                                    });
                                    table.reload("PAGE-repast-list"); //数据刷新
                                    layer.close(index); //关闭弹层
                                }
                            });
                        });

                        submit.trigger('click');
                    }
                    ,success:function(layero,index){
                        layer.setTop(layero); //重点2
                        laydate.render({
                            elem: '#LAY-createTime'
                            ,zIndex: 99999999
                            ,format: 'yyyy年MM月dd日'
                        });

                    }
                });
            },addBackMan: function(){/*杂工工资*/
                layer.open({
                    type: 2
                    ,title: '新增杂工工资'
                    ,content: 'expenseAdd.html'
                    ,zIndex: layer.zIndex //重点1
                    ,area: ['440px', '470px']
                    ,btn: ['保存', '取消']
                    ,yes: function(index, layero){
                        let iframeWindow = window['layui-layer-iframe'+ index]
                            ,submitID = 'LAY-save'
                            ,submit = layero.find('iframe').contents().find('#'+ submitID);
                        //监听提交
                        iframeWindow.layui.form.on('submit('+ submitID +')', function(data){
                            let field = data.field; //获取提交的字段
                            field.itemId = $("#ID-itemId").val();
                            field.expenseType = financeSetter.financeType.backManOut;
                            //提交 Ajax 成功后，静态更新表格中的数据
                            //获取角色列表
                            admin.req({
                                url: reqSetter.requestPath.itemExpenseSaveApi
                                ,dataType:"json"
                                ,data:field
                                ,type:'POST'
                                ,headers:{
                                    username: layui.data(setter.appIdKey).appIdKey,
                                    deviceInfo:layui.device('myapp').os,
                                    authorization:layui.data(setter.jwtKey).jwtKey
                                }
                                ,timeout:5000
                                ,cache:false
                                ,crossDomain:true
                                ,beforeSend: function(xhr) {
                                    xhr.withCredentials = true;
                                }
                                ,done: function(result){
                                    layer.msg('支出成功', {
                                        offset: '15px'
                                        ,icon: 1
                                        ,time: 1000
                                    });
                                    table.reload("PAGE-backMan-list"); //数据刷新
                                    layer.close(index); //关闭弹层
                                }
                            });
                        });

                        submit.trigger('click');
                    }
                    ,success:function(layero,index){
                        layer.setTop(layero); //重点2
                        laydate.render({
                            elem: '#LAY-createTime'
                            ,zIndex: 99999999
                            ,format: 'yyyy年MM月dd日'
                        });

                    }
                });
            },addManage: function(){/*管理工资*/
                layer.open({
                    type: 2
                    ,title: '新增管理工资'
                    ,content: 'expenseAdd.html'
                    ,zIndex: layer.zIndex //重点1
                    ,area: ['440px', '470px']
                    ,btn: ['保存', '取消']
                    ,yes: function(index, layero){
                        let iframeWindow = window['layui-layer-iframe'+ index]
                            ,submitID = 'LAY-save'
                            ,submit = layero.find('iframe').contents().find('#'+ submitID);
                        //监听提交
                        iframeWindow.layui.form.on('submit('+ submitID +')', function(data){
                            let field = data.field; //获取提交的字段
                            field.itemId = $("#ID-itemId").val();
                            field.expenseType = financeSetter.financeType.manageOut;
                            //提交 Ajax 成功后，静态更新表格中的数据
                            //获取角色列表
                            admin.req({
                                url: reqSetter.requestPath.itemExpenseSaveApi
                                ,dataType:"json"
                                ,data:field
                                ,type:'POST'
                                ,headers:{
                                    username: layui.data(setter.appIdKey).appIdKey,
                                    deviceInfo:layui.device('myapp').os,
                                    authorization:layui.data(setter.jwtKey).jwtKey
                                }
                                ,timeout:5000
                                ,cache:false
                                ,crossDomain:true
                                ,beforeSend: function(xhr) {
                                    xhr.withCredentials = true;
                                }
                                ,done: function(result){
                                    layer.msg('支出成功', {
                                        offset: '15px'
                                        ,icon: 1
                                        ,time: 1000
                                    });
                                    table.reload("PAGE-manage-list"); //数据刷新
                                    layer.close(index); //关闭弹层
                                }
                            });
                        });

                        submit.trigger('click');
                    }
                    ,success:function(layero,index){
                        layer.setTop(layero); //重点2
                        laydate.render({
                            elem: '#LAY-createTime'
                            ,zIndex: 99999999
                            ,format: 'yyyy年MM月dd日'
                        });

                    }
                });
            },addTravel: function(){/*差旅招待*/
                layer.open({
                    type: 2
                    ,title: '新增管理工资'
                    ,content: 'expenseAdd.html'
                    ,zIndex: layer.zIndex //重点1
                    ,area: ['440px', '470px']
                    ,btn: ['保存', '取消']
                    ,yes: function(index, layero){
                        let iframeWindow = window['layui-layer-iframe'+ index]
                            ,submitID = 'LAY-save'
                            ,submit = layero.find('iframe').contents().find('#'+ submitID);
                        //监听提交
                        iframeWindow.layui.form.on('submit('+ submitID +')', function(data){
                            let field = data.field; //获取提交的字段
                            field.itemId = $("#ID-itemId").val();
                            field.expenseType = financeSetter.financeType.travelOut;
                            //提交 Ajax 成功后，静态更新表格中的数据
                            //获取角色列表
                            admin.req({
                                url: reqSetter.requestPath.itemExpenseSaveApi
                                ,dataType:"json"
                                ,data:field
                                ,type:'POST'
                                ,headers:{
                                    username: layui.data(setter.appIdKey).appIdKey,
                                    deviceInfo:layui.device('myapp').os,
                                    authorization:layui.data(setter.jwtKey).jwtKey
                                }
                                ,timeout:5000
                                ,cache:false
                                ,crossDomain:true
                                ,beforeSend: function(xhr) {
                                    xhr.withCredentials = true;
                                }
                                ,done: function(result){
                                    layer.msg('支出成功', {
                                        offset: '15px'
                                        ,icon: 1
                                        ,time: 1000
                                    });
                                    table.reload("PAGE-travel-list"); //数据刷新
                                    layer.close(index); //关闭弹层
                                }
                            });
                        });

                        submit.trigger('click');
                    }
                    ,success:function(layero,index){
                        layer.setTop(layero); //重点2
                        laydate.render({
                            elem: '#LAY-createTime'
                            ,zIndex: 99999999
                            ,format: 'yyyy年MM月dd日'
                        });

                    }
                });
            },addWork: function(){/*办公用品*/
                layer.open({
                    type: 2
                    ,title: '新增办公用品'
                    ,content: 'expenseAdd.html'
                    ,zIndex: layer.zIndex //重点1
                    ,area: ['440px', '470px']
                    ,btn: ['保存', '取消']
                    ,yes: function(index, layero){
                        let iframeWindow = window['layui-layer-iframe'+ index]
                            ,submitID = 'LAY-save'
                            ,submit = layero.find('iframe').contents().find('#'+ submitID);
                        //监听提交
                        iframeWindow.layui.form.on('submit('+ submitID +')', function(data){
                            let field = data.field; //获取提交的字段
                            field.itemId = $("#ID-itemId").val();
                            field.expenseType = financeSetter.financeType.workOut;
                            //提交 Ajax 成功后，静态更新表格中的数据
                            //获取角色列表
                            admin.req({
                                url: reqSetter.requestPath.itemExpenseSaveApi
                                ,dataType:"json"
                                ,data:field
                                ,type:'POST'
                                ,headers:{
                                    username: layui.data(setter.appIdKey).appIdKey,
                                    deviceInfo:layui.device('myapp').os,
                                    authorization:layui.data(setter.jwtKey).jwtKey
                                }
                                ,timeout:5000
                                ,cache:false
                                ,crossDomain:true
                                ,beforeSend: function(xhr) {
                                    xhr.withCredentials = true;
                                }
                                ,done: function(result){
                                    layer.msg('支出成功', {
                                        offset: '15px'
                                        ,icon: 1
                                        ,time: 1000
                                    });
                                    table.reload("PAGE-work-list"); //数据刷新
                                    layer.close(index); //关闭弹层
                                }
                            });
                        });

                        submit.trigger('click');
                    }
                    ,success:function(layero,index){
                        layer.setTop(layero); //重点2
                        laydate.render({
                            elem: '#LAY-createTime'
                            ,zIndex: 99999999
                            ,format: 'yyyy年MM月dd日'
                        });

                    }
                });
            },addCar: function(){/*机械消耗*/
                layer.open({
                    type: 2
                    ,title: '新增机械消耗'
                    ,content: 'expenseAdd.html'
                    ,zIndex: layer.zIndex //重点1
                    ,area: ['440px', '470px']
                    ,btn: ['保存', '取消']
                    ,yes: function(index, layero){
                        let iframeWindow = window['layui-layer-iframe'+ index]
                            ,submitID = 'LAY-save'
                            ,submit = layero.find('iframe').contents().find('#'+ submitID);
                        //监听提交
                        iframeWindow.layui.form.on('submit('+ submitID +')', function(data){
                            let field = data.field; //获取提交的字段
                            field.itemId = $("#ID-itemId").val();
                            field.expenseType = financeSetter.financeType.carOut;
                            //提交 Ajax 成功后，静态更新表格中的数据
                            //获取角色列表
                            admin.req({
                                url: reqSetter.requestPath.itemExpenseSaveApi
                                ,dataType:"json"
                                ,data:field
                                ,type:'POST'
                                ,headers:{
                                    username: layui.data(setter.appIdKey).appIdKey,
                                    deviceInfo:layui.device('myapp').os,
                                    authorization:layui.data(setter.jwtKey).jwtKey
                                }
                                ,timeout:5000
                                ,cache:false
                                ,crossDomain:true
                                ,beforeSend: function(xhr) {
                                    xhr.withCredentials = true;
                                }
                                ,done: function(result){
                                    layer.msg('支出成功', {
                                        offset: '15px'
                                        ,icon: 1
                                        ,time: 1000
                                    });
                                    table.reload("PAGE-car-list"); //数据刷新
                                    layer.close(index); //关闭弹层
                                }
                            });
                        });

                        submit.trigger('click');
                    }
                    ,success:function(layero,index){
                        layer.setTop(layero); //重点2
                        laydate.render({
                            elem: '#LAY-createTime'
                            ,zIndex: 99999999
                            ,format: 'yyyy年MM月dd日'
                        });

                    }
                });
            },addOilConsumption: function(){/*机械耗油*/
                layer.open({
                    type: 2
                    ,title: '新增机械耗油'
                    ,content: 'expenseAdd.html'
                    ,zIndex: layer.zIndex //重点1
                    ,area: ['440px', '470px']
                    ,btn: ['保存', '取消']
                    ,yes: function(index, layero){
                        let iframeWindow = window['layui-layer-iframe'+ index]
                            ,submitID = 'LAY-save'
                            ,submit = layero.find('iframe').contents().find('#'+ submitID);
                        //监听提交
                        iframeWindow.layui.form.on('submit('+ submitID +')', function(data){
                            let field = data.field; //获取提交的字段
                            field.itemId = $("#ID-itemId").val();
                            field.expenseType = financeSetter.financeType.oilConsumptionOut;
                            //提交 Ajax 成功后，静态更新表格中的数据
                            //获取角色列表
                            admin.req({
                                url: reqSetter.requestPath.itemExpenseSaveApi
                                ,dataType:"json"
                                ,data:field
                                ,type:'POST'
                                ,headers:{
                                    username: layui.data(setter.appIdKey).appIdKey,
                                    deviceInfo:layui.device('myapp').os,
                                    authorization:layui.data(setter.jwtKey).jwtKey
                                }
                                ,timeout:5000
                                ,cache:false
                                ,crossDomain:true
                                ,beforeSend: function(xhr) {
                                    xhr.withCredentials = true;
                                }
                                ,done: function(result){
                                    layer.msg('支出成功', {
                                        offset: '15px'
                                        ,icon: 1
                                        ,time: 1000
                                    });
                                    table.reload("PAGE-oilConsumption-list"); //数据刷新
                                    layer.close(index); //关闭弹层
                                }
                            });
                        });

                        submit.trigger('click');
                    }
                    ,success:function(layero,index){
                        layer.setTop(layero); //重点2
                        laydate.render({
                            elem: '#LAY-createTime'
                            ,zIndex: 99999999
                            ,format: 'yyyy年MM月dd日'
                        });

                    }
                });
            },addElseExpense: function(){/*其他费用*/
                layer.open({
                    type: 2
                    ,title: '新增其他费用'
                    ,content: 'expenseAdd.html'
                    ,zIndex: layer.zIndex //重点1
                    ,area: ['440px', '470px']
                    ,btn: ['保存', '取消']
                    ,yes: function(index, layero){
                        let iframeWindow = window['layui-layer-iframe'+ index]
                            ,submitID = 'LAY-save'
                            ,submit = layero.find('iframe').contents().find('#'+ submitID);
                        //监听提交
                        iframeWindow.layui.form.on('submit('+ submitID +')', function(data){
                            let field = data.field; //获取提交的字段
                            field.itemId = $("#ID-itemId").val();
                            field.expenseType = financeSetter.financeType.elseExpenseOut;
                            //提交 Ajax 成功后，静态更新表格中的数据
                            //获取角色列表
                            admin.req({
                                url: reqSetter.requestPath.itemExpenseSaveApi
                                ,dataType:"json"
                                ,data:field
                                ,type:'POST'
                                ,headers:{
                                    username: layui.data(setter.appIdKey).appIdKey,
                                    deviceInfo:layui.device('myapp').os,
                                    authorization:layui.data(setter.jwtKey).jwtKey
                                }
                                ,timeout:5000
                                ,cache:false
                                ,crossDomain:true
                                ,beforeSend: function(xhr) {
                                    xhr.withCredentials = true;
                                }
                                ,done: function(result){
                                    layer.msg('支出成功', {
                                        offset: '15px'
                                        ,icon: 1
                                        ,time: 1000
                                    });
                                    table.reload("PAGE-elseExpense-list"); //数据刷新
                                    layer.close(index); //关闭弹层
                                }
                            });
                        });

                        submit.trigger('click');
                    }
                    ,success:function(layero,index){
                        layer.setTop(layero); //重点2
                        laydate.render({
                            elem: '#LAY-createTime'
                            ,zIndex: 99999999
                            ,format: 'yyyy年MM月dd日'
                        });

                    }
                });
            }
        };
        //页面按钮事件监听
        $('.layui-btn.user-btn-manage').on('click', function(){
            let type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });

        e("finance/iteminfo", {})
});