import { aggregateSaleAnalytics } from "./services/aggregateSaleAnalytics.js";
import { getTotalAmounts } from "./services/getTotalAmounts.js";

export const getSaleAnalytics = async (req, res) => {
    const { year, month } = req.params;
    const formattedMonth = month.padStart(2, "0");

    try {
        const chartData = [];
        const labels = [];
        let maxValue = 0;

        for (let i = -3; i <= 3; i++) {
            const baseDate = new Date(`${year}-${formattedMonth}-01T00:00:00Z`);
            baseDate.setMonth(baseDate.getMonth() + i);

            const y = baseDate.getUTCFullYear();
            const m = baseDate.getUTCMonth();
            const startDate = new Date(Date.UTC(y, m, 1, 0, 0, 0));
            const endDate = new Date(Date.UTC(y, m + 1, 1, 0, 0, 0));

            const saleAnalytics = await aggregateSaleAnalytics(startDate, endDate);
            const { totalCheckout, totalRefunded } = getTotalAmounts(saleAnalytics);

            maxValue = Math.max(maxValue, totalCheckout, totalRefunded);
            const label = baseDate.toLocaleString("default", { month: "short" });
            labels.push(label);

            chartData.push({
                label,
                isSelected: y === parseInt(year) && m + 1 === parseInt(formattedMonth),
                totalCheckout: Math.round(totalCheckout),
                totalRefunded: Math.round(totalRefunded),
            });

        }

        return res.status(200).json({
            message: "Sale analytics chart data",
            status: 200,
            data: {
                maxValue: Math.round(maxValue),
                chartData,
                labels,
                totalCheckout: chartData.find((d) => d.isSelected)?.totalCheckout || 0,
                totalRefunded: chartData.find((d) => d.isSelected)?.totalRefunded || 0,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error fetching sale analytics",
            status: 500,
            error: error.message,
        });
    }
};
