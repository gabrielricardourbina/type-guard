import type { Guard } from "../src/";
import { testGuard } from "./tools";
import { isNumber, RecordOf } from "../src";

describe("Grades: { [name: string]: number }", () => {
  const isGrades = RecordOf([isNumber]);
  testGuard<Guard<{ [name: string]: number }>>("{ [name: string]: number }")(
    isGrades
  )
    .pass({ "Jane Doe": 9, "Jon Snow": 10 })
    .pass({})
    .fail([])
    .fail([1, 2, 3, 4])
    .fail({ "Jane Doe": 9, "Jon Snow": "A+" })
    .fail({ brand: "Toyota", engine: 1.8 })
    .fail(["Jane Doe", "23"])
    .fail(["10", true])
    .fail([10, true])
    .fail(null)
    .fail(10)
    .fail("10")
    .fail(true);
});

describe("Grades: { [name: string]: number | Grades }", () => {
  type Grades = { [name: string]: number | Grades };
  const isGrades = RecordOf<Grades>((self) => [isNumber, self]);
  testGuard<Guard<Grades>>("{ [name: string]: number | Grades }")(isGrades)
    .pass({ "Jane Doe": 9, "Jon Snow": 10 })
    .pass({ "Jane Doe": 9, "Jon Snow": 10, "Jon Ripper": { Carl: 23 } })
    .pass({})
    .fail([])
    .fail([1, 2, 3, 4])
    .fail({ "Jane Doe": 9, "Jon Snow": "A+" })
    .fail({ brand: "Toyota", engine: 1.8 })
    .fail(["Jane Doe", "23"])
    .fail(["10", true])
    .fail([10, true])
    .fail(null)
    .fail(10)
    .fail("10")
    .fail(true);
});
