const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

// Models
const userModel = require("../models/User");
const urlModel = require("../models/Url");

// Validators
const newUserValidator = require('../validators/NewUserValidator')
const loginValidator = require('../validators/LoginValidator')
const urlValidator = require('../validators/UrlValidator')


const chkEmail = async (email) => {
  const emailChk = await userModel.findOne({ email }).exec();
  if (emailChk) return true;
  return false;
};

const registerUser = async (req, res) => {
  const { email, password, name } = req.body;

  // Check for email
  if (await chkEmail(email)) {
    return res.status(400).json({ message: "Email Exists!" });
  }

  try {
    await newUserValidator.validateAsync({email, password, name})
  } catch (err) {
    return res.status(400).json({error: err})
  }

  const hashedPassword = await argon2.hash(password);

  const newUser = new userModel({
    email,
    name,
    password: hashedPassword,
    image: `https://api.dicebear.com/6.x/initials/svg?seed=${encodeURI(name)}`,
  });

  await newUser.save();

  return res.status(201).json(newUser);
};

const verifyPassword = async (hash, plain) => {
  return await argon2.verify(hash, plain);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    await loginValidator.validateAsync({email, password})
  } catch (err) {
    return res.status(400).json({error: err})
  }

  const user = await userModel.findOne({ email }).exec();

  if (!user) {
    return res.status(400).json({ message: "Invalid Email" });
  }

  if (!verifyPassword(user.password, password)) {
    return res.status(400).json({ message: "Invalid Password" });
  }

  const token = jwt.sign(
    {
      email: user.email,
      name: user.name,
      _id: user._id,
      loginTime: new Date().getTime(),
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );

  return res.status(200).json({
    token,
    message: "success",
    ...user,
  });
};

const getProfile = async (req, res) => {
  const user = req?.user;
  const userData = await userModel.findById(user?._id, {password: 0}).exec();

  return res.status(200).json(userData);
};

const deleteUser = async (req, res) => {
  const user = req?.user;

  const deletedUser = await userModel.deleteOne({ _id: user?._id });

  return res.status(200).json({ message: "Account Deleted", ...deletedUser });
};

const modifyUser = async (req, res) => {
  const user = req?.user;

  const modfiedData = req.body;

  if (modfiedData?.name) {
    modfiedData.image = `https://api.dicebear.com/6.x/initials/svg?seed=${encodeURI(modfiedData?.name)}`
  }

  const updateUser = await userModel.updateOne({ _id: user?._id }, modfiedData);
  if (!updateUser) {
    return res.status(404).json({ message: "User not found!" });
  }

  return res.status(200).json(updateUser);
};

const generate_id = (n_char = 5) =>
  Math.random().toString(36).slice(2).substring(0, n_char);

const createUrl = async (req, res) => {
  const { url, title } = req.body;
  const created_by = req?.user?._id;

  try {
    await urlValidator.validateAsync({url, title, created_by})
  } catch (err) {
    return res.status(400).json({error: err})
  }

  const s_id = generate_id();

  const newUrlSht = new urlModel({
    title,
    url,
    shortened_id: s_id,
    createdBy: created_by,
  });

  await newUrlSht.save();

  return res
    .status(201)
    .json({
      message: "Created",
      ...newUrlSht,
      link: `${req.protocol}://${
        req.headers["X-Forwarded-IP"] || req.connection.remoteAddress
      }/${s_id}`,
    });
};

const getUrlById = async (req, res) => {
    const {url_id} = req.params;
    const url = await urlModel.findById(url_id).exec()
    if (!url) return res.status(404).json({message: "Url not Found"})

    return res.status(200).json(url)
}

const getUrls = async (req, res) => {
    const urls = await urlModel.find({createdBy: req?.user?._id}).exec()
    return res.status(200).json(urls)
}

const modifyUrl = async (req, res) => {
    const {url_id} = req.params;
    const data = req.body;

    const updated = await urlModel.findByIdAndUpdate(url_id, data).exec()
    if (!updated) return res.status(404).json({message: "Url not found"})

    return res.status(200).json({message: "Updated", ...updated})
}

const deleteUrl = async (req, res) => {
    const {url_id} = req.params;
    const url = await urlModel.findByIdAndDelete(url_id).exec()
    if (!url) return res.status(404).json({message: "Url not Found"})

    return res.status(200).json({message: "Url Deleted"})
}

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  deleteUser,
  modifyUser,
  createUrl,
  deleteUrl,
  getUrls,
  getUrlById,
  modifyUrl
};
