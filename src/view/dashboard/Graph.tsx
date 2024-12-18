import { useEffect } from "react";

import {
  Area,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { Card, Flex, theme, DatePicker, notification, Typography } from "antd";

import { rangePresets } from "./constant";
import { filterDashboard } from "../../api/dashboard";

const { useToken } = theme;
const { Title } = Typography;
const { RangePicker } = DatePicker;
const { useNotification } = notification;

const Graph = () => {
  const { token } = useToken();
  const [api, contextHolder] = useNotification();
  const [rangeParams, setRangeParams] = useSearchParams({
    startRange: dayjs().add(-7, "d").format("DD MMM YYYY"),
    endRange: dayjs().format("DD MMM YYYY"),
  });

  const filter = {
    startRange:
      rangeParams.get("startRange") ||
      dayjs().add(-7, "d").format("DD MMM YYYY"),
    endRange: rangeParams.get("endRange") || dayjs().format("DD MMM YYYY"),
  };

  const { error, isSuccess, data } = useQuery({
    queryKey: ["DashboardFilter", { ...filter }],
    queryFn: () => filterDashboard(filter),
  });

  function showNotification(description: string) {
    api.error({
      message: "Error",
      description,
    });
  }

  useEffect(() => {
    if (error) {
      console.log(error);
      showNotification(error.message);
    }
  }, [error]);

  const onChange = (_: any, range: [string, string]) => {
    setRangeParams(
      (prev) => {
        prev.set("startRange", range[0]);
        prev.set("endRange", range[1]);
        return prev;
      },
      { replace: true }
    );
  };

  return (
    <>
      {contextHolder}
      <Card style={{ padding: 0 }}>
        <Flex justify="space-between">
          <Title level={5}>Orders Summary</Title>
          <RangePicker
            maxDate={dayjs()}
            format="DD MMM YYYY"
            presets={rangePresets}
            defaultValue={[
              rangeParams.get("startRange")
                ? dayjs(rangeParams.get("startRange"))
                : dayjs().add(-7, "d"),
              rangeParams.get("endRange")
                ? dayjs(rangeParams.get("endRange"))
                : dayjs(),
            ]}
            onChange={onChange}
          />
        </Flex>
        <br />

        <div style={{ width: "100%", height: 500 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={isSuccess ? data.data : []}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5881fe" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#5881fe" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" axisLine={false} tickLine={false} />
              <YAxis dataKey="count" axisLine={false} tickLine={false} />
              <CartesianGrid strokeDasharray="3 3" />

              <Tooltip
                contentStyle={{
                  backgroundColor: token.colorBgContainer,
                  color: token.colorText,
                  borderRadius: 5,
                }}
              />

              <Area
                type="linear"
                dataKey="count"
                stroke="#5881fe"
                fillOpacity={1}
                fill="url(#colorUv)"
                strokeWidth={5}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </>
  );
};

export default Graph;
