// vite.config.ts
import { sveltekit } from "file:///Users/alecbyrd/Documents/Projects/chicago-raw-food-project/chicago-raw-food-app/node_modules/@sveltejs/kit/src/exports/vite/index.js";
import { defineConfig } from "file:///Users/alecbyrd/Documents/Projects/chicago-raw-food-project/chicago-raw-food-app/node_modules/vite/dist/node/index.js";
import * as fs from "node:fs";
var vite_config_default = defineConfig({
  plugins: [sveltekit()],
  server: {
    https: {
      key: fs.readFileSync("certs/localhost-key.pem"),
      cert: fs.readFileSync("certs/localhost.pem")
    },
    proxy: {}
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYWxlY2J5cmQvRG9jdW1lbnRzL1Byb2plY3RzL2NoaWNhZ28tcmF3LWZvb2QtcHJvamVjdC9jaGljYWdvLXJhdy1mb29kLWFwcFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2FsZWNieXJkL0RvY3VtZW50cy9Qcm9qZWN0cy9jaGljYWdvLXJhdy1mb29kLXByb2plY3QvY2hpY2Fnby1yYXctZm9vZC1hcHAvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2FsZWNieXJkL0RvY3VtZW50cy9Qcm9qZWN0cy9jaGljYWdvLXJhdy1mb29kLXByb2plY3QvY2hpY2Fnby1yYXctZm9vZC1hcHAvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBzdmVsdGVraXQgfSBmcm9tICdAc3ZlbHRlanMva2l0L3ZpdGUnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgKiBhcyBmcyBmcm9tIFwibm9kZTpmc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuXHRwbHVnaW5zOiBbc3ZlbHRla2l0KCldLFxuXHRzZXJ2ZXI6IHtcblx0XHRodHRwczoge1xuXHRcdFx0a2V5OiBmcy5yZWFkRmlsZVN5bmMoJ2NlcnRzL2xvY2FsaG9zdC1rZXkucGVtJyksXG5cdFx0XHRjZXJ0OiBmcy5yZWFkRmlsZVN5bmMoJ2NlcnRzL2xvY2FsaG9zdC5wZW0nKSxcblx0XHR9LFxuXHRcdHByb3h5OiB7fVxuXHR9XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBa2EsU0FBUyxpQkFBaUI7QUFDNWIsU0FBUyxvQkFBb0I7QUFDN0IsWUFBWSxRQUFRO0FBRXBCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzNCLFNBQVMsQ0FBQyxVQUFVLENBQUM7QUFBQSxFQUNyQixRQUFRO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTixLQUFRLGdCQUFhLHlCQUF5QjtBQUFBLE1BQzlDLE1BQVMsZ0JBQWEscUJBQXFCO0FBQUEsSUFDNUM7QUFBQSxJQUNBLE9BQU8sQ0FBQztBQUFBLEVBQ1Q7QUFDRCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=