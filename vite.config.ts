import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import spritesmith from "vite-plugin-spritesmith";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    spritesmith({
      // 输入多个小图片的路径
      src: {
        cwd: "./src/assets/icons/", // 小图标存放的目录
        glob: "*.png", // 图标的格式
      },
      target: {
        image: "./src/assets/sprite.png", // 生成的精灵图路径
        css: "./src/styles/sprite.css", // 生成的CSS样式文件
      },
      apiOptions: {
        cssImageRef: "../assets/sprite.png", // CSS 引用精灵图的相对路径
      },
    }),
  ],
});
