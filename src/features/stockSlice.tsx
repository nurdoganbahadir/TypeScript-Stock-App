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
  loading: false,
  error: false,
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getStockSuccess: (state, action: PayloadAction<GetStockSuccessPayload>) => {
      const { path, data } = action.payload;
      state[path] = data; // Dinamik olarak path kullanarak durumu güncelle
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { getStockSuccess, fetchStart, fetchFail } = stockSlice.actions;
export default stockSlice.reducer;
