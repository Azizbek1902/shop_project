import { ADD_USER, DELETE_USER, UPDATE_CHECK, UPDATE_USER } from "../actionTypes";
import img1 from "../../assests/img/i (1).webp";

const initialState = {
  products: [
    {
      id: 1,
      img: img1,
      title: "Victus",
      desc: "Adswa das dsadjsan kjdasljkd ldadsa dajsdjksa dasdk;osa dsaopdsa;lkd sadopsadk",
      price: 80000,
      checked: false,
    },
    {
      id: 2,
      img: img1,
      title: "Apple",
      price: 120000,
      desc: "Adswa das dsadjsan kjdasljkd ldadsa dajsdjksa dasdk;osa dsaopdsa;lkd sadopsadk",
      property: {
        xotira: "6 gb",
        ecran: "full",
      },
      checked: false,
    },
    {
      id: 3,
      img: img1,
      title: "Samsung galahsy apple",
      price: 40000,
      desc: "Adswa das dsadjsan kjdasljkd ldadsa dajsdjksa dasdk;osa dsaopdsa;lkd sadopsadk",
      property: {
        xotira: "2 gb",
        zaryad: "6soat"
      },
      checked: false,
    },
    {
      id: 4,
      img: img1,
      title: "HP",
      price: 94000,
      desc: "Adswa das dsadjsan kjdasljkd ldadsa dajsdjksa dasdk;osa dsaopdsa;lkd sadopsadk",
      property: {
        xotira: "6 gb",
        aperativka: 4,
        protsetsor: "I5",
        videoCart: "RTX 3050",
        ecran: "full",
      },
      checked: false,
    },
  ],
  isLoading: false,
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_USER:
      return {
        ...state,
        products: [...state.products, payload],
      };
    case UPDATE_USER: {
      let index = state.products.findIndex((item) => item.id == payload.id);
      const newValues = state.products;
      newValues[index] = payload;
      return {
        ...state,
        products: newValues,
      };
    }
    case DELETE_USER:
      return {
        ...state,
        products: state.products.filter((user) => user.id !== payload),
      };
    case UPDATE_CHECK: {
      let index = state.products.findIndex((item) => item.id == payload.id);
      const newValues = state.products;
      newValues[index] = payload;
      return {
        ...state,
        products: newValues,
      };
    }

    default:
      return state;
  }
};

export default userReducer;
