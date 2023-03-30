const app = require('express')();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
require('dotenv').config();


const faunadb = require('faunadb')
const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET })


const { getWeather, getForecastResponse } = require('./functions/weather/getplanet')

const {
    Ref,
    Paginate,
    Get,
    Match,
    Index,
    Create,
    Collection,
    Join,
    Call,
    Function: Fn,
} = faunadb.query;

app.get('/', (req, res) => res.json('API Running'))

//Get Planet By ID
app.get('/planet/:id', async (req, res) => {

    const doc = await client.query(
        Get(
            Ref(
                Collection('planets'),
                req.params.id
            )
        )
    )
    res.send(doc)
});

//Get Planet By Name
app.get('/planet/name/:name', async (req, res) => {

    const doc = await client.query(
        Get(
            Match(
                Index("planets_by_name"), req.params.name
            )
        )
    )
    res.send(doc)
});

//Get Planet By Current Location
app.get('/planet/location/:location', async (req, res) => {
    try {
      const location = req.params.location.toString();
      const planet = await getWeather(location);
      console.log("PLANET:", planet);
  
      const doc = await client.query(
        Get(
          Match(
            Index("planets_by_name"), planet
          )
        )
      );
  
      res.send(doc);
    } catch (err) {
      console.error("Error:", err);
      res.status(500).send("Error fetching planet");
    }
  });

//Get Forecast By Current Location
app.get('/planet/location/:location/forecast', async (req, res) => {
    try {
        const location = req.params.location.toString();
        const response = await getForecastResponse(location)
        res.send(response)
    } catch (err) {
      console.error("Error:", err);
      res.status(500).send("Error fetching forecast");
    }
  });

//Get Planet Image By Current Location (TESTING ONLY)
app.get('/planet/location/:location/img', async (req, res) => {
    try {
        const location = req.params.location.toString();
        const planet = await getWeather(location);
        console.log("PLANET:", planet);

        const doc = await client.query(
            Get(
                Match(
                    Index("planets_by_name"), planet
                )
            )
        );
        res.redirect(doc.data.imageURL);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error fetching planet");
    }
});

//Create Planet
app.post('/planet', jsonParser, async (req, res) => {
  try {
    console.log(req.body);
    const { name, description, imageURL } = req.body;
    const doc = await client.query(
      Create(Collection('planets'), { data: { name, description, imageURL } })
    );
    res.status(201).json(doc);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => console.log('API on http://localhost:5000'))
