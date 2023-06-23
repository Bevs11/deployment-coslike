const router = require('express').Router()
const Promotion = require('../models/Promotion')

//Create a promotion
// TEST URL: http://127.0.0.1:8080/api/v1/promotions
router.post('/', async(request, response) => {
    const newPromotion = new Promotion(request.body)
    try{
        const savedPromotion = await newPromotion.save();
        response.status(200).send({ savedPromotion });
    } catch(error){
        response.status(500).send({error});
    }
});

//Get promotions without query
// TEST URL: http://127.0.0.1:8080/api/v1/promotions
router.get(`/`, (request, response) => {
    Promotion.find().then(dbResponse =>{
        if (!dbResponse) {
            response.status( 500 ).send({ error: "No promotions found" });
        } else {
            response.status(200).send({ promotions: dbResponse });
        }

    })
});

//Get promotions with tags query
// TEST URL: http://127.0.0.1:8080/api/v1/promotions/:tags
router.get(`/:tags`, (request, response) => {
    Promotion.find({"tags": request.params.tags}).then(dbResponse =>{
        if (!dbResponse) {
            response.status( 500 ).send({ error: "No promotions found" });
        } else {
            response.status(200).send({ promotions: dbResponse });
        }

    })
});

module.exports = router;