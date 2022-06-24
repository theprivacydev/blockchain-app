module.exports = async function (callback) {
  try {
    console.log("script runnings");
  } catch (err) {
    console.log(err);
  }

  callback();
};
