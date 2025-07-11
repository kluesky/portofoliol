// math.js

export function solveBasicOperation(expr) {
  try {
    const result = Function('"use strict"; return (' + expr + ')')();
    return isNaN(result) ? '🛑 Bukan ekspresi valid' : result;
  } catch {
    return '❌ Kesalahan input';
  }
}

export function factorial(n) {
  if (n < 0) return '❌ Angka harus >= 0';
  if (n === 0) return 1;
  return n * factorial(n - 1);
}

export function power(base, exp) {
  return Math.pow(base, exp);
}

export function squareRoot(n) {
  if (n < 0) return '❌ Akar dari bilangan negatif tidak didefinisikan';
  return Math.sqrt(n);
}

export function percentage(part, whole) {
  if (whole === 0) return '❌ Tidak bisa bagi 0';
  return (part / whole) * 100;
}

export function gcd(a, b) {
  if (!b) return a;
  return gcd(b, a % b);
}

export function lcm(a, b) {
  return Math.abs(a * b) / gcd(a, b);
}
export function evaluate(expression) {
  try {
    // Bersihkan spasi dan karakter aneh
    let clean = expression
      .replace(/[^\d\+\-\*\/\.\(\)]/g, '')  // hanya izinkan angka dan operator
      .replace(/÷/g, '/')
      .replace(/×/g, '*')
      .replace(/,/g, '.') // kalau desimal pakai koma

    if (!clean || /[^\d\+\-\*\/\.\(\)]/.test(clean)) {
      throw new Error("Ekspresi tidak valid.");
    }

    return Function(`"use strict"; return (${clean})`)();
  } catch (err) {
    throw new Error("Ekspresi tidak valid.");
  }
}