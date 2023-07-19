import { Governorate } from "../../governorate/model/governorate"

export interface City {
    id: number
    version: number
    arabicName: string
    englishName: string
    code: string
    enabled: boolean
    governorate : Governorate
}
