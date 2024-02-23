const printNums = (items: number[]): void => {
  items.forEach((item) => console.log(item));
};

const printStrings = (items: string[]): void => {
  items.forEach((item) => console.log(item));
};

printNums([2, 3]);
printStrings(["2", "3"]);

const printItems = <Type>(items: Type[]) => {
  items.forEach((item) => console.log(item));
};
printItems([2, 3, 4]);
printItems(["2", "3", "4"]);
printItems<Number>([2, 3, 4]);
printItems<String>(["2", "3", "4"]);

class A<T> {
  items: T[] = [];
  constructor() {}
  getItems() {}
}

const newClass = new A<number>();
