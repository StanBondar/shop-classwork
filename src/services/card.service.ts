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

export const withdrawFromCard = async (card: Card, sum: number) => {
  const body = {
    sum
  };
  try {
    const {data} = await cardService.patch('/withdraw', body, {
      params: {
        ...card
      }
    });
    return data.balance;
  }catch(err) {
    throw err;
  }
}

export const depositToCard = async (cardNumber: string, sum: number) => {
  const body = {
    sum
  };

  try {
    const {data} = await cardService.patch('/deposit', body, {
      params: {
        number: cardNumber
      }
    })
    return data.balance;
  }catch(err) {
    throw err;
  }
}