const assert = require('assert');
const { data } = require('./data');
const { filterData, countData } = require('./app');

console.log('===== Lancement des tests =====');

// Test de filterData
(function testFiltrage() {
  // On filtre avec le motif 'ry'
  const resultat = filterData(data, 'ry');

  // Vérifier que c'est bien un tableau
  assert(Array.isArray(resultat), 'Le résultat doit être un tableau');

  // On doit trouver 2 pays
  assert.strictEqual(
    resultat.length,
    2,
    'On doit obtenir 2 pays après filtrage',
  );

  // Vérifier les noms de pays
  const nomsPays = resultat.map((c) => c.name);
  assert(
    nomsPays.includes('Uzuzozne'),
    "Le pays 'Uzuzozne' doit apparaître dans le résultat",
  );
  assert(
    nomsPays.includes('Satanwi'),
    "Le pays 'Satanwi' doit apparaître dans le résultat",
  );

  // Vérifier les animaux filtrés
  const animauxUzuzozne = resultat
    .find((c) => c.name === 'Uzuzozne')
    .people[0].animals.map((a) => a.name);
  assert.deepStrictEqual(
    animauxUzuzozne,
    ['John Dory'],
    "Le pays 'Uzuzozne' doit contenir uniquement 'John Dory'",
  );

  console.log('Test filterData passé');
})();

// Test de countData
(function testComptage() {
  const resultat = countData(data);

  // Vérifier que c'est bien un tableau
  assert(Array.isArray(resultat), 'Le résultat doit être un tableau');
  assert(resultat.length > 0, 'Le résultat ne doit pas être vide');

  const premierPays = resultat[0];
  assert(
    /\[\d+\]$/.test(premierPays.name),
    'Le nom du pays doit contenir le nombre entre crochets',
  );

  const premierePersonne = premierPays.people[0];
  assert(
    /\[\d+\]$/.test(premierePersonne.name),
    'Le nom de la personne doit contenir le nombre entre crochets',
  );

  console.log('Test countData passé');
})();

console.log('Tous les tests sont passés avec succès !');
