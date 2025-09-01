import express from "express";
import cors from "cors";
import { WhopServerSdk } from "@whop/api";

const app = express();
app.use(cors());
app.use(express.json());

const whopSdk = WhopServerSdk({
  appApiKey: process.env.WHOP_API_KEY,
  appId: process.env.NEXT_PUBLIC_WHOP_APP_ID,
});

// Send chat message
app.post("/api/send-message", async (req, res) => {
  const { message, experienceId } = req.body;
  await whopSdk.messages.sendMessageToChat({ experienceId, message });
  res.sendStatus(200);
});

// List chat messages
app.get("/api/list-messages", async (req, res) => {
  const { chatExperienceId } = req.query;
  const messages = await whopSdk.messages.listMessagesFromChat({ chatExperienceId });
  res.json(messages);
});

// Get current user
app.get("/api/get-user", async (req, res) => {
  const user = await whopSdk.users.getCurrentUser();
  res.json(user);
});

// Send websocket message
app.post("/api/send-websocket-message", async (req, res) => {
  const { message, experienceId } = req.body;
  await whopSdk.sendWebsocketMessage({ message, target: { experience: experienceId } });
  res.sendStatus(200);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
