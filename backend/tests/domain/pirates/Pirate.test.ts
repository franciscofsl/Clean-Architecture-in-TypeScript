import { Pirate  } from "../../../src/domain/pirates/Pirate";

describe("Pirate", () => {
  it("should create a pirate with a name", () => {
    const pirate = new Pirate("Blackbeard");
    expect(pirate.name).toBe("Blackbeard");
  });
});