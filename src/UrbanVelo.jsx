
// import { useEffect, useRef, useState } from "react";
// import Spline from "@splinetool/react-spline";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const SCROLL_HEIGHT = "700vh";

// export default function UrbanoVelo() {
//   const splineRef       = useRef(null);
//   const bikeRef         = useRef(null);
//   const heroTextRef     = useRef(null);
//   const precisionRef    = useRef(null);
//   const illuminateRef   = useRef(null);
//   const scrollCueRef    = useRef(null);
//   const sectionRef      = useRef(null);
//   const slidingPanelRef = useRef(null);

//   const targetBike  = useRef({ x: 8, z: 0, ry: 0 });
//   const currentBike = useRef({ x: 8, z: 0, ry: 0 });
//   const rafRef      = useRef(null);

//   const [splineReady, setSplineReady] = useState(false);

//   useEffect(() => {
//     if ("scrollRestoration" in history) history.scrollRestoration = "manual";
//     requestAnimationFrame(() => requestAnimationFrame(() => window.scrollTo(0, 0)));
//   }, []);

//   function onSplineLoad(splineApp) {
//     splineRef.current = splineApp;
//     const bike = splineApp.findObjectByName("E-bike");
//     if (bike) {
//       bikeRef.current = bike;
//       bike.scale.set(1.12, 1.12, 1.12);
//       bike.position.x = 8;
//     }

//     const LERP = 0.04;
//     function tick() {
//       rafRef.current = requestAnimationFrame(tick);
//       if (!bikeRef.current) return;
//       const t = targetBike.current;
//       const c = currentBike.current;

//       c.x  += (t.x  - c.x)  * LERP;
//       c.z  += (t.z  - c.z)  * LERP;

//       let dRy = t.ry - c.ry;
//       if (dRy >  Math.PI) dRy -= Math.PI * 2;
//       if (dRy < -Math.PI) dRy += Math.PI * 2;
//       c.ry += dRy * LERP;

//       bikeRef.current.position.x = c.x;
//       bikeRef.current.position.z = c.z;
//       bikeRef.current.rotation.y = c.ry;
//     }
//     tick();

//     setSplineReady(true);
//   }

//   useEffect(() => {
//     if (!splineReady) return;

//     ScrollTrigger.getAll().forEach((t) => t.kill());
//     gsap.killTweensOf("*");
//     gsap.set(slidingPanelRef.current, { y: "100vh" });

//     const timer = setTimeout(() => {
//       ScrollTrigger.refresh(true);
//       gsap.set(precisionRef.current,  { y: "100vh" });
//       gsap.set(illuminateRef.current, { y: "100vh" });
//       gsap.set(heroTextRef.current,   { y: "0%" });

//       const section = sectionRef.current;
//       const panel   = slidingPanelRef.current;

//       ScrollTrigger.create({
//         trigger: section,
//         start: "top top",
//         end: "bottom bottom",
//         scrub: true,
//         onUpdate: (self) => {
//           const p      = self.progress;
//           const radius = 280;

//           const lockedP = Math.min(p, 0.55);
//           const angle   = lockedP * (170 * Math.PI / 180);

//           const arcX = -Math.sin(angle) * radius;
//           const arcZ = radius - Math.cos(angle) * radius;

//           const TRANS_END = 0.03;
//           const tRaw      = Math.min(p / TRANS_END, 1);
//           const tSmooth   = tRaw * tRaw * (3 - 2 * tRaw);
//           const startX    = 8;

//           const transOffset = startX * (1 - tSmooth);

//           targetBike.current.x  = arcX + transOffset;
//           targetBike.current.z  = arcZ;
//           targetBike.current.ry = -angle;
//         },
//       });

//       gsap.to(heroTextRef.current, {
//         y: "-100%", ease: "power1.in",
//         scrollTrigger: {
//           trigger: section, start: "top top", end: "6% top",
//           scrub: 1, invalidateOnRefresh: true,
//         },
//       });

//       gsap.to(scrollCueRef.current, {
//         opacity: 0,
//         scrollTrigger: {
//           trigger: section, start: "top top", end: "3% top",
//           scrub: true, invalidateOnRefresh: true,
//         },
//       });

//       gsap.fromTo(precisionRef.current,
//         { y: "100vh" },
//         {
//           y: "-400px", ease: "none",
//           scrollTrigger: {
//             trigger: section, start: "7% top", end: "44% top",
//             scrub: 1, invalidateOnRefresh: true,
//           },
//         }
//       );

//       gsap.fromTo(illuminateRef.current,
//         { y: "100vh" },
//         {
//           y: "-400px", ease: "none",
//           scrollTrigger: {
//             trigger: section, start: "25% top", end: "51% top",
//             scrub: 1, invalidateOnRefresh: true,
//           },
//         }
//       );

//       const panelTl = gsap.timeline({
//         scrollTrigger: {
//           trigger: section,
//           start: "40% top",
//           end: "100% top",
//           scrub: 1,
//           invalidateOnRefresh: true,
//           onRefresh: () => {
//             if (window.scrollY === 0) gsap.set(panel, { y: "100vh" });
//           },
//         },
//       });

//       panelTl
//         .fromTo(panel, { y: "100vh" }, { y: "0vh",    ease: "none", duration: 0.367 })
//         .to(panel,                      { y: "0vh",    ease: "none", duration: 0.133 })
//         .to(panel,                      { y: "-100vh", ease: "none", duration: 0.500 });

//     }, 150);

//     return () => {
//       clearTimeout(timer);
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//       ScrollTrigger.getAll().forEach((t) => t.kill());
//       gsap.killTweensOf("*");
//     };
//   }, [splineReady]);

//   const specRows = [
//     {
//       title: "Battery",
//       items: [
//         "Integrated and removable lithium-ion battery.",
//         "500 Wh – 750 Wh capacity for extended range.",
//         "40 – 60 mi (64 – 96 km) range per charge.",
//       ],
//     },
//     {
//       title: "Charging time",
//       items: [
//         "Fast charge: 0 → 80% in approx. 2 – 3 hours.",
//         "Full charge: 100% in 4 – 5 hours.",
//       ],
//     },
//     {
//       title: "Assist speed",
//       items: [
//         "Pedal assist up to 20 – 28 mph (32 – 45 km/h).",
//         "Eco, Normal and Sport assist modes.",
//       ],
//     },
//     {
//       title: "Security",
//       items: [
//         "GPS tracking, remote lock/unlock, motion alerts.",
//         "Integrated frame lock secures the rear wheel.",
//       ],
//     },
//   ];

//   const socials = [
//     { label: "Facebook",    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
//     { label: "Instagram",   icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg> },
//     { label: "X / Twitter", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
//     { label: "LinkedIn",    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
//   ];

