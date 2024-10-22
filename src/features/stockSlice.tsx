import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Path'lerin olabileceği belirli değerler
type StockPath = "firms" | "products" | "brands";

interface GetStockSuccessPayload {
  path: StockPath; // Burada path türünü belirli değerlerle kısıtlıyoruz
  data: any; // Data'nın tipini ihtiyaca göre belirleyebilirsiniz
}

interface StockState {
  [key: string]: any; // Dinamik anahtarlar için
}

const initialState: StockState = {
  firms: [{}],
  products: [],
  brands: [],
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    getStockSuccess: (state, action: PayloadAction<GetStockSuccessPayload>) => {
      const { path, data } = action.payload;
      state[path] = data; // Dinamik olarak path kullanarak durumu güncelle
    },
  },
});

export const { getStockSuccess } = stockSlice.actions;
export default stockSlice.reducer;
