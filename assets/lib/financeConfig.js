layui.define(['laytpl', 'layer'], function(exports){
    exports('financeSetter', {
        financeType:{
            moneyIn:0,//现金入账
            debtIn:1,//欠款入账
            materialsOut:2,//材料采购
            repastOut:3,//灶务采购
            backManOut:4,//杂工工资
            manageOut:5,//管理工资
            travelOut:6,//差旅招待
            workOut:7,//办公用品
            carOut:8,//机械消耗
            oilConsumptionOut:9,//机械耗油
            elseExpenseOut:10//其他费用
        }
    });
});
