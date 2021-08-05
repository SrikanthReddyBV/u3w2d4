const readline = require("readline");

const EventEmitter = require("events");

const evenEm = new EventEmitter();

let books = [{ book: "Think like a monk" }];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const menu = function () {
  rl.question(
    `Press 1,2 or 3 to do the below acions based on your selection :
 \n 1 - Show all books
  \n 2 - Add a new book
   \n 3 - Quit \n \n`,
    (option) => {
      if (option == 1) {
        evenEm.emit("1");
      } else if (option == 2) {
        evenEm.emit("2");
      } else if (option == 3) {
        evenEm.emit("3");
      } else {
        evenEm.emit("invalid");
      }
    }
  );
};

menu();

evenEm.on("1", () => {
  console.log("========== List of books ============");
  books.forEach(({ book }) => {
    console.log("  " + book);
  });
  console.log("=====================================");
  menu();
});

evenEm.on("2", () => {
  rl.question(`Add name of the book : \n`, (title) => {
    books.push({ book: title });
    console.log("book added succefully");
    menu();
  });
});

evenEm.on("3", () => {
  rl.question(`Are you sure you want to quit ? press Y : `, (conformation) => {
    if (conformation == "Y") {
      rl.close();
    } else {
      console.log("Taking back to home");
      menu();
    }
  });
});

evenEm.on("invalid", () => {
  console.log("you are selected invalid entry");
  menu();
});

rl.on("close", () => {
  console.log("Bye Bye!");
});
