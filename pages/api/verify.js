import { v4 as uuidv4 } from "uuid";
import {
  withSession,
  contractAddress,
  addressCheckMiddleware,
  pinataApiKey,
  pinataApiSecretKey,
  JWTtoken,
} from "./utils";

export default withSession(async (req, res) => {
  if (req.method === "POST") {
    try {
      const { body } = req;
      const nft = body.nft;

      // verify if nft meta data form is empty or has some value
      if (!nft.name || !nft.description || !nft.attributes) {
        return res
          .status(422)
          .send({ message: "Some of the form data are missing!" });
      }

      await addressCheckMiddleware(req, res);

      const jsonRes = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        {
          pinataMetadata: {
            name: uuidv4(),
          },
          pinataContent: nft,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + JWTtoken,
          },
        }
      );

      return res.status(200).send(jsonRes.data);
    } catch(e) {
      return res.status(422).send({ message: e });
    }
  } else if (req.method === "GET") {
    try {
      const message = { contractAddress, id: uuidv4() };

      // req.session.set("message-session", message);
      req.session = {
        "message-session": message,
      };
      // console.warn("set session");
      // req.session.user;
      await req.session.save();
      // console.warn("save session");

      return res.json(message);
      // console.warn("messgage json");
    } catch (error) {
      return res.status(422).send({ message: "Cannot generate a message!" });
    }
  } else {
    return res.status(200).json({ message: "Invalid api route" });
  }
});
