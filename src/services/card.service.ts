import axios from "axios";
import { Card } from "../types";

export const cardService = axios.create({
  baseURL: 'https://tranquil-meadow-98197.herokuapp.com'
})

export const checkBalance = async (card: Card) => {
  try {
    const balance = await cardService.get('/balance', {params: {
      ...card
    }})
    return balance;
  }catch(err) {
    throw err;
  }
}