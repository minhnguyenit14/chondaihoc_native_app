export default QUERY = {
    WhereClauseOperation: {
        Equal: 1,
        NotEqualTo: 2,
        GreaterThan: 3,
        LessThan: 4,
        GreaterThanOrEqualTo: 5,
        LessThanOrEqualTo: 6,
        Like: 7,
        NotLike: 8,
        StartWith: 9,
        EndWith: 10,
        IsNull: 11,
        IsNotNull: 12
    },
    GroupClauseOperation: {
        And: 1,
        Or: 2
    }
}