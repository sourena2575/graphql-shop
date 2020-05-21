const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const Product = require("../../models/Product");
const { UserInputError } = require("apollo-server");
const config = require("config");
// generate token
const tokenGenerator = (user) => {
  const secret = config.get("secretKey");
  return jwt.sign(
    { id: user.id, email: user.email, userName: user.userName },
    secret,
    { expiresIn: "100h" }
  );
};
// other shits
module.exports = {
  Query: {
    getUsers: async (parent, args) => {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        console.error(error);
      }
    },
    getUser: async (parent, args, context, info) => {
      try {
        const user = await User.findById(args.userId);
        return user;
      } catch (error) {
        console.error(error);
      }
    },
    getCart: async (parent, args, context, info) => {
      try {
        const { userId } = args;
        const user = await User.findById(userId);
        let products = [];
        user.cart.forEach((item) => {
          const product = Product.findById(item);
          products.unshift(product);
        });
        return products;
      } catch (error) {
        console.error(error);
      }
    },
  },
  Mutation: {
    signup: async (parent, args, context, info) => {
      const { name, lastName, userName, email, password } = args;
      const user = await User.findOne({ email: email });

      //validation
      if (user) {
        throw new UserInputError("ایمیل تکراری", {
          errors: {
            msg: "این ایمیل  قبلا ثبت شده است",
          },
        });
      } else if (
        name.trim() === "" ||
        lastName.trim() === "" ||
        email.trim() === "" ||
        password.trim() === "" ||
        userName.trim() === ""
      ) {
        throw new UserInputError(" فیلد پر نشده", {
          errors: {
            msg: "تمام ردیف ها باید پر شوند",
          },
        });
      } else {
        const hashed = await bcrypt.hash(password, 12);
        const newUser = new User({
          name,
          lastName,
          userName,
          email,
          password: hashed,
          createdAt: new Date().toDateString(),
        });
        const res = await newUser.save();
        const token = tokenGenerator(res);
        return {
          ...res._doc,
          id: res._id,
          token,
        };
      }
    },
    login: async (parent, args, context, info) => {
      const { userName, password } = args;
      const user = await User.findOne({ userName });
      if (!user) {
        throw new UserInputError("ایمیل نا معتبر", {
          errors: { msg: "این ایمیل ثبت نشده است" },
        });
      } else {
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          throw new UserInputError("رمز نا معتبر", {
            errors: { msg: "رمز وارد شده اشتباه است" },
          });
        } else {
          const token = tokenGenerator(user);
          return {
            ...user._doc,
            id: user._id,
            token,
          };
        }
      }
    },
    createProfile: async (parent, args, context, info) => {
      const { image, address, phone, idCode, postCode, userName } = args;
      const user = await User.findOne({ userName });
      if (user) {
        user.profile = { image, address, phone, idCode, postCode, userName };
        const res = await user.save();
        return res;
      } else {
        throw new UserInputError("کاربر نا معتبر", {
          errors: { msg: "این نام کاربری ثبت نشده است" },
        });
      }
    },
    addToCart: async (parent, args, context, info) => {
      const { userId, productId } = args;
      const user = await User.findById(userId);
      user.cart = [productId, ...user.cart];
      const res = await user.save();
      return res;
    },
    deleteFromCart: async (parent, args, context, info) => {
      try {
        const { userId, productId } = args;
        const user = await User.findById(userId);
        user.cart = user.cart.filter((item) => item !== productId);
        const res = await user.save();
        return res;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
