import config from "../app.config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserRecord, UserRecordType } from "../db/models/models";

export const signJwt = async (
  user: UserRecordType,
  jwtType: "refresh" | "access"
) => {
  if (jwtType === "access") {
    const token = jwt.sign(
      { id: user.id!, username: user.name },
      config.JwtAccessKey,
      { expiresIn: "30 minutes" }
    );
    return token;
  } else {
    // todo refresh tokens
    throw new Error("Not implemented");
  }
};
