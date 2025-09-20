import { Kafka } from "kafkajs";

interface UserEvent {
  userId: number;
  name: string;
}

async function runProducer() {
  const kafka = new Kafka({ clientId: "main-app", brokers: ["localhost:9092"] });
  const producer = kafka.producer();

  await producer.connect();

  setInterval(async () => {
    const message: UserEvent = {
      userId: Date.now(),
      name: "User-" + Math.floor(Math.random() * 100),
    };

    await producer.send({
      topic: "user-events",
      messages: [{ value: JSON.stringify(message) }],
    });

    console.log("Produced:", message);
  }, 3000);
}

runProducer().catch(console.error);
