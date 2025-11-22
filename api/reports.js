// api/reports.js
// CEREBRO MAESTRO TCDS (Ingesta + Analítica)
// Autor: Genaro Carrasco Ozuna

// Memoria Volátil (Vive mientras el servidor esté caliente)
let events = [];

export default async function handler(req, res) {
  // 1. Permisos Universales (CORS)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  // 2. MODO INGESTA (POST): El Reloj envía datos aquí
  if (req.method === "POST") {
    try {
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      if (!body || !body.metrics) return res.status(400).json({ error: "Data error" });

      const event = {
        device_id: body.device_id || "anon",
        timestamp: Date.now(),
        metrics: {
          tC: body.metrics.tC || 0,
          LI: body.metrics.LI || 0,
          R: body.metrics.R || 0,
          dH: body.metrics.dH || 0,
          Q: body.metrics.Q_Arnold || 0
        }
      };

      // Guardamos en memoria
      events.push(event);
      if (events.length > 1000) events.shift(); // Buffer circular

      console.log(`[INGESTA] Nodo: ${event.device_id.slice(0,5)} | LI: ${event.metrics.LI.toFixed(2)}`);
      return res.status(200).json({ ok: true });

    } catch (e) { return res.status(500).json({ error: "Error interno" }); }
  }

  // 3. MODO DASHBOARD (GET): El Mapa pide estadísticas aquí
  if (req.method === "GET") {
    // Filtramos datos recientes (últimos 5 min) para tiempo real
    const now = Date.now();
    const recent = events.filter(e => (now - e.timestamp) < 5 * 60 * 1000);
    const total = recent.length;

    // Función promedio segura
    const avg = (key) => total === 0 ? 0 : recent.reduce((acc, e) => acc + (e.metrics[key]||0), 0) / total;

    // Respuesta completa para el Dashboard.html
    return res.status(200).json({
      status: "TCDS Master Node Online",
      active_nodes: new Set(recent.map(e => e.device_id)).size, // Nodos únicos
      tc_mean: avg('tC'),
      li_mean: avg('LI'),
      r_mean: avg('R'),
      dh_mean: avg('dH'),
      q_mean: avg('Q'),
      cached_events: total // Para depuración
    });
  }
}
