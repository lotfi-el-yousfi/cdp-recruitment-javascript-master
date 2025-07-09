const { data } = require('./data');

function countData(data) {
  return data.map((country) => {
    // Add count of people to country name
    const peopleWithCounts = country.people.map((person) => {
      // Add count of animals to person name
      return {
        ...person,
        name: `${person.name} [${person.animals.length}]`,
      };
    });

    return {
      ...country,
      name: `${country.name} [${peopleWithCounts.length}]`,
      people: peopleWithCounts,
    };
  });
}

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
