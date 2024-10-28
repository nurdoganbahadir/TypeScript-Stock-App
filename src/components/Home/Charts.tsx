import { AreaChart } from "@tremor/react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
const dataFormatter = (number: number | string) =>
  `$${Intl.NumberFormat("tr").format(Number(number)).toString()}`;

interface SalesData {
  salesAmount: number;
  date: string;
}

interface PurchasesData {
  purAmount: number;
  date: string;
}

interface Sale {
  amount: number;
  createdAt: string;
}

interface Purchase {
  amount: number;
  createdAt: string;
}

const Charts: React.FC = () => {
  // sales ve purchases veri tiplerini belirtmek için RootState kullanıldı
  const { sales, purchases } = useSelector((state: RootState) => state.stock);

  const salesData: SalesData[] = sales.map((sale: Sale) => ({
    salesAmount: Number(sale.amount),
    date: new Date(sale.createdAt).toLocaleDateString("tr-TR"),
  }));

  const purchasesData: PurchasesData[] = purchases.map((pur: Purchase) => ({
    purAmount: Number(pur.amount),
    date: new Date(pur.createdAt).toLocaleDateString("tr-TR"),
  }));

  return (
    <div className="flex justify-center items-center flex-wrap gap-4 pt-12">
      <div className="w-full max-w-[500px]">
        <AreaChart
          className="h-[400px] bg-dark-tremor-brand-inverted rounded-xl p-6"
          data={salesData}
          index="date"
          categories={["salesAmount"]}
          colors={["green"]}
          valueFormatter={dataFormatter}
          yAxisWidth={80}
        />
      </div>
      <div className="w-full max-w-[500px]">
        <AreaChart
          className="h-[400px] bg-dark-tremor-brand-inverted rounded-xl p-6"
          data={purchasesData}
          index="date"
          categories={["purAmount"]}
          colors={["blue"]}
          valueFormatter={dataFormatter}
          yAxisWidth={80}
        />
      </div>
    </div>
  );
};

export default Charts;
