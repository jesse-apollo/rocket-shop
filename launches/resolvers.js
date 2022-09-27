
module.exports = {
    Query: {
        getLaunches: async (_, args, {dataSources}, info) =>
            dataSources.launchAPI.getLaunches(args),
    },
    Rocket: {
        __resolveReference: async (rocket, {dataSources}, info) => {
            return {
                "name":rocket.name,
                //"launches": dataSources.launchAPI.getLaunchesByVehicleName(rocket.name)
            };
        },
        launches: async (rocket, _, {dataSources}, info) => 
            dataSources.launchAPI.getLaunchesByVehicleName(rocket.name)
    },


    MyType: {
        __resolveReference: async (obj, _, {dataSources}, info) => 
            dataSources.myAPI.getByID(obj.id),
    },
};