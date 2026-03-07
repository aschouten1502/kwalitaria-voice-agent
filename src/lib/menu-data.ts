import type { MenuData, Customization } from "./types";

// ── Reusable customization templates ───────────────────────────────────

const SAUCE_CHOICES: Customization = {
  type: "sauce",
  label: "Keuze saus",
  multiple: true,
  options: [
    { name: "Fritessaus", price: 0.50 },
    { name: "Mayonaise", price: 0.50 },
    { name: "Ketchup", price: 0.50 },
    { name: "Curry", price: 0.50 },
    { name: "Pindasaus", price: 0.75 },
    { name: "Joppiesaus", price: 0.75 },
    { name: "Knoflooksaus", price: 0.50 },
    { name: "Sambal", price: 0.50 },
    { name: "Mosterd", price: 0.50 },
    { name: "Chilisaus", price: 0.50 },
    { name: "Whiskeysaus", price: 0.75 },
    { name: "Andalousesaus", price: 0.75 },
    { name: "Samuraisaus", price: 0.75 },
    { name: "BBQ saus", price: 0.75 },
    { name: "Sriracha mayo", price: 0.75 },
    { name: "Tartaarsaus", price: 0.50 },
    { name: "Truffel mayo", price: 0.90 },
  ],
};

const BURGER_SAUCE_CHOICES: Customization = {
  type: "sauce",
  label: "Saus op je burger",
  multiple: false,
  options: [
    { name: "Ketchup" },
    { name: "Mayonaise" },
    { name: "Mosterd" },
    { name: "Joppiesaus" },
    { name: "Whiskeysaus" },
    { name: "BBQ saus" },
    { name: "Sriracha mayo" },
    { name: "Truffel mayo", price: 0.40 },
    { name: "Geen saus" },
  ],
};

const BURGER_TOPPINGS: Customization = {
  type: "topping",
  label: "Toppings aanpassen",
  multiple: true,
  defaultSelected: ["Sla", "Tomaat", "Ui"],
  options: [
    { name: "Sla" },
    { name: "Tomaat" },
    { name: "Ui" },
    { name: "Augurk" },
    { name: "Jalapeno", price: 0.50 },
    { name: "Gebakken ui", price: 0.50 },
    { name: "Bacon", price: 1.00 },
    { name: "Extra kaas", price: 0.75 },
  ],
};

const BURGER_EXTRAS: Customization = {
  type: "extra",
  label: "Extra's",
  multiple: true,
  options: [
    { name: "Extra patty", price: 2.00 },
    { name: "Extra kaas", price: 0.75 },
    { name: "Bacon", price: 1.00 },
    { name: "Gebakken ei", price: 0.75 },
  ],
};

const FRIET_SAUS_KEUZE: Customization = {
  type: "sauce",
  label: "Saus erbij",
  multiple: true,
  options: [
    { name: "Fritessaus", price: 0.50 },
    { name: "Mayonaise", price: 0.50 },
    { name: "Ketchup", price: 0.50 },
    { name: "Curry", price: 0.50 },
    { name: "Pindasaus", price: 0.75 },
    { name: "Joppiesaus", price: 0.75 },
    { name: "Knoflooksaus", price: 0.50 },
    { name: "Sambal", price: 0.50 },
    { name: "Geen saus" },
  ],
};

const SNACK_SAUS: Customization = {
  type: "sauce",
  label: "Saus bij je snack",
  multiple: false,
  options: [
    { name: "Fritessaus" },
    { name: "Mayonaise" },
    { name: "Ketchup" },
    { name: "Curry" },
    { name: "Mosterd" },
    { name: "Joppiesaus" },
    { name: "Pindasaus" },
    { name: "Geen saus" },
  ],
};

const DRESSING_KEUZE: Customization = {
  type: "sauce",
  label: "Dressing",
  required: true,
  multiple: false,
  options: [
    { name: "Honing-mosterddressing" },
    { name: "Yoghurtdressing" },
    { name: "Caesardressing" },
    { name: "Balsamicodressing" },
    { name: "Zonder dressing" },
  ],
};

const BROODJE_GROENTEN: Customization = {
  type: "topping",
  label: "Groenten",
  multiple: true,
  defaultSelected: ["Sla", "Tomaat", "Ui", "Ijsbergsla"],
  options: [
    { name: "Sla" },
    { name: "Tomaat" },
    { name: "Ui" },
    { name: "Ijsbergsla" },
    { name: "Komkommer" },
    { name: "Jalapeno" },
  ],
};

const BROODJE_SAUS: Customization = {
  type: "sauce",
  label: "Saus op je broodje",
  multiple: true,
  options: [
    { name: "Knoflooksaus" },
    { name: "Sambal" },
    { name: "Cocktailsaus" },
    { name: "Andalousesaus" },
    { name: "Geen saus" },
  ],
};