//   const Logo = ({ size = 26 }) => (
//     <img
//       src="https://cdn.prod.website-files.com/6501cba8ca7847338a573dea/6501cd1ff85c00da1b1c9a5d_UrbanVelo%20Logo.svg"
//       alt="UrbanoVelo Logo"
//       width={size}
//       height={size}
//       style={{ display: "block", objectFit: "contain" }}
//     />
//   );

//   return (
//     <div style={{ background: "#0f0f0f", color: "#f0efe8", overflowX: "hidden" }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;700&display=swap');
//         *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
//         html { font-size: 16px; }
//         body { background: #0f0f0f; overflow-x: hidden; }
//         a { text-decoration: none; }

//         .nav-wrapper {
//           position: fixed; top: 0; left: 0; right: 0; height: 72px;
//           z-index: 300;
//           background: rgba(12,12,12,0.92); backdrop-filter: blur(20px);
//           border-bottom: 1px solid rgba(255,255,255,0.05);
//         }
//         .nav-inner {
//           max-width: 1800px; margin: 0 auto; height: 100%;
//           display: flex; align-items: center; gap: clamp(24px, 3vw, 48px);
//           padding: 0 clamp(20px, 3vw, 56px);
//         }
//         .nav-inner .btn-account { margin-left: auto; }
//         .logo {
//           display: flex; align-items: center; gap: 10px;
//           font-family: 'Syne', sans-serif; font-weight: 800;
//           font-size: clamp(0.9rem, 1.1vw, 1.1rem);
//           letter-spacing: -0.02em; color: #ffffff;
//         }
//         .nav-links { display: flex; gap: clamp(16px, 2.5vw, 32px); list-style: none; }
//         .nav-links a {
//           color: #ffffff; font-size: clamp(0.75rem, 0.9vw, 0.875rem);
//           font-weight: 500; transition: color 0.2s; font-family: 'DM Sans', sans-serif;
//         }
//         .nav-links a:hover { color: #ffffff; }
//         .btn-account {
//           background: #ffffff; color: #0f0f0f; border: none;
//           padding: clamp(8px, 0.7vw, 10px) clamp(14px, 1.5vw, 22px);
//           border-radius: 100px; font-family: 'DM Sans', sans-serif;
//           font-weight: 700; font-size: clamp(0.75rem, 0.9vw, 0.875rem); cursor: pointer;
//         }
//         @media (max-width: 640px) { .nav-links { display: none; } }

//         .scroll-cue {
//           position: fixed; bottom: 36px; left: 50%; transform: translateX(-50%);
//           z-index: 50; display: flex; flex-direction: column; align-items: center;
//           gap: 8px; color: #444; font-size: 0.65rem; letter-spacing: 0.15em;
//           text-transform: uppercase; font-family: 'DM Sans', sans-serif; pointer-events: none;
//         }
//         .scroll-arrow {
//           width: 16px; height: 16px;
//           border-right: 1px solid #444; border-bottom: 1px solid #444;
//           transform: rotate(45deg); animation: bounce 1.6s ease-in-out infinite;
//         }
//         @keyframes bounce {
//           0%,100% { transform: rotate(45deg) translateY(0); }
//           50%      { transform: rotate(45deg) translateY(5px); }
//         }

//         .section-text-panel {
//           position: fixed; top: 0; left: 0; right: 0;
//           display: flex; justify-content: flex-end;
//           padding-right: clamp(20px, 14vw, 260px);
//           z-index: 20; pointer-events: none;
//         }
//         .section-text-inner {
//           max-width: clamp(260px, 30vw, 420px);
//           text-align: left; padding-top: 20px;
//         }
//         .section-heading {
//           font-family: 'Inter', sans-serif; font-weight: 600;
//           font-size: clamp(1.6rem, 3.5vw, 56px);
//           line-height: 1.04; letter-spacing: -0.02em;
//           margin-bottom: clamp(12px, 1.2vw, 20px);
//           color: #f0efe8; white-space: nowrap;
//         }
//         .section-body {
//           color: #888; font-size: clamp(0.78rem, 0.9vw, 0.875rem);
//           line-height: 1.8; font-family: 'DM Sans', sans-serif; font-weight: 300;
//           text-align: left;
//         }
//         @media (max-width: 900px) {
//           .section-heading { white-space: normal; }
//           .section-text-panel { padding-right: clamp(16px, 5vw, 40px); padding-left: clamp(16px, 5vw, 40px); justify-content: center; }
//           .section-text-inner { text-align: center; max-width: 90vw; }
//           .section-body { text-align: center; }
//         }

//         /* ── SPECS PANEL ─────────────────────────────────────── */
//         .specs-panel {
//           height: 100vh; background: #181818;
//           display: flex; flex-direction: column;
//           padding: clamp(80px, 6vw, 96px) clamp(16px, 3vw, 56px) clamp(24px, 3vw, 48px);
//           overflow: hidden;
//         }
//         .specs-heading {
//           font-family: 'Inter', sans-serif; font-weight: 800;
//           font-size: clamp(1.5rem, 2.5vw, 2.8rem);
//           color: #f0efe8; letter-spacing: -0.03em;
//           margin-bottom: clamp(16px, 1.5vw, 28px); flex-shrink: 0;
//         }
//         .specs-grid {
//           display: grid;
//           grid-template-columns: 1fr clamp(220px, 30vw, 480px);
//           gap: clamp(10px, 1.2vw, 20px);
//           flex: 1; min-height: 0;
//         }
//         .specs-table {
//           border: 1px solid rgba(255,255,255,0.09); border-radius: 14px;
//           overflow: hidden; display: flex; flex-direction: column;
//           height: 100%;
//         }
//         .spec-row {
//           border-bottom: 1px solid rgba(255,255,255,0.06);
//           padding: 0 clamp(16px, 2vw, 32px);
//           display: flex;
//           gap: clamp(16px, 2.5vw, 40px);
//           align-items: center;
//           flex: 1;
//           min-height: 0;
//         }
//         .spec-row:last-child { border-bottom: none; }
//         .spec-title {
//           width: clamp(100px, 10vw, 160px);
//           flex-shrink: 0;
//           font-family: 'DM Sans', sans-serif; font-weight: 700;
//           font-size: clamp(0.85rem, 0.95vw, 1.05rem); color: #f0efe8; line-height: 1.3;
//         }
//         .spec-items {
//           list-style: disc; padding-left: 16px; color: #888;
//           font-size: clamp(0.85rem, 0.95vw, 1rem);
//           line-height: 1.75; font-family: 'DM Sans', sans-serif; margin: 0;
//         }
//         .specs-img-col {
//           border: 1px solid rgba(255,255,255,0.09); border-radius: 14px;
//           overflow: hidden; background: #1c1c1c;
//         }
//         .specs-img-col img {
//           width: 100%; height: 100%; object-fit: cover;
//           object-position: center top; display: block;
//         }

