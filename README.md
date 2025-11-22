Reloj Causal Humano — TCDS

Este repositorio contiene un nodo web experimental de la **Teoría Cromodinámica Sincrónica (TCDS)** que utiliza los sensores del dispositivo móvil para visualizar, en tiempo real:

- Una **aguja t_C (cian)** que representa el índice de tiempo causal local a partir de la magnitud de la aceleración total \(|a|\) (acelerómetro + gravedad).
- Una **aguja de frecuencia dominante (magenta)** que muestra la frecuencia pico del espectro de \(|a|\), calculado mediante una FFT sobre una ventana deslizante de muestras.
- Ambas agujas comparten el mismo **aro coherencial**, pero cada una lee una “regla” distinta:
  - t_C: mapeo 0–20 m/s² → −60° a +60°.
  - f_dom(|a|): mapeo 0–f_Nyquist → −150° a +150°.

El resultado es un **“Reloj Causal Humano”** que convierte el ruido de movimiento del entorno en un índice visual de coherencia dinámica (t_C) y estructura espectral (f_dom).

---

## Uso

1. Abre la página:

   > https://geozunac3536-jpg.github.io/Reloj-Causal-Humano-TCDS/

2. Toca la pantalla una vez y concede permiso para acceder a los sensores de movimiento.
3. Mueve ligeramente el teléfono:
   - La aguja **cian** responde a cambios en \(|a|\) (postura, vibraciones, sacudidas).
   - La aguja **magenta** responde a la **frecuencia dominante** del movimiento (caminar, vibrar sobre una superficie, etc.).

---

## Detalles técnicos

- El experimento usa el evento `DeviceMotionEvent` del navegador (aceleración incluyendo gravedad).
- Se calcula:
  - \(|a| = \sqrt{a_x^2 + a_y^2 + a_z^2}\)
  - Una FFT radix-2 sobre las últimas \(N = 512\) muestras de \(|a|\).
- La tasa de muestreo \(f_s\) se estima a partir de los intervalos `performance.now()`, y de ahí:
  - Resolución de frecuencia: \( \Delta f = f_s / N \)
  - Frecuencia de Nyquist: \( f_{\text{Nyq}} = f_s / 2 \)
  - Frecuencia pico: \( f_{\text{peak}} = k_{\text{max}} \cdot \Delta f \)

El reloj está optimizado para Chrome en Android. Otros navegadores pueden aplicar restricciones adicionales a los sensores.

---

## Marco TCDS

Este nodo se enmarca en el paradigma TCDS como:

- Un **coherencímetro local** basado en:
  - Campo de movimiento (acelerómetro) → proxi de fricción \(\phi\).
  - Espectro de \(|a|\) → estructura de ventanas t_C.
- Fase actual:
  - **Lectura φ-driven y t_C-driven** sin Filtro de Honestidad aún (E-Veto pendiente).
  - Próximos pasos: integrar métricas Σ (LI, R, ΔH) sobre series de tiempo de \(|a|\) y acoples con texto (sincronograma psíquico).

---

## Autoría y contacto

- **Autor / Arquitecto causal:** Genaro Carrasco Ozuna  
- **ORCID:** https://orcid.org/0009-0005-6358-9910  
- **Ko-fi:** https://ko-fi.com/genarocarrasco  

Este repo forma parte del ecosistema de la **Teoría Cromodinámica Sincrónica (TCDS)** y sus experimentos asociados (Σ-FET, Reloj Causal, Segundo Coherencial, Σ-metrics, etc.).
