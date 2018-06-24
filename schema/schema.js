const graphql = require('graphql');
const _ = require('lodash');
const Empresa = require('../models/empresa');
const Sistema = require('../models/sistema');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const EmpresaType = new GraphQLObjectType({
  name: 'Empresa',
  fields: () => ({
    id: { type: GraphQLID },
    nombre: { type: GraphQLString },
    sistemas: {
      type: new GraphQLList(SistemaType),
      resolve(parent, args) {
        return Sistema.find({
          empresaId: parent.id
        });
      }
    }
  })
});

const SistemaType = new GraphQLObjectType({
  name: 'Sistema',
  fields: () => ({
    id: { type: GraphQLID },
    nombre: { type: GraphQLString },
    empresa: {
      type: EmpresaType,
      resolve(parent, args) {
        return Empresa.findById(parent.empresaId);
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    empresa: {
      type: EmpresaType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Empresa.findById(args.id);
      }
    },
    empresas: {
      type: new GraphQLList(EmpresaType),
      resolve(parent, args) {
        return Empresa.find();
      }
    },
    sistema: {
      type: SistemaType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Sistema.findById(args.id);
      }
    },
    sistemas: {
      type: new GraphQLList(SistemaType),
      resolve(parent, args) {
        return Sistema.find();
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addEmpresa: {
      type: EmpresaType,
      args: {
        nombre: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let empresa = new Empresa({
          nombre: args.nombre
        });
        return empresa.save();
      }
    },
    addSistema: {
      type: SistemaType,
      args: {
        nombre: { type: new GraphQLNonNull(GraphQLString) },
        empresaId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let sistema = new Sistema({
          nombre: args.nombre,
          empresaId: args.empresaId
        });
        return sistema.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
