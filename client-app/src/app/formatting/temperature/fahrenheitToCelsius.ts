export default function fahrenheitToCelsius(fahrenheit: number): number {
    const celsius = ((fahrenheit - 32) * 5) / 9;
    return celsius;
  }