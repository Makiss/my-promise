type State<T> =
  | { status: "pending" }
  | { status: "fulfilled"; value: T }
  | { status: "rejected"; reason: unknown };

class MyPromise<T> {
  _state: State<T> = { status: "pending" };

  constructor(
    executor: (
      resolve: (value: T) => void,
      reject: (reason: unknown) => void,
    ) => void,
  ) {
    executor(this.#resolve, this.#reject);
  }

  #resolve = (value: T) => {
    if (this._state.status !== "pending") return;

    this._state = { status: "fulfilled", value };
  };
  #reject = (reason: unknown) => {
    if (this._state.status !== "pending") return;

    this._state = { status: "rejected", reason };
  };
}
