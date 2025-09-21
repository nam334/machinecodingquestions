function fakeFetcher(url, delay, flag = false) {
  return function () {
    return new Promise(function (resolve, reject) {
      setTimeout(() => {
        if (flag) {
          reject("API failed");
        } else {
          resolve("API passed");
        }
      }, delay);
    });
  };
}

// const p1 = fakeFetcher("P1", 6000, true);
// const p2 = fakeFetcher("P2", 2000, false);
// const p3 = fakeFetcher("P3", 3000, false);

// const allData = Promise.all([p1(), p2(), p3()]);
// allData?.then((res) => console.log(res)).catch((err) => console.log(err));

//POLYFILL OF PROMISE.ALL
// Promise.all = function (promises = []) {
//   return new Promise(function (resolve, reject) {
//     let result = [],
//       completed = 0;
//     if (!promises.length) {
//       resolve([]);
//       return;
//     }

//     promises.forEach(function (promise, index) {
//       promise
//         .then((data) => {
//           result[index] = data;
//           completed++;

//           if (completed === promises.length) {
//             resolve(result);
//           }
//         })
//         .catch((err) => {
//           reject(err);
//         });
//     });
//   });
// };

//POLYFILL OF PROMISE.ALLSETTLED

Promise.allSettled = function (promises) {
  return new Promise(function (resolve, reject) {
    let result = [],
      completed = 0;
    promises.forEach(function (promise, index) {
      promise
        .then((data) => {
          result[index] = { status: "fulfilled", value: data };
        })
        .catch((err) => {
          result[index] = { status: "rejected", reason: err };
        })
        .finally(() => {
          completed++;

          if (completed === promises.length) resolve(result);
        });
    });
  });
};
const p1 = fakeFetcher("P1", 6000, true);
const p2 = fakeFetcher("P2", 2000, true);
const p3 = fakeFetcher("P3", 3000, false);

const allData = Promise.allSettled([p1(), p2(), p3()]);
allData?.then((res) => console.log(res)).catch((err) => console.log(err));
