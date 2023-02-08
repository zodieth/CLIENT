import { useAppSelector } from '../../../app/hooks';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";
import { Card, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: 'y' as const,
  responsive: false,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "right" as const
    },
    title: {
      display: true,
      text: "Productos mas vendidos del último mes"
    }
  }
};

export default function GraphicsAdmin() {
  const salesStore = useAppSelector((state) => state.sales)

  const countSalesPerProduct = () => {
    const salesCount: any = {};
    salesStore.allSales.forEach((sale: any) => {
      sale.products.forEach((product: any) => {
        if (salesCount[product.product.name]) {
          salesCount[product.product.name] += product.quantity;
        } else {
          salesCount[product.product.name] = product.quantity;
        }
      });
    });
    return salesCount;
  }

  const countSalesPerStatus = () => {
    const salesCount: any = {};
    salesStore.allSales.forEach((sale: any) => {
      if (salesCount[sale.status]) {
        salesCount[sale.status] += 1;
      } else {
        salesCount[sale.status] = 1;
      }
    });
    return salesCount;
  }

  const salesCount = countSalesPerProduct();
  const salesPerStatusCount = countSalesPerStatus();

  const chartData = Object.entries(salesCount).map(([name, count]) => ({ name, count }));
  const chartDataPerStatus = Object.entries(salesPerStatusCount).map(([status, count]) => ({ status, count }));

  const data = {
    labels: chartData.map(data => data.name),
    datasets: [
      {
        label: 'Productos',
        data: chartData.map(data => data.count),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
        hoverBorderColor: 'rgba(255, 99, 132, 1)'
      }
    ]
  };

  const dataPerStatus = {
    labels: chartDataPerStatus.map(data => data.status === "ordered" ? "Ordenado" : data.status === "shipped" ? "En viaje" : data.status === "claim" ? "Reclamado" : ""),
    datasets: [
      {
        data: chartDataPerStatus.map(data => data.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  if(salesStore.allSales.length){
    return (
      <div>
        <Tabs>
          <TabList>
            <Tab>Productos mas vendidos</Tab>
            <Tab>Estado de las compras</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Bar
                width={1300}
                height={600}
                options={options}
                data={data}
              />
            </TabPanel>
            <TabPanel>
              <Pie
                height={600}
                width={600}
                options={{ responsive: false, maintainAspectRatio: false, plugins: {
                  title: {
                    display: true,
                    text: "Estado de compras"
                  }
                }}}
                data={dataPerStatus}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    );
  }else{
    return ""
  }
}