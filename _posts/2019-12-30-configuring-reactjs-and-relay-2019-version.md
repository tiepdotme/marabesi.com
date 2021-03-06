---
layout: post
title: Configuring reactjs and relay 2019 version
date: 2019-12-30 01:06:05.000000000 -03:00
type: article
published: true
status: published
categories:
- javascript
tags:
- web,
- js,
- app,
- schema,
- npm,
- reactjs,
- react,
- relay,
- graph,
- graphql,
- query,
- environment,
- component,
- compiler,
- web,
- js,
- eject reactjs,
- configuring relay js,
- A Step By Step Guide,
- relay-config npm,
- get-graphql-schema,
- relay-compiler,
- babel-plugin-relay,
- react-relay,
- getting started,
- howtographql
---

Recently GraphQL started to gain attention from the open source community
as a production ready platform focused on the communication between
client and server. One of the advantages of GraphQL over REST is how the
data is fetched from server to client, avoiding over fetching as well as
under fetching.

Relay is an open source library that abstracts away the data fetching from
the developer and offers a render component to the developer. Though, to configure
relay and reactjs a few steps are needed. Even when following the official
realy documentation to get up and running with React, problems can pop up.

The text follows with the reactjs set up using the create react app, then the
relay configuration is presented guided by the relay official documentation and
in conclusion the solution with the eject react app is presented.

- **Disclaimer: To follow along NodeJs 10.* is a must as well as NPM 6.*.**
- **Disclaimer 2: The following of this text assumes that a graphql server up and running on localhost port 4002.**
- **Disclaimer 3: The text assumes general knowledge in handling terminal commands.**

## Related work

Despite previous attempts to setup reactjs and relay without ejecting the create
react app **[7][8]**, the approach to such options shows to not be effective
as, the application created by create react by does not understand the
configuration required for relay to work.

The `relay.config.js` pointed by **[7]** demonstrates that the reactjs app
has difficulties to interpret the configuration file, leading to a broken
application state.

In the same sense **[8]** provides three different alternatives to setup relay
and reactjs, which the third options elaborates more on how to use relay
without ejecting. This approach as the previous one mentioned leads to a
broken state application.

## Setting up ReactJs

Create react app **[1]** is a opinionated tool that comes with webpack configuration and
scripts abstracted away from the developer, providing good defaults. Creating
an app react based with create react app takes two steps:

1. Install create react app package (`npm i -g create-react-app`)
2. Executing the create react app (`create-react-app relay-app`)

Once the command from step 2 is done the react app is available in the `relay-app`
folder, make sure to move to that directory before proceeding  with the
command `cd relay-app`.

With the based app setup, the next step is to install all libraries required
by relay to work.

```sh
npm i get-graphql-schema relay-compiler babel-plugin-relay --save-dev && npm i graphql react-relay --save
```

`get-graphql-schema` **[2]** is a tool used for generating the graphql schema from a given
graphql server.

`relay-compiler` **[3]** is used to convert graphql literals into generated
files that live alongside your source files. This approach facilitates the
usage of relay into reactjs project, preventing developers to write those files
themselves. `babel-plugin-relay` is related as well, as it converts graphql to
runtime artifacts - without this plugin is not possible to run relay in the
browser.

At this stage a check point would help to make sure that the dependencies
have been installed and they are working as expected. For that, in the `package.json`
file add the following scripts **[4]**:

```js
{
  "scripts": {
    "export-schema": "get-graphql-schema http://localhost:4002 > ./schema.graphql",
    "relay-compile": "relay-compiler --src=./src --schema=./schema.graphql --artifactDirectory=./src/__generated__",
    "relay": "npm run export-schema && npm run relay-compile"
  }
}
```

The script `export-schema` uses the library `get-graphql-schema` to fetch
the schema definitions the the graphql server exposed at localhost:4002. The
`schema.graphql` file is needed for the `relay-compiler` package in order to
generate the query definitions.

`relay-compile` generates the metadata used by relay to query the graphql server.
In this command the files and code generated are stored under `src/__generated__`.

Finally, the `relay` script is used as a shortcut to execute `export-schema` and
`relay-compile` in sequence.

Once the scripts have been added, the last step is to run the script `relay`.
For that in the terminal run the following command:

```sh
npm run relay
```

The output should be something like the following:

```sh
> relay-app@0.1.0 relay /Projects/graph-ql/relay-app
> npm run export-schema && npm run relay-compile


> relay-app@0.1.0 export-schema /Projects/graph-ql/relay-app
> get-graphql-schema http://localhost:4002 > ./schema.graphql
`

> relay-app@0.1.0 relay-compile /Projects/graph-ql/relay-app
> relay-compiler --src=./src --schema=./schema.graphql --artifactDirectory=./src/__generated__

HINT: pass --watch to keep watching for changes.

Writing js
Unchanged: 0 files
```

The last line should reflect the project lack of graphql files, as in the last
line it shows `Unchanged: 0 files`, which in this case is the desired
behavior.

## Setting up relay environment

Relay requires an environment setup to work properly **[5]**. The environment
provided by the official documentation is the one used here. Copy the following
code and save it in a file called `environment.js`.

```jsx
import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';

function fetchQuery(
  operation,
  variables,
) {
  return fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json();
  });
}

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),  
});

export default environment;
```

Next, comes the relay component to interact with the graphql server. The component
used here is a react functional component that creates a list of products
(file named `ProductList.js`). The point of attention here is the `environment` usage
defined previously, followed by the `query` variable that holds the graphql query.
The graphql query is passed to the `QueryRenderer` **[6]** relay component to fetch
the graphql data.

```jsx
// ProductList.js
import React from 'react';
import {graphql, QueryRenderer} from 'react-relay';
import environment from './environment';

