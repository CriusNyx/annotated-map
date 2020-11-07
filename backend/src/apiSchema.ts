import { buildSchema } from 'graphql';

let apiSchema = buildSchema(`

type Annotation{
  id: Int
  polygon: String
  richText: String
}

input AnnotationInput{
  id: Int
  polygon: String
  richText: String
}

type MapNode{
  id: Int
  name: String
  parent: Int
  graphic: String
  annotations: [Annotation]
}

input MapNodeInput{
  id: Int
  name: String
  parent: Int
  graphic: String
  annotations: [AnnotationInput]
}

type Project{
  id: Int
  name: String
  nodes: [MapNode]
}

input ProjectInput{
  id: Int
  name: String
  nodes: [MapNodeInput]
}

type Query {
  project(id: Int): Project
}

type Mutation{
  write(project: ProjectInput): String
  makeNewProject: Project
  makeNewNode(projectID: Int): MapNode
  makeNewAnnotation(projectID: Int, nodeID: Int): Annotation
}
`);

export default apiSchema;
