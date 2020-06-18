import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import env from "../config/environment";
import User, { UserModel } from "../models/user";

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.jwtSecret,
};

export default new Strategy(opts, async (payload, done) => {
  try {
    const user = await User.findById(payload.id);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    console.error(error);
  }
});
