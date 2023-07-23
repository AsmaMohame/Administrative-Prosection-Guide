import { City } from "../../city/model/city"
import { Governorate } from "../../governorate/model/governorate"
import { MuqarType } from "../../muqar-typt/model/muqar-type"

export interface Muqar {
    id: number
    version: number
    name: string
    address: string
    map: string
    email: string
    competence: string
    phone: string
    phoneSecond: string
    phoneThird: string
    governorate: Governorate
    city: City
    muqarType: MuqarType
}
