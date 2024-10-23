import React, { Dispatch, SetStateAction } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Button, SelectChangeEvent } from "@mui/material";
import useStockRequests from "../../services/useStockRequests";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { RootState } from "../../app/store";

interface PurchaseDataModal {
  _id: string;
  brandId: string; // veya { name: string; } şeklinde olabilir
  firmId: string; // veya { name: string; } şeklinde olabilir
  productId: string; // veya { name: string; } şeklinde olabilir
  quantity: string | number;
  price: string | number;
  createdAt?: string; // Eğer bu özellik kullanılacaksa ekleyin
  amount?: string | number; // Eğer bu özellik kullanılacaksa ekleyin
}

// PurchaseProps arayüzünü güncelleyin
interface PurchaseProps {
  open: boolean;
  handleClose: () => void;
  data: PurchaseDataModal; // Burayı PurchaseData olarak ayarlayın
  setData: React.Dispatch<React.SetStateAction<PurchaseDataModal>>; // Burayı PurchaseData olarak ayarlayın
}

interface Firm {
  _id: string | number;
  name: string;
  phone: string;
  address: string;
  image: string;
}

interface Brand {
  _id: string | number;
  name: string;
  image: string;
}

interface Product {
  _id: string;
  name: string;
}

const PurchaseModal: React.FC<PurchaseProps> = ({
  open,
  handleClose,
  data,
  setData,
}) => {
  const navigate = useNavigate();
  const { postStock, updateStock } = useStockRequests();
  const { firms, products, brands } = useSelector(
    (state: RootState) => state.stock
  );

  const handleChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const submitData = {
    ...data,
    quantity: String(data.quantity), // Number'dan String'e dönüşüm
    price: String(data.price), // Number'dan String'e dönüşüm
  };

  if (data?._id) {
    updateStock("purchases", submitData);
  } else {
    postStock("purchases", submitData);
  }

  handleClose();
};

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            component="form"
            onSubmit={handleSubmit}
          >
            <FormControl>
              <InputLabel variant="outlined" id="firm-select-label">
                Firm
              </InputLabel>
              <Select
                labelId="firm-select-label"
                label="Firm"
                name="firmId"
                value={data?.firmId || ""} // Doğrudan firmId'yi kullan
                onChange={handleChange}
                required
              >
                <MenuItem onClick={() => navigate("/stock/firms")}>
                  Add New Firm
                </MenuItem>
                <hr />
                {firms?.map((item: Firm) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel variant="outlined" id="brand-select-label">
                Brand
              </InputLabel>
              <Select
                labelId="brand-select-label"
                label="Brand"
                id="brand-select"
                name="brandId"
                value={data?.brandId || ""} // Doğrudan brandId'yi kullan
                onChange={handleChange}
                required
              >
                <MenuItem onClick={() => navigate("/stock/brands")}>
                  Add New Brand
                </MenuItem>
                <hr />
                {brands?.map((item: Brand) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel variant="outlined" id="product-select-label">
                Product
              </InputLabel>
              <Select
                labelId="product-select-label"
                label="Product"
                id="product-select"
                name="productId"
                value={data?.productId || ""} // Doğrudan productId'yi kullan
                onChange={handleChange}
                required
              >
                <MenuItem onClick={() => navigate("/stock/products")}>
                  Add New Product
                </MenuItem>
                <hr />
                {products?.map((item: Product) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Quantity"
              id="quantity"
              name="quantity"
              type="number"
              variant="outlined"
              InputProps={{ inputProps: { min: 0 } }}
              value={data?.quantity}
              onChange={
                handleChange as React.ChangeEventHandler<HTMLInputElement>
              }
              required
            />
            <TextField
              label="Price"
              id="price"
              type="number"
              variant="outlined"
              name="price"
              InputProps={{ inputProps: { min: 0 } }}
              value={data?.price}
              onChange={
                handleChange as React.ChangeEventHandler<HTMLInputElement>
              }
              required
            />
            <Button
              variant="contained"
              type="submit"
              sx={{ backgroundColor: "#023373" }}
            >
              <CheckCircleIcon />
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default PurchaseModal;
