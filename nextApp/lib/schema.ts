import { makeSchema, queryType } from "@nexus/schema";
import UserSchema from 'apollo/queries/user/userQuery'

const Query = queryType({
    definition(t) {
      t.string("name", {resolve:() => "Bruce"});
    },
  });
  

const types = { Query };

export const schema = makeSchema({
  types,
});
