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
  brandId: { name: string; _id: string }; // string yerine obje
  firmId: { name: string; _id: string }; // string yerine obje
  productId: { name: string; _id: string }; // string yerine obje
  quantity: string | number;
  price: string | number;
  createdAt?: string;
  amount?: string | number;
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
    {
      field: "createdAt",
      headerName: "Date",
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      renderCell: ({ row }: { row: PurchaseDataTable }) => {
        return row.createdAt
          ? new Date(row.createdAt).toLocaleString("de-DE")
          : "N/A"; // Eğer createdAt undefined ise "N/A" döner
      },
    },
    {
      field: "firmId",
      headerName: "Firm",
      flex: 1,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      renderCell: ({ row }: { row: PurchaseDataTable }) => row?.firmId?.name,
    },
    {
      field: "brandId",
      headerName: "Brand",
      flex: 1,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      renderCell: ({ row }: { row: PurchaseDataTable }) => row?.brandId?.name,
    },
    {
      field: "productID",
      headerName: "Product",
      flex: 1,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      renderCell: ({ row }: { row: PurchaseDataTable }) => row?.productId?.name,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "price",
      headerName: "Price",
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "amount",
      headerName: "Amount",
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
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
