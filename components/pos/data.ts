export type Item = { name: string; price: number };
export type Customer = { initials: string; name: string; phone: string; owes: number };

/** The shop's Fast 18: the 18 best sellers on the first POS screen (prices in rupees). */
export const ITEMS: Item[] = [
  { name: "Wai Wai Noodles", price: 25 },
  { name: "Coca-Cola 500 ml", price: 70 },
  { name: "Sugar 1 kg", price: 110 },
  { name: "Basmati Rice 1 kg", price: 180 },
  { name: "Sunflower Oil 1 L", price: 280 },
  { name: "Eggs (1 pc)", price: 18 },
  { name: "DDC Milk 500 ml", price: 55 },
  { name: "Tokla Tea 100 g", price: 95 },
  { name: "Parle-G", price: 10 },
  { name: "Lux Soap", price: 65 },
  { name: "Masoor Dal 1 kg", price: 190 },
  { name: "Salt 1 kg", price: 25 },
  { name: "Kurkure", price: 20 },
  { name: "Fanta 500 ml", price: 70 },
  { name: "Colgate 100 g", price: 140 },
  { name: "Rara Noodles", price: 20 },
  { name: "Mustard Oil 1 L", price: 300 },
  { name: "Lays Chips", price: 50 },
];

export const CUSTOMERS: Customer[] = [
  { initials: "HS", name: "Hari Shrestha", phone: "98412 34567", owes: 1250 },
  { initials: "SG", name: "Sita Gurung", phone: "98023 11223", owes: 0 },
  { initials: "RT", name: "Ram Thapa", phone: "98510 99881", owes: 3400 },
  { initials: "GR", name: "Gita Rai", phone: "98135 44120", owes: 560 },
];

/** The bill the demo opens with, as [item index, quantity]. */
export const SAMPLE_BILL: [number, number][] = [
  [0, 5],
  [1, 1],
  [2, 2],
  [4, 1],
  [5, 6],
];

export const rs = (n: number) => "Rs " + Math.round(n).toLocaleString("en-IN");
