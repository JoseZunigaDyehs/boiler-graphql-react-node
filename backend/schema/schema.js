const graphql = require("graphql"),
  _ = require("lodash"),
  Home = require("../models/home"),
  Habitant = require("../models/habitant")

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLNonNull
} = graphql;

const habitants = [
  { id: "1", name: "Perro", age: 5 , homeId: '1'},
  { id: "2", name: "Sapo", age: 8 , homeId: '2'},
  { id: "3", name: "Vaca", age: 12 , homeId: '3'},
  { id: "4", name: "Gato", age: 5 , homeId: '3'},
  { id: "5", name: "Jirafa", age: 88 , homeId: '3'},
  { id: "6", name: "Elefante", age: 45 , homeId: '1'},
];
const homes = [
  { id: "1", name: "Familia Perez" },
  { id: "2", name: "Los Florindos"},
  { id: "3", name: "Familia Bacan"}
];

const HabitantType = new GraphQLObjectType({
  name: "Habitant",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    homeId: {type: GraphQLID},
    home: {
      type: HomeType,
      resolve(parent,args){
        return Home.findById(parent.homeId);
      }
    }
  })
});

const HomeType = new GraphQLObjectType({
  name: "Home",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    habitants: {
      type: new GraphQLList(HabitantType),
      resolve(parent,args){
        return Habitant.find({homeId:parent.id})
        // return _.filter(habitants,{homeId:parent.id})
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    habitant: {
      type: HabitantType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Habitant.findById(args.id)
        // return _.find(habitants, { id: args.id });
      }
    },
    habitants: {
      type: new GraphQLList(HabitantType),
      resolve(parent, args) {
        return Habitant.find({})
        //return habitants;
      }
    },
    home:{
      type: HomeType,
      args: { id: { type: GraphQLID } },
      resolve(parent,args){
        return Home.findById(args.id);
        //return _.find(homes,{id:args.id});
      }
    },
    homes:{
      type: new GraphQLList(HomeType),
      resolve(parent,args){
        return Home.find({})
        //return homes;
      }
    },
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addHabitant:{
      type: HabitantType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLNonNull(GraphQLInt) },
        homeId: { type: GraphQLNonNull(GraphQLID) }
      },
      resolve(parent,args){
        let habitant = new Habitant({
          name: args.name,
          age: args.age,
          homeId: args.homeId
        })
        return habitant.save()
      }
    },
    addHome:{
      type: HomeType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve(parent,args){
        let home = new Home({
          name: args.name
        })
        return home.save()
      }
    },
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
