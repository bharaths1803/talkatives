import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

let users = [
  {
    username: "Tester1",
    firstName: "Tester",
    lastName: "1",
    email: "Tester1@gmail.com",
    password: "Tester@1",
  },
  {
    username: "Tester2",
    firstName: "Tester",
    lastName: "2",
    email: "Tester2@gmail.com",
    password: "Tester@2",
  },
  {
    username: "Tester3",
    firstName: "Tester",
    lastName: "3",
    email: "Tester3@gmail.com",
    password: "Tester@3",
  },
  {
    username: "Tester4",
    firstName: "Tester",
    lastName: "4",
    email: "Tester4@gmail.com",
    password: "Tester@4",
  },
  {
    username: "Tester5",
    firstName: "Tester",
    lastName: "5",
    email: "Tester5@gmail.com",
    password: "Tester@5",
  },
  {
    username: "Tester6",
    firstName: "Tester",
    lastName: "6",
    email: "Tester6@gmail.com",
    password: "Tester@6",
  },
  {
    username: "Tester7",
    firstName: "Tester",
    lastName: "7",
    email: "Tester7@gmail.com",
    password: "Tester@7",
  },
  {
    username: "Tester8",
    firstName: "Tester",
    lastName: "8",
    email: "Tester8@gmail.com",
    password: "Tester@8",
  },
  {
    username: "Tester9",
    firstName: "Tester",
    lastName: "9",
    email: "Tester9@gmail.com",
    password: "Tester@9",
  },
  {
    username: "Tester10",
    firstName: "Tester",
    lastName: "10",
    email: "Tester10@gmail.com",
    password: "Tester@10",
  },
  {
    username: "Tester11",
    firstName: "Tester",
    lastName: "11",
    email: "Tester11@gmail.com",
    password: "Tester@11",
  },
  {
    username: "Tester12",
    firstName: "Tester",
    lastName: "12",
    email: "Tester12@gmail.com",
    password: "Tester@12",
  },
  {
    username: "Tester13",
    firstName: "Tester",
    lastName: "13",
    email: "Tester13@gmail.com",
    password: "Tester@13",
  },
  {
    username: "Tester14",
    firstName: "Tester",
    lastName: "14",
    email: "Tester14@gmail.com",
    password: "Tester@14",
  },
  {
    username: "Tester15",
    firstName: "Tester",
    lastName: "15",
    email: "Tester15@gmail.com",
    password: "Tester@15",
  },
  {
    username: "Tester16",
    firstName: "Tester",
    lastName: "16",
    email: "Tester16@gmail.com",
    password: "Tester@16",
  },
  {
    username: "Tester17",
    firstName: "Tester",
    lastName: "17",
    email: "Tester17@gmail.com",
    password: "Tester@17",
  },
  {
    username: "Tester18",
    firstName: "Tester",
    lastName: "18",
    email: "Tester18@gmail.com",
    password: "Tester@18",
  },
  {
    username: "Tester19",
    firstName: "Tester",
    lastName: "19",
    email: "Tester19@gmail.com",
    password: "Tester@19",
  },
  {
    username: "Tester20",
    firstName: "Tester",
    lastName: "20",
    email: "Tester20@gmail.com",
    password: "Tester@20",
  },
];

const seedUsers = async () => {
  try {
    users = await Promise.all(
      users.map(async (user) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        return { ...user, password: hashedPassword };
      })
    );

    await Promise.all(
      users.map(async (user) => {
        await User.create(user);
      })
    );

    console.log(`Successfully seeded the database`);
  } catch (error) {
    console.log(`Error in seeding users ${error}`);
  }
};

const deleteTestUsers = async () => {
  try {
    await Promise.all(
      users.map(async (user) => {
        const username = user.username;
        await User.deleteMany({ username });
      })
    );
    console.log(`Test users deleted successfully`);
  } catch (error) {
    console.log(`Error deleting test usrers ${error}`);
  }
};

//connectDB();
//seedUsers();
//deleteTestUsers();
