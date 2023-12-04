// test.js

// async function main() {
//   setTimeout(() => {
//     console.log('hello');
//   }, 5000);

//   console.log('world');
// }

async function main() {
  await new Promise((resolve) => {
    setTimeout(() => {
      console.log('hello');
      resolve();
    }, 5000);
  });

  console.log('world');
}

main();
