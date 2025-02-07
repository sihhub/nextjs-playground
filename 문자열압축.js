//구현 문제

//1 <= s <= 1000
function solution(s) {
  if (s.length === 1) return 1;
  let minLen = s.length;

  for (let i = 1; i <= Math.floor(s.length / 2); i++) {
    let compressed = "";
    let prev = s.slice(0, i);
    let count = 1;

    for (let j = i; j < s.length; j += i) {
      const current = s.slice(j, j + i);

      if (prev === current) {
        count++;
      } else {
        compressed += (count > 1 ? count : "") + prev;
        prev = current;
        count = 1;
      }
    }

    // compressed += (count > 1 ? count : "") + prev;

    minLen = Math.min(minLen, compressed.length);
  }
}

console.log(Math.floor(5 / 2));
