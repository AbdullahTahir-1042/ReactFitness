# Pin npm packages by running ./bin/importmap

pin "@hotwired/turbo-rails", to: "https://cdn.jsdelivr.net/npm/@hotwired/turbo@8.0.4/dist/turbo.es2017-umd.js", preload: true
pin "application", to: "application.js", preload: true
pin_all_from "app/javascript/controllers", under: "controllers"
pin "react", to: "https://cdn.jsdelivr.net/npm/react@18.2.0/+esm"
pin "react-dom", to: "https://cdn.jsdelivr.net/npm/react-dom@18.2.0/+esm"
pin "react-dom/client", to: "https://cdn.jsdelivr.net/npm/react-dom@18.2.0/client/+esm"
pin "scheduler", to: "https://cdn.jsdelivr.net/npm/scheduler@0.23.0/+esm"
pin "axios", to: "https://cdn.jsdelivr.net/npm/axios@1.6.7/dist/axios.js"
pin "chart.js", to: "https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.js"
pin "react-chartjs-2", to: "https://cdn.jsdelivr.net/npm/react-chartjs-2@5.2.0/dist/index.js"
pin "@kurkle/color", to: "https://cdn.jsdelivr.net/npm/@kurkle/color@0.3.2/dist/color.esm.js"
