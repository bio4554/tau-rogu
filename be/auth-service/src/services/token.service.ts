import config from "../app.config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserRecord, UserRecordType, RefreshRecord } from "../db/models/models";
import * as refreshDbClient from "../db/clients/refresh.db";

export const signJwt = async (
  user: UserRecordType,
  jwtType: "refresh" | "access"
) => {
  if (jwtType === "access") {
    const key = config.JwtPrivateKey;
    const token = jwt.sign(
      { id: user.id!, username: user.name },
      config.JwtPrivateKey,
      { expiresIn: "30 minutes", algorithm: "RS256" }
    );
    return token;
  } else {
    if (!user.id) throw new Error("bad user id");
    const result = await refreshDbClient.invalidateAll(user.id);
    console.log(result);
    const refreshAuth: RefreshRecord = { user_id: user.id, valid: true };
    const insertResult = await refreshDbClient.insert(refreshAuth);
    const token = jwt.sign({ id: insertResult }, config.JwtPrivateKey, {
      expiresIn: "20 days",
      algorithm: "RS256",
    });
    return token;
  }
};

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
