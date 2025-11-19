export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({
      ok: true,
      mode: "ping",
      message: "Reloj Causal TCDS activo",
      timestamp: Date.now()
    });
  }

  if (req.method === "POST") {
    // Aquí podrías guardar o procesar un “sincronograma” simple
    const payload = req.body || {};
    return res.status(200).json({
      ok: true,
      mode: "echo",
      received: payload,
      note: "Endpoint listo para extenderse a métricas Σ (LI, R, RMSE_SL, κΣ, ΔH)."
    });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
