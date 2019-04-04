export const QUERY_HELPER = {
    createWhereClauseCondition: function (name, value, operator, tableAlias) {
        return { ConditionName: name, ConditionValue: value, ConditionOperation: operator, TableAlias: tableAlias };
    },
    prepareWhereClauseGroup: function (params) {
        params.forEach(p => {
            p.Conditions = JSON.stringify(p.Conditions);
        });
        return JSON.stringify(params);
    }
}