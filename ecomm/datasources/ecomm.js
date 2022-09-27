const { DataSource } = require('apollo-datasource');
const { ObjectId } = require('mongodb'); 

const {UserInputError} = require('apollo-server');


class EcommAPI extends DataSource {
    constructor(database) {
        super();
        this.rockets = database.collection("rockets");
        this.carts = database.collection("carts");
        this.customers = database.collection("customers");
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
        obj.id = obj._id.toString();
        return obj;
    }

    async getRockets(args, info) {

        const query = {  };
        const options = {
            //sort: { "field": -1 },
            limit: 50
          };

        const cursor = this.rockets.find(query, options);
  
        var results = await cursor.toArray();
        results = results.map(x => this.mapResult(x));

        return results;
    }

    async getCustomers(args, info) {

        const query = {  };
        const options = {
            limit: 50
          };

        const cursor = this.customers.find(query, options);
  
        var results = await cursor.toArray();
        results = results.map(x => this.mapResult(x));

        return results;
    }

    async getCustomerFirstCustomer(args, info) {

        const query = { };
        const result = await this.customers.findOne(query);

        if (result == null) {
            return false;
        }

        return this.mapResult(result);  
    }

    async getRocketByID(id, context, info) {
        const query = { _id: new ObjectId(id) };
        const result = await this.rockets.findOne(query);

        if (result == null) {
            return false;
        }

        return this.mapResult(result);  

    }

    async getRocketByName(name, context, info) {
        const query = { name: name };
        const result = await this.rockets.findOne(query);

        if (result == null) {
            return false;
        }

        return this.mapResult(result);  

    }

    async getCustomerByID(id, context, info) {
        const query = { _id: new ObjectId(id) };
        const result = await this.customers.findOne(query);

        if (result == null) {
            return false;
        }

        return this.mapResult(result);  

    }

    async getCartByID(id, context, info) {
        const query = { "customer._id": new ObjectId(id) };
        const result = await this.carts.findOne(query);

        if (result == null) {
            return false;
        }

        return this.mapResult(result);  

    }

    async updateCart(userId, cartUpdate) {

        // find all rockets provided in cart update object
        const rocketQuery = { _id: { 
            $in: cartUpdate.items.map(x => new ObjectId(x))
        }};

        const cursor = this.rockets.find(rocketQuery, { limit: 50 });
  
        var rockets = await cursor.toArray();

        if (rockets == null) {
            return false;
        }

        var customer = await this.getCustomerByID(userId);

        if (!customer) {
            throw new UserInputError('Invalid customer ID provided.');
        }
        
        // get existing cart if exists
        const cartFilter = { "customer._id": new ObjectId(userId) };

        let cart = {
            items: rockets.map(x => ({
                "_id": x._id,
                "name": x.name,
                "price": x.price
            })),
            customer: {
                "_id": new ObjectId(customer.id),
                "name": customer.name
            }
        };

        let result = await this.carts.findOneAndReplace(
            cartFilter, cart, { upsert: true, returnDocument: "after" });
        
        result = this.mapResult(result.value);
        result.items = result.items.map(x => this.mapResult(x));
        result.customer = this.mapResult(result.customer);

        return result;  

    }

  
}
  
module.exports = EcommAPI;