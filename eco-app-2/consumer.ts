import { Kafka } from "kafkajs";

interface UserEvent {
  userId: number;
  name: string;
}

async function runConsumer() {
  const kafka = new Kafka({ clientId: "eco-app-2", brokers: ["localhost:9092"] });
  const consumer = kafka.consumer({ groupId: "eco-group-2" });

  await consumer.connect();
  await consumer.subscribe({ topic: "user-events", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      if (!message.value) return;
      const data: UserEvent = JSON.parse(message.value.toString());
      console.log(`[Eco App 2] Analytics updated for user: ${data.userId}`);
    },
  });
}

runConsumer().catch(console.error);
