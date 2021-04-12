const router = require('express').Router()
const Accounts = require('./accounts-model')
const mw = require("./accounts-middleware")

router.get('/', async (req, res, next) => {
  try{
    const accounts = await Accounts.getAll()
    res.status(200).json(accounts)
  }catch(err){
    next(err)
  }
})

router.get('/:id', mw.checkAccountId, (req, res) => {
 res.status(200).json(req.account)
})

router.post('/', mw.checkAccountPayload, async (req, res, next) => {
  try{
    const newAccount = await Accounts.create(req.body)
    res.status(201).json(newAccount)
  }catch(err){
    next(err)
  }
})

router.put('/:id', mw.checkAccountId, mw.checkAccountPayload, async (req, res, next) => {
  try{
    const updatedAccount = await Accounts.updateById(req.params.id, req.body)
    res.status(200).json(updatedAccount)
  }catch(err){
    next(err)
  }
});

router.delete('/:id', mw.checkAccountId, async (req, res, next) => {
  try{
    const deletedAccount = await Accounts.deleteById(req.params.id)
    res.json(deletedAccount)
  }catch(err){
    next(err)
  }
})

router.use((err, req, res) => { // eslint-disable-line
  res.status(500).json({message: err.message, stack: err.stack})
})

module.exports = router;
