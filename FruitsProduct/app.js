const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "ur Uri";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Successfully Connected to the server")

    const database = client.db('mflix');
    const movies = database.collection('movies');

    // Query for a movie that has the title 'Back to the Future'
    const doc = [
        {
      title: "Aquaman",
      content: "Best movie of the planet",
    },
    {
      title: "Avengers:Infinity War",
      content: "Best movie of the year",
    },
    {
      title: "Avengers : Endgame",
      content: "Best movie of the century",
    }
    ]

    // const result = await movies.insertMany(doc);
    // console.log(`A document was inserted with the _id: ${result.insertedIds}`);

    // const query = { title: "Aquaman" };
    // const movie = await movies.findOne(query);
    // console.log(movie)

    const estimate = await movies.estimatedDocumentCount();
    console.log(`Estimated number of documents in the movies collection: ${estimate}`);

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);