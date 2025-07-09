const { data } = require('./data');

function main() {
  const args = process.argv.slice(2);
  let result = data;
  console.log(JSON.stringify(result, null, 2));
  // Process each CLI argument
  for (const arg of args) {
    if (arg.startsWith('--filter=')) {
      const pattern = arg.split('=')[1];
      result = filterData(result, pattern);
    } else if (arg === '--count') {
      result = countData(result);
    }
  }

  console.log(JSON.stringify(result, null, 2));
}

main();
