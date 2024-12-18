import dayjs from "dayjs";
import { TimeRangePickerProps, Flex } from "antd";

export const rangePresets: TimeRangePickerProps["presets"] = [
    {
      label: (
        <Flex align="center" style={{ height: 40 }}>
          Last 7 Days
        </Flex>
      ),
      value: [dayjs().add(-7, "d"), dayjs()],
    },
    {
      label: (
        <Flex align="center" style={{ height: 40 }}>
          Last 14 Days
        </Flex>
      ),
      value: [dayjs().add(-14, "d"), dayjs()],
    },
    {
      label: (
        <Flex align="center" style={{ height: 40 }}>
          Last 30 Days
        </Flex>
      ),
      value: [dayjs().add(-30, "d"), dayjs()],
    },
    {
      label: (
        <Flex align="center" style={{ height: 40 }}>
          Last 90 Days
        </Flex>
      ),
      value: [dayjs().add(-90, "d"), dayjs()],
    },
  ];