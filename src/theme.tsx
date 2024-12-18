import { ConfigProvider, theme } from "antd";

import useThemeStore from "./store/Store";

const { defaultAlgorithm, darkAlgorithm } = theme;

interface IProps {
  children: React.ReactNode;
}

const ThemeConfig = ({ children }: IProps) => {
  const mode = useThemeStore((state) => state.mode);
  const isDarkMode = mode === "dark";

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ThemeConfig;
