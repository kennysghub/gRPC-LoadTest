import { createClient } from 'redis';

const client = createClient({
  host: 'localhost', // Replace with your Redis server's host name
  port: 6379, // Replace with your Redis server's port
});

client.on('error', (err) => console.log(`Redis client not connected to the server: ${err.toString()}`));

client.on('ready', () => console.log('Redis client connected to the server'));

const key = 'myKey';
const value = 'myValue';

// Set key
client.set(key, value, (err, reply) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`SET: ${reply}`);
    
    // Get key
    client.get(key, (err, reply) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`GET: ${reply}`);
      }
    });
  }
});
