const authorize = (req, res, next) => {
  const { user } = req.query
  console.log(req.query);
  if (user === 'john') {
      req.user = {name:'john',id:123}
  } else {
    res.status(401).send('Unauthorized')
  }
  
  next()
}

module.exports = {authorize}