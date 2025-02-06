import fs from 'fs';
import path from 'path';

export async function GET(req, res){
  const filePath = path.join(process.cwd(), "src", "app", "helpers", "symbols.css");
  try {
    const data = await fs.readFileSync(filePath, "utf8");
    return new Response(JSON.stringify((data)), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch{
    console.log("Error reading file.")
    return Response.json({ error: "Error reading file." }, { status: 500 })
  }
} 


