// api/reports.js
let events = [];

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method === "POST") {
    try {
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      if (!body || !body.metrics) {
        return res.status(400).json({ error: "Data error" });
      }

      const event = {
        device_id: body.device_id || "anon",
        timestamp: Date.now(),
        metrics: {
          tC: body.metrics.tC || 0,
          LI: body.metrics.LI || 0,
          R:  body.metrics.R  || 0,
          dH: body.metrics.dH || 0,
          Q:  body.metrics.Q_Arnold || 0
        }
      };

      events.push(event);
      if (events.length > 1000) events.shift();

      console.log(
        `[INGESTA] Nodo: ${event.device_id.slice(0,5)} | LI: ${event.metrics.LI.toFixed(2)} | dH: ${event.metrics.dH.toFixed(3)}`
      );

      return res.status(200).json({ ok: true });

    } catch (e) {
      console.error("Error en POST /api/reports:", e);
      return res.status(500).json({ error: "Error interno" });
    }
  }

  if (req.method === "GET") {
    const now = Date.now();
    const recent = events.filter(e => (now - e.timestamp) < 5 * 60 * 1000);
    const total = recent.length;

    const avg = (key) =>
      total === 0
        ? 0
        : recent.reduce((acc, e) => acc + (e.metrics[key] || 0), 0) / total;

    const latest_raw = recent
      .slice(-50)
      .map(e => ({
        time: new Date(e.timestamp).toISOString(),
        metrics: {
          dH: e.metrics.dH,
          LI: e.metrics.LI
        }
      }));

    return res.status(200).json({
      status: "TCDS Master Node Online",
      mode: total === 0 ? "ping" : "live",
      active_nodes: new Set(recent.map(e => e.device_id)).size,
      tc_mean: avg("tC"),
      li_mean: avg("LI"),
      r_mean: avg("R"),
      dh_mean: avg("dH"),
      q_mean: avg("Q"),
      cached_events: total,
      latest_raw
    });
  }

  return res.status(405).json({ error: "Method not allowed" });
}