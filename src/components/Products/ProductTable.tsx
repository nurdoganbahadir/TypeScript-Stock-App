import { useSelector } from "react-redux";
import useStockRequests from "../../services/useStockRequests";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbar,
  GridColDef,
} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { RootState } from "../../app/store";
import { Dispatch, SetStateAction } from "react";

interface ProductDataTable {
  _id: string;
  brandId: { name: string; _id: string };
  categoryId: { name: string; _id: string };
  quantity?: string;
  name: string;
}

interface ProductTableProps {
  setData: Dispatch<SetStateAction<ProductDataTable>>;
  handleOpen: () => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ setData, handleOpen }) => {
  const { products } = useSelector((state: RootState) => state.stock);
  const { deleteStock } = useStockRequests();

  const getRowId = (row: ProductDataTable) => row._id;

  const columns: GridColDef<ProductDataTable>[] = [
    {
      field: "_Id",
      headerName: "#",
      flex: 1,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      renderCell: ({ row }: { row: ProductDataTable }) => row?._id,
    },
    {
      field: "categoryId",
      headerName: "Category",
      flex: 1,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      renderCell: ({ row }: { row: ProductDataTable }) => row?.categoryId?.name,
    },
    {
      field: "brandId",
      headerName: "Brand",
      flex: 1,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      renderCell: ({ row }: { row: ProductDataTable }) => row?.brandId?.name,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      renderCell: ({ row }: { row: ProductDataTable }) => row?.name,
    },
    {
      field: "quantity",
      headerName: "Stock",
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
      renderCell: ({ row: { _id } }) => {
        return [
          <GridActionsCellItem
            key={"delete"}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => deleteStock("products", _id)}
          />,
        ];
      },
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
      <DataGrid
        rows={products}
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

export default ProductTable;
