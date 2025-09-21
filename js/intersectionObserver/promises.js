const STATE = {
  pending: "PENDING",
  fulfilled: "FULFILLED",
  rejected: "REJECTED",
};

class MyPromise {
  constructor(callback) {
    try {
      callback(this.#onSuccess, this.#onFail);
    } catch (e) {
      this.#onFail(e);
    }
  }
  #value = "";
  #state = STATE.pending;
  #thencbs = [];
  #catchcbs = [];

  //method to run callbacks on resolve and reject callbacks

  #runcallback = () => {
    queueMicrotask(() => {
      if (this.#state === STATE.fulfilled) {
        this.#thencbs.forEach((cb) => {
          cb(this.#value);
        });

        this.#thencbs = [];
      }

      if (this.#state === STATE.rejected) {
        this.#catchcbs.forEach((cb) => {
          cb(this.#value);
        });

        this.#catchcbs = [];
      }
    });
  };
  //resolve
  //use arrow functions so that this always points to the parent
  #onSuccess = (value) => {
    if (this.#state !== STATE.pending) return;
    this.#value = value;
    this.#state = STATE.fulfilled;
    this.#runcallback();
  };

  //reject
  #onFail = (value) => {
    if (this.#state !== STATE.pending) return;
    this.#value = value;
    this.#state = STATE.rejected;
    this.#runcallback();
  };

  //   then = (thenCb, catchCb) => {
  //     return new MyPromise((resolve, reject) => {
  //       if (thenCb) this.#thencbs.push(thenCb);

  //       if (catchCb) {
  //         this.#catchcbs.push(catchCb);
  //       }
  //     });
  //   };

  then = (thenCb, catchCb) => {
    return new MyPromise((resolve, reject) => {
      this.#thencbs.push((value) => {
        if (thenCb === null) {
          resolve(value);
          return;
        }

        const res = thenCb(value);
        resolve(res);
      });

      this.#catchcbs.push((value) => {
        if (catchCb === null) {
          reject(value);
          return;
        }

        const res = catchCb(value);
        resolve(res);
      });

      //   if (catchCb) {
      //     this.#catchcbs.push(catchCb);
      //   }
    });
  };
  catch = (cb) => {
    this.#catchcbs.push(cb);
  };
}

const mypromise = new MyPromise(function (resolve, reject) {
  setTimeout(() => {
    resolve("Promise resolved 1");
  }, 3000);
});
mypromise.then((data) => data).then((res) => console.log(res));

//1. Privatization - Make variables,success and failure methods private
//2. Invoking callback
//3. Fixing value of this
//4. Fixing direct invocation of callback
//5. Setup onsuccess and onfail calls
//6. Handling multiple resolve and reject calls
//7. Handling then and catch calls--> then block is called only after promise is resolved
//8. Call the then and catch callbacks accordingly,on resolve and reject cases
//9. microtask
//10.Multiple then callbacks with delay
//11.catch as second
