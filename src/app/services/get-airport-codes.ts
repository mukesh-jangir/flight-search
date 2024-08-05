"use server";

import { AirportInfo } from "../models/flight-parameters";

export default async function getAirportCodes(): Promise<AirportInfo[]> {
  return Promise.resolve([
    { name: 'Chennai International Airport', id: 'MAA' },
    { name: 'Coimbatore International Airport', id: 'CJB' },
    { name: 'Kempegowda International Airport', id: 'BLR' },
    { name: 'Mysore Airport', id: 'MYQ' },
    { name: 'Rajiv Gandhi International Airport', id: 'HYD' },
    { name: 'Jaipur International Airport', id: 'JAI' },
    { name: 'Jodhpur Airport', id: 'JDH' },
    { name: 'Indira Gandhi International Airport', id: 'DEL' }
  ])
}