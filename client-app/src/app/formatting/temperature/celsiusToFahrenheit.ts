export default function celsiusToFahrenheit(celsius: number): number {
    const fahrenheit = (celsius * 9) / 5 + 32;
    return fahrenheit;
  }