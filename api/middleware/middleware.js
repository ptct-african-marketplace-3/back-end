const users = require("../auth/auth-model");

const checkForDuplicates = async (req, res, next) => {
    try {
        const username = req.body.userName;
        const user = await users.findByUserName(username)
        if (user) {
            return res.status(400).json({
                message: "Username is already taken. Please use another username.",
            })
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }
};

const checkPayload = (req, res, next) => {
    console.log("in the checkPayload")
      const username = req.body.userName;
      const password = req.body.password;
      if (!username || !password) {
          return res.status(400).json(
              "username and password required"
          )
      } else {
          next()
      }
  }

  const checkUsernameExists = async (req, res, next) => {
    try {
        const userName = req.body.userName;
        const user = await users.findByUserName(userName)

        if (!user) {
            return res.status(401).send({
              message: "invalid credentials",
          })
        }

        const passwordValid = await bcrypt.compare(req.body.password, user.password)

        if (!passwordValid) {
            return res.status(401).json({
                message: "invalid credentials",
            })
        }

        req.user = user
        next()

    } catch (err) {
        next(err)
    }

};

module.exports = {
    checkForDuplicates,
    checkPayload,
    checkUsernameExists
}