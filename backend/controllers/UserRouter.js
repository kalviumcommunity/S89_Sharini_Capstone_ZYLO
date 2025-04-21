const express = require("express");
const router = express.Router();


// Dummy data
const users = [
    { id: '1', name: 'Alice', interests: ['music', 'hiking'], location: 'NY' },
    { id: '2', name: 'Bob', interests: ['tech', 'gaming'], location: 'LA' },
    { id: '3', name: 'Cara', interests: ['tech', 'music'], location: 'NY' }
];

router.get("/me",(req,res)=>{
    const currentUser = users[0];
    res.json(currentUser);
})

router.get('/:id', (req, res) => {
    try {
      const { id } = req.params;
      const user = users.find(user => user.id === id);
      if (!user) {
        return res.status(404).json({msg:"User not found"});
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).send({msg:"Internal Server Error",error});
    }
});  
  
  
router.get('/nearby/all', (req, res) => {
    try {
        const currentUser = users[0];
        const nearby = users.filter(user => user.location === currentUser.location && user.id !== currentUser.id);
        res.json(nearby);
    } catch (error) {
        res.status(500).send({msg:"Internal Server Error",error});
    }
});
  
  
router.get('/discover/match', (req, res) => {
    try {
        const currentUser = users[0];
        const matches = users.filter(user => user.id !== currentUser.id && user.interests.some(interest => currentUser.interests.includes(interest)));
        res.json(matches);
    } catch (error) {
        res.status(500).send({msg:"Internal Server Error",error});
    }
});

module.exports = router;