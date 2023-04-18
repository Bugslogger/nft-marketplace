import { v4 as uuidv4 } from "uuid";
import { withSession, contractAddress } from "./utils";

export default withSession(async (req, res) => {
  console.warn(req);
  if (req.method === "GET") {
    try {
      const message = { contractAddress, id: uuidv4() };
      console.warn(message);
      req.session.set("message-session", message);
      console.warn("set session");

      await req.session.save();
      console.warn("save session");

      res.json(message);
      console.warn("messgage json");
    } catch {
      res.status(422).send({ message: "Cannot generate a message!" });
      console.warn("error");
    }
  } else {
    res.status(200).json({ message: "Invalid api route" });
    console.warn("res error");
  }
});
