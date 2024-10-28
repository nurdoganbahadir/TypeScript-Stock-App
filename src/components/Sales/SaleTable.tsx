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

interface SaleDataTable {
  _id: string;
  brandId: { name: string; _id: string }; // string yerine obje
  productId: { name: string; _id: string }; // string yerine obje
  quantity: string | number;
  price: string | number;
  createdAt?: string;
  amount?: string | number;
}

interface PurchaseTableProps {
  setData: Dispatch<SetStateAction<SaleDataTable>>;
  handleOpen: () => void;
}

const SaleTable: React.FC<PurchaseTableProps> = ({ setData, handleOpen }) => {
  const { sales } = useSelector((state: RootState) => state.stock);
  console.log(sales);

  const { deleteStock } = useStockRequests();

  const getRowId = (row: SaleDataTable) => row._id;

  const columns: GridColDef<SaleDataTable>[] = [
    {
      field: "createdAt",
      headerName: "Date",
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      renderCell: ({ row }: { row: SaleDataTable }) => {
        return row.createdAt
          ? new Date(row.createdAt).toLocaleString("de-DE")
          : "N/A"; // Eğer createdAt undefined ise "N/A" döner
      },
    },
    {
      field: "brandId",
      headerName: "Brand",
      flex: 1,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      renderCell: ({ row }: { row: SaleDataTable }) => row?.brandId?.name,
    },
    {
      field: "productID",
      headerName: "Product",
      flex: 1,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      renderCell: ({ row }: { row: SaleDataTable }) => row?.productId?.name,
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
      renderCell: ({ row: { _id, brandId, productId, quantity, price } }) => {
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
                createdAt: new Date().toISOString(),
                amount: Number(quantity) * Number(price), // Dönüştürülmüş değerler ile hesaplama
              });
            }}
          />,
          <GridActionsCellItem
            key={"delete"}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => deleteStock("sales", _id)}
          />,
        ];
      },
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
      <DataGrid
        rows={sales}
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

export default SaleTable;
