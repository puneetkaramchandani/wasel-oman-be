const { isEmpty } = require("lodash");
const { ExpressError } = require("../utils");
const Location = require("../models/location");
const { LOCATION_FILTERS } = require("../constants");

module.exports = {
  deleteLocation,
  addNewLocation,
  getAllLocations,
  updateLocationDetails,
};

async function getAllLocations(filters) {
  let locations = [];

  const filterGroup = {};

  Object.keys(filters).forEach((key) => {
    if (LOCATION_FILTERS.includes(`${key}`))
      filterGroup[`${key}`] = filters[`${key}`];
    else throw new ExpressError(`Filter type ${key} is not supported`, 400);
  });

  if (isEmpty(filters)) {
    locations = await Location.find();
  } else {
    locations = await Location.find({ ...filterGroup });
  }
  return { locations };
}

async function addNewLocation(data) {
  await throwErrorIfLocationAlreadyAdded(data);
  const location = new Location({
    ...data,
  });
  await location.save();
  return { location };
}

async function updateLocationDetails(data) {
  const { location_id, location_data } = data;
  await throwErrorIfLocationDoesNotExists(location_id);
  const location = await Location.findByIdAndUpdate(
    location_id,
    { ...location_data },
    { new: true, runValidators: true }
  );

  return { location };
}

async function throwErrorIfLocationAlreadyAdded(data) {
  const { country, city } = data;
  const location = await Location.findOne({ country, city });
  if (!isEmpty(location))
    throw new ExpressError(
      `${data.country} . ${data.city} is already added`,
      400
    );
  else return;
}

async function deleteLocation(data) {
  const { location_id } = data;
  await throwErrorIfLocationDoesNotExists(location_id);
  await Location.findByIdAndDelete(location_id);
  return {};
}

async function throwErrorIfLocationDoesNotExists(_id) {
  const location = await Location.findById(_id);
  if (isEmpty(location)) throw new ExpressError("Location not found", 400);
  else return;
}
