import { Router } from "express";
import { generateMockPets } from "../utils/mockingPets.js";
import { generateMockUsers } from "../utils/mockingUsers.js";
import UserModel from "../dao/models/user.model.js";
import PetModel from "../dao/models/pet.model.js";

const router = Router();

router.get("/mockingpets", (req, res) => {
  const qty = Number(req.query.qty ?? 100);
  const pets = generateMockPets(qty);
  res.json({ status: "success", payload: pets });
});

router.get("/mockingusers", async (req, res) => {
  try {
    const users = await generateMockUsers(50, { mongoLike: true });
    res.json({ status: "success", payload: users });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

router.post("/generateData", async (req, res) => {
  try {
    const usersQty = Number(req.body.users ?? 0);
    const petsQty = Number(req.body.pets ?? 0);

    if (Number.isNaN(usersQty) || Number.isNaN(petsQty)) {
      return res.status(400).json({ status: "error", error: "users y pets deben ser numéricos" });
    }
    if (usersQty < 0 || petsQty < 0) {
      return res.status(400).json({ status: "error", error: "users y pets no pueden ser negativos" });
    }

    const mockUsers = await generateMockUsers(usersQty, { mongoLike: false });
    const mockPets = generateMockPets(petsQty);

    const insertedUsers = usersQty > 0 ? await UserModel.insertMany(mockUsers, { ordered: false }) : [];
    const insertedPets = petsQty > 0 ? await PetModel.insertMany(mockPets, { ordered: false }) : [];

    res.status(201).json({
      status: "success",
      inserted: { users: insertedUsers.length, pets: insertedPets.length }
    });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

export default router;
