export default async function handler(req, res) {
  // 1. Coloca aquí tus datos de Supabase (los encuentras en Project Settings > API)
  const SUPABASE_URL  = 'https://vmlytkidcbjjnpubtgwa.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtbHl0a2lkY2Jqam5wdWJ0Z3dhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2ODE3MDYsImV4cCI6MjA5NjI1NzcwNn0.vt_idckFAuWaCIJWtzaJ0Y2jkgriN9i5av9FEyvsGLU';
  const NOMBRE_TABLA = 'perfumes'; // Cambia esto si tu tabla se llama distinto

  try {
    // 2. Nos conectamos a Supabase para pedir todos los productos
    const respuesta = await fetch(`${SUPABASE_URL}/rest/v1/${NOMBRE_TABLA}?select=*`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });

    const productos = await respuesta.json();

    // 3. Armamos la cabecera del CSV (obligatoria para Meta)
    let csv = "id,title,description,availability,condition,price,link,image_link,brand\n";

    // 4. Recorremos los productos de Supabase y llenamos las filas
    productos.forEach((prod) => {
      // IMPORTANTE: Cambia "prod.nombre", "prod.precio", etc. 
      // por el nombre exacto de las columnas que tengas en tu tabla de Supabase.
      
      const id = prod.id;
      const title = prod.n; 
      const description = prod.cat;
      const price = prod.p; 
      
      // Ajusta cómo se ve la URL de tu producto en tu web HTML

      const nombreLimpio = prod.n.toLowerCase().replace(/ /g, "-");
      const marcaLimpia = prod.b ? prod.b.toLowerCase().replace(/ /g, "-") : "";
      const link = `https://vmfragrances.com/#${nombreLimpio}-${marcaLimpia}`; 
      
      const image_link = prod.img; // La columna donde guardas la foto
      const brand = prod.b; // Puedes dejarlo fijo o usar prod.marca

      // Construimos la fila separada por comas
      csv += `${id},"${title}","${description}",in stock,new,${price} ARS,${link},${image_link},${brand}\n`;
    });

    // 5. Le decimos al navegador/Meta que esto es un archivo CSV
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.status(200).send(csv);

  } catch (error) {
    res.status(500).json({ error: 'Hubo un error al generar el catálogo' });
  }
}