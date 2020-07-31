require("../src/db/mongoose");
const Task = require("../src/models/task");

// Task.findByIdAndDelete("5f22b2033591c40e20883b24")
//   .then((task) => {
//     console.log(task);
//     return Task.countDocuments({ completed: false });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const deleteTaskAndCount = async (id) => {
  const deleteTask = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });

  return count;
};

deleteTaskAndCount("5f22b41e24645e3a700f2ad8")
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });
