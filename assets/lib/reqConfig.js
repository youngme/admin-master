
layui.define(['laytpl', 'layer'], function(exports){
    exports('reqSetter', {
        requestPath:{
            loginApi: layui.setter.reqBase + "account/login",//登陆Api
            userPageApi: layui.setter.reqBase + "user/pageList",//用户分页Api
            saveUserApi: layui.setter.reqBase + "user/save",//保存用户Api
            rolePageApi: layui.setter.reqBase + "role/pageList",//角色分页Api
            roleListApi: layui.setter.reqBase + "role/list",//获取角色列表Api
            saveRoleApi: layui.setter.reqBase + "role/save",//保存角色
            permissionPageApi: layui.setter.reqBase + "resource/pageList",//权限分页Api
            savePermissionApi: layui.setter.reqBase + "resource/save",//保存权限Api
            salaryPageApi: layui.setter.reqBase + "salary/pageList",//薪资分页列表Api
            updateSalaryApi: layui.setter.reqBase + "salary/updateSalary",//薪资更新Api
            itemPageApi: layui.setter.reqBase + "item/pageList",//项目管理
            itemEarningPageApi: layui.setter.reqBase + "item/earning/pageList",//项目入账分页
            itemEarningSaveApi: layui.setter.reqBase + "item/earning/save",//项目入账保存
            itemExpensePageApi: layui.setter.reqBase + "item/expense/pageList",//项目支出分页
            itemExpenseSaveApi: layui.setter.reqBase + "item/expense/save"//项目支出保存
        }
    });
});
