import { useSelector } from "react-redux";
import useStockRequests from "../../services/useStockRequests";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbar,
  GridColDef,
} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { RootState } from "../../app/store";
import { Dispatch, SetStateAction } from "react";

interface PurchaseDataTable {
  _id: string;
  brandId: string; // veya { name: string; } şeklinde olabilir
  firmId: string; // veya { name: string; } şeklinde olabilir
  productId: string; // veya { name: string; } şeklinde olabilir
  quantity: string | number;
  price: string | number;
  createdAt?: string; // Eğer bu özellik kullanılacaksa ekleyin
  amount?: string | number; // Eğer bu özellik kullanılacaksa ekleyin
}

interface PurchaseTableProps {
  setData: Dispatch<SetStateAction<PurchaseDataTable>>;
  handleOpen: () => void;
}

const PurchaseTable: React.FC<PurchaseTableProps> = ({
  setData,
  handleOpen,
}) => {
  const { purchases } = useSelector((state: RootState) => state.stock);
  const { deleteStock } = useStockRequests();

  const getRowId = (row: PurchaseDataTable) => row._id;

  const columns: GridColDef<PurchaseDataTable>[] = [
    // ... diğer kolon tanımlamaları
    {
      field: "actions",
      headerName: "Actions",
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      renderCell: ({
        row: { _id, brandId, productId, quantity, price, firmId },
      }) => {
        return [
          <GridActionsCellItem
            key={"edit"}
            icon={<EditIcon />}
            label="Edit"
            onClick={() => {
              handleOpen();
              setData({
                _id,
                brandId,
                productId,
                quantity: Number(quantity), // Dönüştürme işlemi
                price: Number(price), // Dönüştürme işlemi
                firmId,
                createdAt: new Date().toISOString(),
                amount: Number(quantity) * Number(price), // Dönüştürülmüş değerler ile hesaplama
              });
            }}
          />,
          <GridActionsCellItem
            key={"delete"}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => deleteStock("purchases", _id)}
          />,
        ];
      },
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
      <DataGrid
        rows={purchases}
        columns={columns}
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}
        getRowId={getRowId}
        sx={{
          "& .custom-header, & .custom-cell": {
            fontSize: "1rem",
            "@media (max-width: 600px)": {
              fontSize: "0.8rem",
            },
          },
        }}
      />
    </Box>
  );
};

export default PurchaseTable;
