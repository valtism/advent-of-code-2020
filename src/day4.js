// Part 1
// ======

function part1(input) {
  const passports = input.split("\n\n");
  const passportFields = passports.map((p) =>
    p.split("\n").flatMap((e) => e.split(" "))
  );
  const pp = passportFields.map((p) =>
    p.reduce((acc, curr) => {
      const [one, two] = curr.split(":");
      return { ...acc, [one]: two };
    }, {})
  );
  const res = pp.filter(
    (p) => p.byr && p.iyr && p.eyr && p.hgt && p.hcl && p.ecl && p.pid
  );
  return res.length;
}

// Part 2
// ======

function part2(input) {
  const passports = input.split("\n\n");
  const passportFields = passports.map((p) =>
    p.split("\n").flatMap((e) => e.split(" "))
  );
  const pp = passportFields.map((p) =>
    p.reduce((acc, curr) => {
      const [one, two] = curr.split(":");
      return { ...acc, [one]: two };
    }, {})
  );
  const hasFields = pp.filter(
    (p) => p.byr && p.iyr && p.eyr && p.hgt && p.hcl && p.ecl && p.pid
  );
  const res = hasFields.filter((p) => {
    const bryValid = isValidDate(p.byr, 1920, 2002);
    const iyrValid = isValidDate(p.iyr, 2010, 2020);
    const eyrValid = isValidDate(p.eyr, 2020, 2030);
    const hgtValid = isValidHeight(p.hgt);
    const hclValid = /#([0-9a-f]){6}$/.test(p.hcl);
    const eclValid = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(
      p.ecl
    );
    const pidValid = p.pid.length === 9;
    return (
      bryValid &&
      iyrValid &&
      eyrValid &&
      hgtValid &&
      hclValid &&
      eclValid &&
      pidValid
    );
  });
  return res.length;
}

function isValidDate(string, min, max) {
  return string.length === 4 && Number(string) >= min && Number(string) <= max;
}

function isValidHeight(string) {
  const unit = string.slice(-2);
  const value = Number(string.slice(0, -2));
  switch (unit) {
    case "cm":
      return value >= 150 && value <= 193;
    case "in":
      return value >= 59 && value <= 76;
    default:
      return false;
  }
}

module.exports = { part1, part2 };
