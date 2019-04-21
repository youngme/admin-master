layui.define(["table", "form"],
    function(e) {
        var t = layui.$,
            setter = layui.setter,
            layer = layui.layer;

              window.logout = function () {
                  layer.msg("退出成功",{icon:1});

                  layui.data(setter.userKey, {
                      key: setter.userKey
                      ,remove: true
                  });
                  layui.data(setter.appIdKey, {
                      key: setter.appIdKey
                      ,remove: true
                  });
                  layui.data(setter.jwtKey, {
                      key: setter.jwtKey
                      ,remove: true
                  });
                  layui.data(setter.tokenKey, {
                      key: setter.tokenKey
                      ,remove: true
                  });
                  layui.data(setter.roleKey, {
                      key: setter.roleKey
                      ,remove: true
                  });
                  window.location=location.origin+setter.logoutHtml;
        };
        e("logout", {})
    });