const DRINK_KEUZE_MENU: Customization = {
  type: "extra",
  label: "Drinken bij je menu",
  required: true,
  multiple: false,
  options: [
    { name: "Coca-Cola" },
    { name: "Coca-Cola Zero" },
    { name: "Fanta" },
    { name: "Sprite" },
    { name: "Ice Tea" },
    { name: "Water" },
    { name: "Chocomel", price: 0.30 },
    { name: "Red Bull", price: 0.80 },
  ],
};

const KAPSALON_SAUS: Customization = {
  type: "sauce",
  label: "Saus op je kapsalon",
  multiple: true,
  defaultSelected: ["Knoflooksaus", "Sambal"],
  options: [
    { name: "Knoflooksaus" },
    { name: "Sambal" },
    { name: "Cocktailsaus" },
    { name: "Andalousesaus" },
    { name: "Geen saus" },
  ],
};

// ── Menu Data ──────────────────────────────────────────────────────────

export const menuData: MenuData = {
  restaurant: "Kwalitaria",
  location: "Zijdelwaard, Uithoorn",
  currency: "EUR",
  categories: [
    // ── 1. Friet ───────────────────────────────────────────────────────
    {
      name: "Friet",
      description: "Verse friet, gebakken in plantaardige olie",
      items: [
        {
          name: "Friet klein",
          price: 2.20,
          customizations: [FRIET_SAUS_KEUZE],
        },
        {
          name: "Friet middel",
          price: 3.30,
          customizations: [FRIET_SAUS_KEUZE],
        },
        {
          name: "Friet groot",
          price: 3.90,
          customizations: [FRIET_SAUS_KEUZE],
        },
        {
          name: "Friet gezinszak",
          price: 6.50,
          description: "Extra grote portie voor het hele gezin",
          customizations: [FRIET_SAUS_KEUZE],
        },
      ],
    },

    // ── 2. Friet Specials ──────────────────────────────────────────────
    {
      name: "Friet Specials",
      description: "Friet met toppings en vleesgerechten",
      items: [
        {
          name: "Patat speciaal klein",
          price: 3.50,
          description: "Friet met fritessaus, curry en uitjes",
          customizations: [
            {
              type: "extra",
              label: "Extra toppings",
              multiple: true,
              options: [
                { name: "Extra saus", price: 0.50 },
                { name: "Extra uitjes" },
              ],
            },
          ],
        },
        {
          name: "Patat speciaal groot",
          price: 4.90,
          description: "Friet met fritessaus, curry en uitjes",
        },
        {
          name: "Patat oorlog klein",
          price: 3.80,
          description: "Friet met fritessaus, pindasaus en uitjes",
        },
        {
          name: "Patat oorlog groot",
          price: 5.20,
          description: "Friet met fritessaus, pindasaus en uitjes",
        },
        {
          name: "Patatje joppie klein",
          price: 3.50,
          description: "Friet met joppiesaus en uitjes",
        },
        {
          name: "Patatje joppie groot",
          price: 4.90,
          description: "Friet met joppiesaus en uitjes",
        },
        {
          name: "Kapsalon shoarma",
          price: 9.50,
          description: "Friet, shoarma, kaas, salade en saus",
          defaultIngredients: ["friet", "shoarma", "kaas", "sla", "tomaat"],
          defaultSauce: "knoflooksaus en sambal",
          customizations: [KAPSALON_SAUS],
        },
        {
          name: "Kapsalon kip",
          price: 9.50,
          description: "Friet, kipfilet, kaas, salade en saus",
          defaultIngredients: ["friet", "kipfilet", "kaas", "sla", "tomaat"],
          defaultSauce: "knoflooksaus en sambal",
          customizations: [KAPSALON_SAUS],
        },
        {
          name: "Kapsalon doner",
          price: 9.50,
          description: "Friet, doner, kaas, salade en saus",
          defaultIngredients: ["friet", "doner", "kaas", "sla", "tomaat"],
          defaultSauce: "knoflooksaus en sambal",
          customizations: [KAPSALON_SAUS],
        },
        {
          name: "Kapsalon falafel",
          price: 9.00,
          description: "Friet, falafel, kaas, salade en saus (vegetarisch)",
          defaultIngredients: ["friet", "falafel", "kaas", "sla", "tomaat"],
          defaultSauce: "knoflooksaus en sambal",
          customizations: [KAPSALON_SAUS],
        },
        {
          name: "Friet gyros",
          price: 8.50,
          description: "Friet met gyros, kaas en tzatziki",
          customizations: [
            {
              type: "sauce",
              label: "Saus",
              multiple: false,
              options: [
                { name: "Tzatziki" },
                { name: "Knoflooksaus" },
                { name: "Sambal" },
              ],
            },
          ],
        },
        {
          name: "Friet hete kip",
          price: 8.50,
          description: "Friet met gekruide kipstukjes en saus",
          customizations: [
            {
              type: "sauce",
              label: "Saus",
              multiple: false,
              options: [
                { name: "Knoflooksaus" },
                { name: "Sambal" },
                { name: "Sriracha mayo" },
              ],
            },
          ],
        },
        {
          name: "Friet stoofvlees",
          price: 8.95,
          description: "Friet met huisgemaakt stoofvlees",
        },
        {
          name: "Nacho fries",
          price: 7.50,
          description: "Friet met nachotopping, kaas en jalapeno",
          customizations: [
            {
              type: "extra",
              label: "Extra's",
              multiple: true,
              options: [
                { name: "Extra kaas", price: 0.75 },
                { name: "Extra jalapeno", price: 0.50 },
                { name: "Guacamole", price: 1.00 },
              ],
            },
          ],
        },
        {
          name: "Cheesy hot fries",
          price: 7.50,
          description: "Friet met kaassaus en hot sauce",
        },
      ],
    },

    // ── 3. Snacks ──────────────────────────────────────────────────────
    {
      name: "Snacks",
      description: "Klassieke Nederlandse snacks",
      items: [
        {
          name: "Frikandel",
          price: 1.95,
          customizations: [SNACK_SAUS],
        },
        {
          name: "Frikandel speciaal",
          price: 3.25,
          description: "Met fritessaus, curry en uitjes",
          defaultIngredients: ["frikandel", "uitjes"],
          defaultSauce: "fritessaus en curry",
        },
        {
          name: "Kroket",
          price: 2.20,
          description: "Runderragout in krokant jasje",
          customizations: [
            {
              type: "sauce",
              label: "Saus",
              multiple: false,
              options: [
                { name: "Mosterd" },
                { name: "Ketchup" },
                { name: "Geen saus" },
              ],
            },
          ],
        },
        {
          name: "Bitterballen (6 stuks)",
          price: 5.25,
          description: "Met mosterd",
          customizations: [
            {
              type: "sauce",
              label: "Saus",
              multiple: false,
              options: [
                { name: "Mosterd" },
                { name: "Ketchup" },
                { name: "Geen saus" },
              ],
            },
          ],
        },
        {
          name: "Kaassouffl\u00e9",
          price: 2.25,
          description: "Vegetarisch",
          customizations: [SNACK_SAUS],
        },
        {
          name: "Kipnuggets (6 stuks)",
          price: 4.75,
          customizations: [SNACK_SAUS],
        },
        {
          name: "Kipnuggets (9 stuks)",
          price: 6.25,
          customizations: [SNACK_SAUS],
        },
        {
          name: "Chicken wings (6 stuks)",
          price: 5.50,
          customizations: [SNACK_SAUS],
        },
        {
          name: "Loempia",
          price: 2.75,
          customizations: [
            {
              type: "sauce",
              label: "Saus",
              multiple: false,
              options: [
                { name: "Chilisaus" },
                { name: "Ketchup" },
                { name: "Geen saus" },
              ],
            },
          ],
        },
        {
          name: "Bamischijf",
          price: 2.25,
          customizations: [SNACK_SAUS],
        },
        {
          name: "Nasischijf",
          price: 2.25,
          customizations: [SNACK_SAUS],
        },
        {
          name: "Kipcorn",
          price: 2.25,
          customizations: [SNACK_SAUS],
        },
        {
          name: "Mexicano",
          price: 2.50,
          description: "Pikante snack",
          customizations: [SNACK_SAUS],
        },
        {
          name: "Berenhap",
          price: 2.75,
          description: "Met pindasaus",
          customizations: [SNACK_SAUS],
        },
        {
          name: "Viandel",
          price: 2.25,
          customizations: [SNACK_SAUS],
        },
        {
          name: "Saucijzenbroodje",
          price: 2.50,
          customizations: [
            {
              type: "sauce",
              label: "Saus",
              multiple: false,
              options: [
                { name: "Ketchup" },
                { name: "Mosterd" },
                { name: "Curry" },
                { name: "Geen saus" },
              ],
            },
          ],
        },
        {
          name: "Gehaktbal",
          price: 2.75,
          customizations: [SNACK_SAUS],
        },
      ],
    },

    // ── 4. Burgers ─────────────────────────────────────────────────────
    {
      name: "Burgers",
      description: "Onze signature burgers op een briochebroodje",
      items: [
        {
          name: "The Original",
          price: 4.25,
          description: "120g runderburger met sla, tomaat en ui",
          defaultIngredients: ["briochebroodje", "120g runderpatty", "sla", "tomaat", "ui"],
          defaultSauce: "ketchup",
          customizations: [BURGER_SAUCE_CHOICES, BURGER_TOPPINGS, BURGER_EXTRAS],
        },
        {
          name: "The Bull",
          price: 5.95,
          description: "180g runderburger, extra groot en sappig",
          defaultIngredients: ["briochebroodje", "180g runderpatty", "sla", "tomaat", "ui"],
          defaultSauce: "BBQ saus",
          customizations: [BURGER_SAUCE_CHOICES, BURGER_TOPPINGS, BURGER_EXTRAS],
        },
        {
          name: "The Queen",
          price: 5.50,
          description: "Gegrilde kipfiletburger met kruidenmix",
          defaultIngredients: ["briochebroodje", "gegrilde kipfilet", "sla", "tomaat", "ui"],
          defaultSauce: "mayonaise",
          customizations: [BURGER_SAUCE_CHOICES, BURGER_TOPPINGS, BURGER_EXTRAS],
        },
        {
          name: "Crispy Chicken",
          price: 5.25,
          description: "Krokant gefrituurde kipburger",
          defaultIngredients: ["briochebroodje", "krokante kipburger", "sla", "tomaat", "ui"],
          defaultSauce: "mayonaise",
          customizations: [BURGER_SAUCE_CHOICES, BURGER_TOPPINGS, BURGER_EXTRAS],
        },
        {
          name: "Italian Tomeato",
          price: 5.95,
          description: "Met mozzarella, zongedroogde tomaat en pesto",
          defaultIngredients: ["briochebroodje", "runderpatty", "mozzarella", "zongedroogde tomaat", "sla", "tomaat", "ui"],
          defaultSauce: "pesto",
          customizations: [
            {
              type: "sauce",
              label: "Saus",
              multiple: false,
              options: [
                { name: "Pesto (standaard)" },
                { name: "Mayonaise" },
                { name: "Truffel mayo", price: 0.40 },
              ],
            },
            BURGER_TOPPINGS,
            BURGER_EXTRAS,
          ],
        },
        {
          name: "French Delight",
          price: 6.25,
          description: "Met brie en honing-mosterdsaus",
          defaultIngredients: ["briochebroodje", "runderpatty", "brie", "sla", "tomaat", "ui"],
          defaultSauce: "honing-mosterdsaus",
          customizations: [
            {
              type: "sauce",
              label: "Saus",
              multiple: false,
              options: [
                { name: "Honing-mosterdsaus (standaard)" },
                { name: "Mayonaise" },
                { name: "Truffel mayo", price: 0.40 },
              ],
            },
            BURGER_TOPPINGS,
            BURGER_EXTRAS,
          ],
        },
        {
          name: "1838",
          price: 7.50,
          description: "Signature burger: dubbel rundvlees, cheddar, bacon, speciale 1838-saus",
          defaultIngredients: ["briochebroodje", "dubbel rundvlees", "cheddar", "bacon", "sla", "tomaat", "ui"],
          defaultSauce: "speciale 1838-saus",
          customizations: [BURGER_TOPPINGS, BURGER_EXTRAS],
        },
        {
          name: "Miss Fisher",
          price: 6.50,
          description: "Zalmburger met dille-yoghurtsaus",
          defaultIngredients: ["briochebroodje", "zalmburger", "sla", "tomaat", "ui"],
          defaultSauce: "dille-yoghurtsaus",
          customizations: [
            {
              type: "sauce",
              label: "Saus",
              multiple: false,
              options: [
                { name: "Dille-yoghurtsaus (standaard)" },
                { name: "Tartaarsaus" },
                { name: "Mayonaise" },
              ],
            },
            BURGER_TOPPINGS,
          ],
        },
        {
          name: "Veggie Burger",
          price: 5.25,
          description: "Plantaardige burger (vegetarisch)",
          defaultIngredients: ["briochebroodje", "plantaardige burger", "sla", "tomaat", "ui"],
          defaultSauce: "ketchup",
          customizations: [BURGER_SAUCE_CHOICES, BURGER_TOPPINGS],
        },
        {
          name: "Hamburger",
          price: 3.50,
          description: "Klassieke hamburger 100g",
          defaultIngredients: ["broodje", "100g runderpatty", "sla", "tomaat", "ui"],
          defaultSauce: "ketchup",
          customizations: [BURGER_SAUCE_CHOICES, BURGER_TOPPINGS, BURGER_EXTRAS],
        },
        {
          name: "Cheeseburger",
          price: 4.00,
          description: "Hamburger met kaas",
          defaultIngredients: ["broodje", "100g runderpatty", "kaas", "sla", "tomaat", "ui"],
          defaultSauce: "ketchup",
          customizations: [BURGER_SAUCE_CHOICES, BURGER_TOPPINGS, BURGER_EXTRAS],
        },
      ],
    },

    // ── 5. Burger Menu's ───────────────────────────────────────────────
    {
      name: "Burger Menu's",
      description: "Burger + friet + salade",
      items: [
        {
          name: "The Original Menu",
          price: 9.50,
          description: "The Original burger + friet + salade",
          customizations: [
            BURGER_SAUCE_CHOICES,
            BURGER_TOPPINGS,
            {
              type: "size",
              label: "Maat friet",
              required: true,
              options: [
                { name: "Klein (standaard)" },
                { name: "Middel", price: 0.80 },
                { name: "Groot", price: 1.50 },
              ],
            },
            FRIET_SAUS_KEUZE,
          ],
        },
        {
          name: "The Bull Menu",
          price: 10.95,
          description: "The Bull 180g burger + friet + salade",
          customizations: [
            BURGER_SAUCE_CHOICES,
            BURGER_TOPPINGS,
            {
              type: "size",
              label: "Maat friet",
              required: true,
              options: [
                { name: "Klein (standaard)" },
                { name: "Middel", price: 0.80 },
                { name: "Groot", price: 1.50 },
              ],
            },
            FRIET_SAUS_KEUZE,
          ],
        },
        {
          name: "The Queen Menu",
          price: 10.50,
          description: "The Queen kipburger + friet + salade",
          customizations: [
            BURGER_SAUCE_CHOICES,
            BURGER_TOPPINGS,
            {
              type: "size",
              label: "Maat friet",
              required: true,
              options: [
                { name: "Klein (standaard)" },
                { name: "Middel", price: 0.80 },
                { name: "Groot", price: 1.50 },
              ],
            },
            FRIET_SAUS_KEUZE,
          ],
        },
        {
          name: "Crispy Chicken Menu",
          price: 10.25,
          description: "Crispy Chicken burger + friet + salade",
          customizations: [
            BURGER_SAUCE_CHOICES,
            BURGER_TOPPINGS,
            {
              type: "size",
              label: "Maat friet",
              required: true,
              options: [
                { name: "Klein (standaard)" },
                { name: "Middel", price: 0.80 },
                { name: "Groot", price: 1.50 },
              ],
            },
            FRIET_SAUS_KEUZE,
          ],
        },
        {
          name: "Italian Tomeato Menu",
          price: 10.95,
          description: "Italian Tomeato burger + friet + salade",
          customizations: [
            BURGER_SAUCE_CHOICES,
            BURGER_TOPPINGS,
            {
              type: "size",
              label: "Maat friet",
              required: true,
              options: [
                { name: "Klein (standaard)" },
                { name: "Middel", price: 0.80 },
                { name: "Groot", price: 1.50 },
              ],
            },
            FRIET_SAUS_KEUZE,
          ],
        },
        {
          name: "French Delight Menu",
          price: 11.25,
          description: "French Delight burger + friet + salade",
          customizations: [
            BURGER_SAUCE_CHOICES,
            BURGER_TOPPINGS,
            {
              type: "size",
              label: "Maat friet",
              required: true,
              options: [
                { name: "Klein (standaard)" },
                { name: "Middel", price: 0.80 },
                { name: "Groot", price: 1.50 },
              ],
            },
            FRIET_SAUS_KEUZE,
          ],
        },
        {
          name: "1838 Menu",
          price: 11.50,
          description: "Signature 1838 burger + friet + salade",
          customizations: [
            BURGER_TOPPINGS,
            {
              type: "size",
              label: "Maat friet",
              required: true,
              options: [
                { name: "Klein (standaard)" },
                { name: "Middel", price: 0.80 },
                { name: "Groot", price: 1.50 },
              ],
            },
            FRIET_SAUS_KEUZE,
          ],
        },
        {
          name: "Miss Fisher Menu",
          price: 11.25,
          description: "Miss Fisher zalmburger + friet + salade",
          customizations: [
            {
              type: "size",
              label: "Maat friet",
              required: true,
              options: [
                { name: "Klein (standaard)" },
                { name: "Middel", price: 0.80 },
                { name: "Groot", price: 1.50 },
              ],
            },
            FRIET_SAUS_KEUZE,
          ],
        },
        {
          name: "Veggie Burger Menu",
          price: 10.25,
          description: "Veggie Burger + friet + salade (vegetarisch)",
          customizations: [
            BURGER_SAUCE_CHOICES,
            BURGER_TOPPINGS,
            {
              type: "size",
              label: "Maat friet",
              required: true,
              options: [
                { name: "Klein (standaard)" },
                { name: "Middel", price: 0.80 },
                { name: "Groot", price: 1.50 },
              ],
            },
            FRIET_SAUS_KEUZE,
          ],
        },
      ],
    },

    // ── 6. Maaltijden ──────────────────────────────────────────────────
    {
      name: "Maaltijden",
      description: "Complete maaltijden met friet en salade",
      items: [
        {
          name: "Kipsate met friet en salade",
          price: 10.95,
          description: "Malse kipsate met pindasaus, friet en salade",
          customizations: [
            {
              type: "sauce",
              label: "Extra saus",
              multiple: false,
              options: [
                { name: "Extra pindasaus", price: 0.75 },
                { name: "Knoflooksaus", price: 0.50 },
                { name: "Geen extra saus" },
              ],
            },
          ],
        },
        {
          name: "Varkensschnitzel met friet en salade",
          price: 10.50,
          description: "Gepaneerde varkensschnitzel",
          customizations: [
            {
              type: "sauce",
              label: "Saus",
              required: true,
              multiple: false,
              options: [
                { name: "Champignonsaus" },
                { name: "Zigeunersaus" },
                { name: "Jus" },
                { name: "Zonder saus" },
              ],
            },
          ],
        },
        {
          name: "Boerenschnitzel met friet en salade",
          price: 10.95,
          description: "Schnitzel met champignons en paprikasaus",
          customizations: [
            {
              type: "extra",
              label: "Extra's",
              multiple: true,
              options: [
                { name: "Extra champignons", price: 0.75 },
                { name: "Extra kaas", price: 0.75 },
              ],
            },
          ],
        },
        {
          name: "Gyros menu met friet en salade",
          price: 10.95,
          description: "Gyros met tzatziki, friet en salade",
          customizations: [
            {
              type: "sauce",
              label: "Saus",
              multiple: false,
              options: [
                { name: "Tzatziki (standaard)" },
                { name: "Knoflooksaus" },
                { name: "Sambal" },
              ],
            },
          ],
        },
        {
          name: "Shoarma schotel",
          price: 11.50,
          description: "Shoarma met friet, salade en saus",
          customizations: [
            BROODJE_SAUS,
            {
              type: "extra",
              label: "Extra",
              multiple: true,
              options: [
                { name: "Extra vlees", price: 2.00 },
                { name: "Extra kaas", price: 0.75 },
              ],
            },
          ],
        },
        {
          name: "Kip schotel",
          price: 11.50,
          description: "Kipfilet met friet, salade en saus",
          customizations: [
            BROODJE_SAUS,
            {
              type: "extra",
              label: "Extra",
              multiple: true,
              options: [
                { name: "Extra vlees", price: 2.00 },
                { name: "Extra kaas", price: 0.75 },
              ],
            },
          ],
        },
        {
          name: "Doner schotel",
          price: 11.50,
          description: "Doner met friet, salade en saus",
          customizations: [
            BROODJE_SAUS,
            {
              type: "extra",
              label: "Extra",
              multiple: true,
              options: [
                { name: "Extra vlees", price: 2.00 },
                { name: "Extra kaas", price: 0.75 },
              ],
            },
          ],
        },
        {
          name: "Mix schotel",
          price: 11.95,
          description: "Shoarma, kip en doner met friet, salade en saus",
          customizations: [BROODJE_SAUS],
        },
      ],
    },

    // ── 7. Snack Menu's ────────────────────────────────────────────────
    {
      name: "Snack Menu's",
      description: "Snack + friet klein + saus + drankje",
      items: [
        {
          name: "Frikandel menu",
          price: 5.95,
          description: "Frikandel + friet klein + saus + drankje",
          customizations: [SNACK_SAUS, DRINK_KEUZE_MENU],
        },
        {
          name: "Kroket menu",
          price: 5.95,
          description: "Kroket + friet klein + saus + drankje",
          customizations: [SNACK_SAUS, DRINK_KEUZE_MENU],
        },
        {
          name: "Kaassouffl\u00e9 menu",
          price: 5.95,
          description: "Kaassouffl\u00e9 + friet klein + saus + drankje (vegetarisch)",
          customizations: [SNACK_SAUS, DRINK_KEUZE_MENU],
        },
        {
          name: "Kipcorn menu",
          price: 5.95,
          description: "Kipcorn + friet klein + saus + drankje",
          customizations: [SNACK_SAUS, DRINK_KEUZE_MENU],
        },
        {
          name: "Kipnuggets menu",
          price: 7.95,
          description: "Kipnuggets (6 st) + friet klein + saus + drankje",
          customizations: [SNACK_SAUS, DRINK_KEUZE_MENU],
        },
      ],
    },

    // ── 8. Kindermenu's ────────────────────────────────────────────────
    {
      name: "Kindermenu's",
      description: "Voor de kleine honger (incl. drankje en verrassing)",
      items: [
        {
          name: "Lika Box",
          price: 6.50,
          description: "Kipnuggets (4 st) + friet klein + drankje + verrassing",
          customizations: [
            {
              type: "extra",
              label: "Drinken",
              required: true,
              multiple: false,
              options: [
                { name: "Capri-Sun" },
                { name: "Fristi" },
                { name: "Chocomel" },
                { name: "Water" },
              ],
            },
            {
              type: "sauce",
              label: "Saus",
              multiple: false,
              options: [
                { name: "Ketchup" },
                { name: "Fritessaus" },
                { name: "Mayonaise" },
                { name: "Geen saus" },
              ],
            },
          ],
        },
        {
          name: "Timo Box",
          price: 6.50,
          description: "Frikandel + friet klein + drankje + verrassing",
          customizations: [
            {
              type: "extra",
              label: "Drinken",
              required: true,
              multiple: false,
              options: [
                { name: "Capri-Sun" },
                { name: "Fristi" },
                { name: "Chocomel" },
                { name: "Water" },
              ],
            },
            {
              type: "sauce",
              label: "Saus",
              multiple: false,
              options: [
                { name: "Ketchup" },
                { name: "Fritessaus" },
                { name: "Mayonaise" },
                { name: "Geen saus" },
              ],
            },
          ],
        },
      ],
    },

    // ── 9. Maaltijdsalades ─────────────────────────────────────────────
    {
      name: "Maaltijdsalades",
      description: "Verse salades als complete maaltijd",
      items: [
        {
          name: "Salade naturel",
          price: 5.50,
          description: "Gemengde sla met tomaat, komkommer en ui",
          customizations: [DRESSING_KEUZE],
        },
        {
          name: "Salade tonijn",
          price: 7.95,
          description: "Met tonijn, ei, olijven en rode ui",
          customizations: [DRESSING_KEUZE],
        },
        {
          name: "Salade kip",
          price: 7.95,
          description: "Met gegrilde kipfiletreepjes",
          customizations: [DRESSING_KEUZE],
        },
        {
          name: "Salade gegrilde groenten",
          price: 7.50,
          description: "Met paprika, courgette, aubergine (vegetarisch)",
          customizations: [DRESSING_KEUZE],
        },
      ],
    },

    // ── 10. Broodjes ───────────────────────────────────────────────────
    {
      name: "Broodjes",
      description: "Warme broodjes en durums",
      items: [
        {
          name: "Broodje shoarma",
          price: 6.50,
          defaultIngredients: ["broodje", "shoarma", "sla", "tomaat", "ui", "ijsbergsla"],
          defaultSauce: "knoflooksaus",
          customizations: [BROODJE_GROENTEN, BROODJE_SAUS],
        },
        {
          name: "Broodje kip",
          price: 6.50,
          defaultIngredients: ["broodje", "kipfilet", "sla", "tomaat", "ui", "ijsbergsla"],
          defaultSauce: "knoflooksaus",
          customizations: [BROODJE_GROENTEN, BROODJE_SAUS],
        },
        {
          name: "Broodje doner",
          price: 6.50,
          defaultIngredients: ["broodje", "doner", "sla", "tomaat", "ui", "ijsbergsla"],
          defaultSauce: "knoflooksaus",
          customizations: [BROODJE_GROENTEN, BROODJE_SAUS],
        },
        {
          name: "Broodje falafel",
          price: 6.00,
          description: "Vegetarisch",
          defaultIngredients: ["broodje", "falafel", "sla", "tomaat", "ui", "ijsbergsla"],
          defaultSauce: "knoflooksaus",
          customizations: [BROODJE_GROENTEN, BROODJE_SAUS],
        },
        {
          name: "Durum shoarma",
          price: 8.00,
          description: "In een tortillawrap",
          defaultIngredients: ["tortillawrap", "shoarma", "sla", "tomaat", "ui", "ijsbergsla"],
          defaultSauce: "knoflooksaus",
          customizations: [BROODJE_GROENTEN, BROODJE_SAUS],
        },
        {
          name: "Durum kip",
          price: 8.00,
          description: "In een tortillawrap",
          defaultIngredients: ["tortillawrap", "kipfilet", "sla", "tomaat", "ui", "ijsbergsla"],
          defaultSauce: "knoflooksaus",
          customizations: [BROODJE_GROENTEN, BROODJE_SAUS],
        },
        {
          name: "Durum doner",
          price: 8.00,
          description: "In een tortillawrap",
          defaultIngredients: ["tortillawrap", "doner", "sla", "tomaat", "ui", "ijsbergsla"],
          defaultSauce: "knoflooksaus",
          customizations: [BROODJE_GROENTEN, BROODJE_SAUS],
        },
        {
          name: "Broodje frikandel",
          price: 3.50,
          customizations: [SNACK_SAUS],
        },
        {
          name: "Broodje kroket",
          price: 3.50,
          customizations: [
            {
              type: "sauce",
              label: "Saus",
              multiple: false,
              options: [
                { name: "Mosterd" },
                { name: "Ketchup" },
                { name: "Geen saus" },
              ],
            },
          ],
        },
      ],
    },

    // ── 11. Sauzen ─────────────────────────────────────────────────────
    {
      name: "Sauzen",
      description: "Extra saus bij je bestelling (bakje)",
      items: [
        { name: "Fritessaus", price: 0.50 },
        { name: "Mayonaise", price: 0.50 },
        { name: "Ketchup", price: 0.50 },
        { name: "Curry", price: 0.50 },
        { name: "Pindasaus", price: 0.75 },
        { name: "Joppiesaus", price: 0.75 },
        { name: "Knoflooksaus", price: 0.50 },
        { name: "Sambal", price: 0.50 },
        { name: "Mosterd", price: 0.50 },
        { name: "Chilisaus", price: 0.50 },
        { name: "Whiskeysaus", price: 0.75 },
        { name: "Andalousesaus", price: 0.75 },
        { name: "Samuraisaus", price: 0.75 },
        { name: "BBQ saus", price: 0.75 },
        { name: "Sriracha mayo", price: 0.75 },
        { name: "Tartaarsaus", price: 0.50 },
        { name: "Truffel mayo", price: 0.90 },
      ],
    },

    // ── 12. Dranken ────────────────────────────────────────────────────
    {
      name: "Dranken",
      items: [
        { name: "Coca-Cola", price: 2.30 },
        { name: "Coca-Cola Zero", price: 2.30 },
        { name: "Fanta", price: 2.30 },
        { name: "Sprite", price: 2.30 },
        { name: "Ice Tea", price: 2.30 },
        { name: "Sinas", price: 2.30 },
        { name: "Cassis", price: 2.30 },
        { name: "Water", price: 1.80 },
        { name: "Chocomel", price: 2.50 },
        { name: "Fristi", price: 2.50 },
        { name: "Red Bull", price: 2.80 },
        { name: "Fernandes", price: 2.50 },
      ],
    },

    // ── 13. Milkshakes ─────────────────────────────────────────────────
    {
      name: "Milkshakes",
      description: "Vers gemaakte milkshakes",
      items: [
        { name: "Milkshake aardbei klein", price: 2.50 },
        { name: "Milkshake aardbei groot", price: 4.00 },
        { name: "Milkshake vanille klein", price: 2.50 },
        { name: "Milkshake vanille groot", price: 4.00 },
        { name: "Milkshake chocolade klein", price: 2.50 },
        { name: "Milkshake chocolade groot", price: 4.00 },
        { name: "Milkshake banaan klein", price: 2.50 },
        { name: "Milkshake banaan groot", price: 4.00 },
      ],
    },

    // ── 14. Softijs & Slush ────────────────────────────────────────────
    {
      name: "Softijs & Slush",
      items: [
        { name: "Softijs klein", price: 1.50 },
        { name: "Softijs groot", price: 2.50 },
        {
          name: "Softijs met dip",
          price: 2.00,
          customizations: [
            {
              type: "topping",
              label: "Dip smaak",
              required: true,
              multiple: false,
              options: [
                { name: "Chocolade" },
                { name: "Aardbei" },
                { name: "Karamel" },
              ],
            },
            {
              type: "size",
              label: "Maat",
              required: true,
              options: [
                { name: "Klein" },
                { name: "Groot", price: 1.00 },
              ],
            },
          ],
        },
        { name: "Slush aardbei", price: 2.50 },
        { name: "Slush blue raspberry", price: 2.50 },
        { name: "Slush cola", price: 2.50 },
      ],
    },
  ],
};

