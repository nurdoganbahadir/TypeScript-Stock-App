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
  brandId: { name: string }; // { name: string } şeklinde tanımlayın
  firmId: { name: string }; // { name: string } şeklinde tanımlayın
  productId: { name: string }; // { name: string } şeklinde tanımlayın
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

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;

    // İlgili seçimin objesini bulmak için map yapıları kullanılıyor
    if (name === "firmId") {
      const selectedFirm = firms.find((firm: Firm) => firm._id === value);
      setData({
        ...data,
        firmId: selectedFirm ? { name: selectedFirm.name } : data.firmId,
      });
    } else if (name === "brandId") {
      const selectedBrand = brands.find((brand: Brand) => brand._id === value);
      setData({
        ...data,
        brandId: selectedBrand ? { name: selectedBrand.name } : data.brandId,
      });
    } else if (name === "productId") {
      const selectedProduct = products.find(
        (product: Product) => product._id === value
      );
      setData({
        ...data,
        productId: selectedProduct
          ? { name: selectedProduct.name }
          : data.productId,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // submitData oluştururken, brandId, firmId ve productId için sadece name değerlerini kullanın
    const submitData = {
      quantity: String(data.quantity), // Number'dan String'e dönüşüm
      price: String(data.price), // Number'dan String'e dönüşüm
      _id: data._id, // _id'yi olduğu gibi kullanın
      brandId: data.brandId.name, // Sadece name değerini alın
      firmId: data.firmId.name, // Sadece name değerini alın
      productId: data.productId.name, // Sadece name değerini alın
      createdAt: data.createdAt,
      amount: data.amount,
    };

    if (data?._id) {
      updateStock("purchases", submitData); // Güncelleme işlemi
    } else {
      postStock("purchases", submitData); // Ekleme işlemi
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
        <Box sx={ modalStyle }>
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
                value={
                  firms.find((firm: Firm) => firm.name === data.firmId?.name)
                    ?._id || ""
                }
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
                value={
                  brands.find(
                    (brand: Brand) => brand.name === data.brandId?.name
                  )?._id || ""
                }
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
                value={
                  products.find(
                    (product: Product) => product.name === data.productId?.name
                  )?._id || ""
                }
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
