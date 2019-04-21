
layui.define(['laytpl', 'layer','element', 'util'], function(exports){
    exports('reqSetter', {
        requestPath:{
            loginApi: layui.setter.reqBase + "account/login",//登陆Api
            userPageApi: this.reqBase + "user/pageList",//用户分页Api
            saveUserApi: this.reqBase + "user/save",//保存用户Api
            rolePageApi: this.reqBase + "role/pageList",//角色分页Api
            roleListApi: this.reqBase + "role/list",//获取角色列表Api
            permissionPageApi: this.reqBase + "resource/pageList",//权限分页Api
            savePermissionApi: this.reqBase + "resource/save",//保存权限Api
            salaryPageApi: this.reqBase + "salary/pageList",//薪资分页列表Api
            updateSalaryApi: this.reqBase + "salary/updateSalary",//薪资更新Api
            itemPageApi: this.reqBase + "item/pageList",//项目管理
        }
    });
});
