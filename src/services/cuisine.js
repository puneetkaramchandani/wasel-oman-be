const Cuisine = require("../models/cuisine");
const { ExpressError } = require("../utils");

module.exports = {
  getAllCuisines,
  addNewCuisine,
  deleteCuisine,
  editCuisineDetails,
};

async function getAllCuisines() {
  const cuisines = await Cuisine.find();
  return { cuisines };
}

async function addNewCuisine(data) {
  await checkIfCuisineAlreadyExists(data);
  const newCuisine = new Cuisine({ ...data });
  await newCuisine.save();
  return { cuisine: newCuisine };
}

async function getCuisineByNameAndRegion(data) {
  const cuisine = await Cuisine.findOne({
    name: data.name,
    region: data.region,
  });
  return { cuisine };
}

async function checkIfCuisineAlreadyExists(data) {
  const { cuisine } = await getCuisineByNameAndRegion(data);
  if (cuisine) throw new ExpressError("Cuisine already exists", 300);
  else return;
}

async function checkIfCuisineDoesNotExists(data) {
  const cuisine = await Cuisine.findOne({ _id: data._id });
  if (!cuisine)
    throw new ExpressError("Cannot find any cuisine with the given id", 400);
  else return { cuisine };
}

async function deleteCuisine(data) {
  await checkIfCuisineDoesNotExists(data);
  await Cuisine.findByIdAndDelete(data._id);
  return {};
}

async function editCuisineDetails(data) {
  await checkIfCuisineDoesNotExists(data);
  const cuisine = await Cuisine.findByIdAndUpdate(
    data._id,
    {
      ...data.cuisine,
    },
    { new: true, runValidators: true }
  );

  return { cuisine };
}
