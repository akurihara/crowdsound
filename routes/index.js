
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};

exports.main = function(req, res){
  console.log("Inside this function");
  res.render('main');
};
