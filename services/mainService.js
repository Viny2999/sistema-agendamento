const getMain = async (req, res) => {
  res.send({
    apiName: `backend-assistant`
  });
};

exports.getMain = getMain;
