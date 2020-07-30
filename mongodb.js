// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;
//  ===
const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

const id = new ObjectID();

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      console.log("Unable to connect to database!");
    }

    // Creates db if it doesnt exist
    const db = client.db(databaseName);

    //   const updatePromise = db.collection("users").updateOne(
    //     {
    //       _id: new ObjectID("5f1be954fb85461b0055b155"),
    //     },
    //     {
    //       $inc: {
    //         age: 1,
    //       },
    //     }
    //   );

    //   updatePromise
    //     .then((result) => {
    //       console.log(result);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });

    db.collection("tasks")
      .deleteOne({
        description: "Walk the dog",
      })
      .then((result) => {
        console.log("result", result.deletedCount);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
);
