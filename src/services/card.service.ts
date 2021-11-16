import axios from "axios";
import { TCard } from "../types";

export const cardService = axios.create({
  baseURL: process.env.CARD_API_URL
})

export const checkBalance = async (card: TCard) => {
  try {
    const balance = await cardService.get('/balance', {params: {
      ...card
    }})
    return balance;
  }catch(err) {
    throw err;
  }
}

export const withdrawFromCard = async (card: TCard, sum: number) => {
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