import { Router } from "express";
import { customerModel } from "../../models/Customers.js";

const router = Router();

router.post("/", async (req, res) => {
  const { mac } = req.body;
  try {
    const result = await customerModel.findOne({
      terminals: { $elemMatch: { mac } },
    });

    if (!result)
      return res
        .status(404)
        .send({ status: "error", message: "Mac not found" });

    const payload = {
      customer: result.name,
      terminal: result.terminals.find((t) => t.mac === mac).terminal,
    };

    res.send({ status: "success", payload });
  } catch (error) {
    console.log(error);
  }
});

export default router;