//         /* ── TABLET RESPONSIVE (480px - 768px) ───────────────── */
//         @media (max-width: 768px) {
//           .specs-panel {
//             height: auto;
//             min-height: 100vh;
//             padding: 80px 20px 32px;
//             overflow: visible;
//           }

//           .specs-heading {
//             font-size: 1.6rem;
//             margin-bottom: 16px;
//           }

//           .specs-grid {
//             grid-template-columns: 1fr;
//             gap: 0;
//             flex: none;
//           }

//           .specs-img-col {
//             display: none;
//           }

//           .specs-table {
//             height: auto;
//             border-radius: 10px;
//           }

//           .spec-row {
//             flex-direction: column;
//             align-items: flex-start;
//             padding: 14px 16px;
//             gap: 8px;
//             flex: none;
//             min-height: unset;
//           }

//           .spec-title {
//             width: 100%;
//             font-size: 0.88rem;
//             border-bottom: 1px solid rgba(255,255,255,0.06);
//             padding-bottom: 6px;
//           }

//           .spec-items {
//             font-size: 0.82rem;
//             line-height: 1.7;
//             padding-left: 14px;
//           }
//         }

//         /* ── MOBILE RESPONSIVE (< 480px) ─────────────────────── */
//         @media (max-width: 480px) {
//           .specs-panel {
//             padding: 72px 14px 24px;
//           }

//           .specs-heading {
//             font-size: 1.3rem;
//             margin-bottom: 12px;
//           }

//           .spec-row {
//             padding: 12px 14px;
//             gap: 6px;
//           }

//           .spec-title {
//             font-size: 0.82rem;
//           }

//           .spec-items {
//             font-size: 0.78rem;
//             line-height: 1.65;
//           }
//         }

//         /* ── FOOTER ──────────────────────────────────────────── */
//         .site-footer {
//           font-family: 'DM Sans', sans-serif; background: #0d0d0d;
//           border-top: 1px solid rgba(255,255,255,0.06);
//         }
//         .footer-top {
//           display: grid;
//           grid-template-columns: clamp(200px, 22vw, 320px) 1fr;
//           gap: clamp(32px, 5vw, 80px);
//           padding: clamp(40px, 5vw, 72px) clamp(20px, 3.5vw, 56px) clamp(32px, 4vw, 64px);
//           border-bottom: 1px solid rgba(255,255,255,0.06);
//         }
//         .footer-brand p { color: #555; font-size: 0.875rem; line-height: 1.7; margin: 20px 0 28px; }
//         .newsletter-form {
//           display: flex; border: 1px solid rgba(255,255,255,0.1);
//           border-radius: 10px; overflow: hidden; background: #151515;
//         }
//         .newsletter-form input {
//           flex: 1; background: transparent; border: none; outline: none;
//           padding: 13px 18px; color: #f0efe8; font-family: 'DM Sans', sans-serif;
//           font-size: 0.875rem; min-width: 0;
//         }
//         .newsletter-form input::placeholder { color: #444; }
//         .newsletter-form button {
//           background: #f0efe8; color: #0d0d0d; border: none;
//           padding: 13px clamp(12px, 1.5vw, 22px); font-family: 'DM Sans', sans-serif;
//           font-weight: 700; font-size: 0.875rem; cursor: pointer; white-space: nowrap;
//         }
//         .newsletter-form button:hover { background: #d8d7d0; }
//         .privacy-note { margin-top: 12px; font-size: 0.78rem; color: #3a3a3a; }
//         .privacy-note a { color: #555; border-bottom: 1px solid #333; }
//         .footer-nav {
//           display: grid; grid-template-columns: repeat(3, 1fr);
//           gap: clamp(20px, 3vw, 40px); padding-top: 4px;
//         }
//         .footer-col h4 {
//           font-weight: 700; font-size: 0.78rem; letter-spacing: 0.08em;
//           text-transform: uppercase; color: #f0efe8; margin-bottom: 20px;
//         }
//         .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 12px; }
//         .footer-col ul li a {
//           color: #555; font-size: clamp(0.78rem, 0.9vw, 0.875rem);
//           transition: color 0.2s; display: flex; align-items: center; gap: 8px;
//         }
//         .footer-col ul li a:hover { color: #f0efe8; }
//         .badge-new {
//           background: rgba(255,255,255,0.08); color: #888; font-size: 0.6rem;
//           letter-spacing: 0.1em; text-transform: uppercase; padding: 2px 7px;
//           border-radius: 100px; border: 1px solid rgba(255,255,255,0.1); font-weight: 600;
//         }
//         .social-links { display: flex; flex-direction: column; gap: 12px; }
//         .social-link {
//           display: flex; align-items: center; gap: 12px; color: #555;
//           font-size: clamp(0.78rem, 0.9vw, 0.875rem); transition: color 0.2s; cursor: pointer;
//         }
//         .social-link:hover { color: #f0efe8; }
//         .social-icon {
//           width: 34px; height: 34px; border: 1px solid rgba(255,255,255,0.1);
//           border-radius: 8px; display: flex; align-items: center; justify-content: center;
//           background: rgba(255,255,255,0.03); flex-shrink: 0;
//           transition: border-color 0.2s, background 0.2s;
//         }
//         .social-link:hover .social-icon { border-color: rgba(255,255,255,0.25); background: rgba(255,255,255,0.07); }
//         .footer-bottom {
//           display: flex; justify-content: space-between; align-items: center;
//           padding: 24px clamp(20px, 3.5vw, 56px);
//           flex-wrap: wrap; gap: 12px;
//         }
//         .footer-copy { color: #333; font-size: 0.8rem; }
//         .footer-legal { display: flex; gap: clamp(12px, 1.5vw, 24px); }
//         .footer-legal a { color: #333; font-size: 0.8rem; transition: color 0.2s; }
//         .footer-legal a:hover { color: #888; }

//         /* ── FOOTER TABLET (480px - 768px) ───────────────────── */
//         @media (max-width: 768px) {
//           .footer-top {
//             grid-template-columns: 1fr;
//             gap: 32px;
//             padding: 40px 20px 32px;
//           }

//           .footer-nav {
//             grid-template-columns: 1fr 1fr;
//             gap: 24px;
//           }

//           .footer-col h4 {
//             font-size: 0.75rem;
//             margin-bottom: 14px;
//           }

//           .footer-col ul li a {
//             font-size: 0.82rem;
//           }

//           .newsletter-form input {
//             font-size: 0.82rem;
//             padding: 11px 14px;
//           }

