
module.exports = {
    Query: {
        getLaunches: async (_, args, {dataSources}, info) =>
            dataSources.launchAPI.getLaunches(args),
    },
    Rocket: {
        launches: async (rocket, _, {dataSources}, info) => 
            dataSources.launchAPI.getLaunchesByVehicleName(rocket.name)
    },


    MyType: {
        __resolveReference: async (obj, _, {dataSources}, info) => 
            dataSources.myAPI.getByID(obj.id),
    },
};