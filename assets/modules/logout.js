layui.define(["table", "form"],
    function(e) {
        var t = layui.$,
            table = layui.table,
            setter = layui.setter,
            form = layui.form,
            admin = layui.admin,
            layer = layui.layer;

        window.logout = function () {
            layer.msg("退出成功",{icon:1})
        };
        e("logout", {})
    });