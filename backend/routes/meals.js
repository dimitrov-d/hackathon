const { db, router } = require('../index');

router.get('/meals/diets', async (req, res) => {
    db.collection('foodDiets').find({}).toArray((err, result) => {
        if (err) return res.status(400).send({ 'error': 'An error occured while getting the diets' });
        return res.status(200).send(result);
    });
});

router.get('/meals/allergens', async (req, res) => {
    db.collection('allergens').find({}).toArray((err, result) => {
        if (err) return res.status(400).send({ 'error': 'An error occured while getting the allergens' });
        return res.status(200).send(result);
    });
});

router.get('/meals/all', async (req, res) => {
    db.collection('meals').find({}).toArray((err, result) => {
        if (err) return res.status(400).send({ 'error': 'An error occured while getting the meals' });
        return res.status(200).send(result);
    });
});

router.post('/meals/update', async (req, res) => {
    const meal = req.body;
    if (!meal) return res.status(400).send({ 'error': 'No meal provided' });

    try {
        const collection = db.collection('meals');
        const search_meal = await collection.findOne({ name: meal.name });

        const updateMeal = { ...meal, _id: undefined };
        delete updateMeal._id;
        const updateDoc = {
            $set: {
                ...updateMeal
            }
        };

        const result = await collection.updateOne(search_meal, updateDoc, { upsert: true });
        return res.status(200).send(result);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Unsuccessful meal update' });
    }
});

router.post('/meals/clearAll', async (req, res) => {
    const collection = db.collection('meals');
    await collection.find({}).toArray(async (err, results) => {
        if (err) return res.status(400).send({ 'error': 1 });

        for (const meal of results) {
            const dbMeal = collection.findOne({ _id: meal._id });
            meal.ingredients.forEach((ing) => ing.checked = false);

            const updateDoc = {
                $set: {
                    ingredients: meal.ingredients
                }
            };
            console.log(meal.ingredients);
            await collection.updateOne(dbMeal, updateDoc, { upsert: true });
        }
    });
    // collection.updateMany(meals, updateDoc);

    res.status(200).send('Done');
});

module.exports = router;