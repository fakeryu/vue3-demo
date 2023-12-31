/*
 * @Author: berg yu
 * @Date: 2022-04-15 18:53:56
 * @LastEditors: berg yu
 * @LastEditTime: 2023-08-30 09:26:42
 * @Description: 请填写简介
 */
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import postCssPxToRem from "postcss-pxtorem";
import path from "path";
import Inspect from 'vite-plugin-inspect'

const pathSrc = path.resolve(__dirname, "src");

export default defineConfig({
  base: "./",
  resolve: {
    alias: {
      "~": `${pathSrc}`,
    },
  },
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue'],
      resolvers: [
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon',
        })
      ],
      dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
    }),
    Components({
      resolvers: [
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'],
        }),
        ElementPlusResolver()
      ],
      dts: path.resolve(pathSrc, 'components.d.ts'),
    }),
    Icons({
      autoInstall: true,
    }),
    Inspect(),
  ],
  optimizeDeps: {
    include: ["schart.js"],
  },
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 192, // 1rem的大小
          propList: ["*"], // 需要转换的属性，这里选择全部都进行转换
        }),
      ],
    },
  },
  server: {
    proxy: {
      "/srm": ' http://192.168.111.135:8089',
      // "/bsp": "http://192.168.10.113:8111",
      // "/orbm": "http://192.168.111.135:8051",
    },
  },
});