// ── Helpers ────────────────────────────────────────────────────────────

/** Total number of items on the menu */
export function getMenuItemCount(): number {
  return menuData.categories.reduce((sum, cat) => sum + cat.items.length, 0);
}

/** Format full menu for Vapi voice agent (text for tool response) */
export function formatMenuForVoice(): string {
  const header = `AANPASSINGEN: Klanten kunnen ingrediënten weglaten ("zonder ui"), extra's toevoegen ("met extra bacon"), of saus wijzigen ("samuraisaus ipv BBQ"). Bij place_order: removed[] voor verwijderde ingrediënten, extras[] voor toevoegingen, sauceNote voor sauswijzigingen.\nBurger Menu's: zelfde aanpassingen als de losse burger mogelijk.\n`;

  const categories = menuData.categories
    .map((cat) => {
      const catHeader = cat.description
        ? `${cat.name} (${cat.description})`
        : cat.name;

      const items = cat.items
        .map((item) => {
          let line = `  - ${item.name}: EUR ${item.price.toFixed(2).replace(".", ",")}`;
          if (item.description) {
            line += ` — ${item.description}`;
          }
          if (item.defaultIngredients?.length) {
            line += `\n      Standaard: ${item.defaultIngredients.join(", ")}`;
            if (item.defaultSauce) {
              line += ` | Saus: ${item.defaultSauce}`;
            }
          } else if (item.defaultSauce) {
            line += `\n      Standaard saus: ${item.defaultSauce}`;
          }
          if (item.customizations?.length) {
            const opts = item.customizations
              .map((c) => {
                const names = c.options
                  .filter((o) => o.name !== "Geen saus" && o.name !== "Zonder saus" && o.name !== "Zonder dressing")
                  .map((o) => o.name + (o.price ? ` (+EUR ${o.price.toFixed(2).replace(".", ",")})` : ""))
                  .join(", ");
                return `${c.label}: ${names}`;
              })
              .join(" | ");
            line += `\n      Opties: ${opts}`;
          }
          return line;
        })
        .join("\n");

      return `${catHeader}:\n${items}`;
    })
    .join("\n\n");

  return header + "\n" + categories;
}

/** Format a compact menu summary (category names + item count) */
export function formatMenuSummary(): string {
  return menuData.categories
    .map((cat) => `${cat.name} (${cat.items.length} items)`)
    .join(", ");
}

/** Look up a menu item by name (case-insensitive, partial match) */
export function findMenuItem(query: string): { category: string; item: typeof menuData.categories[0]["items"][0] }[] {
  const q = query.toLowerCase();
  const results: { category: string; item: typeof menuData.categories[0]["items"][0] }[] = [];

  for (const cat of menuData.categories) {
    for (const item of cat.items) {
      if (item.name.toLowerCase().includes(q)) {
        results.push({ category: cat.name, item });
      }
    }
  }

  return results;
}

/** Get all sauce names */
export function getAllSauces(): string[] {
  const sausCat = menuData.categories.find((c) => c.name === "Sauzen");
  return sausCat ? sausCat.items.map((i) => i.name) : [];
}