const query = graphql`
query ProductListQuery {
  products {
    title
    image_link
  }
}`;

const ProductListQuery = () =>
  <QueryRenderer
    environment={environment}
    query={query}
    render={RenderProductList}
  />;

const style = { color: 'red' };

export const RenderProductList = ({ error, props }) => {
  if (error) {
    return (<div style={style}>{error.message}</div>);
  }

  if (props) {
    return props.products.map((item, index) =>
      <div
        key={index}
      >
      </div>
    )
  }

  return <div>Loading</div>;
}

export default ProductListQuery;
```

The ProductList component is based on the component provided by the relay official
documentation **[6]**. To actually use the ProductList component one more step
is required: to invoke the component in the `App.js` file, as the following code does.

```jsx
import React from 'react';
import ProductList from './ProductList';
import './App.css';

function App() {
  return (
    <div className="App">
      <ProductList />
    </div>
  );
}

export default App;

```

Once the code is in place, the expected behavior is to it to work, as the
basic setup is completed. Unfortunately it doesn't. Trying to run the code
with the setup made so far throws an exception.

```
graphql: Unexpected invocation at runtime. Either the Babel transform was not set up, or it failed to identify this call site. Make sure it is being used verbatim as `graphql`.
```

![Error babel trying to execute relay without eject](/images/posts/2019-12-30-configuring-reactjs-and-relay-2019-version/relay_reactjs_babel_error.jpg "Error babel trying to execute relay without eject")

The alternative solution proposed is to eject the reactjs app created with the
create react app, the next section dives in details in how to achieve it.

## The solution ejecting reactjs

The solution for that is to eject the reactjs project running the command:
`npm run eject`. Followed by changing the babel configuration used.
The eject command reveals the magic behind the create react app, which results
in more configuration files in the root directory and more scripts/dependencies
in the `package.json` file.

The next step is to create a new file named `.babelrc` in the root of the project
and add the following content:

```json
{
  "presets": [
    "react-app"
  ],
  "plugins": [
    [
      "relay"
    ]
  ]
}
```

To prevent any babel configuration conflict, remove the section `babel` inside
the `package.json` file, and then, run again the command `npm run relay` to
generate all required files by relay, this time time output should be something
like the following:

```sh
> relay-app@0.1.0 relay /Projects/relay-app
> npm run export-schema && npm run relay-compile


> relay-app@0.1.0 export-schema /Projects/relay-app
> get-graphql-schema http://localhost:4002 > ./schema.graphql


> relay-app@0.1.0 relay-compile /Projects/relay-app
> relay-compiler --src=./src --schema=./schema.graphql --artifactDirectory=./src/__generated__

HINT: pass --watch to keep watching for changes.

Writing js
Created:
 - ProductListQuery.graphql.js
Unchanged: 0 files
```

Relay compiler is going to create one file, which is linked with the graphql query
in the ProductList component. 

At this point, starting the app with the command `npm run start` should start the
reactjs app and realy should be up and running as well.

## References

[1] Create React App - Set up a modern web app by running one command [Online]. Available: [https://create-react-app.dev](https://create-react-app.dev "Create React App - Set up a modern web app by running one command"){:target="_blank"}. [Accessed: 31 - Dec - 2019]

[2] Fetch and print the GraphQL schema from a GraphQL HTTP endpoint [Online]. Available: [https://github.com/prisma-labs/get-graphql-schema](https://github.com/prisma-labs/get-graphql-schema "Fetch and print the GraphQL schema from a GraphQL HTTP endpoint"){:target="_blank"}. [Accessed: 31 - Dec - 2019]

[3] Set up relay-compiler [Online]. Available: [https://relay.dev/docs/en/installation-and-setup#set-up-relay-compiler](https://relay.dev/docs/en/installation-and-setup#set-up-relay-compiler "Set up relay-compiler"){:target="_blank"}. [Accessed: 31 - Dec - 2019]

[4] How npm handles the "scripts" field [Online]. Available: [https://docs.npmjs.com/misc/scripts](https://docs.npmjs.com/misc/scripts "How npm handles the scripts field"){:target="_blank"}. [Accessed: 31 - Dec - 2019]

[5] Relay environment [Online]. Available: [https://relay.dev/docs/en/quick-start-guide#relay-environment](https://relay.dev/docs/en/quick-start-guide#relay-environment "Relay environment"){:target="_blank"}. [Accessed: 31 - Dec - 2019]

[6] Rendering GraphQL Queries [Online]. Available: [https://relay.dev/docs/en/quick-start-guide#rendering-graphql-queries](https://relay.dev/docs/en/quick-start-guide#rendering-graphql-queries "Rendering GraphQL Queries"){:target="_blank"}. [Accessed: 31 - Dec - 2019]

[7] Set up Relay with a single config file [Online]. Available: [https://relay.dev/docs/en/installation-and-setup#set-up-relay-with-a-single-config-file](https://relay.dev/docs/en/installation-and-setup#set-up-relay-with-a-single-config-file "Set up Relay with a single config file"){:target="_blank"}. [Accessed: 01 - Jan - 2020]

[8] Using Create React App with Relay Modern [Online]. Available: [https://hackernoon.com/using-create-react-app-with-relay-modern-989c078fa892](https://hackernoon.com/using-create-react-app-with-relay-modern-989c078fa892 "Using Create React App with Relay Modern"){:target="_blank"}. [Accessed: 01 - Jan - 2020]
