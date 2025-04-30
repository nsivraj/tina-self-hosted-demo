import { createDatabase, createLocalDatabase } from "@tinacms/datalayer";
// import { RedisLevel } from "upstash-redis-level";
import { MongodbLevel } from "mongodb-level";
import { GitHubProvider } from "tinacms-gitprovider-github";

// Manage this flag in your CI/CD pipeline and make sure it is set to false in production
const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";
const dbName = process.env.MONGO_INITDB_DATABASE as string;

const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN as string;
const owner = (process.env.GITHUB_OWNER ||
  process.env.VERCEL_GIT_REPO_OWNER) as string;
const repo = (process.env.GITHUB_REPO ||
  process.env.VERCEL_GIT_REPO_SLUG) as string;
const branch = (process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  "master") as string;

if (!branch) {
  throw new Error(
    "No branch found. Make sure that you have set the GITHUB_BRANCH or process.env.VERCEL_GIT_COMMIT_REF environment variable."
  );
}

export default isLocal
  ? createLocalDatabase()
  : createDatabase({
      gitProvider: new GitHubProvider({
        branch,
        owner,
        repo,
        token,
      }),
      databaseAdapter: new MongodbLevel<string, Record<string, any>>({
        // If you are not using branches you could pass a static collection name. ie: "tinacms"
        collectionName: `tinacms-${branch}`,
        dbName,
        mongoUri: process.env.MONGODB_URI as string,
      }),
      namespace: branch,
    });

// export default isLocal
//   ? createLocalDatabase()
//   : createDatabase({
//       gitProvider: new GitHubProvider({
//         branch,
//         owner,
//         repo,
//         token,
//       }),
//       databaseAdapter: new RedisLevel<string, Record<string, any>>({
//         redis: {
//           url:
//             (process.env.KV_REST_API_URL as string) || "http://localhost:8079",
//           token: (process.env.KV_REST_API_TOKEN as string) || "example_token",
//         },
//         debug: process.env.DEBUG === "true" || false,
//       }),
//       namespace: branch,
//     });

// ==============================================================================================

// const levelup = require("levelup");
// const { DynamoDB } = require("aws-sdk");
// const { DynamoDbDown } = require("dynamodbdown");

// const dynamoDBOptions = {
//   region: "eu-west-1",
//   secretAccessKey: "foo",
//   accessKeyId: "bar",
// };

// // capacity can be specified; defaults to 5/5:
// const factoryOptions = {
//   ProvisionedThroughput: {
//     ReadCapacityUnits: 10,
//     WriteCapacityUnits: 10,
//   },
// };

// const factory = DynamoDbDown(new DynamoDB(dynamoDBOptions));

// const db = levelup(factory("tableName"), factoryOptions);

// ==============================================================================================

// const levelup = require('levelup');
// const { DynamoDB } = require('aws-sdk');
// const { DynamoDbDown } = require('dynamodbdown');

// const factory = DynamoDbDown(
//   new DynamoDB({
//     region: 'us-west-1',
//     secretAccessKey: 'foo',
//     accessKeyId: 'bar'
//   })
// );

// const db = levelup(factory('tableName$hashKey'));

// db.put('some key', 'some value', => err {
//   // the DynamoDB object would now look like this:
//   // {
//   //   '---hkey': 'hashKey',
//   //   '---rkey': 'some key',
//   // }
// });

// ==============================================================================================

// const levelup = require('levelup');
// const { DynamoDB } = require('aws-sdk');
// const { DynamoDbDown } = require('dynamodbdown');

// const factory = DynamoDbDown(
//   new DynamoDB({
//     region: 'us-west-1',
//     secretAccessKey: 'foo',
//     accessKeyId: 'bar'
//   })
// );

// const db = levelup(factory('tableName'));

// db.put('some string', 'LevelUP string');
// db.put('some binary', Buffer.from('LevelUP buffer'));

// const dbReadStream = db.createReadStream();

// dbReadStream.on('data', console.log);
// dbReadStream.on('close', () => {
//   console.log('read stream closed');
// });
