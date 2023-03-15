import config from "../app.config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserRecord, UserRecordType, RefreshRecord } from "../db/models/models";

export const verifyJwt = async (
  token: string,
  jwtType: "refresh" | "access"
) => {
  if (jwtType == "access") {
    const decoded = jwt.verify(token, config.JwtPublicKey, {
      algorithms: ["RS256"],
    }) as JwtPayload;
    return decoded;
  } else {
    const decoded = jwt.verify(token, config.JwtPublicKey, {
      algorithms: ["RS256"],
    }) as JwtPayload;
    return decoded;
  }
};
