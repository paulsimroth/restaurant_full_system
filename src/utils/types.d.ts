import { categories } from "~/constants";

export type DateTime = {
    justDate: Date | null
    dateTime: Date | null
}

type Categories = typeof categories[number]