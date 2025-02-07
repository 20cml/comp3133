const express = require('express')
const { buildSchema } = require('graphql')
const { graphqlHTTP } = require("express-graphql")
const mongoose = require("mongoose");
require("dotenv").config();
const UserModel = require('./model/User')

const app = express()
const SERVER_PORT = 4000

const gqlSchema = buildSchema(
    `type Query{
        welcome: String
        greet(name: String): String
        user: User
        users: [User]
    }

    type Mutation{
        addUser(uid: Int, fnm: String, lnm: String, salary: Float): User 
    }

    type User{
        uid: Int
        firstname: String 
        lastname: String
        salary: Float
    }
    `
)

const rootResolver = {
    welcome: () =>{
        return "Welcome to GraphQL examples"
    },
    greet: ({name}) =>{
        return `Hello, ${name}`
    },
    user: async () =>{
        //const user = {
        //    uid: 1, 
        //    fnm: "Camila", 
        //    lnm: "Lee",
        //    salary: 500.50
        //}
        const user = await UserModel.findOne({})
        console.log(user)
        return user
    },
    users: async () =>{
        //const users = [{
        //    uid: 1, 
        //    fnm: "Camila", 
        //    lnm: "Lee",
        //    salary: 500.50
        //},
        //{
        //    uid: 2, 
        //    fnm: "Marcella", 
        //    lnm: "Santos",
        //    salary: 1000.80
        //}]
        const users = await UserModel.find({})
        console.log(users)
        return users
    },
    addUser: async (user) => {
        console.log(user)
        //Insert Database 
        const {uid, fnm, lnm, salary} = user 
        const newUser = UserModel({
          uid,
          firstname: fnm, 
          lastname: lnm, 
          salary
        })
        await newUser.save()
        return newUser 
    }
}

const graphqlHttp = graphqlHTTP({
    schema: gqlSchema, 
    rootValue: rootResolver, 
    graphiql: true  // ✅ Corrected this line
})

app.use("/graphql", graphqlHttp)

// Helper function to connect to MongoDB asynchronously
const connectDB = async () => {
    try {
        console.log("Attempting to connect to DB");

        await mongoose.connect(process.env.MONGO_URI); // No need for extra options in newer Mongoose versions

        console.log("MongoDB connected");
    } catch (error) {
        console.error(`Error while connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit process on failure
    }
};

module.exports = connectDB;

app.listen(SERVER_PORT, () => {
    console.log('Server started')
    connectDB()
    console.log('http://localhost:4000/graphql')
})
