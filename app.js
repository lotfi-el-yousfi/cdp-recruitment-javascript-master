const { data } = require('./data');

function filterData(data, pattern) {
  const regex = new RegExp(pattern, 'i');

  return data
    .map((country) => {
      // Filter animals matching pattern for each person
      const filteredPeople = country.people
        .map((person) => {
          const filteredAnimals = person.animals.filter((animal) =>
            regex.test(animal.name),
          );

          // Keep person only if they have animals matching the pattern
          if (filteredAnimals.length > 0) {
            return {
              ...person,
              animals: filteredAnimals,
            };
          }

          return null;
        })
        .filter(Boolean);

      // Keep country only if it has people with matching animals
      if (filteredPeople.length > 0) {
        return {
          ...country,
          people: filteredPeople,
        };
      }

      return null;
    })
    .filter(Boolean);
}

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
module.exports = {
  filterData,
  countData,
};
