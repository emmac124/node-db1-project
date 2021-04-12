const Accounts = require("./accounts-model") 

const checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body
  if(name && budget){
    next()
  }else{
    res.status(400).json({message: "name and budget required"})
  }
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

const checkAccountId = async (req, res, next) => {
  try{
    const {id} = req.params
    const account = await Accounts.getById(id)
    if(account){
      req.account = account
      next()
    }else{
      res.status(404).json({message: "Account not found"})
    }
  }catch(err){
    next(err)
  }
}

module.exports = {
  checkAccountId,
  checkAccountPayload
}
