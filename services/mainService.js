const getMain = (req, res) => {
  res.send({
    apiName: "backend-assistant",
    creator: "Vinicius Menezes",
    dateCreated: new Date("2019-03-27T15:00:00Z")
  });
};

exports.getMain = getMain;
