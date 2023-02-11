const Table = require("../models/table");
const { ExpressError } = require("../utils");

module.exports = { getAllTables, createNewTable, updateTableData, deleteTable };

async function getAllTables() {
  const tables = (await Table.find()) || [];
  return { tables };
}

async function createNewTable(restaurant, data) {
  await Table.checkExistingTable(restaurant, data.number);
  const table = new Table({
    ...data,
    restaurant: restaurant._id,
  });
  await table.save();
  return { table };
}

async function updateTableData(restaurant, tableData) {
  const { tableId, data } = tableData;
  if (data.number != null) {
    await Table.checkExistingTable(restaurant, data.number);
  }
  const table = await Table.findByIdAndUpdate(
    tableId,
    { ...data },
    { runValidators: true, new: true }
  );
  if (table === null) {
    throw new ExpressError("Table not found", 403);
  }
  return { table };
}

async function deleteTable(restaurant, tableData) {
  const { tableId } = tableData;
  const table = await Table.findOne({
    _id: tableId,
    restaurant: restaurant._id,
  });
  if (table === null) {
    throw new ExpressError("Table not found", 403);
  } else await table.delete();

  return { table };
}
