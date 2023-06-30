export const testimonials = [
    {
        id: "rating-1",
        picture: "",
        name: "Tester1",
        product: ["Website", "Marketing"],
        rating: ["x", "x", "x", "x"],
        text: "TEST",
        link: "",
    },
    {
        id: "rating-2",
        picture: "",
        name: "Tester2",
        product: ["Website", "Marketing"],
        rating: ["x", "x", "x", "x", "x"],
        text: "TEST",
        link: "",
    },
    {
        id: "rating-3",
        picture: "",
        name: "Tester3",
        product: ["Marketing"],
        rating: ["x", "x", "x", "x"],
        text: "TEST",
        link: "",
    },
    {
        id: "rating-4",
        picture: "",
        name: "Tester4",
        product: ["Website"],
        rating: ["x", "x", "x"],
        text: "TEST",
        link: "",
    },
];

export const wines = [
    {
        title: 'Chapel Hill Shiraz',
        price: '$56',
        tags: 'AU | Bottle',
    },
    {
        title: 'Catena Malbee',
        price: '$59',
        tags: 'AU | Bottle',
    },
    {
        title: 'La Vieillw Rose',
        price: '$44',
        tags: 'FR | 750 ml',
    },
    {
        title: 'Rhino Pale Ale',
        price: '$31',
        tags: 'CA | 750 ml',
    },
    {
        title: 'Irish Guinness',
        price: '$26',
        tags: 'IE | 750 ml',
    },
];

export const cocktails = [
    {
        title: 'Aperol Sprtiz',
        price: '$20',
        tags: 'Aperol | Villa Marchesi prosecco | soda | 30 ml',
    },
    {
        title: "Dark 'N' Stormy",
        price: '$16',
        tags: 'Dark rum | Ginger beer | Slice of lime',
    },
    {
        title: 'Daiquiri',
        price: '$10',
        tags: 'Rum | Citrus juice | Sugar',
    },
    {
        title: 'Old Fashioned',
        price: '$31',
        tags: 'Bourbon | Brown sugar | Angostura Bitters',
    },
    {
        title: 'Negroni',
        price: '$26',
        tags: 'Gin | Sweet Vermouth | Campari | Orange garnish',
    },
];

export const awards = [
    {
        imgUrl: "/placeholder.png",
        title: 'Bib Gourmond',
        subtitle: 'Lorem ipsum dolor sit amet, consectetur.',
    },
    {
        imgUrl: "/placeholder.png",
        title: 'Rising Star',
        subtitle: 'Lorem ipsum dolor sit amet, consectetur.',
    },
    {
        imgUrl: "/placeholder.png",
        title: 'AA Hospitality',
        subtitle: 'Lorem ipsum dolor sit amet, consectetur.',
    },
    {
        imgUrl: "/placeholder.png",
        title: 'Outstanding Chef',
        subtitle: 'Lorem ipsum dolor sit amet, consectetur.',
    },
];

export const openingTime = 10; //hours
export const closingTime = 23; //hours
export const seatInterval = 30; //minutes

export const categories = ["all", "breakfast", "lunch", "dinner"] as const;