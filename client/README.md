How To Setup Project This Project.

<!-- Installing Vite -->
Install Vite
-> npm create vite@latest
then give project name and select the language like js, ts

<!-- Installing Tailwindcss -->
Install Tailwindcss
-> npm install tailwindcss @tailwindcss/vite
add below line in vite.config.js
-> import tailwindcss from '@tailwindcss/vite'
  plugins: [
    tailwindcss(),
  ]
Add below in index.css or app.css
->@import "tailwindcss";

<!-- Installing Shadcn UI -->
Install Shadcn for Javascript Project
->npx shadcn@latest init
Create jsconfig.json if not exist and add below line
->{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
Finall add component like button or form
->npx shadcn@latest add button
Import where it is required.
->import { Button } from "@/components/ui/button"