exports.sendError = (res, message) => {
   res.status(400);
   res.send({success: false, error: message});
};
