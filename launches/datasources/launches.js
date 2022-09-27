const { DataSource } = require('apollo-datasource');
const { ObjectId } = require('mongodb'); 


class LaunchAPI extends DataSource {
    constructor(database) {
        super();
        this.launches = database.collection("launches");
    }
  
    /**
     * This is a function that gets called by ApolloServer when being setup.
     * This function gets called with the datasource config including things
     * like caches and context. We'll assign this.context to the request context
     * here, so we can know about the user making requests
     */
    initialize(config) {
      this.context = config.context;
    }

    mapResult(obj) {
        if (obj._id) {
            obj.id = obj._id.toString();
        }
        
        return obj;
    }

    async getLaunches(args) {

        const query = { };
        const options = {
            limit: 50
          };

        const cursor = this.launches.find(query, options);
  
        var results = await cursor.toArray();

        results = results.map(x => this.mapResult(x));

        return results;
    }

    async getByID(id) {
        const query = { _id: new ObjectId(id) };
        const result = await this.collection.findOne(query);

        if (result == null) {
            return false;
        }

        return result;  
    }

    async getLaunchesByVehicleName(name) {

        const query = { vehicle: name };
        const options = {
            limit: 50
          };

        const cursor = this.launches.find(query, options);
  
        var results = await cursor.toArray();

        results = results.map(x => this.mapResult(x));

        return results;

    }
}
  
module.exports = LaunchAPI;