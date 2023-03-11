var db = require("./database");

var data = [
  { name: "Call of Duty 2", price: 150 },
  { name: "GTA", price: 50 },
  { name: "LOL", price: 0 },
];

// INSERT
/* db.insert(data)
  .into("games")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  }); */

// SELECT
/* db.select(["id", "price"])
  .table("games")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  }); */

// NESTED QUERIES;
/* db.insert({ name: "Fortnite", price: 2 })
  .into("games")
  .then((data) => {
    console.log(data);
    db.select()
      .table("games")
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  }); */

// WHERE
/* db.whereRaw("name = 'GTA' OR price > 50")
  .table("games")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
 */

// RAW
/* db.raw("SELECT * FROM games")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  }); */

// DELETE
/* db.where({ id: 1 })
  .delete()
  .table("games")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
 */

// UPDATE
/* db.where({ id: 2 })
  .update({
    price: 400,
  })
  .table("games")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  }); */

// ORDER BY
/* db.select()
  .table("games")
  .orderBy("price", "desc")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  }); */

// ASSOCIATE INSERT
/* db.insert({
  name: "Blizzard",
  game_id: 3,
})
  .table("studios")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  }); */

// JOIN 1-1
/* db.select([
  "games.id as game_id",
  "games.name as game_name",
  "studios.id as studios_id",
  "studios.name as studio_name",
])
  .table("games")
  .innerJoin("studios", "studios.game_id", "games.id")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  }); */

// JOIN 1-N
/* db.select([
  "games.id as game_id",
  "games.name as game_name",
  "studios.id as studios_id",
  "studios.name as studio_name",
])
  .table("games")
  .innerJoin("studios", "studios.game_id", "games.id")
  .then((data) => {
    var studiosArr = data;
    var game = {
      id: 0,
      name: "",
      studios: [],
    };

    game.id = data[0].game_id;
    game.name = data[0].game_name;

    data.forEach((element) => {
      game.studios.push(element.studio_name);
    });
    console.log(game);
  })
  .catch((err) => {
    console.log(err);
  }); */

// JOIN N-N
/* db.select([
  "studios.name as studio_name",
  "games.name as game_name",
  "games.price as game_price",
])
  .table("games_studios")
  .innerJoin("games", "games.id", "games_studios.games_id")
  .innerJoin("studios", "studios.id", "games_studios.studios_id")
  .where("games.id", 3)
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  }); */

// TRANSACTIONS

async function testTransaction() {
  try {
    await db.transaction(async (trans) => {
      await db
        .insert({
          name: "Valve",
        })
        .into("studios");
      await db
        .insert({
          name: "Gearbox",
        })
        .into("studios");
      await db
        .insert({
          name: null,
        })
        .into("studios");
    });
  } catch (error) {
    console.log(error);
  }
}

testTransaction();
