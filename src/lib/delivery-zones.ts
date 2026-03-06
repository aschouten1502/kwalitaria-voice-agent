/**
 * Delivery zone validation for Kwalitaria Zijdelwaard, Uithoorn.
 * Covers approx. 5km radius: Uithoorn, De Kwakel, Amstelhoek,
 * parts of Mijdrecht and Aalsmeer.
 */
const DELIVERY_POSTCODES = [
  // Uithoorn
  "1420", "1421", "1422", "1423", "1424",
  // De Kwakel / Uithoorn-Zuid
  "1425", "1426", "1427", "1428",
  // Mijdrecht (dichtbij)
  "1430", "1431",
  // Aalsmeer (gedeeltelijk)
  "1432",
];

export function checkDelivery(postalCode: string): {
  can_deliver: boolean;
  message: string;
} {
  // Accept "1422", "1422DN", "1422 DN", etc.
  const cleaned = postalCode.replace(/\s/g, "").substring(0, 4);

  if (DELIVERY_POSTCODES.includes(cleaned)) {
    return {
      can_deliver: true,
      message: `Goed nieuws! We bezorgen in postcode ${cleaned}. Bezorging is gratis bij bestellingen boven EUR 15,00, anders EUR 2,50 bezorgkosten. Minimumbestelling is EUR 10,00.`,
    };
  }

  return {
    can_deliver: false,
    message: `Helaas, we bezorgen niet in postcode ${cleaned}. Ons bezorggebied is Uithoorn en directe omgeving (5 km). Je kunt wel afhalen bij Zijdelwaardplein 52A in Uithoorn!`,
  };
}
