import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { PolarArea } from "react-chartjs-2";
import { api } from "../services/api";

interface DiscPartitionUsageData {
  ateCinquenta: Number;
  ateSetentaECinco: Number;
  ateNoventa: Number;
  ateCem: Number;
}

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export function PolarGraphic() {
  const [dados, setDados] = useState<DiscPartitionUsageData>({});

  useEffect(() => {
    api
      .get("/disk-partition-usage-polar-graphic")
      .then((response) => setDados(response.data))
      .catch(() => console.log("a requisição falhou"));
  }, []);

  const data = {
    labels: ["up to 50%", "up to 75%", "up to 90%", "up to 100%"],
    datasets: [
      {
        label: "machines",
        data: [dados.ateCinquenta, dados.ateSetentaECinco, dados.ateNoventa, dados.ateCem],
        backgroundColor: ["rgba(95, 250, 5)", "rgba(217, 250, 5)", "rgba(250, 5, 87)", "rgba(250, 5, 5)"],
        borderWidth: 1,
      },
    ],
  };

  const option = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "right",
      },
    },
  };

  return (
    <>
      <PolarArea data={data} options={option} />
    </>
  );
}
