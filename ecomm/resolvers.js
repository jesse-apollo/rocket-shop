
module.exports = {
    Query: {
        getRockets: async (_, args, {dataSources}, info) =>
            dataSources.ecommAPI.getRockets(args, info),
        rockets: async (_, args, {dataSources}, info) =>
            dataSources.ecommAPI.getRockets(args, info),
        rocket: async (_, args, {dataSources}, info) =>
            dataSources.ecommAPI.getRocketByName(args.name, info),
        getCustomers: async (_, args, {dataSources}, info) =>
            dataSources.ecommAPI.getCustomers(args, info),
        customer: async (_, args, {dataSources}, info) =>
            dataSources.ecommAPI.getCustomerFirstCustomer(args, info),
        getCart: async (_, args, {dataSources}, info) =>
            dataSources.ecommAPI.getCartByID(args.id),
        cart: async (_, args, {dataSources}, info) =>
            dataSources.ecommAPI.getCartByID(args.id),
    },
    Mutation: {
        updateCart: async(_, {userId, cart}, {dataSources}) =>
            dataSources.ecommAPI.updateCart(userId, cart)
    },
    MyOtherType: {
        __resolveReference: async (obj, context, info) => 
            dataSources.myAPI.getByID(obj.id, context, info),
    },
};