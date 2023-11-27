export function generateRandomId(): number {
    // Using Math.random() to generate a random number
    const randomPart = Math.random().toString().substr(2, 5);
  
    // Using Date.now() to get the current timestamp
    const timestampPart = Date.now();
  
    // Combining the random and timestamp parts
    const randomId = parseInt(`${timestampPart}${randomPart}`, 10);
  
    return randomId;
  }
  