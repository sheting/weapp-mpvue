import { makeExecutableSchema } from 'graphql-tools'

// fake data
const moments = [
  {
    user: {
      id: 1000,
      name: '锐雯',
      avatar: 'http://imgsrc.baidu.com/imgad/pic/item/42a98226cffc1e17d31927154090f603738de974.jpg'
    },
    main: {
      content: '这是一条朋友圈',
      pics: [
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529219875063&di=bc0bcc78ae800c1c21c198f52697f515&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F4a36acaf2edda3ccd53548ea0be93901203f9223.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529219893624&di=8d9e418df27e1fdb6afb1d993801a980&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F3801213fb80e7beca9004ec5252eb9389b506b38.jpg'
      ]
    },
    comments: [
      {
        user: {
          id: 233122,
          name: '亚索'
        },
        reply: '面对疾风吧'
      }
    ]
  }
]
const typeDefs = `
  type Query {
    moments: [Moment]
  }
  type Mutation {
    addComment(
      entity: Add_Comment
    ) : Comment
  }
  type Moment {
    user: User
    main: Main
    comments: [Comment]
  }
  type User {
    id: Int
    name: String
    avatar: String
  }
  type Comment {
    user: User
    reply: String
  }
  type Main {
    content: String
    pics: [String]
  }
  input Add_User {
    id: Int
    name: String
  }
  input Add_Comment {
    user: Add_User
    reply: String
  }
`

const resolvers = {
  Query: {
    moments () {
      return moments
    }
  },
  Mutation: {
    addComment (_, { entity }, unknown, context) {
      console.log(entity)
      moments[0].comments.push(entity)
      return entity
    }
  }
}
const jsSchema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default jsSchema