//           .newsletter-form button {
//             padding: 11px 16px;
//             font-size: 0.82rem;
//           }

//           .footer-bottom {
//             padding: 20px;
//             flex-direction: column;
//             align-items: flex-start;
//             gap: 8px;
//           }

//           .social-links {
//             gap: 10px;
//           }
//         }

//         /* ── FOOTER MOBILE (< 480px) ─────────────────────────── */
//         @media (max-width: 480px) {
//           .footer-top {
//             padding: 32px 14px 24px;
//             gap: 24px;
//           }

//           .footer-nav {
//             grid-template-columns: 1fr 1fr;
//             gap: 16px;
//           }

//           .footer-col h4 {
//             font-size: 0.72rem;
//             margin-bottom: 12px;
//           }

//           .social-icon {
//             width: 30px;
//             height: 30px;
//           }

//           .social-link {
//             font-size: 0.78rem;
//           }

//           .footer-copy,
//           .footer-legal a {
//             font-size: 0.75rem;
//           }

//           .footer-bottom {
//             padding: 16px 14px;
//           }

//           .newsletter-form input {
//             padding: 10px 12px;
//             font-size: 0.78rem;
//           }

//           .newsletter-form button {
//             padding: 10px 14px;
//             font-size: 0.78rem;
//           }
//         }
//       `}</style>

//       {/* NAV */}
//       <div className="nav-wrapper">
//         <div className="nav-inner">
//           <div className="logo"><Logo size={140} /></div>
//           <ul className="nav-links">
//             <li><a href="#">Home</a></li>
//             <li><a href="#">E-Bikes</a></li>
//             <li><a href="#">Accessories</a></li>
//             <li><a href="#">Support</a></li>
//           </ul>
//           <button className="btn-account">My account</button>
//         </div>
//       </div>

//       {/* SPLINE */}
//       <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 0, background: "#0f0f0f" }}>
//         <Spline scene="/scene.splinecode" onLoad={onSplineLoad} style={{ width: "100%", height: "100%" }} />
//       </div>

//       {/* SCROLLABLE LAYER */}
//       <div style={{ position: "relative", zIndex: 10 }}>
//         <div ref={sectionRef} style={{ height: SCROLL_HEIGHT, position: "relative" }}>

//           {/* HERO */}
//           <div style={{
//             position: "fixed",
//             top: "72px", left: 0, right: 0, bottom: 0,
//             overflow: "hidden",
//             zIndex: 20, pointerEvents: "none",
//           }}>
//             <div
//               ref={heroTextRef}
//               style={{
//                 width: "100%", height: "100%",
//                 display: "flex", alignItems: "center", justifyContent: "center",
//                 textAlign: "center",
//                 opacity: splineReady ? 1 : 0,
//                 transition: "opacity 0.5s ease",
//               }}
//             >
//               <h1 style={{
//                 fontFamily: "'Inter', sans-serif", fontWeight: 600,
//                 fontSize: "clamp(2.2rem, 6.5vw, 6.5rem)",
//                 lineHeight: 1.04, letterSpacing: "-0.02em", color: "#f0efe8",
//                 marginBottom: "65vh",
//                 padding: "0 clamp(16px, 4vw, 60px)",
//               }}>
//                 Revolutionizing<br />Urban Mobility
//               </h1>
//             </div>
//           </div>

//           {/* PRECISION */}
//           <div ref={precisionRef} style={{ transform: "translateY(100vh)" }} className="section-text-panel">
//             <div className="section-text-inner">
//               <h2 className="section-heading">Powered by Precision</h2>
//               <p className="section-body">
//                 At the heart of the UrbanoVelo Classic V5 is a state-of-the-art electric motor that seamlessly integrates with your pedalling. Whether tackling steep hills or cruising flat terrain, our motor provides the boost you need, precisely when you need it.
//               </p>
//             </div>
//           </div>

//           {/* ILLUMINATE */}
//           <div ref={illuminateRef} style={{ transform: "translateY(100vh)" }} className="section-text-panel">
//             <div className="section-text-inner">
//               <h2 className="section-heading">Illuminate Your Path<br />with Confidence</h2>
//               <p className="section-body">
//                 Our integrated headlight boasts a powerful LED system that casts a bright, even beam onto your path. Multiple brightness settings let you adjust intensity to match your riding conditions.
//               </p>
//             </div>
//           </div>

//           {/* SLIDING PANEL */}
//           <div
//             ref={slidingPanelRef}
//             style={{
//               position: "fixed",
//               top: 0, left: 0, right: 0,
//               zIndex: 18,
//               transform: "translateY(100vh)",
//               background: "#0d0d0d",
//               visibility: splineReady ? "visible" : "hidden",
//             }}
//           >
//             {/* SPECS */}
//             <div className="specs-panel">
//               <h2 className="specs-heading">Specifications</h2>
//               <div className="specs-grid">
//                 <div className="specs-table">
//                   {specRows.map((spec, idx) => (
//                     <div
//                       key={spec.title}
//                       className="spec-row"
//                       style={{ background: idx % 2 === 0 ? "#161616" : "#232323" }}
//                     >
//                       <div className="spec-title">{spec.title}</div>
//                       <ul className="spec-items">
//                         {spec.items.map((item, i) => <li key={i}>{item}</li>)}
//                       </ul>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="specs-img-col">
//                   <img
//                     src="https://assets-global.website-files.com/65285d56417fc9579c35c859/65285d56417fc9579c35c85f_Tail%2520Light-min-p-800.jpg"
//                     alt="E-bike tail light"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* FOOTER */}
//             <footer className="site-footer">
//               <div className="footer-top">
//                 <div className="footer-brand">
//                   <div className="logo" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.05rem", letterSpacing: "-0.02em" }}>
//                     <Logo size={140} />
//                   </div>
//                   <p>Join our newsletter to stay up to date on features and releases.</p>
//                   <div className="newsletter-form">
//                     <input type="email" placeholder="Enter your email" />
//                     <button type="button">Subscribe</button>
//                   </div>
//                   <p className="privacy-note">We care about your data in our <a href="#">privacy policy</a>.</p>
//                 </div>
//                 <div className="footer-nav">
//                   <div className="footer-col">
//                     <h4>eBikes</h4>
//                     <ul>
//                       <li><a href="#">Overview</a></li>
//                       <li><a href="#">Features</a></li>
//                       <li><a href="#">Accessories <span className="badge-new">New</span></a></li>
//                       <li><a href="#">Setup</a></li>
//                       <li><a href="#">Releases</a></li>
//                     </ul>
//                   </div>
//                   <div className="footer-col">
//                     <h4>Resources</h4>
//                     <ul>
//                       <li><a href="#">Blog</a></li>
//                       <li><a href="#">Newsletter</a></li>
//                       <li><a href="#">Retailers</a></li>
//                       <li><a href="#">Help center</a></li>
//                       <li><a href="#">Support</a></li>
//                     </ul>
//                   </div>
//                   <div className="footer-col">
//                     <h4>Social</h4>
//                     <div className="social-links">
//                       {socials.map(({ label, icon }) => (
//                         <div className="social-link" key={label}>
//                           <div className="social-icon">{icon}</div>
//                           {label}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="footer-bottom">
//                 <span className="footer-copy">© 2026 UrbanoVelo. All rights reserved.</span>
//                 <div className="footer-legal">
//                   <a href="#">Terms</a>
//                   <a href="#">Privacy</a>
//                   <a href="#">Cookies</a>
//                 </div>
//               </div>
//             </footer>

