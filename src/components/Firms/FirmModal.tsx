import useStockRequests from "../../services/useStockRequests";
import { Formik, Form } from "formik";
import { object, string } from "yup";
import Modal from "@mui/material/Modal";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { Dispatch, SetStateAction } from "react";

interface FirmInfoModal {
  _id: string | number;
  name: string;
  phone: string;
  address: string;
  image: string;
}

interface FirmModalProps {
  open: boolean;
  handleClose: () => void;
  data: FirmInfoModal | null;
  setData: Dispatch<SetStateAction<FirmInfoModal | null>>;
}

const FirmModal: React.FC<FirmModalProps> = ({
  open,
  handleClose,
  data,
  setData,
}) => {
  const { postStock, updateStock } = useStockRequests();

  const firmSchema = object({
    name: string().required("Firma ismi zorunludur."),
    phone: string().required("Telefon numarası zorunludur."),
    address: string().required("Adres bilgisi zorunludur."),
    image: string().required("Firma görseli zorunludur."),
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: 2,
  };

  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Formik
        initialValues={
          data || { name: "", phone: "", address: "", image: ""}
        }
        validationSchema={firmSchema}
        onSubmit={(values, actions) => {
          if (data && data._id) {
            const updatedData = { ...values, _id: data._id }; // _id'yi values nesnesine ekleyin
            updateStock("firms", updatedData);
          } else {
            postStock("firms", values);
          }
          setData(null);
          actions.resetForm();
          actions.setSubmitting(false);
          handleClose();
        }}
        enableReinitialize
      >
        {({
          isSubmitting,
          handleChange,
          values,
          touched,
          errors,
          handleBlur,
        }) => (
          <Form>
            <Box sx={style}>
              <TextField
                label="Firma adı"
                name="name"
                id="name"
                type="text"
                variant="outlined"
                onChange={handleChange}
                value={values.name}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={errors.name}
              />
              <TextField
                label="Telefon numarası"
                name="phone"
                id="phone"
                type="tel"
                variant="outlined"
                onChange={handleChange}
                value={values.phone}
                onBlur={handleBlur}
                error={touched.phone && Boolean(errors.phone)}
                helperText={errors.phone}
              />
              <TextField
                label="Adres"
                name="address"
                id="address"
                type="text"
                variant="outlined"
                onChange={handleChange}
                value={values.address}
                onBlur={handleBlur}
                error={touched.address && Boolean(errors.address)}
                helperText={errors.address}
              />
              <TextField
                label="Firma logosu"
                name="image"
                id="image"
                type="url"
                variant="outlined"
                onChange={handleChange}
                value={values.image}
                onBlur={handleBlur}
                error={touched.image && Boolean(errors.image)}
                helperText={errors.image}
              />
              <Button
                variant="contained"
                type="submit"
                disabled={isSubmitting}
                sx={{ backgroundColor: "#00695c" }}
              >
                <CheckCircleIcon />
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default FirmModal;
