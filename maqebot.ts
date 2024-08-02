const DIRECTIONS = ['North', 'East', 'South', 'West'] as const;
const DELTA: Record<(typeof DIRECTIONS)[number], [number, number]> = {
  North: [0, 1],
  East: [1, 0],
  South: [0, -1],
  West: [-1, 0],
};

function calculateFinalPosition(commands: string): {
  x: number;
  y: number;
  direction: string;
} {
  let x = 0;
  let y = 0;
  let currentDirection = 0; // Starting with North

  // find all commands (R, L, WN)
  const commandList = commands.match(/R|L|W\d+/g);

  if (commandList) {
    // Process each command
    for (const command of commandList) {
      if (command === 'R') {
        // Turn right
        currentDirection = (currentDirection + 1) % 4;
      } else if (command === 'L') {
        // Turn left
        currentDirection = (currentDirection + 3) % 4;
      } else if (command.startsWith('W')) {
        // Move forward
        const steps = parseInt(command.substring(1));
        const [dx, dy] = DELTA[DIRECTIONS[currentDirection]];
        x += dx * steps;
        y += dy * steps;
      }

      // console.log(`Processing command: ${command}`);
      // console.log(
      //   `Current position: X: ${x}, Y: ${y}, Direction: ${DIRECTIONS[currentDirection]}`
      // );
    }
  }

  // Get final direction as a string
  const finalDirection = DIRECTIONS[currentDirection];

  return { x, y, direction: finalDirection };
}

// Test command
const commands = 'W5RW5RW2RW1R';

// Calculate the final position and direction
const { x, y, direction } = calculateFinalPosition(commands);

// Print the result
console.log(`X: ${x} Y: ${y} Direction: ${direction}`);
