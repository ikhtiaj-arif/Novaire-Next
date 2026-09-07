import { useState } from "react";

const phases = [
  {
    id: "setup",
    label: "Phase 1 — Project Setup",
    tasks: [
      { id: "s1", text: "Scaffold Next.js 15 app with App Router + TypeScript + Tailwind", note: "npx create-next-app@latest novaire --app --tailwind --typescript" },
      { id: "s2", text: "Install and configure shadcn/ui", note: "npx shadcn@latest init — choose neutral base color" },
      { id: "s3", text: "Add Google Fonts: Playfair Display + Inter via next/font/google", note: "In layout.tsx — Playfair for display, Inter for UI" },
      { id: "s4", text: "Set up next-themes for dark/light toggle", note: "Wrap layout in ThemeProvider, add toggle to header" },
      { id: "s5", text: "Set up Vercel project and link GitHub repo", note: "Free tier is fine for testing phase" },
      { id: "s6", text: "Create .env.local with all placeholder values", note: "ZAPIER_WEBHOOK_URL, NEXT_PUBLIC_META_PIXEL_ID, NEXT_PUBLIC_TIKTOK_PIXEL_ID" },
      { id: "s7", text: "Configure tailwind.config with custom color tokens", note: "Gold #C9A84C, backgrounds, borders — map to shadcn CSS variables" },
    ],
  },
  {
    id: "routing",
    label: "Phase 2 — Routing & Architecture",
    tasks: [
      { id: "r1", text: "Create /app/[variant]/page.tsx — dynamic route", note: "Reads variant param (a|b|c), maps to price via variants.ts, renders LandingPage" },
      { id: "r2", text: "Create /app/thank-you/page.tsx", note: "Bilingual content, same dark/light theme" },
      { id: "r3", text: "Create /app/api/submit/route.ts — POST handler", note: "Validate → generate timestamp → POST Zapier webhook → return 200/error" },
      { id: "r4", text: "Build /lib/fragrances.ts — 12 fragrance objects", note: "Single source of truth: id, num, name, description, pills[]" },
      { id: "r5", text: "Build /lib/variants.ts — price map", note: "{ a: 299, b: 399, c: 499 }" },
      { id: "r6", text: "Build /lib/validation.ts — shared validators", note: "Phone regex /^(\\+212|06|07)[0-9]{8}$/ — used by both form and API route" },
      { id: "r7", text: "Build /lib/cities.ts — full Morocco city list", note: "Array of strings, used by searchable Command select" },
      { id: "r8", text: "Build /hooks/useOrderModal.ts", note: "Modal open/close, selectedScent, quantity state, total price calculation" },
    ],
  },
  {
    id: "ui",
    label: "Phase 3 — UI Components",
    tasks: [
      { id: "u1", text: "Header: logo (Playfair) + theme toggle (Sun/Moon lucide icon)", note: "Sticky, backdrop blur, no hamburger, no nav links" },
      { id: "u2", text: "Hero: gradient placeholder, heading, subheading, trust badge pills", note: "Placeholder div with radial gradient — zero layout shift when real image arrives via next/image" },
      { id: "u3", text: "Trust badges: 🚚 Livraison Rapide + 🤝 Paiement à la Livraison", note: "Inline flex pill style below hero heading" },
      { id: "u4", text: "ProductGrid: responsive grid container", note: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6" },
      { id: "u5", text: "ProductCard: image, num+name (Playfair), description, pills, price, qty, Commander", note: "Card hover: translateY(-2px) CSS only. Commander button only opens modal — not full card" },
      { id: "u6", text: "Scent note pills: shadcn Badge per fragrance (2–3 per card)", note: "Pills derived from descriptions — see fragrances.ts" },
      { id: "u7", text: "Qty selector: outlined pill with – and + buttons", note: "Min 1. State managed in useOrderModal, passed back to card" },
      { id: "u8", text: "TrustStrip: 2×2 icon grid with lucide-react icons", note: "Livraison Rapide · COD · Retour Facile · Support Client" },
      { id: "u9", text: "OrderModal: shadcn Sheet — bottom sheet on mobile, dialog on lg:", note: "animate-in slide-in-from-bottom, cubic-bezier(0.32,0.72,0,1) 350ms" },
      { id: "u10", text: "Modal: order summary — scent name + qty × price = total DH", note: "Read-only, calculated live in useOrderModal hook" },
      { id: "u11", text: "Modal: form fields — Nom, Téléphone, Ville (searchable)", note: "French labels only. Inline validation errors. shadcn Input + Command+Popover for city" },
      { id: "u12", text: "Modal: CTA button — CONFIRMER MA COMMANDE", note: "Gold bg, full-width, pulse glow. States: default → loading (spinner, disabled) → error" },
      { id: "u13", text: "ThankYou page: Arabic (dir=rtl on paragraph) + French content", note: "Exact copy from brief. dir='rtl' on Arabic <p> only — not the whole page" },
    ],
  },
  {
    id: "data",
    label: "Phase 4 — Data & Integrations",
    tasks: [
      { id: "d1", text: "API route: validate payload server-side (shared validation.ts)", note: "Never trust client — re-run all validation in route.ts" },
      { id: "d2", text: "API route: generate timestamp server-side (new Date().toISOString())", note: "Never accept timestamp from client" },
      { id: "d3", text: "API route: POST to Zapier webhook with full payload", note: "{ name, phone, city, scent, quantity, variant, price, timestamp }" },
      { id: "d4", text: "Zapier: map payload fields to Google Sheet columns", note: "Timestamp | Full Name | Phone | City | Scent | Quantity | Price Variant | Price (DH)" },
      { id: "d5", text: "Meta Pixel base code in layout.tsx", note: "NEXT_PUBLIC_META_PIXEL_ID placeholder — client provides real ID later" },
      { id: "d6", text: "TikTok Pixel base code in layout.tsx", note: "NEXT_PUBLIC_TIKTOK_PIXEL_ID placeholder — client provides real ID later" },
      { id: "d7", text: "Fire ConfirmOrder on both pixels after successful submit", note: "fbq('trackCustom', 'ConfirmOrder', {scent, variant, price, quantity}) + ttq.track()" },
      { id: "d8", text: "router.push('/thank-you') after 200 from API", note: "Only redirect on success — show error state if API fails" },
    ],
  },
  {
    id: "qa",
    label: "Phase 5 — QA & Delivery",
    tasks: [
      { id: "q1", text: "Test all 3 variants at 375px viewport (iPhone SE — primary target)", note: "Chrome DevTools → iPhone SE. Check all 3 routes: /a, /b, /c" },
      { id: "q2", text: "Test dark/light toggle across all pages", note: "/, /a, /b, /c, /thank-you — all must respect theme" },
      { id: "q3", text: "Verify phone validation — valid and invalid cases", note: "Valid: 0612345678, +212612345678. Invalid: 05xxxxxxxx, too short, letters" },
      { id: "q4", text: "End-to-end order flow: submit form → Sheet row appears", note: "Test all 3 price variants — verify variant column reflects A/B/C correctly" },
      { id: "q5", text: "Verify pixel events fire (Network tab)", note: "Filter network tab for 'facebook' and 'tiktok' — check ConfirmOrder event fires on submit" },
      { id: "q6", text: "Test bottom sheet animation on real iOS Safari", note: "Chrome DevTools isn't enough — bottom sheet often has iOS-specific bugs" },
      { id: "q7", text: "Check loading + error states on CTA button", note: "Simulate slow network (DevTools throttle) + test with bad webhook URL to trigger error state" },
      { id: "q8", text: "Optimise hero image with next/image (once client sends bottle mockup)", note: "Target LCP < 2.5s on mobile. Use priority prop on hero image" },
      { id: "q9", text: "Deploy to Vercel — confirm /a, /b, /c all live and working", note: "Check env vars are set in Vercel dashboard (not just .env.local)" },
      { id: "q10", text: "Swap placeholder pixel IDs with real IDs from client", note: "Update NEXT_PUBLIC_META_PIXEL_ID + NEXT_PUBLIC_TIKTOK_PIXEL_ID in Vercel env" },
    ],
  },
];

const fragrances = [
  { num: "N°01", name: "L'EMPIRE", pills: ["Aventus", "Fruité", "Boisé"] },
  { num: "N°02", name: "SILEX BLEU", pills: ["Boisé", "Frais", "Intense"] },
  { num: "N°03", name: "BLEU ABSOLU", pills: ["Aromatique", "Élégant", "Intemporel"] },
  { num: "N°04", name: "ABYSSAL", pills: ["Marin", "Frais", "Profond"] },
  { num: "N°05", name: "AMBRE NOIR", pills: ["Ambré", "Gourmand", "Chaud"] },
  { num: "N°06", name: "LINGOT D'OR", pills: ["Cuir", "Épicé", "Audacieux"] },
  { num: "N°07", name: "ROUGE CRISTAL", pills: ["Ambré", "Rouge", "Sophistiqué"] },
  { num: "N°08", name: "NUIT NOIRE", pills: ["Café", "Vanille", "Sensuel"] },
  { num: "N°09", name: "TALONS ROUGES", pills: ["Tubéreuse", "Cacao", "Mystérieux"] },
  { num: "N°10", name: "ÉCLAT JOYEUX", pills: ["Iris", "Gourmand", "Lumineux"] },
  { num: "N°11", name: "LIBRE ESPRIT", pills: ["Lavande", "Floral", "Frais"] },
  { num: "N°12", name: "TENDRE CARESSE", pills: ["Fruité", "Floral", "Doux"] },
];

const pending = [
  { item: "Hero bottle mockup image", where: "Hero section (next/image)" },
  { item: "Meta Pixel ID", where: "Replace PLACEHOLDER_META_PIXEL_ID" },
  { item: "TikTok Pixel ID", where: "Replace PLACEHOLDER_TIKTOK_PIXEL_ID" },
  { item: "Zapier Webhook URL", where: ".env.local → ZAPIER_WEBHOOK_URL" },
  { item: "Google Sheet ID/URL", where: "Zapier config → Sheets step" },
];

const decisions = [
  { decision: "Routing", chosen: "Dynamic /[variant]", rejected: "3 separate files" },
  { decision: "Sheet integration", chosen: "Zapier webhook", rejected: "Direct Sheets API" },
  { decision: "City input", chosen: "Searchable select", rejected: "Dropdown list" },
  { decision: "Modal", chosen: "Bottom sheet (Sheet)", rejected: "Sticky form" },
  { decision: "Modal trigger", chosen: "Commander button only", rejected: "Full card tap" },
  { decision: "Nav", chosen: "Logo + toggle only", rejected: "Hamburger menu" },
  { decision: "Animations", chosen: "CSS only", rejected: "Framer Motion / GSAP" },
  { decision: "Timestamp", chosen: "Server-generated", rejected: "Client-sent" },
  { decision: "Form labels", chosen: "French only", rejected: "French + Arabic" },
  { decision: "Pixel consent", chosen: "None (MENA practice)", rejected: "Cookie banner" },
];

const GOLD = "#C9A84C";

export default function NovaireProjectPlanner() {
  const [checked, setChecked] = useState({});
  const [activeTab, setActiveTab] = useState("checklist");
  const [openPhases, setOpenPhases] = useState({ setup: true, routing: true, ui: false, data: false, qa: false });

  const toggle = (id) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  const togglePhase = (id) => setOpenPhases((prev) => ({ ...prev, [id]: !prev[id] }));

  const totalTasks = phases.flatMap((p) => p.tasks).length;
  const doneTasks = Object.values(checked).filter(Boolean).length;
  const progress = Math.round((doneTasks / totalTasks) * 100);

  const tabs = [
    { id: "checklist", label: "📋 Checklist" },
    { id: "fragrances", label: "🌿 Fragrances" },
    { id: "dataflow", label: "⚙️ Data Flow" },
    { id: "decisions", label: "🔒 Decisions" },
    { id: "pending", label: "⏳ Pending" },
  ];

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: "#0A0A0A", minHeight: "100vh", color: "#fff", padding: "24px 16px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
            <span style={{ fontSize: 22, letterSpacing: 3, color: GOLD, fontWeight: 300 }}>NOVAIRE</span>
            <span style={{ color: "#444", fontSize: 13 }}>/ Project Planner v1.0</span>
          </div>
          <p style={{ color: "#555", fontSize: 12, margin: 0 }}>Next.js 15 · TypeScript · Tailwind · shadcn/ui · Vercel · Zapier</p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 6, marginBottom: 24, flexWrap: "wrap" }}>
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "7px 14px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 500,
                background: activeTab === tab.id ? GOLD : "#1A1A1A",
                color: activeTab === tab.id ? "#000" : "#777",
                transition: "all 0.15s",
              }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── CHECKLIST ── */}
        {activeTab === "checklist" && (
          <>
            <div style={{ background: "#111", borderRadius: 10, padding: "16px 20px", marginBottom: 20, border: "1px solid #222" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontSize: 13, color: "#888" }}>Overall Progress</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: GOLD }}>{doneTasks}/{totalTasks} tasks</span>
              </div>
              <div style={{ background: "#222", borderRadius: 99, height: 6, overflow: "hidden" }}>
                <div style={{ width: `${progress}%`, height: "100%", background: `linear-gradient(90deg, #8B6914, ${GOLD})`, borderRadius: 99, transition: "width 0.4s ease" }} />
              </div>
              <div style={{ marginTop: 6, fontSize: 11, color: "#444" }}>{progress}% complete</div>
            </div>

            {phases.map((phase) => {
              const phaseDone = phase.tasks.filter((t) => checked[t.id]).length;
              const isOpen = openPhases[phase.id];
              return (
                <div key={phase.id} style={{ marginBottom: 10, border: "1px solid #1E1E1E", borderRadius: 10, overflow: "hidden" }}>
                  <button onClick={() => togglePhase(phase.id)}
                    style={{ width: "100%", background: "#111", border: "none", padding: "13px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", color: "#fff" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 7, height: 7, borderRadius: "50%", background: GOLD, display: "inline-block", opacity: phaseDone === phase.tasks.length ? 1 : 0.3 }} />
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{phase.label}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 12, color: phaseDone === phase.tasks.length ? GOLD : "#444" }}>{phaseDone}/{phase.tasks.length}</span>
                      <span style={{ color: "#333", fontSize: 11 }}>{isOpen ? "▲" : "▼"}</span>
                    </div>
                  </button>
                  {isOpen && (
                    <div style={{ background: "#0D0D0D" }}>
                      {phase.tasks.map((task, i) => (
                        <label key={task.id}
                          style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 16px", cursor: "pointer", borderTop: i > 0 ? "1px solid #161616" : "none" }}>
                          <input type="checkbox" checked={!!checked[task.id]} onChange={() => toggle(task.id)}
                            style={{ marginTop: 2, accentColor: GOLD, width: 15, height: 15, cursor: "pointer", flexShrink: 0 }} />
                          <div>
                            <div style={{ fontSize: 13, color: checked[task.id] ? "#444" : "#ccc", textDecoration: checked[task.id] ? "line-through" : "none" }}>
                              {task.text}
                            </div>
                            {task.note && <div style={{ fontSize: 11, color: "#3A3A3A", marginTop: 3 }}>💡 {task.note}</div>}
                          </div>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}

        {/* ── FRAGRANCES ── */}
        {activeTab === "fragrances" && (
          <div>
            <p style={{ fontSize: 13, color: "#555", marginBottom: 16 }}>12 fragrances. Single source of truth lives in <span style={{ color: GOLD, fontFamily: "monospace" }}>/lib/fragrances.ts</span></p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {fragrances.map((f) => (
                <div key={f.num} style={{ background: "#111", border: "1px solid #1E1E1E", borderRadius: 10, padding: "12px 14px" }}>
                  <div style={{ fontSize: 10, color: GOLD, letterSpacing: 1, marginBottom: 3 }}>NOVAIRE | {f.num}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#ddd", marginBottom: 6 }}>{f.name}</div>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {f.pills.map((pill) => (
                      <span key={pill} style={{ fontSize: 10, color: "#666", border: "1px solid #2A2A2A", borderRadius: 99, padding: "2px 7px" }}>{pill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── DATA FLOW ── */}
        {activeTab === "dataflow" && (
          <div>
            <p style={{ fontSize: 13, color: "#555", marginBottom: 20 }}>14-step flow from button tap to Google Sheet row.</p>
            {[
              { n: "1", label: "User taps Commander on a product card", detail: "ProductCard.tsx — button only, not full card" },
              { n: "2", label: "OrderModal (bottom sheet) opens", detail: "useOrderModal.ts sets selectedScent + qty. shadcn Sheet slides up from bottom (350ms cubic-bezier)" },
              { n: "3", label: "User reviews order summary", detail: "Scent name + qty × price = total DH. Read-only, calculated live in hook" },
              { n: "4", label: "User fills Nom, Téléphone, Ville", detail: "French labels. Searchable Command+Popover for city. Inline validation errors" },
              { n: "5", label: "User taps CONFIRMER — button disables + spinner", detail: "Prevents double-submit. Gold button → loading state" },
              { n: "6", label: "Client-side validation runs", detail: "Name (required, min 2), phone regex /^(\\+212|06|07)[0-9]{8}$/, city (required), scent (non-empty)" },
              { n: "7", label: "POST /api/submit with payload", detail: "{ name, phone, city, scent, quantity, variant, price }" },
              { n: "8", label: "Server validates payload (security)", detail: "Re-runs validation.ts — never trusts client data" },
              { n: "9", label: "Server generates timestamp", detail: "new Date().toISOString() — never trusted from client" },
              { n: "10", label: "POST to Zapier webhook", detail: "Full payload including timestamp. Async, decoupled from Vercel cold starts" },
              { n: "11", label: "Zapier appends row to Google Sheet", detail: "Timestamp | Full Name | Phone | City | Scent | Quantity | Price Variant | Price (DH)" },
              { n: "12", label: "API returns 200", detail: "route.ts sends success response" },
              { n: "13", label: "Pixel events fire", detail: "fbq('trackCustom', 'ConfirmOrder', ...) + ttq.track('ConfirmOrder', ...) — both with scent, variant, price, quantity" },
              { n: "14", label: "router.push('/thank-you')", detail: "Bilingual thank-you page. Arabic paragraph with dir='rtl', French with default ltr" },
            ].map((s) => (
              <div key={s.n} style={{ display: "flex", gap: 12, marginBottom: 10 }}>
                <div style={{ flexShrink: 0, width: 26, height: 26, borderRadius: "50%", background: GOLD, color: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>
                  {s.n}
                </div>
                <div style={{ background: "#111", border: "1px solid #1E1E1E", borderRadius: 8, padding: "10px 14px", flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#ccc", marginBottom: 3 }}>{s.label}</div>
                  <div style={{ fontSize: 11, color: "#444", lineHeight: 1.5 }}>{s.detail}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── DECISIONS ── */}
        {activeTab === "decisions" && (
          <div>
            <p style={{ fontSize: 13, color: "#555", marginBottom: 16 }}>All finalised decisions. Do not change without flagging to the developer.</p>
            {decisions.map((d, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "#111", border: "1px solid #1E1E1E", borderRadius: 8, marginBottom: 6 }}>
                <div style={{ width: 90, fontSize: 11, color: GOLD, fontWeight: 600, flexShrink: 0 }}>{d.decision}</div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 12, color: "#ccc", background: "#1A2A1A", border: "1px solid #2A3A2A", borderRadius: 4, padding: "2px 8px", marginRight: 6 }}>✓ {d.chosen}</span>
                </div>
                <div style={{ fontSize: 11, color: "#333", textDecoration: "line-through" }}>{d.rejected}</div>
              </div>
            ))}
          </div>
        )}

        {/* ── PENDING ── */}
        {activeTab === "pending" && (
          <div>
            <p style={{ fontSize: 13, color: "#555", marginBottom: 16 }}>Cannot ship without these. All waiting on the client.</p>
            {pending.map((p, i) => (
              <div key={i} style={{ background: "#110D00", border: "1px solid #2A1E00", borderRadius: 8, padding: "12px 16px", marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 13, color: "#D4A830", fontWeight: 600 }}>{p.item}</div>
                  <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{p.where}</div>
                </div>
                <span style={{ fontSize: 10, color: "#5A3A00", background: "#2A1A00", border: "1px solid #3A2A00", borderRadius: 99, padding: "3px 10px" }}>PENDING</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
