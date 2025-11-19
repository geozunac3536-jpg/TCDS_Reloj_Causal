# Reloj Causal Humano — TCDS

Interfaz web experimental basada en la **Teoría Cromodinámica Sincrónica (TCDS)** para:

- Visualizar el tiempo estándar `t_M`.
- Ajustar un proxy subjetivo de **tiempo causal** `t_C` (gradiente de coherencia).
- Enviar una descripción cualitativa a un backend `/api/query` que consulta un modelo de IA.
- Recibir un diagnóstico narrativo sobre el balance entre `Q`, `Σ`, `φ` y `χ`.

## Estructura

```text
index.html                        # UI principal del Reloj Causal Humano
dashboard.html                    # Placeholder para panel de Σ-metrics agregadas
metadata/tcds_reloj_causal_metadata.jsonld  # Metadatos JSON-LD para crawlers
api/query.js                      # Endpoint IA (usa AI_GATEWAY_API_KEY)
api/reports.js                    # Ping y eco de sincronogramas cualitativos
README.md
LICENSE
.nojekyll
