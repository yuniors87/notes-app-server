const graphql = require('graphql');
const Company = require('../models/company');
const System = require('../models/system');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    systems: {
      type: new GraphQLList(SystemType),
      resolve(parent, args) {
        return System.find({
          companyId: parent.id
        });
      }
    }
  })
});

const SystemType = new GraphQLObjectType({
  name: 'System',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    company: {
      type: CompanyType,
      resolve(parent, args) {
        return Company.findById(parent.companyId);
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Company.findById(args.id);
      }
    },
    companies: {
      type: new GraphQLList(CompanyType),
      resolve(parent, args) {
        return Company.find();
      }
    },
    system: {
      type: SystemType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return System.findById(args.id);
      }
    },
    systems: {
      type: new GraphQLList(SystemType),
      resolve(parent, args) {
        return System.find();
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addCompany: {
      type: CompanyType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let newCompany = new Company({
          name: args.name
        });
        return newCompany.save();
      }
    },
    addSystem: {
      type: SystemType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        companyId: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let newSystem = new System({
          name: args.name,
          companyId: args.companyId
        });
        return newSystem.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
