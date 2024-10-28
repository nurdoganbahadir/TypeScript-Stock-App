import React from "react";
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

interface ProductDataModal {
  _id: string;
  brandId: { name: string; _id: string };
  categoryId: { name: string; _id: string };
  quantity?: string;
  name: string;
}

// PurchaseProps arayüzünü güncelleyin
interface PurchaseProps {
  open: boolean;
  handleClose: () => void;
  data: ProductDataModal; // Burayı PurchaseData olarak ayarlayın
  setData: React.Dispatch<React.SetStateAction<ProductDataModal>>; // Burayı PurchaseData olarak ayarlayın
}

interface Brand {
  _id: string | number;
  name: string;
}

interface Category {
  _id: string;
  name: string;
}

const ProductModal: React.FC<PurchaseProps> = ({
  open,
  handleClose,
  data,
  setData,
}) => {
  const navigate = useNavigate();
  const { postStock, updateStock } = useStockRequests();
  const { categories, brands } = useSelector((state: RootState) => state.stock);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleChange = (
    e: SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    // İlgili seçimin objesini bulmak için map yapıları kullanılıyor
    if (name === "categoryId") {
      const selectedCategory = categories.find(
        (category: Category) => category._id === value
      );
      setData({
        ...data,
        categoryId: selectedCategory
          ? { _id: selectedCategory._id, name: selectedCategory.name }
          : data.categoryId,
      });
    } else if (name === "brandId") {
      const selectedBrand = brands.find((brand: Brand) => brand._id === value);
      setData({
        ...data,
        brandId: selectedBrand
          ? { _id: selectedBrand._id, name: selectedBrand.name }
          : data.brandId,
      });
    } else if (name === "name") {
      setData({
        ...data,
        name: value, // Sadece name alanını güncelle
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // submitData oluştururken, brandId, firmId ve productId için sadece _id değerlerini kullanın
    const submitData: any = {
      brandId: data.brandId?._id, // Sadece _id değerini alın
      categoryId: data.categoryId?._id, // Sadece _id değerini alın
      name: data.name,
    };

    // Eğer data._id varsa, güncelleme işlemi yap, yoksa ekleme işlemi yap
    if (data?._id) {
      submitData._id = data._id; // update işlemi için _id'yi ekle
      updateStock("products", submitData); // Güncelleme işlemi
    } else {
      postStock("products", submitData); // Ekleme işlemi
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
        <Box sx={modalStyle}>
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            component="form"
            onSubmit={handleSubmit}
          >
            <FormControl>
              <InputLabel variant="outlined" id="firm-select-label">
                Category
              </InputLabel>
              <Select
                labelId="firm-select-label"
                label="Firm"
                name="categoryId"
                value={
                  categories.find(
                    (category: Category) =>
                      category.name === data.categoryId?.name
                  )?._id || ""
                }
                onChange={handleChange}
                required
              >
                <hr />
                {categories?.map((item: Category) => (
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
            <TextField
              label="Product Name"
              id="name"
              name="name"
              type="text"
              variant="outlined"
              InputProps={{ inputProps: { min: 0 } }}
              value={data?.name}
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

export default ProductModal;
