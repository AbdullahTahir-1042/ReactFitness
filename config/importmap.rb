# Pin npm packages by running ./bin/importmap

pin "application", to: "application.js", preload: true
pin "react", to: "https://ga.jspm.io/npm:react@18.2.0/index.js"
pin "react-dom", to: "https://ga.jspm.io/npm:react-dom@18.2.0/index.js"
pin "react-dom/client", to: "https://ga.jspm.io/npm:react-dom@18.2.0/client.js"
pin "scheduler", to: "https://ga.jspm.io/npm:scheduler@0.23.0/index.js"
pin "axios", to: "https://cdn.jsdelivr.net/npm/axios@1.6.7/dist/axios.min.js"
pin "chart.js", to: "https://ga.jspm.io/npm:chart.js@4.4.1/dist/chart.js"
pin "react-chartjs-2", to: "https://ga.jspm.io/npm:react-chartjs-2@5.2.0/dist/index.js"
pin "@kurkle/color", to: "https://ga.jspm.io/npm:@kurkle/color@0.3.2/dist/color.esm.js"

# Pin React components
pin_all_from "app/javascript/components", under: "components"
