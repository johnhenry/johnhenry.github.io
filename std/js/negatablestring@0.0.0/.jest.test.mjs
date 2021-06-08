import "./string-prototype-warn.mjs";
import { negater, scale, concat, equal as strEqual, abs } from "./index.mjs";

describe("Normal strings", () => {
  const SAMPLE_STRING = "sample string";

  test("String has 'rep' property", () => {
    expect(SAMPLE_STRING.rep).toBeTruthy();
  });

  test("All characters are positive.'", () => {
    SAMPLE_STRING.rep.every(([char, sign]) => expect(sign).toBeFalsy());
  });

  test("All characters are positive.'", () => {
    expect(SAMPLE_STRING).toEqual(
      SAMPLE_STRING.rep.map(([char]) => char).join("")
    );
  });
});

describe("Negative Strings: Create negative string by scaling regular string by -1", () => {
  const DESREVER = "DESREVER";
  const REVERSED = scale(DESREVER, -1);

  test("negative string should be textually reversed", () => {
    expect(REVERSED.toString().split().reverse().join("")).toBe("REVERSED");
  });

  test("negative numbres should be represented by prefix when given passed to toString method", () => {
    expect(REVERSED.toString("~").split().reverse().join("")).toBe(
      "~R~E~V~E~R~S~E~D"
    );
  });
});

describe("Negater: Use specific character to negate characters within string", () => {
  test("", () => {
    expect(strEqual(negater("mississippi"), "mississippi")).toBe(true);
    expect(strEqual(negater("m~iss~iss~ipp~i"), "mississippi")).toBe(false);
    expect(strEqual(negater("m~iss~iss~ipp~i").toString(), "mississippi")).toBe(
      true
    );
    expect(strEqual(negater("mis~sis~sip~pi"), "miiii")).toBe(true);
    expect(strEqual(negater("mi~ssi~ssi~ppi"), "miiii")).toBe(true);
    expect(strEqual(negater("mi~ss~is~si~pp~i"), "m")).toBe(true);
    expect(strEqual(negater("1~-1", "-").toString(), "1~1")).toBe(true);
  });
});

describe("Concat: Combine negative numbers", () => {
  const HELLO = "HELLO";
  const GOODBYE = scale("HELLO", -1);
  const COMBO = concat(HELLO, GOODBYE);
  test("", () => {
    expect(concat("HELLO", abs(GOODBYE)).toString()).toBe(HELLO + GOODBYE);
    expect(strEqual(COMBO, "")).toBe(true);
  });
});