//           </div>{/* end slidingPanelRef */}

//         </div>{/* end sectionRef */}
//       </div>

//       {/* SCROLL CUE */}
//       <div ref={scrollCueRef} className="scroll-cue">
//         <span>Scroll</span>
//         <div className="scroll-arrow" />
//       </div>
//     </div>
//   );
// }



import { useEffect, useRef, useState } from "react";
import Spline from "@splinetool/react-spline";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SCROLL_HEIGHT = "700vh";

export default function UrbanoVelo() {
  const splineRef       = useRef(null);
  const bikeRef         = useRef(null);
  const heroTextRef     = useRef(null);
  const precisionRef    = useRef(null);
  const illuminateRef   = useRef(null);
  const scrollCueRef    = useRef(null);
  const sectionRef      = useRef(null);
  const slidingPanelRef = useRef(null);

  const targetBike  = useRef({ x: 8, z: 0, ry: 0 });
  const currentBike = useRef({ x: 8, z: 0, ry: 0 });
  const rafRef      = useRef(null);

  const [splineReady, setSplineReady] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    requestAnimationFrame(() => requestAnimationFrame(() => window.scrollTo(0, 0)));
  }, []);

  function onSplineLoad(splineApp) {
    splineRef.current = splineApp;
    const bike = splineApp.findObjectByName("E-bike");
    if (bike) {
      bikeRef.current = bike;
      bike.scale.set(1.12, 1.12, 1.12);
      bike.position.x = 8;
    }

    const LERP = 0.04;
    function tick() {
      rafRef.current = requestAnimationFrame(tick);
      if (!bikeRef.current) return;
      const t = targetBike.current;
      const c = currentBike.current;

      c.x  += (t.x  - c.x)  * LERP;
      c.z  += (t.z  - c.z)  * LERP;

      let dRy = t.ry - c.ry;
      if (dRy >  Math.PI) dRy -= Math.PI * 2;
      if (dRy < -Math.PI) dRy += Math.PI * 2;
      c.ry += dRy * LERP;

      bikeRef.current.position.x = c.x;
      bikeRef.current.position.z = c.z;
      bikeRef.current.rotation.y = c.ry;
    }
    tick();

    setSplineReady(true);
  }

  useEffect(() => {
    if (!splineReady) return;

    ScrollTrigger.getAll().forEach((t) => t.kill());
    gsap.killTweensOf("*");
    gsap.set(slidingPanelRef.current, { y: "100vh" });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh(true);
      gsap.set(precisionRef.current,  { y: "100vh" });
      gsap.set(illuminateRef.current, { y: "100vh" });
      gsap.set(heroTextRef.current,   { y: "0%" });

      const section = sectionRef.current;
      const panel   = slidingPanelRef.current;

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const p      = self.progress;
          const radius = 280;
          const lockedP = Math.min(p, 0.55);
          const angle   = lockedP * (170 * Math.PI / 180);
          const arcX = -Math.sin(angle) * radius;
          const arcZ = radius - Math.cos(angle) * radius;
          const TRANS_END = 0.03;
          const tRaw      = Math.min(p / TRANS_END, 1);
          const tSmooth   = tRaw * tRaw * (3 - 2 * tRaw);
          const startX    = 8;
          const transOffset = startX * (1 - tSmooth);
          targetBike.current.x  = arcX + transOffset;
          targetBike.current.z  = arcZ;
          targetBike.current.ry = -angle;
        },
      });

      gsap.to(heroTextRef.current, {
        y: "-100%", ease: "power1.in",
        scrollTrigger: { trigger: section, start: "top top", end: "6% top", scrub: 1, invalidateOnRefresh: true },
      });

      gsap.to(scrollCueRef.current, {
        opacity: 0,
        scrollTrigger: { trigger: section, start: "top top", end: "3% top", scrub: true, invalidateOnRefresh: true },
      });

      gsap.fromTo(precisionRef.current,
        { y: "100vh" },
        { y: "-400px", ease: "none", scrollTrigger: { trigger: section, start: "7% top", end: "44% top", scrub: 1, invalidateOnRefresh: true } }
      );

      gsap.fromTo(illuminateRef.current,
        { y: "100vh" },
        { y: "-400px", ease: "none", scrollTrigger: { trigger: section, start: "25% top", end: "51% top", scrub: 1, invalidateOnRefresh: true } }
      );

      const panelTl = gsap.timeline({
        scrollTrigger: {
          trigger: section, start: "40% top", end: "100% top", scrub: 1, invalidateOnRefresh: true,
          onRefresh: () => { if (window.scrollY === 0) gsap.set(panel, { y: "100vh" }); },
        },
      });

      panelTl
        .fromTo(panel, { y: "100vh" }, { y: "0vh",    ease: "none", duration: 0.367 })
        .to(panel,                      { y: "0vh",    ease: "none", duration: 0.133 })
        .to(panel,                      { y: "-100vh", ease: "none", duration: 0.500 });

    }, 150);

    return () => {
      clearTimeout(timer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf("*");
    };
  }, [splineReady]);

  const specRows = [
    {
      title: "Battery",
      items: [
        "Integrated and removable lithium-ion battery.",
        "500 Wh – 750 Wh capacity for extended range.",
        "40 – 60 mi (64 – 96 km) range per charge.",
      ],
    },
    {
      title: "Charging time",
      items: [
        "Fast charge: 0 → 80% in approx. 2 – 3 hours.",
        "Full charge: 100% in 4 – 5 hours.",
      ],
    },
    {
      title: "Assist speed",
      items: [
        "Pedal assist up to 20 – 28 mph (32 – 45 km/h).",
        "Eco, Normal and Sport assist modes.",
      ],
    },
    {
      title: "Security",
      items: [
        "GPS tracking, remote lock/unlock, motion alerts.",
        "Integrated frame lock secures the rear wheel.",
      ],
    },
  ];

  const socials = [
    { label: "Facebook",    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
    { label: "Instagram",   icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg> },
    { label: "X / Twitter", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
    { label: "LinkedIn",    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
  ];

  const Logo = ({ size = 26 }) => (
    <img
      src="https://cdn.prod.website-files.com/6501cba8ca7847338a573dea/6501cd1ff85c00da1b1c9a5d_UrbanVelo%20Logo.svg"
      alt="UrbanoVelo Logo"
      width={size}
      height={size}
      style={{ display: "block", objectFit: "contain" }}
    />
  );

  return (
    <div style={{ background: "#0f0f0f", color: "#f0efe8", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;700&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { font-size: 16px; }
        body { background: #0f0f0f; overflow-x: hidden; }
        a { text-decoration: none; }

        /* ── NAV ─────────────────────────────────────────────── */
        .nav-wrapper {
          position: fixed; top: 0; left: 0; right: 0; height: 72px;
          z-index: 300;
          background: rgba(12,12,12,0.92); backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .nav-inner {
          max-width: 1800px; margin: 0 auto; height: 100%;
          display: flex; align-items: center; gap: clamp(24px, 3vw, 48px);
          padding: 0 clamp(20px, 3vw, 56px);
        }
        .nav-inner .btn-account { margin-left: auto; }
        .logo {
          display: flex; align-items: center; gap: 10px;
          font-family: 'Syne', sans-serif; font-weight: 800;
          font-size: clamp(0.9rem, 1.1vw, 1.1rem);
          letter-spacing: -0.02em; color: #ffffff;
        }
        .nav-links { display: flex; gap: clamp(16px, 2.5vw, 32px); list-style: none; }
        .nav-links a {
          color: #ffffff; font-size: clamp(0.75rem, 0.9vw, 0.875rem);
          font-weight: 500; transition: color 0.2s; font-family: 'DM Sans', sans-serif;
        }
        .nav-links a:hover { color: #ffffff; }
        .btn-account {
          background: #ffffff; color: #0f0f0f; border: none;
          padding: clamp(8px, 0.7vw, 10px) clamp(14px, 1.5vw, 22px);
          border-radius: 100px; font-family: 'DM Sans', sans-serif;
          font-weight: 700; font-size: clamp(0.75rem, 0.9vw, 0.875rem); cursor: pointer;
        }
        @media (max-width: 640px) { .nav-links { display: none; } }

        /* ── SCROLL CUE ──────────────────────────────────────── */
        .scroll-cue {
          position: fixed; bottom: 36px; left: 50%; transform: translateX(-50%);
          z-index: 50; display: flex; flex-direction: column; align-items: center;
          gap: 8px; color: #444; font-size: 0.65rem; letter-spacing: 0.15em;
          text-transform: uppercase; font-family: 'DM Sans', sans-serif; pointer-events: none;
        }
        .scroll-arrow {
          width: 16px; height: 16px;
          border-right: 1px solid #444; border-bottom: 1px solid #444;
          transform: rotate(45deg); animation: bounce 1.6s ease-in-out infinite;
        }
        @keyframes bounce {
          0%,100% { transform: rotate(45deg) translateY(0); }
          50%      { transform: rotate(45deg) translateY(5px); }
        }

        /* ── SECTION TEXT PANELS ─────────────────────────────── */
        .section-text-panel {
          position: fixed; top: 0; left: 0; right: 0;
          display: flex; justify-content: flex-end;
          padding-right: clamp(20px, 14vw, 260px);
          z-index: 20; pointer-events: none;
        }
        .section-text-inner {
          max-width: clamp(260px, 30vw, 420px);
          text-align: left; padding-top: 20px;
        }
        .section-heading {
          font-family: 'Inter', sans-serif; font-weight: 600;
          font-size: clamp(1.6rem, 3.5vw, 56px);
          line-height: 1.04; letter-spacing: -0.02em;
          margin-bottom: clamp(12px, 1.2vw, 20px);
          color: #f0efe8; white-space: nowrap;
        }
        .section-body {
          color: #888; font-size: clamp(0.78rem, 0.9vw, 0.875rem);
          line-height: 1.8; font-family: 'DM Sans', sans-serif; font-weight: 300;
          text-align: left;
        }
        @media (max-width: 900px) {
          .section-heading { white-space: normal; }
          .section-text-panel { padding-right: clamp(16px, 5vw, 40px); padding-left: clamp(16px, 5vw, 40px); justify-content: center; }
          .section-text-inner { text-align: center; max-width: 90vw; }
          .section-body { text-align: center; }
        }

        /* ── SPECS PANEL ─────────────────────────────────────── */
        /*
          .specs-panel  = full-width #181818 background (edge to edge)
          .specs-inner  = centered content wrapper, capped at 75vw / 1400px
        */
        .specs-panel {
          height: 100vh;
          background: #181818;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: clamp(80px, 6vw, 96px);
          padding-bottom: clamp(24px, 3vw, 48px);
          overflow: hidden;
        }
        .specs-inner {
          width: 80%;
          max-width: 1400px;
          display: flex;
          flex-direction: column;
          flex: 1;
          min-height: 0;
        }
        .specs-heading {
          font-family: 'Inter', sans-serif; font-weight: 800;
          font-size: clamp(1.5rem, 2vw, 2.4rem);
          color: #f0efe8; letter-spacing: -0.03em;
          margin-bottom: clamp(16px, 1.5vw, 28px); flex-shrink: 0;
        }
        .specs-grid {
          display: grid;
          grid-template-columns: 1fr clamp(220px, 28vw, 420px);
          gap: clamp(10px, 1.2vw, 20px);
          flex: 1; min-height: 0;
        }
        .specs-table {
          border: 1px solid rgba(255,255,255,0.09); border-radius: 14px;
          overflow: hidden; display: flex; flex-direction: column;
          height: 100%;
        }
        .spec-row {
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 0 clamp(16px, 2vw, 28px);
          display: flex;
          gap: clamp(16px, 2.5vw, 40px);
          align-items: center;
          flex: 1;
          min-height: 0;
        }
        .spec-row:last-child { border-bottom: none; }
        .spec-title {
          width: clamp(140px, 13vw, 220px);
          flex-shrink: 0;
          font-family: 'DM Sans', sans-serif; font-weight: 700;
          font-size: clamp(1.2rem, 1.5vw, 1.8rem); 
          color: #f0efe8; line-height: 1.3;
        }
        .spec-items {
          list-style: disc; padding-left: 16px; color: #888;
          font-size: clamp(0.1rem, 1.8vw, 2rem);
          line-height: 1.75; font-family: 'DM Sans', sans-serif; margin: 0;
        }
        .specs-img-col {
          border: 1px solid rgba(255,255,255,0.09); border-radius: 14px;
          overflow: hidden; background: #1c1c1c;
        }
        .specs-img-col img {
          width: 100%; height: 100%; object-fit: cover;
          object-position: center top; display: block;
        }

        /* ── LARGE MONITOR BOOST (≥ 1600px) ─────────────────── */
        @media (min-width: 1600px) {
          .specs-heading  { font-size: 2.6rem; }
          .spec-title     { font-size: 1.6rem; }
          .spec-items     { font-size: 1.1rem; }

          .footer-brand p                          { font-size: 1.1rem; }
          .newsletter-form input,
          .newsletter-form button                  { font-size: 1.05rem; }
          .footer-col h4                           { font-size: 0.95rem; }
          .footer-col ul li a, .social-link        { font-size: 1rem; }
          .footer-copy, .footer-legal a            { font-size: 0.95rem; }
          .social-icon                             { width: 38px; height: 38px; }
        }

        /* ── SPECS TABLET (480px – 768px) ────────────────────── */
        @media (max-width: 768px) {
          .specs-panel {
            height: auto; min-height: 100vh;
            padding: 80px 0 32px;
            overflow: visible; align-items: stretch;
          }
          .specs-inner    { width: 100%; padding: 0 20px; }
          .specs-heading  { font-size: 1.6rem; margin-bottom: 16px; }
          .specs-grid     { grid-template-columns: 1fr; gap: 0; flex: none; }
          .specs-img-col  { display: none; }
          .specs-table    { height: auto; border-radius: 10px; }
          .spec-row {
            flex-direction: column; align-items: flex-start;
            padding: 14px 16px; gap: 8px; flex: none; min-height: unset;
          }
          .spec-title {
            width: 100%; font-size: 0.88rem;
            border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 6px;
          }
          .spec-items { font-size: 0.82rem; line-height: 1.7; padding-left: 14px; }
        }

        /* ── SPECS MOBILE (< 480px) ──────────────────────────── */
        @media (max-width: 480px) {
          .specs-inner   { padding: 0 14px; }
          .specs-heading { font-size: 1.3rem; margin-bottom: 12px; }
          .spec-row      { padding: 12px 14px; gap: 6px; }
          .spec-title    { font-size: 0.82rem; }
          .spec-items    { font-size: 0.78rem; line-height: 1.65; }
        }

        /* ── FOOTER ──────────────────────────────────────────── */
        .site-footer {
          font-family: 'DM Sans', sans-serif; background: #0d0d0d;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .footer-top {
          display: grid;
          grid-template-columns: clamp(200px, 22vw, 320px) 1fr;
          gap: clamp(32px, 5vw, 80px);
          padding: clamp(40px, 5vw, 72px) clamp(20px, 3.5vw, 56px) clamp(32px, 4vw, 64px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .footer-brand p {
          color: #555;
          font-size: clamp(0.875rem, 1vw, 1rem);
          line-height: 1.7; margin: 20px 0 28px;
        }
        .newsletter-form {
          display: flex; border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px; overflow: hidden; background: #151515;
        }
        .newsletter-form input {
          flex: 1; background: transparent; border: none; outline: none;
          padding: 13px 18px; color: #f0efe8; font-family: 'DM Sans', sans-serif;
          font-size: clamp(0.875rem, 1vw, 1rem); min-width: 0;
        }
        .newsletter-form input::placeholder { color: #444; }
        .newsletter-form button {
          background: #f0efe8; color: #0d0d0d; border: none;
          padding: 13px clamp(12px, 1.5vw, 22px); font-family: 'DM Sans', sans-serif;
          font-weight: 700; font-size: clamp(0.875rem, 1vw, 1rem);
          cursor: pointer; white-space: nowrap;
        }
        .newsletter-form button:hover { background: #d8d7d0; }
        .privacy-note { margin-top: 12px; font-size: clamp(0.78rem, 0.85vw, 0.9rem); color: #3a3a3a; }
        .privacy-note a { color: #555; border-bottom: 1px solid #333; }
        .footer-nav {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: clamp(20px, 3vw, 40px); padding-top: 4px;
        }
        .footer-col h4 {
          font-weight: 700; font-size: clamp(0.78rem, 0.85vw, 0.9rem);
          letter-spacing: 0.08em; text-transform: uppercase;
          color: #f0efe8; margin-bottom: 20px;
        }
        .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 12px; }
        .footer-col ul li a {
          color: #555; font-size: clamp(0.78rem, 0.95vw, 0.95rem);
          transition: color 0.2s; display: flex; align-items: center; gap: 8px;
        }
        .footer-col ul li a:hover { color: #f0efe8; }
        .badge-new {
          background: rgba(255,255,255,0.08); color: #888; font-size: 0.6rem;
          letter-spacing: 0.1em; text-transform: uppercase; padding: 2px 7px;
          border-radius: 100px; border: 1px solid rgba(255,255,255,0.1); font-weight: 600;
        }
        .social-links { display: flex; flex-direction: column; gap: 12px; }
        .social-link {
          display: flex; align-items: center; gap: 12px; color: #555;
          font-size: clamp(0.78rem, 0.95vw, 0.95rem); transition: color 0.2s; cursor: pointer;
        }
        .social-link:hover { color: #f0efe8; }
        .social-icon {
          width: 34px; height: 34px; border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px; display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.03); flex-shrink: 0;
          transition: border-color 0.2s, background 0.2s;
        }
        .social-link:hover .social-icon { border-color: rgba(255,255,255,0.25); background: rgba(255,255,255,0.07); }
        .footer-bottom {
          display: flex; justify-content: space-between; align-items: center;
          padding: 24px clamp(20px, 3.5vw, 56px);
          flex-wrap: wrap; gap: 12px;
        }
        .footer-copy { color: #333; font-size: clamp(0.8rem, 0.85vw, 0.9rem); }
        .footer-legal { display: flex; gap: clamp(12px, 1.5vw, 24px); }
        .footer-legal a { color: #333; font-size: clamp(0.8rem, 0.85vw, 0.9rem); transition: color 0.2s; }
        .footer-legal a:hover { color: #888; }

        /* ── FOOTER TABLET (480px – 768px) ───────────────────── */
        @media (max-width: 768px) {
          .footer-top { grid-template-columns: 1fr; gap: 32px; padding: 40px 20px 32px; }
          .footer-nav { grid-template-columns: 1fr 1fr; gap: 24px; }
          .footer-col h4 { font-size: 0.75rem; margin-bottom: 14px; }
          .footer-col ul li a { font-size: 0.82rem; }
          .newsletter-form input { font-size: 0.82rem; padding: 11px 14px; }
          .newsletter-form button { padding: 11px 16px; font-size: 0.82rem; }
          .footer-bottom { padding: 20px; flex-direction: column; align-items: flex-start; gap: 8px; }
          .social-links { gap: 10px; }
        }

        /* ── FOOTER MOBILE (< 480px) ─────────────────────────── */
        @media (max-width: 480px) {
          .footer-top { padding: 32px 14px 24px; gap: 24px; }
          .footer-nav { grid-template-columns: 1fr 1fr; gap: 16px; }
          .footer-col h4 { font-size: 0.72rem; margin-bottom: 12px; }
          .social-icon { width: 30px; height: 30px; }
          .social-link { font-size: 0.78rem; }
          .footer-copy, .footer-legal a { font-size: 0.75rem; }
          .footer-bottom { padding: 16px 14px; }
          .newsletter-form input { padding: 10px 12px; font-size: 0.78rem; }
          .newsletter-form button { padding: 10px 14px; font-size: 0.78rem; }
        }
      `}</style>

      {/* NAV */}
      <div className="nav-wrapper">
        <div className="nav-inner">
          <div className="logo"><Logo size={140} /></div>
          <ul className="nav-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">E-Bikes</a></li>
            <li><a href="#">Accessories</a></li>
            <li><a href="#">Support</a></li>
          </ul>
          <button className="btn-account">My account</button>
        </div>
      </div>

      {/* SPLINE */}
      <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 0, background: "#0f0f0f" }}>
        <Spline scene="/scene.splinecode" onLoad={onSplineLoad} style={{ width: "100%", height: "100%" }} />
      </div>

      {/* SCROLLABLE LAYER */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <div ref={sectionRef} style={{ height: SCROLL_HEIGHT, position: "relative" }}>

          {/* HERO */}
          <div style={{
            position: "fixed", top: "72px", left: 0, right: 0, bottom: 0,
            overflow: "hidden", zIndex: 20, pointerEvents: "none",
          }}>
            <div
              ref={heroTextRef}
              style={{
                width: "100%", height: "100%",
                display: "flex", alignItems: "center", justifyContent: "center",
                textAlign: "center",
                opacity: splineReady ? 1 : 0,
                transition: "opacity 0.5s ease",
              }}
            >
              <h1 style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 600,
                fontSize: "clamp(2.2rem, 6.5vw, 6.5rem)",
                lineHeight: 1.04, letterSpacing: "-0.02em", color: "#f0efe8",
                marginBottom: "65vh",
                padding: "0 clamp(16px, 4vw, 60px)",
              }}>
                Revolutionizing<br />Urban Mobility
              </h1>
            </div>
          </div>

          {/* PRECISION */}
          <div ref={precisionRef} style={{ transform: "translateY(100vh)" }} className="section-text-panel">
            <div className="section-text-inner">
              <h2 className="section-heading">Powered by Precision</h2>
              <p className="section-body">
                At the heart of the UrbanoVelo Classic V5 is a state-of-the-art electric motor that seamlessly integrates with your pedalling. Whether tackling steep hills or cruising flat terrain, our motor provides the boost you need, precisely when you need it.
              </p>
            </div>
          </div>

          {/* ILLUMINATE */}
          <div ref={illuminateRef} style={{ transform: "translateY(100vh)" }} className="section-text-panel">
            <div className="section-text-inner">
              <h2 className="section-heading">Illuminate Your Path<br />with Confidence</h2>
              <p className="section-body">
                Our integrated headlight boasts a powerful LED system that casts a bright, even beam onto your path. Multiple brightness settings let you adjust intensity to match your riding conditions.
              </p>
            </div>
          </div>

          {/* SLIDING PANEL */}
          <div
            ref={slidingPanelRef}
            style={{
              position: "fixed", top: 0, left: 0, right: 0,
              zIndex: 18, transform: "translateY(100vh)",
              background: "#0d0d0d",
              visibility: splineReady ? "visible" : "hidden",
            }}
          >
            {/* SPECS — #181818 fills full width, content centered at 75% */}
            <div className="specs-panel">
              <div className="specs-inner">
                <h2 className="specs-heading">Specifications</h2>
                <div className="specs-grid">
                  <div className="specs-table">
                    {specRows.map((spec, idx) => (
                      <div
                        key={spec.title}
                        className="spec-row"
                        style={{ background: idx % 2 === 0 ?  "#232323" :"#161616" }}
                      >
                        <div className="spec-title">{spec.title}</div>
                        <ul className="spec-items">
                          {spec.items.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="specs-img-col">
                    <img
                      src="https://assets-global.website-files.com/65285d56417fc9579c35c859/65285d56417fc9579c35c85f_Tail%2520Light-min-p-800.jpg"
                      alt="E-bike tail light"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <footer className="site-footer">
              <div className="footer-top">
                <div className="footer-brand">
                  <div className="logo" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.05rem", letterSpacing: "-0.02em" }}>
                    <Logo size={140} />
                  </div>
                  <p>Join our newsletter to stay up to date on features and releases.</p>
                  <div className="newsletter-form">
                    <input type="email" placeholder="Enter your email" />
                    <button type="button">Subscribe</button>
                  </div>
                  <p className="privacy-note">We care about your data in our <a href="#">privacy policy</a>.</p>
                </div>
                <div className="footer-nav">
                  <div className="footer-col">
                    <h4>eBikes</h4>
                    <ul>
                      <li><a href="#">Overview</a></li>
                      <li><a href="#">Features</a></li>
                      <li><a href="#">Accessories <span className="badge-new">New</span></a></li>
                      <li><a href="#">Setup</a></li>
                      <li><a href="#">Releases</a></li>
                    </ul>
                  </div>
                  <div className="footer-col">
                    <h4>Resources</h4>
                    <ul>
                      <li><a href="#">Blog</a></li>
                      <li><a href="#">Newsletter</a></li>
                      <li><a href="#">Retailers</a></li>
                      <li><a href="#">Help center</a></li>
                      <li><a href="#">Support</a></li>
                    </ul>
                  </div>
                  <div className="footer-col">
                    <h4>Social</h4>
                    <div className="social-links">
                      {socials.map(({ label, icon }) => (
                        <div className="social-link" key={label}>
                          <div className="social-icon">{icon}</div>
                          {label}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="footer-bottom">
                <span className="footer-copy">© 2026 UrbanoVelo. All rights reserved.</span>
                <div className="footer-legal">
                  <a href="#">Terms</a>
                  <a href="#">Privacy</a>
                  <a href="#">Cookies</a>
                </div>
              </div>
            </footer>

          </div>{/* end slidingPanelRef */}
        </div>{/* end sectionRef */}
      </div>

      {/* SCROLL CUE */}
      <div ref={scrollCueRef} className="scroll-cue">
        <span>Scroll</span>
        <div className="scroll-arrow" />
      </div>
    </div>
  );
}