import * as React from "react";
import {useRouter} from 'next/router'
// can be used potentially to sent login info through graphql to restful apis
export default function Index() {
  const router = useRouter()
  // direct to graphql client interface
  React.useEffect(()=>{
    router.push('/api/graphql')
  })
  return (
    <div>
      <h1>simple graphql bff program</h1>
    </div>
  );
}
