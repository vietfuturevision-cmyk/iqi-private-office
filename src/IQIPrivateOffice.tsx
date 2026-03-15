// ═══════════════════════════════════════════════════════════════════════
// IQI PRIVATE OFFICE — Civilization Edition
// Tagline: "Không chỉ bảo toàn tài sản. Kiến tạo di sản cho gia đình."
// Ngày tạo: 14/03/2026
// ═══════════════════════════════════════════════════════════════════════
//
// 7 TRỤ CỘT TRIẾT LÝ ĐÃ ÁP DỤNG:
//  [1] Civilization — Chuyển tải global taste & văn minh đến gia đình Việt
//  [2] Family Business & Independence — 100% độc lập, tối đa 5 khách/quý
//  [3] Quest for Meaning — Ngôn ngữ di sản, an yên, tọa độ dự phòng
//  [4] Guardian of the Brand — Lộc là người bảo vệ di sản, không phải salesman
//  [5] C.E.M.I.I (S.A.M.I) — Khách hàng · Nhân viên · Quản trị · Cộng đồng · Độc lập
//  [6] Tâm & Tầm · No excuse, Keep pushing — Thẳng thắn cả rủi ro, khiêm tốn sắc bén
//  [7] Minh bạch & Quiet Luxury — Tĩnh lặng, riêng tư, không phô trương
//
// TECH STACK:
//  React (hooks: useState, useEffect, useRef)
//  Framer Motion — cinematic blur-reveal, parallax
//  Lucide React — icon set nhẹ
//  Google Fonts — Cormorant Garamond (display) + DM Sans (body)
//  Chạy trực tiếp trong Next.js 15 App Router (Client Component)
// ═══════════════════════════════════════════════════════════════════════

import { useState, useEffect, useRef } from "react";
import {
  motion, useScroll, useTransform, useInView, AnimatePresence,
} from "framer-motion";
import {
  ChevronRight, ShieldCheck, Globe, Award, Calendar,
  Star, TrendingUp, ArrowRight, Check, X, Lock,
  MapPin, Unlock, Menu, Building, Users, Download,
  Layers, Compass, Heart, Eye, BookOpen,
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════
// DESIGN TOKENS — Civilization Luxury Palette
// ═══════════════════════════════════════════════════════════════════════
const C = {
  // Base darks — deep midnight, không phải pure black
  black:     "#080808",
  blackSoft: "#0D0C0A",
  blackCard: "#111009",
  blackDeep: "#050505",
  civ:       "#0A0906", // Civilization dark — warmest black

  // Gold spectrum — từ antique đến luminous
  gold:      "#D4AF37",
  goldLight: "#E8C84A",
  goldDim:   "#8E7320",
  goldPale:  "#F0DFA0",
  goldGlow:  "rgba(212,175,55,0.10)",
  goldGlow2: "rgba(212,175,55,0.048)",
  goldLine:  "rgba(212,175,55,0.18)",

  // Text
  white:     "#FAF8F4",
  whiteOff:  "#EDE8DC",
  cream:     "#D4C8B0",
  grey1:     "#9A9285",
  grey2:     "#5A554E",
  grey3:     "#2C2922",
  grey4:     "#1C1A14",
  grey5:     "#141210",

  // Functional
  zaloGreen: "#06C755",
  success:   "#4A9E6B",
};

// ═══════════════════════════════════════════════════════════════════════
// GLOBAL STYLES — Quiet Luxury · Civilization Edition
// ═══════════════════════════════════════════════════════════════════════
const GS = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=EB+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    html{scroll-behavior:smooth;font-size:16px;}
    body{
      background:${C.black}; color:${C.whiteOff};
      font-family:'DM Sans',sans-serif; font-weight:400;
      overflow-x:hidden; -webkit-font-smoothing:antialiased;
    }

    /* Grain overlay — civilization texture */
    body::after{
      content:''; position:fixed; inset:0; pointer-events:none; z-index:9001;
      opacity:.018;
      background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      background-size:200px;
    }

    ::-webkit-scrollbar{width:2px;}
    ::-webkit-scrollbar-track{background:${C.black};}
    ::-webkit-scrollbar-thumb{background:${C.goldDim};border-radius:1px;}
    ::selection{background:${C.goldDim};color:${C.white};}

    /* Font aliases */
    .pf{font-family:'Cormorant Garamond',serif;}
    .eg{font-family:'EB Garamond',serif;}
    .dm{font-family:'DM Sans',sans-serif;}
    p{line-height:1.8;font-size:15px;}

    /* Animated gold text */
    .g-txt{
      background:linear-gradient(120deg,${C.goldDim} 0%,${C.gold} 42%,${C.goldPale} 68%,${C.gold} 100%);
      background-size:240% 100%;
      -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
      animation:g-shift 8s ease-in-out infinite;
    }
    @keyframes g-shift{0%,100%{background-position:0% 50%;}50%{background-position:100% 50%;}}

    /* Glass surfaces */
    .glass{background:rgba(14,13,9,.55);backdrop-filter:blur(24px) saturate(160%);-webkit-backdrop-filter:blur(24px) saturate(160%);}
    .glass-bright{background:rgba(18,16,10,.86);backdrop-filter:blur(36px) saturate(200%);-webkit-backdrop-filter:blur(36px) saturate(200%);}

    /* Animated sweep border */
    @property --sa{syntax:'<angle>';initial-value:0deg;inherits:false;}
    .bs{position:relative;border:1px solid transparent!important;}
    .bs::before{
      content:'';position:absolute;inset:0;border-radius:inherit;padding:1px;
      background:conic-gradient(from var(--sa),transparent 0%,transparent 36%,${C.gold}80 50%,${C.goldPale}aa 52%,${C.gold}80 54%,transparent 66%,transparent 100%);
      -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
      mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
      -webkit-mask-composite:xor;mask-composite:exclude;
      animation:sb 6s linear infinite;pointer-events:none;
    }
    @keyframes sb{to{--sa:360deg;}}
    .bs:nth-child(2)::before{animation-delay:-1.5s;}
    .bs:nth-child(3)::before{animation-delay:-3s;}
    .bs:nth-child(4)::before{animation-delay:-4.5s;}

    /* Primary gold button */
    .btn-g{
      display:inline-flex;align-items:center;gap:10px;
      background:linear-gradient(110deg,${C.goldDim} 0%,${C.gold} 50%,${C.goldLight} 100%);
      background-size:220% 100%;color:${C.black};border:none;cursor:pointer;
      font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;
      letter-spacing:.22em;text-transform:uppercase;padding:16px 40px;
      position:relative;overflow:hidden;
      transition:background-position .6s,box-shadow .45s,transform .3s;
    }
    .btn-g:hover{background-position:right center;box-shadow:0 16px 48px rgba(212,175,55,.36);transform:translateY(-2px);}
    .btn-g::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.14),transparent);transform:translateX(-100%);transition:transform .7s;}
    .btn-g:hover::after{transform:translateX(100%);}

    /* Ghost button */
    .btn-gh{display:inline-flex;align-items:center;gap:10px;background:transparent;border:1px solid ${C.grey3};color:${C.grey1};cursor:pointer;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:400;letter-spacing:.18em;text-transform:uppercase;padding:16px 36px;transition:all .35s;}
    .btn-gh:hover{border-color:${C.goldDim};color:${C.gold};}

    /* Label + divider */
    .lbl{display:inline-block;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:500;letter-spacing:.52em;text-transform:uppercase;color:${C.gold};margin-bottom:22px;}
    .dv{width:44px;height:1px;background:linear-gradient(90deg,transparent,${C.gold},transparent);}

    /* Form inputs */
    .inp{width:100%;background:transparent;border:none;border-bottom:1px solid ${C.grey3};color:${C.whiteOff};font-family:'DM Sans',sans-serif;font-size:15px;font-weight:400;padding:18px 0 12px;outline:none;letter-spacing:.04em;transition:border-color .3s;}
    .inp::placeholder{color:${C.grey2};}
    .inp:focus{border-bottom-color:${C.gold};}
    .inp.error{border-bottom-color:#c04040;}
    textarea.inp{resize:none;line-height:1.75;}

    /* Keyframes */
    @keyframes float-y{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
    @keyframes shimmer-v{0%,100%{opacity:.28;}50%{opacity:1;}}
    @keyframes map-pulse{0%,100%{transform:scale(1);opacity:.65;}50%{transform:scale(1.5);opacity:1;}}
    @keyframes glow-pulse{0%,100%{box-shadow:0 0 18px rgba(212,175,55,.16);}50%{box-shadow:0 0 38px rgba(212,175,55,.36);}}
    @keyframes civ-breathe{0%,100%{opacity:.55;}50%{opacity:.9;}}

    /* Tab nav */
    .tab-btn{background:transparent;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:.3em;text-transform:uppercase;padding:12px 0;position:relative;transition:color .3s;}
    .tab-btn.active{color:${C.gold};}
    .tab-btn.active::after{content:'';position:absolute;bottom:0;left:0;right:0;height:1px;background:${C.gold};}
    .tab-btn:not(.active){color:${C.grey2};}
    .tab-btn:hover:not(.active){color:${C.grey1};}

    /* Art panel */
    .art-panel{background:linear-gradient(145deg,#0E0C03,#18160C,#090801);position:relative;overflow:hidden;}
    .art-panel::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 30%,rgba(212,175,55,.11) 0%,transparent 65%);pointer-events:none;}

    /* Civilization manifesto panel */
    .civ-panel{
      background:linear-gradient(160deg,#0A0803 0%,#141008 40%,#0E0B04 100%);
      position:relative;overflow:hidden;
    }
    .civ-panel::before{
      content:'';position:absolute;
      top:-30%;left:-10%;width:80%;height:160%;
      background:radial-gradient(ellipse at 30% 50%,rgba(212,175,55,.06) 0%,transparent 60%);
      pointer-events:none;
    }

    /* Grids */
    .g2{display:grid;grid-template-columns:1fr 1fr;gap:3px;}
    .g3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
    .g4{display:grid;grid-template-columns:repeat(4,1fr);}

    /* Responsive */
    @media(max-width:900px){
      .g2{grid-template-columns:1fr;}
      .g3{grid-template-columns:1fr;gap:14px;}
      .g4{grid-template-columns:1fr 1fr;}
      .hide-md{display:none!important;}
      .stack-md{flex-direction:column!important;}
      .full-md{grid-template-columns:1fr!important;}
      .modal-grid{grid-template-columns:1fr!important;}
      .modal-art{display:none!important;}
    }
    @media(max-width:540px){
      .g4{grid-template-columns:1fr 1fr;}
      .hide-sm{display:none!important;}
      .stack-sm{flex-direction:column!important;align-items:flex-start!important;}
    }
    @media(max-width:900px){.show-ham{display:flex!important;}}

    /* Reduced motion — tắt hoặc giảm animation cho user nhạy cảm */
    @media (prefers-reduced-motion: reduce){
      html{scroll-behavior:auto;}
      *,*::before,*::after{
        animation-duration:.001ms!important;
        animation-iteration-count:1!important;
        transition-duration:.001ms!important;
      }
      .g-txt,
      .bs::before,
      body::after,
      .btn-g::after{
        animation:none!important;
      }
    }
  `}</style>
);

// ═══════════════════════════════════════════════════════════════════════
// ANIMATION VARIANTS — Cinematic blur-reveal
// ═══════════════════════════════════════════════════════════════════════
const ease = [.22, .9, .28, 1];
const V = {
  up:    { hidden:{opacity:0,filter:"blur(10px)",y:20},  visible:{opacity:1,filter:"blur(0px)",y:0,  transition:{duration:1.1,ease}} },
  in:    { hidden:{opacity:0,filter:"blur(8px)"},         visible:{opacity:1,filter:"blur(0px)",      transition:{duration:.95}} },
  left:  { hidden:{opacity:0,filter:"blur(8px)",x:-38},  visible:{opacity:1,filter:"blur(0px)",x:0,  transition:{duration:1.1,ease}} },
  right: { hidden:{opacity:0,filter:"blur(8px)",x:38},   visible:{opacity:1,filter:"blur(0px)",x:0,  transition:{duration:1.1,ease}} },
  scale: { hidden:{opacity:0,filter:"blur(6px)",scale:.96},visible:{opacity:1,filter:"blur(0px)",scale:1,transition:{duration:.95,ease}} },
  stagger:(d=0)=>({ hidden:{}, visible:{transition:{staggerChildren:.13,delayChildren:d}} }),
};

const Reveal = ({children,v=V.up,delay=0,style={},className=""})=>{
  const ref=useRef(null);
  const io=useInView(ref,{once:true,margin:"-52px"});
  return(
    <motion.div ref={ref} initial="hidden" animate={io?"visible":"hidden"}
      variants={v} transition={{delay}} style={style} className={className}>
      {children}
    </motion.div>
  );
};

const StaggerWrap = ({children,delay=0,style={},className=""})=>{
  const ref=useRef(null);
  const io=useInView(ref,{once:true,margin:"-40px"});
  return(
    <motion.div ref={ref} initial="hidden" animate={io?"visible":"hidden"}
      variants={V.stagger(delay)} style={style} className={className}>
      {children}
    </motion.div>
  );
};
const StaggerItem=({children,style={}})=>(
  <motion.div variants={V.up} style={style}>{children}</motion.div>
);

// ═══════════════════════════════════════════════════════════════════════
// STICKY CTA
// ═══════════════════════════════════════════════════════════════════════
const StickyCTA=({show})=>(
  <AnimatePresence>
    {show&&(
      <motion.div initial={{opacity:0,y:24,scale:.92}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:24,scale:.92}}
        transition={{duration:.45,ease}} style={{position:"fixed",bottom:"28px",right:"24px",zIndex:900}}>
        <div style={{position:"absolute",inset:"-16px",borderRadius:"50%",background:"radial-gradient(circle,rgba(212,175,55,.14) 0%,transparent 70%)",filter:"blur(22px)",animation:"glow-pulse 3.5s ease-in-out infinite"}}/>
        <button className="btn-g bs" style={{padding:"13px 24px",fontSize:"10px",letterSpacing:".2em",boxShadow:"0 8px 36px rgba(0,0,0,.6)"}}
          onClick={()=>document.getElementById("contact").scrollIntoView({behavior:"smooth"})}>
          <Calendar size={12}/>Gặp Lộc trực tiếp
        </button>
      </motion.div>
    )}
  </AnimatePresence>
);

// ═══════════════════════════════════════════════════════════════════════
// NAV
// ═══════════════════════════════════════════════════════════════════════
const Nav=({scrolled})=>{
  const [open,setOpen]=useState(false);
  const links=[
    ["Về Lộc","#heritage"],
    ["Triết lý","#manifesto"],
    ["Dự án","#portfolio"],
    ["Kết quả","#results"],
    ["Quy trình","#process"],
    ["Liên hệ","#contact"],
  ];
  return(
    <>
      <motion.nav initial={{y:-80,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:.9,ease}}
        style={{position:"fixed",top:0,left:0,right:0,zIndex:800,padding:"18px clamp(20px,4vw,52px)",
          display:"flex",justifyContent:"space-between",alignItems:"center",
          background:scrolled?"rgba(8,8,8,.97)":"transparent",
          backdropFilter:scrolled?"blur(32px)":"none",
          borderBottom:scrolled?`1px solid ${C.grey4}`:"none",
          transition:"all .6s cubic-bezier(.22,.9,.28,1)"}}>
        <div className="pf" style={{fontSize:"17px",letterSpacing:".1em",color:C.gold,lineHeight:1}}>
          Lộc · IQI Private Office
        </div>
        <div className="hide-md" style={{display:"flex",gap:"clamp(14px,2.4vw,30px)",alignItems:"center"}}>
          {links.map(([l,h])=>(
            <a key={l} href={h} className="dm"
              style={{color:C.grey1,fontSize:"11px",letterSpacing:".18em",textTransform:"uppercase",textDecoration:"none",transition:"color .3s"}}
              onMouseEnter={e=>e.target.style.color=C.gold}
              onMouseLeave={e=>e.target.style.color=C.grey1}>{l}</a>
          ))}
          <button className="btn-g" style={{padding:"11px 22px",fontSize:"10px"}}
            onClick={()=>document.getElementById("contact").scrollIntoView({behavior:"smooth"})}>
            Đặt lịch gặp
          </button>
        </div>
        <button onClick={()=>setOpen(o=>!o)} style={{display:"none",background:"transparent",border:"none",cursor:"pointer",padding:"8px"}}
          className="show-ham" aria-label="Menu">
          <Menu size={20} color={C.gold}/>
        </button>
      </motion.nav>
      <AnimatePresence>
        {open&&(
          <motion.div initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}}
            transition={{duration:.4}} style={{position:"fixed",top:0,left:0,right:0,zIndex:790,
              background:"rgba(8,8,8,.98)",backdropFilter:"blur(36px)",padding:"80px 32px 40px",
              borderBottom:`1px solid ${C.grey4}`}}>
            <button onClick={()=>setOpen(false)} style={{position:"absolute",top:"20px",right:"24px",background:"transparent",border:"none",cursor:"pointer",color:C.grey1}}>
              <X size={20}/>
            </button>
            {links.map(([l,h])=>(
              <a key={l} href={h} onClick={()=>setOpen(false)} className="dm"
                style={{display:"block",fontSize:"22px",color:C.white,textDecoration:"none",padding:"16px 0",borderBottom:`1px solid ${C.grey4}`,letterSpacing:".06em"}}>
                {l}
              </a>
            ))}
            <button className="btn-g" style={{marginTop:"28px",width:"100%",justifyContent:"center"}}
              onClick={()=>{setOpen(false);document.getElementById("contact").scrollIntoView({behavior:"smooth"});}}>
              <Calendar size={13}/>Đặt lịch gặp trực tiếp
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// HERO — Civilization opening
// ═══════════════════════════════════════════════════════════════════════
const Hero=()=>{
  const {scrollY}=useScroll();
  const py=useTransform(scrollY,[0,600],[0,160]);
  const opac=useTransform(scrollY,[0,500],[1,0]);
  return(
    <section id="hero" style={{minHeight:"100svh",display:"flex",flexDirection:"column",
      justifyContent:"center",alignItems:"center",textAlign:"center",
      padding:"140px clamp(20px,5vw,60px) 110px",position:"relative",overflow:"hidden"}}>

      {/* Ambient glows */}
      <motion.div style={{position:"absolute",top:"6%",left:"8%",width:"560px",height:"560px",
        borderRadius:"50%",background:"radial-gradient(circle,rgba(212,175,55,.14) 0%,transparent 70%)",
        filter:"blur(90px)",y:py,pointerEvents:"none"}}/>
      <motion.div style={{position:"absolute",bottom:"10%",right:"6%",width:"380px",height:"380px",
        borderRadius:"50%",background:"radial-gradient(circle,rgba(212,175,55,.09) 0%,transparent 70%)",
        filter:"blur(60px)",y:py,pointerEvents:"none"}}/>

      {/* Fine diagonal line — civilization geometry */}
      <div style={{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden"}}>
        <svg style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",opacity:.04}} viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <line x1="0" y1="0" x2="1200" y2="800" stroke={C.gold} strokeWidth="0.5"/>
          <line x1="1200" y1="0" x2="0" y2="800" stroke={C.gold} strokeWidth="0.5"/>
          <circle cx="600" cy="400" r="300" fill="none" stroke={C.gold} strokeWidth="0.3"/>
          <circle cx="600" cy="400" r="500" fill="none" stroke={C.gold} strokeWidth="0.15"/>
        </svg>
      </div>

      <motion.div style={{position:"relative",zIndex:1,maxWidth:"940px",opacity:opac}}>
        <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.75}}>
          <span className="lbl">Private Investment Office · Est. 2018</span>
        </motion.div>

        <motion.h1 className="pf" initial={{opacity:0,y:54}} animate={{opacity:1,y:0}}
          transition={{duration:1.25,delay:.18,ease}}
          style={{fontSize:"clamp(32px,6.4vw,80px)",fontWeight:500,lineHeight:1.07,
            marginBottom:"32px",color:C.white,letterSpacing:"-.01em"}}>
          Không chỉ bảo toàn tài sản —
          <br/>kiến tạo{" "}
          <span className="g-txt pf" style={{fontStyle:"italic"}}>di sản</span>
          {" "}cho gia đình
        </motion.h1>

        <motion.div initial={{scaleX:0}} animate={{scaleX:1}} transition={{duration:.95,delay:.55}}
          style={{originX:.5,display:"flex",justifyContent:"center",marginBottom:"32px"}}>
          <div className="dv"/>
        </motion.div>

        <motion.p className="dm" initial={{opacity:0,y:28}} animate={{opacity:1,y:0}}
          transition={{duration:1.05,delay:.68}}
          style={{fontSize:"clamp(15px,1.9vw,20px)",fontWeight:300,lineHeight:1.8,
            letterSpacing:".02em",color:C.grey1,maxWidth:"620px",margin:"0 auto 52px"}}>
          Mình là <span style={{color:C.white,fontWeight:500}}>Lộc</span> — Senior Advisor tại IQI Global.<br/>
          Đồng hành cùng gia đình Việt tìm{" "}
          <span style={{color:C.cream,fontStyle:"italic"}}>tọa độ dự phòng</span> và chân trời tự do ở ngoài biên giới.
        </motion.p>

        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.85,delay:1.05}}
          style={{display:"flex",gap:"14px",justifyContent:"center",flexWrap:"wrap"}}>
          <button className="btn-g" onClick={()=>document.getElementById("contact").scrollIntoView({behavior:"smooth"})}>
            <Calendar size={13}/>Đặt lịch gặp trực tiếp
          </button>
          <button className="btn-gh" onClick={()=>document.getElementById("manifesto").scrollIntoView({behavior:"smooth"})}>
            Triết lý <ChevronRight size={12}/>
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.9}}
        style={{position:"absolute",bottom:"40px",left:"50%",transform:"translateX(-50%)",
          display:"flex",flexDirection:"column",alignItems:"center",gap:"10px"}}>
        <span className="dm" style={{fontSize:"8px",letterSpacing:".52em",color:C.grey2,textTransform:"uppercase"}}>Scroll</span>
        <div style={{width:"1px",height:"52px",background:`linear-gradient(to bottom,${C.goldDim},transparent)`,animation:"shimmer-v 2.8s ease-in-out infinite"}}/>
      </motion.div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// STATS BAR
// ═══════════════════════════════════════════════════════════════════════
const StatsBar=()=>(
  <Reveal v={V.scale}>
    <div style={{maxWidth:"1100px",margin:"0 auto",padding:"0 clamp(20px,4vw,48px)"}}>
      <div className="glass-bright bs g4" style={{borderRadius:"2px"}}>
        {[
          {val:"6+",  lbl:"Năm trong ngành xa xỉ",   sub:"Tam Sơn · S&S Group"},
          {val:"25+", lbl:"Quốc gia IQI Global",      sub:"Mạng lưới thực địa"},
          {val:"2018",lbl:"Thương vụ đầu tiên",       sub:"Golden Visa · Lisbon"},
          {val:"5",   lbl:"Khách mới mỗi quý",        sub:"Giới hạn để giữ chất lượng"},
        ].map((s,i)=>(
          <div key={i} style={{padding:"clamp(22px,3vw,38px) clamp(14px,2vw,26px)",
            borderRight:i<3?`1px solid ${C.grey4}`:"none",textAlign:"center"}}>
            <div className="pf g-txt" style={{fontSize:"clamp(24px,3.5vw,42px)",fontWeight:400,lineHeight:1}}>{s.val}</div>
            <div className="dm" style={{fontSize:"12px",color:C.white,marginTop:"10px",letterSpacing:".06em"}}>{s.lbl}</div>
            <div className="dm" style={{fontSize:"10px",color:C.grey2,marginTop:"5px",letterSpacing:".04em"}}>{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  </Reveal>
);

// ═══════════════════════════════════════════════════════════════════════
// HERITAGE — Về Lộc · Guardian of the Brand
// ═══════════════════════════════════════════════════════════════════════
const Heritage=()=>{
  const ref=useRef(null);
  const {scrollYProgress}=useScroll({target:ref,offset:["start end","end start"]});
  const bgY=useTransform(scrollYProgress,[0,1],["-8%","8%"]);

  const milestones=[
    {
      year:"2018",
      icon:"✦",
      title:"Lisbon — thương vụ đầu tiên chưa có tiền lệ",
      body:"Năm 2018, mình đồng hành cùng gia đình Việt đầu tiên sở hữu bất động sản tại Lisbon để lấy Golden Visa Bồ Đào Nha. Khái niệm lẫn quy trình khi đó chưa có tiền lệ tại thị trường trong nước. Mình bước vào lĩnh vực này bằng một thương vụ thực, tiền thật, rủi ro thật — không phải bằng lý thuyết hay slide PowerPoint."
    },
    {
      year:"2019 – 2024",
      icon:"◈",
      title:"Chopard, Hublot và tiêu chuẩn bảo vệ thương hiệu",
      body:"Sáu năm tại Tam Sơn và S&S Group, mình đại diện Chopard với triết lý Ethical Gold của gia đình Scheufele, và Hublot với độ chính xác cơ khí tuyệt đối. Ngành đồng hồ xa xỉ dạy mình điều không trường nào dạy nổi: người ta mua chiếc đồng hồ, nhưng thứ họ thực sự trao gửi chính là niềm tin vào con người đứng sau nó. Mình mang tư duy Guardian of the Brand đó vào từng tài sản mình chọn lọc."
    },
    {
      year:"2022",
      icon:"◇",
      title:"Đồng hành nghệ nhân — hiểu giá trị vượt vật liệu",
      body:"Đồng hành cùng Cyril Kongo và Hom Nguyen — hai nghệ sĩ hàng đầu trong hệ sinh thái xa xỉ — mình nhận ra: giá trị của một tài sản không nằm ở vật liệu, mà nằm ở câu chuyện và lý do tồn tại của nó. Một căn penthouse tại Athens hay Limassol, nhìn đúng góc, là quyết định về cách sống và lộ trình tiếp nối cho cả gia đình qua nhiều thế hệ."
    },
    {
      year:"Hiện tại",
      icon:"◉",
      title:"IQI Global · Private Investment Office",
      body:"Mình làm việc với số lượng khách có chọn lọc vì mỗi hồ sơ cần thời gian chuẩn bị thực sự. Tối đa 5 gia đình mới mỗi quý — đủ để mình dành thời gian đọc kỹ pháp lý, xuống thực địa, và đánh giá dòng tiền trung thực. Chỉ những gì mình sẵn sàng đặt tiền nhà vào thì mình mới đề xuất."
    },
  ];

  const icons=[
    {label:"Chopard · Ethical Gold",symbol:"⬡"},
    {label:"Hublot · Precision",  symbol:"⊕"},
    {label:"Rolls-Royce · Heritage",symbol:"◈"},
    {label:"Cyril Kongo · Art",   symbol:"◇"},
  ];

  return(
    <section id="heritage" ref={ref} style={{padding:"clamp(80px,10vw,140px) clamp(20px,4vw,48px)",overflow:"hidden",position:"relative"}}>
      <motion.div style={{position:"absolute",top:"18%",right:"-12%",width:"640px",height:"640px",
        borderRadius:"50%",background:"radial-gradient(circle,rgba(212,175,55,.11) 0%,transparent 70%)",
        filter:"blur(90px)",y:bgY,pointerEvents:"none"}}/>
      <div style={{maxWidth:"1100px",margin:"0 auto"}}>
        <Reveal style={{textAlign:"center",marginBottom:"72px"}}>
          <span className="lbl">Về Lộc</span>
          <h2 className="pf" style={{fontSize:"clamp(28px,4vw,52px)",color:C.white,fontWeight:400,marginBottom:"20px",lineHeight:1.12}}>
            Không bắt đầu bằng{" "}
            <span style={{fontStyle:"italic",color:C.gold}}>catalogue dự án</span>
          </h2>
          <div className="dv" style={{margin:"0 auto 24px"}}/>
          <p className="dm" style={{fontSize:"clamp(15px,1.8vw,18px)",lineHeight:1.8,color:C.grey1,maxWidth:"580px",margin:"0 auto"}}>
            Sáu năm trong ngành xa xỉ tại Tam Sơn dạy mình điều quan trọng hơn bất kỳ chứng chỉ nào: người có tài sản thật không mua bằng catalogue. Mình mang tư duy đó vào từng hồ sơ bất động sản.
          </p>
        </Reveal>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1.15fr",gap:"clamp(32px,6vw,88px)",alignItems:"start"}} className="full-md">
          <Reveal v={V.left}>
            <div style={{position:"sticky",top:"140px"}}>
              {/* Portrait placeholder */}
              <div className="bs" style={{width:"100%",paddingBottom:"125%",
                background:`linear-gradient(145deg,${C.blackCard},${C.blackDeep})`,
                position:"relative",overflow:"hidden",marginBottom:"32px"}}>
                <div style={{position:"absolute",inset:"20px",border:`1px solid ${C.grey4}`}}/>
                {[[0,0,"top","left"],[0,"auto","top","right"],["auto",0,"bottom","left"],["auto","auto","bottom","right"]].map(([t,b,tb,lr],i)=>(
                  <div key={i} style={{position:"absolute",[tb]:"14px",[lr]:"14px",width:"18px",height:"18px",
                    [`border${tb.charAt(0).toUpperCase()+tb.slice(1)}`]:`1px solid ${C.goldDim}66`,
                    [`border${lr.charAt(0).toUpperCase()+lr.slice(1)}`]:`1px solid ${C.goldDim}66`}}/>
                ))}
                <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",textAlign:"center"}}>
                  <div style={{width:"72px",height:"72px",borderRadius:"50%",background:C.goldGlow,
                    border:`1px solid rgba(212,175,55,.2)`,display:"flex",alignItems:"center",
                    justifyContent:"center",margin:"0 auto 14px",animation:"float-y 5.5s ease-in-out infinite"}}>
                    <Building size={28} color={C.gold} strokeWidth={1}/>
                  </div>
                  <div className="dm" style={{fontSize:"8.5px",letterSpacing:".38em",color:C.grey2,textTransform:"uppercase"}}>Portrait</div>
                </div>
                <div style={{position:"absolute",bottom:"-1px",left:"-1px",right:"-1px",
                  background:`linear-gradient(to top,rgba(8,8,8,.97),transparent)`,
                  padding:"clamp(20px,3vw,32px) 24px 24px"}}>
                  <div className="dm" style={{fontSize:"8.5px",color:C.gold,letterSpacing:".42em",textTransform:"uppercase",marginBottom:"6px"}}>Senior Advisor · IQI Global</div>
                  <div className="pf" style={{fontSize:"20px",color:C.white,letterSpacing:".04em",fontWeight:400}}>Lộc</div>
                  <div className="dm" style={{fontSize:"13px",color:C.gold,marginTop:"2px",letterSpacing:".04em"}}>Guardian of the Brand · Est. 2018</div>
                  <div className="dm" style={{fontSize:"11px",color:C.grey1,marginTop:"4px",letterSpacing:".06em"}}>Tam Sơn · S&S Group · IQI Global</div>
                </div>
              </div>

              {/* Heritage icons */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginBottom:"20px"}}>
                {icons.map((ic,i)=>(
                  <div key={i} className="glass" style={{padding:"14px 16px",border:`1px solid ${C.grey4}`,display:"flex",alignItems:"center",gap:"10px"}}>
                    <span style={{fontSize:"16px",color:C.goldDim,lineHeight:1}}>{ic.symbol}</span>
                    <span className="dm" style={{fontSize:"10px",color:C.grey1,letterSpacing:".06em",lineHeight:1.4}}>{ic.label}</span>
                  </div>
                ))}
              </div>

              <button className="btn-g" style={{width:"100%",justifyContent:"center"}}
                onClick={()=>document.getElementById("contact").scrollIntoView({behavior:"smooth"})}>
                <Calendar size={13}/>Đặt lịch gặp trực tiếp
              </button>
            </div>
          </Reveal>

          <StaggerWrap delay={.1}>
            <div style={{display:"flex",flexDirection:"column",position:"relative"}}>
              <div style={{position:"absolute",left:"19px",top:"10px",bottom:"10px",width:"1px",
                background:`linear-gradient(to bottom,transparent,${C.goldDim},${C.goldDim},transparent)`}}/>
              {milestones.map((m,i)=>(
                <StaggerItem key={i}>
                  <div style={{display:"flex",gap:"clamp(20px,3vw,36px)",paddingBottom:"clamp(32px,4vw,52px)",alignItems:"flex-start"}}>
                    <div style={{flexShrink:0,width:"40px",display:"flex",flexDirection:"column",alignItems:"center",paddingTop:"4px"}}>
                      <div style={{width:"8px",height:"8px",borderRadius:"50%",
                        background:i===milestones.length-1?C.gold:C.goldDim,
                        border:`2px solid ${C.black}`,outline:`1px solid ${C.goldDim}`,zIndex:1}}/>
                    </div>
                    <div style={{flex:1}}>
                      <div className="dm" style={{fontSize:"11px",color:C.gold,letterSpacing:".44em",textTransform:"uppercase",marginBottom:"10px"}}>{m.year}</div>
                      <h3 className="pf" style={{fontSize:"clamp(18px,2.2vw,24px)",color:C.white,marginBottom:"14px",fontWeight:400,lineHeight:1.25}}>{m.title}</h3>
                      <p className="dm" style={{fontSize:"15px",color:C.grey1,lineHeight:1.8,letterSpacing:".02em"}}>{m.body}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
              <StaggerItem>
                <div style={{background:`linear-gradient(135deg,#1A1408,#0F0C05)`,
                  border:`1px solid rgba(212,175,55,.2)`,padding:"clamp(28px,3vw,44px)",marginLeft:"56px"}}>
                  <div className="pf" style={{fontSize:"52px",color:"rgba(212,175,55,.1)",lineHeight:.7,marginBottom:"8px"}}>"</div>
                  <p className="eg" style={{fontSize:"clamp(16px,1.8vw,19px)",fontStyle:"italic",
                    lineHeight:1.85,letterSpacing:".03em",color:C.cream}}>
                    Mỗi tài sản mình đề xuất đều đã qua thẩm định thực địa, pháp lý và dòng tiền — kể cả những điểm không có lợi cho thương vụ. Không có gì được giấu. Đây là nền tảng duy nhất để làm việc lâu dài và đàng hoàng.
                  </p>
                  <div className="dv" style={{marginTop:"20px",width:"28px"}}/>
                </div>
              </StaggerItem>
            </div>
          </StaggerWrap>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// CIVILIZATION MANIFESTO — Trụ cột mới, trái tim của website
// ═══════════════════════════════════════════════════════════════════════
const CivilizationManifesto=()=>{
  const pillars=[
    {
      symbol:"◈",
      icon:<Compass size={20} color={C.gold} strokeWidth={1.2}/>,
      title:"Nền văn minh — Civilization",
      body:"Mình không bán tài sản. Mình giúp gia đình Việt tiếp cận tiêu chuẩn sống và thẩm mỹ toàn cầu — di sản vật chất kèm theo bức tranh rộng hơn cho con cháu. Đó là cách mình hiểu chữ Civilization.",
    },
    {
      symbol:"◇",
      icon:<Heart size={20} color={C.gold} strokeWidth={1.2}/>,
      title:"Tâm & Tầm — Không bào chữa",
      body:"Tâm là thẳng thắn nói cả rủi ro, dù không có lợi cho thương vụ. Tầm là hiểu đủ sâu để đặt tài sản đúng vào bức tranh tổng thể của từng gia đình. Không excuse, không làm tròn số liệu.",
    },
    {
      symbol:"⬡",
      icon:<ShieldCheck size={20} color={C.gold} strokeWidth={1.2}/>,
      title:"Độc lập — Family Business",
      body:"100% độc lập, không xung đột lợi ích. Mình không cầm hoa hồng từ chủ đầu tư để giới thiệu những thứ không phù hợp. Tối đa 5 gia đình mới mỗi quý — đủ để giữ chất lượng đồng hành thực sự.",
    },
    {
      symbol:"◉",
      icon:<Eye size={20} color={C.gold} strokeWidth={1.2}/>,
      title:"Minh bạch — Bulletproof",
      body:"Mọi dòng tiền, mọi hồ sơ đều ghi lại và minh bạch. Đây không phải đức hạnh — đây là tiêu chuẩn vận hành tối thiểu để kết nối được với đối tác quốc tế và ngân hàng uy tín. Không đi đêm, không chợ đen.",
    },
    {
      symbol:"✦",
      icon:<BookOpen size={20} color={C.gold} strokeWidth={1.2}/>,
      title:"Bảo chứng sự tiếp nối",
      body:"Tài sản tốt không chỉ bảo vệ thế hệ này. Nó là tọa độ dự phòng, là bảo chứng để gia đình không bị kẹt lại trong một địa lý duy nhất khi thế giới thay đổi. Đó là giá trị mình đồng hành xây dựng cùng quý vị.",
    },
    {
      symbol:"◬",
      icon:<Users size={20} color={C.gold} strokeWidth={1.2}/>,
      title:"Cộng đồng — C.E.M.I.I",
      body:"Lấy cảm hứng từ triết lý S.A.M.I của S&S Group: Khách hàng trước, rồi đến nhân viên, quản trị công bằng, đóng góp cộng đồng và giữ vững sự độc lập. Đây là kim chỉ nam cho từng quyết định mình đưa ra.",
    },
  ];

  return(
    <section id="manifesto" className="civ-panel" style={{padding:"clamp(80px,10vw,140px) clamp(20px,4vw,48px)"}}>
      {/* Decorative SVG */}
      <div style={{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden",opacity:.04}}>
        <svg style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:"120%",height:"120%"}} viewBox="0 0 1000 1000">
          <circle cx="500" cy="500" r="350" fill="none" stroke={C.gold} strokeWidth="0.8"/>
          <circle cx="500" cy="500" r="240" fill="none" stroke={C.gold} strokeWidth="0.5"/>
          <circle cx="500" cy="500" r="120" fill="none" stroke={C.gold} strokeWidth="0.4"/>
          {[0,60,120,180,240,300].map(a=>{
            const r=350,rad=a*Math.PI/180;
            return <line key={a} x1={500} y1={500} x2={500+r*Math.cos(rad)} y2={500+r*Math.sin(rad)} stroke={C.gold} strokeWidth="0.4"/>;
          })}
        </svg>
      </div>

      <div style={{maxWidth:"1100px",margin:"0 auto",position:"relative",zIndex:1}}>
        <Reveal style={{textAlign:"center",marginBottom:"72px"}}>
          <span className="lbl">Triết lý Civilization</span>
          <h2 className="pf" style={{fontSize:"clamp(28px,4vw,52px)",color:C.white,fontWeight:400,
            marginBottom:"24px",lineHeight:1.12}}>
            Chúng ta xây dựng{" "}
            <span style={{fontStyle:"italic",color:C.gold}}>phần mềm</span>{" "}
            cho xã hội
          </h2>
          <div className="dv" style={{margin:"0 auto 28px"}}/>
          <p className="dm" style={{fontSize:"clamp(15px,1.8vw,18px)",lineHeight:1.85,color:C.grey1,
            maxWidth:"640px",margin:"0 auto"}}>
            Thế hệ trước xây dựng hạ tầng — cầu đường, nhà máy, khu công nghiệp. Thế hệ này có trách nhiệm xây dựng "phần mềm": thẩm mỹ, tư duy, tiêu chuẩn sống, và lộ trình tiếp nối cho những gia đình đã đủ điều kiện nhìn ra xa hơn.
          </p>
        </Reveal>

        {/* 6 pillars grid */}
        <StaggerWrap delay={.05}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"clamp(12px,2vw,20px)"}} className="full-md">
            {pillars.map((p,i)=>(
              <StaggerItem key={i}>
                <div style={{background:"rgba(255,255,255,.025)",border:`1px solid ${C.grey4}`,
                  padding:"clamp(24px,3vw,36px)",transition:"transform .45s,border-color .35s,background .35s",cursor:"default",
                  position:"relative",overflow:"hidden"}}
                  onMouseEnter={e=>{
                    e.currentTarget.style.transform="translateY(-5px)";
                    e.currentTarget.style.borderColor=C.goldLine;
                    e.currentTarget.style.background="rgba(212,175,55,.045)";
                  }}
                  onMouseLeave={e=>{
                    e.currentTarget.style.transform="";
                    e.currentTarget.style.borderColor=C.grey4;
                    e.currentTarget.style.background="rgba(255,255,255,.025)";
                  }}>
                  {/* Large background symbol */}
                  <div style={{position:"absolute",top:"-10px",right:"12px",
                    fontFamily:"'Cormorant Garamond',serif",fontSize:"80px",
                    color:"rgba(212,175,55,.04)",lineHeight:1,userSelect:"none",
                    animation:"civ-breathe 5s ease-in-out infinite",animationDelay:`${i*.4}s`}}>
                    {p.symbol}
                  </div>
                  <div style={{display:"flex",gap:"14px",alignItems:"flex-start",position:"relative",zIndex:1}}>
                    <div style={{marginTop:"2px",flexShrink:0}}>{p.icon}</div>
                    <div>
                      <h3 className="dm" style={{fontSize:"11px",color:C.gold,letterSpacing:".4em",
                        textTransform:"uppercase",marginBottom:"12px",fontWeight:500}}>{p.title}</h3>
                      <p className="dm" style={{fontSize:"14px",color:C.grey1,lineHeight:1.8}}>{p.body}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerWrap>

        {/* Central quote */}
        <Reveal v={V.scale} style={{marginTop:"56px"}}>
          <div style={{textAlign:"center",padding:"clamp(40px,5vw,64px)",
            border:`1px solid rgba(212,175,55,.14)`,
            background:"rgba(212,175,55,.03)",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:"-80px",left:"50%",transform:"translateX(-50%)",
              width:"400px",height:"400px",borderRadius:"50%",
              background:"radial-gradient(circle,rgba(212,175,55,.07) 0%,transparent 70%)",
              filter:"blur(50px)",pointerEvents:"none"}}/>
            <div className="pf" style={{fontSize:"clamp(60px,8vw,110px)",color:"rgba(212,175,55,.07)",
              lineHeight:.75,marginBottom:"12px",position:"relative",zIndex:1}}>❝</div>
            <p className="eg" style={{fontSize:"clamp(17px,2.2vw,23px)",fontStyle:"italic",
              lineHeight:1.85,color:C.cream,maxWidth:"700px",margin:"0 auto",
              letterSpacing:".03em",position:"relative",zIndex:1}}>
              Người ta mua chiếc đồng hồ, nhưng thứ họ thực sự trao gửi chính là niềm tin vào con người đứng sau nó. Với tài sản quốc tế, điều đó còn đúng hơn gấp nhiều lần.
            </p>
            <div className="dv" style={{margin:"28px auto 16px"}}/>
            <div className="dm" style={{fontSize:"11px",color:C.goldDim,letterSpacing:".18em"}}>
              — Lộc · IQI Private Office
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// WORLD MAP
// ═══════════════════════════════════════════════════════════════════════
const WorldMap=()=>{
  const cities=[
    {lx:31, ly:43, label:"Athens",      sub:"Hy Lạp · OIKOS",         labelDir:"up",   hub:false},
    {lx:35, ly:40, label:"Nicosia",     sub:"Síp · Limassol Blu",      labelDir:"up",   hub:false},
    {lx:43, ly:41, label:"Istanbul",    sub:"Thổ Nhĩ Kỳ · Topkin",    labelDir:"up",   hub:false},
    {lx:39, ly:44, label:"Dubai",       sub:"UAE · DAMAC",             labelDir:"down", hub:false},
    {lx:15, ly:35, label:"St. George's",sub:"Grenada · Heng Sheng",   labelDir:"up",   hub:false},
    {lx:80, ly:66, label:"Melbourne",   sub:"Úc · Aura",               labelDir:"up",   hub:false},
    {lx:72, ly:55, label:"Saigon",      sub:"IQI Hub · Việt Nam",      labelDir:"up",   hub:true },
  ];
  return(
    <div style={{position:"relative",width:"100%",paddingBottom:"46%",background:C.blackDeep,overflow:"hidden"}}>
      <svg viewBox="0 0 100 46" style={{position:"absolute",inset:0,width:"100%",height:"100%"}}
        xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        {[10,20,30,40,50,60,70,80,90].map(x=>(
          <line key={x} x1={x} y1="0" x2={x} y2="46" stroke={C.grey5} strokeWidth=".12" opacity=".5"/>
        ))}
        {[11.5,23,34.5].map(y=>(
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke={C.grey5} strokeWidth=".12" opacity=".5"/>
        ))}
        <path d="M5 12 Q9 8 14 10 Q17 12 18 17 Q17 23 14 25 Q9 27 6 23 Z" fill="none" stroke={C.grey3} strokeWidth=".28" opacity=".85"/>
        <path d="M13 28 Q17 25 20 28 Q22 32 20 39 Q17 43 13 40 Q10 36 12 30 Z" fill="none" stroke={C.grey3} strokeWidth=".28" opacity=".85"/>
        <path d="M23 12 Q28 8 34 10 Q37 12 37 17 Q35 20 30 20 Q25 19 23 15 Z" fill="none" stroke={C.grey3} strokeWidth=".28" opacity=".85"/>
        <path d="M26 22 Q31 19 36 22 Q39 27 38 35 Q35 40 30 40 Q25 38 23 32 Q22 27 26 22 Z" fill="none" stroke={C.grey3} strokeWidth=".28" opacity=".85"/>
        <path d="M38 8 Q48 5 60 8 Q68 11 70 18 Q68 23 60 24 Q50 24 42 20 Q36 16 38 10 Z" fill="none" stroke={C.grey3} strokeWidth=".28" opacity=".85"/>
        <path d="M62 22 Q68 20 72 24 Q74 28 72 33 Q68 35 64 32 Q60 28 62 24 Z" fill="none" stroke={C.grey3} strokeWidth=".28" opacity=".85"/>
        <path d="M75 30 Q82 27 88 31 Q91 36 88 42 Q83 45 77 42 Q73 38 75 32 Z" fill="none" stroke={C.grey3} strokeWidth=".28" opacity=".85"/>
        {cities.filter(c=>!c.hub).map((c,i)=>(
          <line key={i} x1={72} y1={55*.46} x2={c.lx} y2={c.ly*.46}
            stroke={C.goldDim} strokeWidth=".22" opacity=".22" strokeDasharray=".8 1.2"/>
        ))}
        {cities.map((c,i)=>(
          <g key={i}>
            <circle cx={c.lx} cy={c.ly*.46} r="1.6" fill="none"
              stroke={c.hub?C.gold:C.goldDim} strokeWidth=".4" opacity=".3"
              style={{animation:`map-pulse ${2.8+i*.3}s ease-in-out infinite`,animationDelay:`${i*.22}s`}}/>
            <circle cx={c.lx} cy={c.ly*.46} r={c.hub?"1.1":".65"}
              fill={c.hub?C.gold:C.goldDim} opacity=".95"/>
          </g>
        ))}
      </svg>
      {cities.map((c,i)=>{
        const isUp=c.labelDir==="up";
        return(
          <div key={i} style={{position:"absolute",left:`${c.lx}%`,top:`${c.ly}%`,transform:"translateX(-50%)",pointerEvents:"none",display:"flex",flexDirection:"column",alignItems:"center",gap:"1px",zIndex:2}}>
            {isUp&&(
              <div style={{textAlign:"center",marginBottom:"3px"}}>
                <div className="dm" style={{fontSize:"clamp(7px,.9vw,10px)",color:c.hub?C.gold:C.goldPale,fontWeight:c.hub?500:400,letterSpacing:".06em",lineHeight:1.2,whiteSpace:"nowrap",textShadow:`0 1px 4px ${C.blackDeep}`}}>{c.label}</div>
                <div className="dm" style={{fontSize:"clamp(6px,.7vw,8px)",color:C.grey2,letterSpacing:".04em",lineHeight:1.2,whiteSpace:"nowrap",textShadow:`0 1px 3px ${C.blackDeep}`}}>{c.sub}</div>
              </div>
            )}
            <div style={{width:c.hub?"10px":"7px",height:c.hub?"10px":"7px",flexShrink:0}}/>
            {!isUp&&(
              <div style={{textAlign:"center",marginTop:"3px"}}>
                <div className="dm" style={{fontSize:"clamp(7px,.9vw,10px)",color:c.hub?C.gold:C.goldPale,fontWeight:c.hub?500:400,letterSpacing:".06em",lineHeight:1.2,whiteSpace:"nowrap",textShadow:`0 1px 4px ${C.blackDeep}`}}>{c.label}</div>
                <div className="dm" style={{fontSize:"clamp(6px,.7vw,8px)",color:C.grey2,letterSpacing:".04em",lineHeight:1.2,whiteSpace:"nowrap",textShadow:`0 1px 3px ${C.blackDeep}`}}>{c.sub}</div>
              </div>
            )}
          </div>
        );
      })}
      <div style={{position:"absolute",top:0,left:0,right:0,height:"18%",background:`linear-gradient(to bottom,${C.blackSoft},transparent)`,pointerEvents:"none",zIndex:1}}/>
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:"18%",background:`linear-gradient(to top,${C.blackSoft},transparent)`,pointerEvents:"none",zIndex:1}}/>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// GLOBAL PORTFOLIO — CBI & Tọa độ dự phòng 2026
// ═══════════════════════════════════════════════════════════════════════
const GlobalPortfolio=()=>{
  const programs=[
    {
      country:"Úc — Aura Melbourne Square",flag:"🇦🇺",visa:"Permanent Residency · Subclass 888",
      invest:"Từ AUD 800K",
      benefit:"Cọc 10%, phần còn lại thanh toán khi nhận nhà. Tiền cọc nằm trong Trust Account kiểm soát bởi chính phủ Úc — không chủ đầu tư nào có thể chạm vào. Phù hợp với gia đình có con đang du học Melbourne hoặc định hướng định cư dài hạn.",
      tag:"Bảo vệ vốn cọc · Trust Account",
      note:"✓ Cọc 10% trong Trust Account chính phủ",
      status:"active"
    },
    {
      country:"Dubai — DAMAC",flag:"🇦🇪",visa:"10-Year Golden Visa",
      invest:"AED 2,000,000",
      benefit:"0% thuế thu nhập cá nhân và 0% thuế lãi vốn. Thị trường duy nhất hợp pháp nhận thanh toán bằng USDT và Bitcoin qua sàn được VARA cấp phép. Chuyển tài sản số sang bất động sản có freehold title mà không cần qua ngân hàng truyền thống.",
      tag:"USDT → BĐS · Thuế 0%",
      note:"✓ Nhận USDT qua VARA-licensed exchange · Hợp pháp 100%",
      status:"active"
    },
    {
      country:"Hy Lạp — OIKOS",flag:"🇬🇷",visa:"Golden Visa EU · €250K",
      invest:"€250,000",
      benefit:"Cửa vào Châu Âu tại mức đầu tư thấp nhất còn lại trong EU. Không yêu cầu cư trú liên tục. Cả gia đình 3 thế hệ được hưởng quyền đi lại Schengen tự do. Cửa sổ pháp lý có thể đóng sớm — Bồ Đào Nha là bài học.",
      tag:"EU Schengen · 3 thế hệ",
      note:"⚠ Ngưỡng €250K có thể tăng — xem lịch sử Bồ Đào Nha 2023",
      status:"active"
    },
    {
      country:"Thổ Nhĩ Kỳ — Topkin",flag:"🇹🇷",visa:"Citizenship by Investment",
      invest:"$400,000",
      benefit:"Quốc tịch sau 6–9 tháng — nhanh nhất trong nhóm CBI toàn cầu. Hộ chiếu Thổ miễn visa 110+ quốc gia và là bước đệm hợp pháp để xin Visa E2 định cư Mỹ. Lộ trình xử lý hồ sơ rõ ràng và minh bạch nhất mình biết.",
      tag:"CBI nhanh nhất · Bước đệm E2 Mỹ",
      note:"✓ Lộ trình xử lý hồ sơ rõ ràng nhất trong CBI",
      status:"active"
    },
    {
      country:"Síp — Limassol Blu Marine (Leptos)",flag:"🇨🇾",visa:"EU Permanent Residency",
      invest:"€300,000",
      benefit:"Thường trú nhân EU vĩnh viễn — một lần đầu tư, không cần gia hạn bao giờ. Không yêu cầu cư trú liên tục. Thuế doanh nghiệp 12.5%, thấp nhất trong EU. Tài sản mặt biển pháp lý hoàn chỉnh, truyền đời cho thế hệ sau.",
      tag:"PR vĩnh viễn EU · Không gia hạn",
      note:"✓ Thẻ xanh EU vĩnh viễn · Thuế 12.5%",
      status:"active"
    },
    {
      country:"Grenada — Heng Sheng",flag:"🇬🇩",visa:"Citizenship by Investment",
      invest:"$220,000+",
      benefit:"Hộ chiếu thứ 2 duy nhất có hiệp ước E2 với Mỹ — lộ trình đến Mỹ hợp pháp chi phí thấp nhất hiện có. Miễn visa Anh, Schengen và Trung Quốc. Chủ đầu tư được chính phủ Grenada bảo chứng trong chương trình CBI.",
      tag:"Hiệp ước E2 Mỹ · Miễn visa Anh",
      note:"✓ Duy nhất có hiệp ước E2 trong nhóm CBI",
      status:"active"
    },
  ];

  return(
    <section id="portfolio" style={{padding:"clamp(80px,10vw,140px) clamp(20px,4vw,48px)",background:C.blackSoft}}>
      <div style={{maxWidth:"1100px",margin:"0 auto"}}>
        <Reveal style={{textAlign:"center",marginBottom:"64px"}}>
          <span className="lbl">Tọa độ dự phòng 2026</span>
          <h2 className="pf" style={{fontSize:"clamp(28px,4vw,52px)",color:C.white,fontWeight:400,marginBottom:"20px"}}>
            Mở rộng{" "}
            <span style={{fontStyle:"italic",color:C.gold}}>chân trời tự do</span>
          </h2>
          <p className="dm" style={{fontSize:"clamp(15px,1.8vw,18px)",color:C.grey1,lineHeight:1.8,maxWidth:"620px",margin:"0 auto"}}>
            Mình không bán visa. Mình giúp quý vị hiểu đúng từng chương trình — bao gồm cả những điều kiện thay đổi và rủi ro mà tài liệu chính thức thường không nhấn mạnh.
          </p>
        </Reveal>

        <Reveal v={V.scale} style={{marginBottom:"64px"}}>
          <div className="bs glass-bright" style={{overflow:"hidden"}}>
            <div style={{height:"1px",background:`linear-gradient(90deg,transparent,${C.gold},transparent)`}}/>
            <WorldMap/>
            <div style={{padding:"20px 32px",borderTop:`1px solid ${C.grey4}`,display:"flex",justifyContent:"center",gap:"clamp(16px,4vw,48px)",flexWrap:"wrap"}}>
              {["6 Thị trường quốc tế","6 Chương trình CBI/RBI","Quốc tịch EU","PR vĩnh viễn","Hộ chiếu thứ 2"].map((t,i)=>(
                <span key={i} className="dm" style={{fontSize:"10px",color:C.grey1,letterSpacing:".2em",textTransform:"uppercase",display:"flex",alignItems:"center",gap:"7px"}}>
                  <span style={{width:"4px",height:"4px",borderRadius:"50%",background:C.gold,display:"inline-block"}}/>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <StaggerWrap delay={.05}>
          <div className="g3">
            {programs.map((p,i)=>(
              <StaggerItem key={i}>
                <div className="bs glass" style={{padding:"clamp(22px,3vw,36px)",height:"100%",
                  transition:"transform .45s,box-shadow .45s",cursor:"default"}}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.boxShadow=`0 28px 64px rgba(0,0,0,.6)`;}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"18px"}}>
                    <span style={{fontSize:"28px"}}>{p.flag}</span>
                    <span className="dm" style={{fontSize:"8px",color:C.gold,letterSpacing:".28em",textTransform:"uppercase",background:C.goldGlow,border:`1px solid rgba(212,175,55,.15)`,padding:"4px 10px"}}>{p.tag}</span>
                  </div>
                  <div className="dm" style={{fontSize:"10px",color:C.gold,letterSpacing:".4em",textTransform:"uppercase",marginBottom:"8px"}}>{p.visa}</div>
                  <h3 className="pf" style={{fontSize:"clamp(16px,1.8vw,20px)",color:C.white,marginBottom:"14px",fontWeight:400,lineHeight:1.25}}>{p.country}</h3>
                  <div style={{marginBottom:"16px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"10px"}}>
                      <span className="dm" style={{fontSize:"11px",color:C.grey2,letterSpacing:".1em"}}>Mức đầu tư</span>
                      <span className="pf" style={{fontSize:"15px",color:C.gold,fontWeight:400}}>{p.invest}</span>
                    </div>
                    <div style={{height:"1px",background:C.grey4,marginBottom:"12px"}}/>
                    <p className="dm" style={{fontSize:"13px",color:C.grey1,lineHeight:1.8,letterSpacing:".02em"}}>{p.benefit}</p>
                  </div>
                  {p.note&&(
                    <div style={{background:C.goldGlow2,border:`1px solid rgba(212,175,55,.12)`,padding:"8px 12px",marginBottom:"16px"}}>
                      <span className="dm" style={{fontSize:"10px",color:C.goldDim,letterSpacing:".06em"}}>{p.note}</span>
                    </div>
                  )}
                  <button className="btn-gh" style={{width:"100%",justifyContent:"center",padding:"12px",fontSize:"9.5px"}}
                    onClick={()=>document.getElementById("contact").scrollIntoView({behavior:"smooth"})}>
                    Tư vấn chuyên sâu <ArrowRight size={11}/>
                  </button>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerWrap>

        <Reveal v={V.scale} style={{marginTop:"40px"}}>
          <div style={{background:`linear-gradient(135deg,#1A1408,#0F0C05,#1A1408)`,
            border:`1px solid rgba(212,175,55,.22)`,padding:"clamp(32px,4vw,56px)",textAlign:"center",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:"-60px",right:"-60px",width:"300px",height:"300px",borderRadius:"50%",background:"radial-gradient(circle,rgba(212,175,55,.08) 0%,transparent 70%)",filter:"blur(40px)",pointerEvents:"none"}}/>
            <div className="dm" style={{fontSize:"11px",color:C.gold,letterSpacing:".48em",textTransform:"uppercase",marginBottom:"16px"}}>Cập nhật tháng 3/2026</div>
            <h3 className="pf" style={{fontSize:"clamp(20px,2.8vw,34px)",color:C.white,marginBottom:"16px",fontStyle:"italic"}}>
              Mình đã đi con đường này trước quý vị —{" "}
              <span style={{color:C.gold}}>từ Lisbon 2018</span>
            </h3>
            <p className="dm" style={{fontSize:"15px",color:C.grey1,lineHeight:1.8,maxWidth:"580px",margin:"0 auto 32px",letterSpacing:".02em"}}>
              Luật thay đổi mỗi năm. Mình biết chính xác hồ sơ cần gì, ngân hàng nào xử lý tốt nhất, và chương trình nào đang thay đổi điều kiện trong 2026. Đây là thứ không tìm được qua bất kỳ công cụ tìm kiếm nào.
            </p>
            <button className="btn-g" onClick={()=>document.getElementById("contact").scrollIntoView({behavior:"smooth"})}>
              <Globe size={13}/>Đặt lịch tư vấn CBI
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// PROJECTS DATA — 7 dự án (ảnh picsum tạm, thay URL khi deploy)
// ═══════════════════════════════════════════════════════════════════════
const PROJECTS=[
  {
    id:1,
    imageUrl:"https://picsum.photos/id/1015/800/500",
    category:"International",subCategory:"Residential · Úc",
    name:"Aura Melbourne Square",subtitle:"Melbourne, Victoria, Úc",
    location:"Southbank, Melbourne, Úc",type:"Residential · Melbourne CBD",
    price:"Từ AUD 550K",area:"50–120 m²",developer:"Shayher Group",
    tags:["Cọc 10%","Trust Account","Melbourne CBD","Du học"],
    metrics:{yield:"4.5%",growth:"+28%",occupancy:"94%",score:94},
    artSymbol:"🦘",
    story:"Cọc 10% và toàn bộ tiền nằm trong Trust Account do chính phủ Úc kiểm soát. Phần còn lại chỉ thanh toán khi nhận nhà. Đây là cấu trúc bảo vệ nhà đầu tư tốt nhất mình từng thấy. Phù hợp đặc biệt với gia đình có con đang du học hoặc sắp du học Melbourne.",
    exclusivity:[
      "Cọc 10%, thanh toán phần còn lại khi nhận nhà. Bảo vệ dòng tiền tối đa",
      "Trust Account chính phủ Úc: chủ đầu tư không thể động vào tiền cọc",
      "Vị trí Southbank: 5 phút đi bộ CBD, gần các trường đại học lớn",
      "Thanh khoản cho thuê cao từ sinh viên và chuyên gia quốc tế",
      "Pháp lý Úc minh bạch, lịch sử bàn giao đúng tiến độ",
    ],
    specs:{
      "Quy mô":"Tháp 68 tầng · 660 căn hộ",
      "Diện tích":"50–120m² · 1–3PN",
      "Pháp lý":"Title xanh · Off-plan có bảo lãnh",
      "Tiến độ":"Dự kiến bàn giao Q3/2027",
      "Vị trí":"Southbank · 700m đến Flinders St Station",
    },
    investmentThesis:"Aura Melbourne là lựa chọn phù hợp nhất cho nhà đầu tư muốn vào thị trường Úc lần đầu: cấu trúc Trust Account loại bỏ rủi ro mất cọc, vị trí Southbank cho thanh khoản cho thuê ổn định, và mức cọc 10% phù hợp với người chưa muốn chốt toàn bộ vốn ngay. Rủi ro chính: tỷ giá AUD/VND và chính sách thuế đất cho người nước ngoài. Cần tính kỹ trước khi xuống tiền.",
  },
  {
    id:2,
    imageUrl:"https://picsum.photos/id/1020/800/500",
    category:"International",subCategory:"Luxury Residential · Dubai",
    name:"DAMAC",subtitle:"Dubai, UAE",
    location:"Business Bay & Creek Harbour, Dubai",type:"Luxury Residential · Dubai",
    price:"Từ AED 1,000,000",area:"55–300 m²",developer:"DAMAC Properties",
    tags:["Thuế 0%","Nhận BĐS bằng USDT","Golden Visa 10 năm","Thanh khoản cao"],
    metrics:{yield:"6.5%",growth:"+41%",occupancy:"88%",score:91},
    artSymbol:"🌆",
    story:"Dubai là thị trường bất động sản hợp pháp duy nhất cho phép thanh toán bằng USDT và Bitcoin. Đây là kênh chuyển tài sản số sang tài sản vật lý mà không cần đi qua hệ thống ngân hàng truyền thống. Nếu quý vị đang giữ USDT và muốn bảo toàn giá trị vào một tài sản có sổ đỏ, đây là lộ trình ngắn nhất.",
    exclusivity:[
      "Nhận thanh toán USDT và Bitcoin qua kênh được VARA cấp phép. Hợp pháp 100%",
      "Chuyển tài sản số sang bất động sản có freehold title không cần khai báo nguồn gốc qua ngân hàng",
      "0% thuế thu nhập cá nhân, 0% thuế lãi vốn. Giữ nguyên khi bán lại",
      "DAMAC: top 3 developer Dubai, 20 năm bàn giao đúng tiến độ",
      "Golden Visa 10 năm tự gia hạn cho người mua AED 2M+",
    ],
    specs:{
      "Quy mô":"Nhiều dự án · Business Bay & Creek Harbour",
      "Diện tích":"55–300m² · Studio đến penthouse",
      "Pháp lý":"Freehold title · 100% foreign ownership",
      "Thanh toán":"AED · USD · USDT · BTC (qua VARA-licensed exchange)",
      "Vị trí":"Business Bay · 5 phút Burj Khalifa",
    },
    investmentThesis:"Dubai phù hợp nhất cho hai nhóm: (1) người muốn đa dạng hóa tài sản ra ngoài Việt Nam với môi trường thuế 0%, và (2) người đang giữ tài sản số muốn chuyển sang bất động sản pháp lý rõ ràng. DAMAC là tên tuổi đúng tiến độ nhất trong 20 năm. Rủi ro chính: thị trường đã tăng mạnh 2022–2025, entry point hiện không còn rẻ. Cần tính kỹ entry và exit strategy.",
  },
  {
    id:3,
    imageUrl:"https://picsum.photos/id/1025/800/500",
    category:"International",subCategory:"Golden Visa · Hy Lạp",
    name:"OIKOS Athens",subtitle:"Athens, Hy Lạp",
    location:"Trung tâm Athens, Hy Lạp",type:"Golden Visa EU · €250K",
    price:"Từ €250,000",area:"60–180 m²",developer:"OIKOS Development",
    tags:["Golden Visa EU","€250K","3 thế hệ","Schengen"],
    metrics:{yield:"3.8%",growth:"+22%",occupancy:"82%",score:89},
    artSymbol:"🏛",
    story:"Đây là cửa vào Châu Âu với chi phí thấp nhất còn lại trong EU. Không yêu cầu cư trú, không cần tiếng Hy Lạp, và cả gia đình 3 thế hệ được hưởng quyền đi lại tự do trong khối Schengen. Bồ Đào Nha đã đóng kênh bất động sản từ 2023. Hy Lạp là lựa chọn thực tế còn lại.",
    exclusivity:[
      "Mức €250K: thấp nhất trong EU còn cho phép qua kênh bất động sản",
      "Cả gia đình 3 thế hệ: bố mẹ, vợ/chồng, con dưới 21 tuổi được hưởng",
      "Không yêu cầu cư trú liên tục tại Hy Lạp",
      "Quyền đi lại Schengen 26 quốc gia không cần visa",
      "Diện chuyển đổi công năng giữ ngưỡng €250K tại Athens nội đô",
    ],
    specs:{
      "Quy mô":"Nhiều dự án chuyển đổi công năng",
      "Diện tích":"60–180m² · 2–4PN",
      "Pháp lý":"Title Hy Lạp hoàn chỉnh · Notary verified",
      "Tiến độ":"Bàn giao trong 12–18 tháng",
      "Vị trí":"Athens nội đô · Kolonaki & Glyfada",
    },
    investmentThesis:"Greece Golden Visa là lựa chọn chiến lược cho gia đình muốn tối ưu chi phí CBI: €250K thay vì €500K+ ở các chương trình EU khác. Quan trọng hơn: ngưỡng này có thể tăng sớm, giống Bồ Đào Nha 2022. Ai đang cân nhắc nên quyết định trong 2026.",
  },
  {
    id:4,
    imageUrl:"https://picsum.photos/id/1030/800/500",
    category:"International",subCategory:"CBI · Thổ Nhĩ Kỳ",
    name:"Topkin Istanbul",subtitle:"Istanbul, Thổ Nhĩ Kỳ",
    location:"Kadıköy & Beşiktaş, Istanbul",type:"Citizenship by Investment · Thổ Nhĩ Kỳ",
    price:"Từ $400,000",area:"80–250 m²",developer:"Topkin Group",
    tags:["Quốc tịch nhanh","110+ quốc gia","E2 Visa Mỹ","Thanh khoản tốt"],
    metrics:{yield:"5.2%",growth:"+35%",occupancy:"86%",score:88},
    artSymbol:"🕌",
    story:"Quốc tịch Thổ Nhĩ Kỳ sau 6–9 tháng là lộ trình nhanh nhất trong nhóm CBI toàn cầu. Hộ chiếu Thổ miễn visa 110+ quốc gia. Và đây là bước đệm hợp pháp để xin Visa E2 định cư Mỹ mà không cần xếp hàng nhiều năm như EB5.",
    exclusivity:[
      "Quốc tịch sau 6–9 tháng: nhanh nhất trong các CBI hiện hành",
      "Bước đệm E2 Mỹ: hộ chiếu Thổ đủ điều kiện xin Visa E2 kinh doanh",
      "Không yêu cầu cư trú tại Thổ. Giao dịch hoàn toàn từ Việt Nam",
      "Thị trường Istanbul: thanh khoản thứ cấp ổn định",
      "Topkin Group: track record bàn giao đúng tiến độ",
    ],
    specs:{
      "Quy mô":"Nhiều dự án tại Istanbul châu Âu & châu Á",
      "Diện tích":"80–250m² · 2–4PN",
      "Pháp lý":"Tapu (sổ đỏ Thổ) · Hoàn chỉnh trước bán",
      "Tiến độ":"Dự án sẵn sàng · Bàn giao ngay",
      "Vị trí":"Kadıköy · Beşiktaş · Bosphorus view",
    },
    investmentThesis:"Thổ Nhĩ Kỳ là lựa chọn thực dụng nhất trong danh mục CBI: nhanh, rõ ràng về lộ trình, và có giá trị chiến lược cho gia đình nhắm đến Mỹ qua đường E2. Rủi ro chính: lạm phát và tỷ giá Lira. Nên tính bằng USD, không phải Lira.",
  },
  {
    id:5,
    imageUrl:"https://picsum.photos/id/1035/800/500",
    category:"International",subCategory:"EU PR · Síp",
    name:"Limassol Blu Marine (Leptos)",subtitle:"Limassol, Cộng hòa Síp",
    location:"Marina Limassol, Síp",type:"EU Permanent Residency · Síp",
    price:"Từ €300,000",area:"65–220 m²",developer:"Leptos Estates",
    tags:["PR EU vĩnh viễn","Không gia hạn","Mặt biển","Truyền đời"],
    metrics:{yield:"4.2%",growth:"+26%",occupancy:"85%",score:92},
    artSymbol:"⚓",
    story:"Thẻ thường trú nhân EU vĩnh viễn. Không hết hạn, không cần gia hạn bao giờ. Thuế doanh nghiệp tại Síp 12.5%, thấp nhất EU. Tài sản mặt biển Limassol pháp lý hoàn chỉnh, truyền lại cho thế hệ sau mà không mất quyền cư trú.",
    exclusivity:[
      "PR EU vĩnh viễn: một lần đầu tư, cư trú mãi mãi. Không cần gia hạn",
      "Leptos Estates: developer lớn nhất Síp, 60 năm uy tín",
      "Limassol Marina: tài sản mặt biển hiếm, không tái tạo được",
      "Thuế doanh nghiệp 12.5%: thấp nhất trong EU",
      "Truyền đời: con cháu hưởng quyền PR từ tài sản",
    ],
    specs:{
      "Quy mô":"Limassol Blu Marine · 118 căn",
      "Diện tích":"65–220m² · 1–4PN + penthouse",
      "Pháp lý":"Title deed EU hoàn chỉnh · VAT được giảm",
      "Tiến độ":"Sẵn sàng bàn giao · Một số căn ready",
      "Vị trí":"Limassol Marina · Mặt tiền biển Địa Trung Hải",
    },
    investmentThesis:"Síp là lựa chọn tốt nhất cho gia đình muốn cư trú EU dài hạn mà không bị ràng buộc bởi yêu cầu hiện diện: PR vĩnh viễn nghĩa là quyền không mất dù không sống ở đó. Leptos là tên tuổi ít rủi ro nhất mình biết trên thị trường Síp. Rủi ro chính: thanh khoản thứ cấp hạn chế. Đây là tài sản giữ, không phải đầu cơ ngắn hạn.",
  },
  {
    id:6,
    imageUrl:"https://picsum.photos/id/1040/800/500",
    category:"International",subCategory:"CBI · Grenada",
    name:"Heng Sheng — Grenada",subtitle:"St. George's, Grenada",
    location:"Grand Anse, Grenada, Caribbean",type:"Citizenship by Investment · Grenada",
    price:"Từ $220,000",area:"45–180 m²",developer:"Heng Sheng Development",
    tags:["E2 Visa Mỹ","Miễn visa Anh","Schengen","Bảo chứng chính phủ"],
    metrics:{yield:"5.8%",growth:"+19%",occupancy:"80%",score:86},
    artSymbol:"🌴",
    story:"Grenada là quốc tịch thứ 2 duy nhất có hiệp ước E2 với Mỹ. Hộ chiếu Grenada cho phép xin Visa E2 kinh doanh để ở lại Mỹ hợp pháp. Đây là lộ trình đến Mỹ chi phí thấp nhất và rõ ràng nhất hiện có. Chủ đầu tư Heng Sheng được chính phủ Grenada bảo chứng trong chương trình CBI.",
    exclusivity:[
      "Duy nhất trong CBI có hiệp ước E2 Mỹ: thẳng từ Grenada sang Mỹ",
      "Miễn visa Anh, 26 nước Schengen, và Trung Quốc",
      "Heng Sheng được chính phủ Grenada phê duyệt trong chương trình CBI",
      "Chi phí thấp hơn nhiều so với EB5 ($800K+) để đến Mỹ",
      "Không yêu cầu cư trú. Nhận hộ chiếu mà không cần sống ở Grenada",
    ],
    specs:{
      "Quy mô":"Heng Sheng Resort · Grand Anse Beach",
      "Diện tích":"45–180m² · Studio đến villa",
      "Pháp lý":"Được chính phủ Grenada phê duyệt CBI",
      "Tiến độ":"Đang xây dựng · Bàn giao 2026",
      "Vị trí":"Grand Anse Beach · 10 phút sân bay quốc tế",
    },
    investmentThesis:"Grenada phù hợp nhất cho gia đình hoạch định dài hạn với đích đến là Mỹ: chi phí $220K thay vì EB5 $800K+. Rủi ro chính: Grenada không phải thị trường bất động sản lớn. Đây là công cụ hộ chiếu, không phải tài sản tích lũy. Nếu mục tiêu là tăng trưởng vốn, hãy chọn thị trường khác.",
  },
  {
    id:7,
    imageUrl:"https://picsum.photos/id/1045/800/500",
    category:"Domestic",subCategory:"Off-Market · Việt Nam",
    name:"The Off-Market List",subtitle:"Thủ Thiêm & Quận 1, TP.HCM",
    location:"Thủ Thiêm · Quận 1, TP. Hồ Chí Minh",type:"Off-Market Private · Việt Nam",
    price:"Theo thương vụ",area:"Theo tài sản",developer:"FDI: Gamuda · CapitaLand",
    tags:["Off-Market","Pháp lý hoàn chỉnh","Thủ Thiêm","FDI"],
    metrics:{yield:"6.8%",growth:"+38%",occupancy:"92%",score:97},
    artSymbol:"🔒",
    story:"Danh mục này chỉ dành cho khách đã có buổi gặp trực tiếp. Đây là rổ hàng private gồm tài sản tại Thủ Thiêm và Quận 1 đã hoàn thiện pháp lý, từ chủ đầu tư FDI uy tín như Gamuda và CapitaLand. Không xuất hiện trên sàn công khai. Không qua môi giới trung gian.",
    exclusivity:[
      "Chỉ dành cho khách đã gặp trực tiếp. Không bán qua kênh công khai",
      "Tài sản Thủ Thiêm đã hoàn thiện pháp lý, sổ đỏ lâu dài",
      "Từ chủ đầu tư FDI: Gamuda Land và CapitaLand Vietnam",
      "Giá tốt hơn thị trường vì không qua tầng môi giới trung gian",
      "Mình xác minh pháp lý từng tài sản trước khi đưa vào danh mục",
    ],
    specs:{
      "Thị trường":"Thủ Thiêm · Quận 1 · TP.HCM",
      "Loại hình":"Căn hộ hoàn thiện · Penthouse · Shophouse",
      "Pháp lý":"Sổ đỏ lâu dài · Xác minh trực tiếp",
      "Tiến độ":"Sẵn sàng bàn giao · Một số đã có tenant",
      "Developer":"Gamuda Land · CapitaLand Vietnam · Chủ tư nhân",
    },
    investmentThesis:"The Off-Market List không phải sản phẩm có thể mô tả hết trên web. Đây là danh mục mình cập nhật mỗi tháng và chỉ chia sẻ trong buổi gặp 1-1. Lý do không công khai: giá tốt hơn thị trường đi kèm điều kiện khách phải ra quyết định nhanh. Điều này chỉ xảy ra khi hai bên đã nói chuyện trực tiếp.",
  },
];

// ═══════════════════════════════════════════════════════════════════════
// PROJECT DETAIL MODAL
// ═══════════════════════════════════════════════════════════════════════
const ProjectModal=({project,onClose})=>{
  const [tab,setTab]=useState("overview");
  const tabs=[
    {key:"overview",label:"Tổng quan"},
    {key:"assets",  label:"Thông số"},
    {key:"verdict", label:"Nhận định"},
  ];
  return(
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      transition={{duration:.35}}
      style={{position:"fixed",inset:0,zIndex:2000,background:"rgba(0,0,0,.9)",
        backdropFilter:"blur(18px)",display:"flex",alignItems:"center",
        justifyContent:"center",padding:"20px"}}
      onClick={onClose}>
      <motion.div initial={{opacity:0,scale:.88,y:40}} animate={{opacity:1,scale:1,y:0}}
        exit={{opacity:0,scale:.9,y:32}} transition={{duration:.6,ease:[.22,.9,.28,1]}}
        onClick={e=>e.stopPropagation()} className="glass-bright"
        style={{maxWidth:"860px",width:"100%",maxHeight:"90vh",overflow:"hidden",
          border:`1px solid rgba(212,175,55,.18)`,display:"flex",flexDirection:"column"}}>
        <div style={{height:"1px",background:`linear-gradient(90deg,transparent,${C.gold},transparent)`,flexShrink:0}}/>

        {/* Hero image */}
        <div style={{flexShrink:0,width:"100%",aspectRatio:"16/9",maxHeight:"260px",overflow:"hidden",position:"relative"}}>
          <img src={project.imageUrl} alt={project.name}
            style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
          <div style={{position:"absolute",inset:0,background:`linear-gradient(to bottom,transparent 50%,rgba(8,8,8,.93))`}}/>
          <div style={{position:"absolute",bottom:"16px",left:"24px",right:"48px"}}>
            <div className="dm" style={{fontSize:"9px",color:C.gold,letterSpacing:".44em",textTransform:"uppercase",marginBottom:"4px"}}>{project.type}</div>
            <div className="pf" style={{fontSize:"clamp(18px,2.5vw,26px)",color:C.white,fontWeight:400,lineHeight:1.15}}>{project.name}</div>
            <div style={{display:"flex",alignItems:"center",gap:"6px",marginTop:"4px"}}>
              <MapPin size={11} color={C.grey1}/>
              <span className="dm" style={{fontSize:"12px",color:C.grey1}}>{project.location}</span>
            </div>
          </div>
          <button onClick={onClose}
            style={{position:"absolute",top:"12px",right:"12px",background:"rgba(0,0,0,.6)",
              border:`1px solid ${C.grey3}`,cursor:"pointer",color:C.grey2,padding:"6px",borderRadius:"2px"}}>
            <X size={16}/>
          </button>
        </div>

        {/* Tab bar */}
        <div style={{display:"flex",gap:"0",padding:"0 clamp(20px,3vw,36px)",borderBottom:`1px solid ${C.grey4}`,flexShrink:0}}>
          {tabs.map(t=>(
            <button key={t.key} className={`tab-btn${tab===t.key?" active":""}`}
              style={{marginRight:"clamp(16px,3vw,28px)"}}
              onClick={()=>setTab(t.key)}>{t.label}</button>
          ))}
        </div>

        {/* Content */}
        <div style={{flex:1,overflowY:"auto",padding:"clamp(20px,3vw,36px)"}}>
          <AnimatePresence mode="wait">
            {tab==="overview"&&(
              <motion.div key="overview" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}}
                exit={{opacity:0,y:-12}} transition={{duration:.4,ease}}>
                <p className="dm" style={{fontSize:"15px",color:C.grey1,lineHeight:1.8,marginBottom:"24px"}}>{project.story}</p>
                <div style={{display:"flex",flexDirection:"column",gap:"10px",marginBottom:"24px"}}>
                  {project.exclusivity.map((e,i)=>(
                    <div key={i} style={{display:"flex",gap:"12px",alignItems:"flex-start",padding:"10px 0",borderBottom:`1px solid ${C.grey4}`}}>
                      <Check size={12} color={C.gold} style={{marginTop:"3px",flexShrink:0}}/>
                      <span className="dm" style={{fontSize:"14px",color:C.grey1,lineHeight:1.65}}>{e}</span>
                    </div>
                  ))}
                </div>
                <button className="btn-g" style={{width:"100%",justifyContent:"center"}}
                  onClick={()=>{onClose();setTimeout(()=>document.getElementById("contact").scrollIntoView({behavior:"smooth"}),200);}}>
                  <Calendar size={13}/>Đặt lịch gặp trực tiếp
                </button>
              </motion.div>
            )}
            {tab==="assets"&&(
              <motion.div key="assets" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}}
                exit={{opacity:0,y:-12}} transition={{duration:.4,ease}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"2px",marginBottom:"28px"}}>
                  {Object.entries(project.specs).map(([k,v])=>(
                    <div key={k} style={{background:C.goldGlow2,border:`1px solid ${C.grey4}`,padding:"14px 16px"}}>
                      <div className="dm" style={{fontSize:"9px",color:C.grey2,letterSpacing:".28em",textTransform:"uppercase",marginBottom:"4px"}}>{k}</div>
                      <div className="dm" style={{fontSize:"13px",color:C.grey1,lineHeight:1.5}}>{v}</div>
                    </div>
                  ))}
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"2px"}}>
                  {[{l:"Giá khởi điểm",v:project.price},{l:"Diện tích",v:project.area},{l:"Rental Yield",v:project.metrics.yield}].map(m=>(
                    <div key={m.l} style={{textAlign:"center",padding:"16px",border:`1px solid ${C.grey4}`,background:C.goldGlow2}}>
                      <div className="pf" style={{fontSize:"22px",color:C.gold,fontWeight:400}}>{m.v}</div>
                      <div className="dm" style={{fontSize:"9px",color:C.grey2,letterSpacing:".18em",marginTop:"4px",textTransform:"uppercase"}}>{m.l}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            {tab==="verdict"&&(
              <motion.div key="verdict" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}}
                exit={{opacity:0,y:-12}} transition={{duration:.4,ease}}>
                <div style={{background:`linear-gradient(135deg,#1A1408,#0F0C05)`,border:`1px solid rgba(212,175,55,.18)`,padding:"clamp(20px,3vw,32px)",marginBottom:"24px"}}>
                  <div className="pf" style={{fontSize:"44px",color:"rgba(212,175,55,.1)",lineHeight:.8,marginBottom:"8px"}}>"</div>
                  <p className="dm" style={{fontSize:"clamp(14px,1.6vw,16px)",color:C.cream,lineHeight:1.85,letterSpacing:".02em"}}>{project.investmentThesis}</p>
                  <div className="dv" style={{marginTop:"20px",width:"28px"}}/>
                  <div className="dm" style={{fontSize:"11px",color:C.goldDim,letterSpacing:".18em",marginTop:"12px"}}>— Lộc · IQI Private Office, tháng 3/2026</div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginBottom:"28px"}}>
                  {[{l:"Tăng trưởng giá trị",v:project.metrics.growth},{l:"Tỷ lệ lấp đầy",v:project.metrics.occupancy}].map(m=>(
                    <div key={m.l} style={{border:`1px solid ${C.grey4}`,padding:"16px",textAlign:"center"}}>
                      <div className="pf" style={{fontSize:"24px",color:C.gold,fontWeight:400}}>{m.v}</div>
                      <div className="dm" style={{fontSize:"9px",color:C.grey2,letterSpacing:".18em",marginTop:"4px",textTransform:"uppercase"}}>{m.l}</div>
                    </div>
                  ))}
                </div>
                <button className="btn-g" style={{width:"100%",justifyContent:"center"}}
                  onClick={()=>{onClose();setTimeout(()=>document.getElementById("contact").scrollIntoView({behavior:"smooth"}),200);}}>
                  <Calendar size={13}/>Trao đổi trực tiếp với Lộc
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div style={{height:"1px",background:`linear-gradient(90deg,transparent,${C.goldDim},transparent)`,flexShrink:0}}/>
      </motion.div>
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// UNIT OPTIMIZER — Danh mục dự án
// ═══════════════════════════════════════════════════════════════════════
const UnitOptimizer=()=>{
  const [filter,setFilter]=useState({goal:"",budget:"",type:""});
  const [modalOpen,setModalOpen]=useState(false);
  const [selectedProject,setSelectedProject]=useState(null);
  const selCount=[filter.goal,filter.budget,filter.type].filter(Boolean).length;
  const showSummary=selCount===3;
  const zaloMsg=showSummary?encodeURIComponent(`Xin chào anh Lộc, mình quan tâm đến:\n• Mục tiêu: ${filter.goal}\n• Ngân sách: ${filter.budget}\n• Loại hình: ${filter.type}\nAnh có thể sắp xếp 30 phút trao đổi không?`):"";
  const zaloURL=`https://zalo.me/0961487848?text=${zaloMsg}`;
  const goals=["Dòng tiền cho thuê ổn định","Tích lũy tài sản dài hạn","Tọa độ dự phòng / Hộ chiếu thứ 2","Đa dạng hóa danh mục quốc tế"];
  const budgets=["Dưới 5 tỷ","5 đến 10 tỷ","10 đến 20 tỷ","Trên 20 tỷ hoặc quốc tế"];
  const types=["Căn hộ cao cấp trong nước","BĐS quốc tế · Golden Visa","CBI · Hộ chiếu thứ 2","Off-market · Tài sản riêng"];
  const openModal=(proj)=>{setSelectedProject(proj);setModalOpen(true);};
  return(
    <section id="invest" style={{padding:"clamp(80px,10vw,140px) clamp(20px,4vw,48px)"}}>
      <div style={{maxWidth:"1100px",margin:"0 auto"}}>
        <Reveal style={{textAlign:"center",marginBottom:"64px"}}>
          <span className="lbl">Danh mục dự án</span>
          <h2 className="pf" style={{fontSize:"clamp(28px,4vw,52px)",color:C.white,fontWeight:400,marginBottom:"20px"}}>
            Góc nhìn của Lộc{" "}
            <span style={{fontStyle:"italic",color:C.gold}}>về từng tài sản</span>
          </h2>
          <p className="dm" style={{fontSize:"clamp(15px,1.8vw,18px)",color:C.grey1,lineHeight:1.8,maxWidth:"560px",margin:"0 auto"}}>
            Mỗi dự án đã qua bộ lọc pháp lý, thực địa và đánh giá dòng tiền. Mình nêu thẳng cả rủi ro — đó là nền tảng của mọi buổi làm việc.
          </p>
        </Reveal>

        {/* Preference filter */}
        <Reveal style={{marginBottom:"48px"}}>
          <div className="bs glass-bright" style={{padding:"clamp(24px,3vw,40px)"}}>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"clamp(16px,2vw,28px)"}} className="full-md">
              {[
                {label:"Mục tiêu",key:"goal",opts:goals},
                {label:"Ngân sách",key:"budget",opts:budgets},
                {label:"Loại hình",key:"type",opts:types},
              ].map(col=>(
                <div key={col.key}>
                  <div className="dm" style={{fontSize:"11px",color:C.gold,letterSpacing:".44em",textTransform:"uppercase",marginBottom:"14px"}}>{col.label}</div>
                  <div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
                    {col.opts.map(opt=>{
                      const sel=filter[col.key]===opt;
                      return(
                        <motion.button key={opt} whileHover={{x:4}} whileTap={{scale:.98}}
                          onClick={()=>setFilter(p=>({...p,[col.key]:sel?"":opt}))}
                          style={{display:"flex",alignItems:"center",gap:"10px",padding:"10px 14px",
                            background:sel?C.goldGlow:"transparent",border:`1px solid ${sel?C.goldDim:C.grey3}`,
                            cursor:"pointer",textAlign:"left",transition:"all .3s",width:"100%"}}>
                          <div style={{width:"12px",height:"12px",borderRadius:"50%",
                            border:`1px solid ${sel?C.gold:C.grey3}`,background:sel?C.gold:"transparent",
                            flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",transition:"all .3s"}}>
                            {sel&&<Check size={7} color={C.black}/>}
                          </div>
                          <span className="dm" style={{fontSize:"13px",color:sel?C.gold:C.grey1,letterSpacing:".02em"}}>{opt}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div style={{marginTop:"28px",paddingTop:"24px",borderTop:`1px solid ${C.grey4}`,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"16px"}}>
              <div>
                <div className="dm" style={{fontSize:"11px",color:C.gold,letterSpacing:".32em",textTransform:"uppercase",marginBottom:"4px"}}>Báo cáo thị trường Q1/2026</div>
                <p className="dm" style={{fontSize:"13px",color:C.grey1,marginBottom:0}}>CBI, tọa độ dự phòng và BĐS trong nước. Cập nhật tháng 3/2026.</p>
              </div>
              <a href="https://drive.google.com/drive/folders/YOUR_FOLDER_ID_HERE"
                target="_blank" rel="noopener noreferrer"
                className="btn-gh" style={{textDecoration:"none",padding:"13px 24px",fontSize:"10px",flexShrink:0}}>
                <Download size={12}/>Tải báo cáo Q1/2026
              </a>
            </div>
          </div>
        </Reveal>

        {/* Smart summary */}
        <AnimatePresence>
          {showSummary&&(
            <motion.div key="summary" initial={{opacity:0,y:24,scale:.97}} animate={{opacity:1,y:0,scale:1}}
              exit={{opacity:0,y:16,scale:.97}} transition={{duration:.6,ease:[.22,.9,.28,1]}} style={{marginBottom:"40px"}}>
              <div style={{background:`linear-gradient(135deg,#1C1A08,#0F0D04,#1C1A08)`,
                border:`1px solid rgba(212,175,55,.28)`,padding:"clamp(28px,3.5vw,48px)",
                position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:"-40px",right:"-40px",width:"220px",height:"220px",borderRadius:"50%",background:`radial-gradient(circle,rgba(212,175,55,.1) 0%,transparent 70%)`,filter:"blur(32px)",pointerEvents:"none"}}/>
                <div style={{display:"flex",alignItems:"flex-start",gap:"clamp(20px,3vw,40px)",flexWrap:"wrap"}}>
                  <div style={{flexShrink:0,width:"52px",height:"52px",borderRadius:"50%",background:C.goldGlow,border:`1px solid rgba(212,175,55,.25)`,display:"flex",alignItems:"center",justifyContent:"center",animation:"float-y 5.5s ease-in-out infinite"}}>
                    <Star size={22} fill={C.gold} color={C.gold} strokeWidth={1}/>
                  </div>
                  <div style={{flex:1,minWidth:"240px"}}>
                    <div className="dm" style={{fontSize:"11px",color:C.gold,letterSpacing:".48em",textTransform:"uppercase",marginBottom:"12px"}}>Nhận xét của Lộc</div>
                    <p className="dm" style={{fontSize:"15px",color:C.grey1,lineHeight:1.8,marginBottom:"20px"}}>
                      Với mục tiêu <strong style={{color:C.white}}>{filter.goal.toLowerCase()}</strong>, ngân sách <strong style={{color:C.white}}>{filter.budget}</strong> và loại hình <strong style={{color:C.white}}>{filter.type.toLowerCase()}</strong>: mình có bức tranh khá rõ về hướng phù hợp. Mình sẽ chia sẻ quan điểm cụ thể — kể cả những rủi ro cần cân nhắc — trong buổi gặp trực tiếp.
                    </p>
                    <a href={zaloURL} target="_blank" rel="noopener noreferrer" className="btn-g" style={{textDecoration:"none"}}>
                      <ArrowRight size={13}/>Nhắn Zalo, sắp xếp gặp ngay
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Project gallery */}
        <StaggerWrap delay={.05}>
          <div className="g3">
            {/* Locked private card */}
            <StaggerItem>
              <div className="bs" style={{overflow:"hidden",height:"100%",display:"flex",flexDirection:"column",
                background:`linear-gradient(145deg,#0F0D04,#1A1810,#0A0902)`,
                border:`1px solid rgba(212,175,55,.14)`,position:"relative",minHeight:"340px"}}>
                <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 40%,rgba(212,175,55,.07) 0%,transparent 65%)",pointerEvents:"none"}}/>
                <div style={{position:"relative",zIndex:2,flex:1,display:"flex",flexDirection:"column",
                  alignItems:"center",justifyContent:"center",padding:"clamp(28px,3vw,44px)",textAlign:"center",gap:"20px"}}>
                  <div style={{width:"72px",height:"72px",display:"flex",alignItems:"center",justifyContent:"center",border:`1px solid rgba(212,175,55,.18)`,borderRadius:"50%",animation:"glow-pulse 4s ease-in-out infinite"}}>
                    <Lock size={22} color={C.goldDim} strokeWidth={1.2}/>
                  </div>
                  <div>
                    <div className="dm" style={{fontSize:"10px",color:C.gold,letterSpacing:".44em",textTransform:"uppercase",marginBottom:"12px"}}>Danh mục nội bộ</div>
                    <h3 className="pf" style={{fontSize:"clamp(16px,1.8vw,20px)",color:C.white,fontWeight:400,lineHeight:1.3,marginBottom:"12px"}}>Tài sản chưa công khai</h3>
                    <p className="dm" style={{fontSize:"14px",color:C.grey1,lineHeight:1.8,maxWidth:"220px",margin:"0 auto"}}>
                      Chỉ dành cho khách đã gặp trực tiếp. Một số thương vụ tốt nhất không xuất hiện trên bất kỳ nền tảng nào.
                    </p>
                  </div>
                  <div className="dv"/>
                  <button className="btn-gh" style={{fontSize:"11px",letterSpacing:".2em",padding:"12px 28px"}}
                    onClick={()=>document.getElementById("contact").scrollIntoView({behavior:"smooth"})}>
                    <Unlock size={12}/>Yêu cầu quyền truy cập
                  </button>
                </div>
              </div>
            </StaggerItem>

            {PROJECTS.map((proj)=>(
              <StaggerItem key={proj.id}>
                <div className="bs glass" style={{overflow:"hidden",height:"100%",display:"flex",flexDirection:"column",
                  transition:"transform .5s cubic-bezier(.22,.9,.28,1),box-shadow .5s"}}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-8px)";e.currentTarget.style.boxShadow=`0 32px 72px rgba(0,0,0,.65),0 0 0 1px rgba(212,175,55,.12)`;}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";}}>
                  <div style={{width:"100%",aspectRatio:"16/9",overflow:"hidden",flexShrink:0}}>
                    <img src={proj.imageUrl} alt={proj.name}
                      style={{width:"100%",height:"100%",objectFit:"cover",display:"block",transition:"transform .6s ease"}}
                      onMouseEnter={e=>e.target.style.transform="scale(1.04)"}
                      onMouseLeave={e=>e.target.style.transform="scale(1)"}/>
                  </div>
                  <div style={{padding:"clamp(18px,2.5vw,24px) clamp(18px,2.5vw,24px) 0"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"10px"}}>
                      <div style={{flex:1,marginRight:"10px"}}>
                        <div className="dm" style={{fontSize:"10px",color:C.gold,letterSpacing:".34em",textTransform:"uppercase",marginBottom:"5px"}}>{proj.type}</div>
                        <h3 className="pf" style={{fontSize:"clamp(17px,1.9vw,21px)",color:C.white,fontWeight:400,lineHeight:1.2}}>{proj.name}</h3>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:"5px",background:C.goldGlow,border:`1px solid rgba(212,175,55,.18)`,padding:"5px 9px",flexShrink:0}}>
                        <Star size={9} fill={C.gold} color={C.gold}/>
                        <span className="dm" style={{fontSize:"9px",color:C.gold,fontWeight:500}}>{proj.metrics.score}</span>
                      </div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:"6px",marginBottom:"12px"}}>
                      <MapPin size={11} color={C.grey2}/>
                      <span className="dm" style={{fontSize:"11px",color:C.grey2,letterSpacing:".03em"}}>{proj.location}</span>
                    </div>
                    <div style={{display:"flex",gap:"5px",flexWrap:"wrap",marginBottom:"14px"}}>
                      {proj.tags.map((t,j)=>{
                        const isUsdt=t.toLowerCase().includes("usdt");
                        return(
                          <span key={j} className="dm" style={{fontSize:"9px",letterSpacing:".14em",padding:"3px 8px",
                            border:`1px solid ${isUsdt?C.goldDim:C.grey3}`,textTransform:"uppercase",
                            color:isUsdt?C.gold:C.grey1,background:isUsdt?C.goldGlow:"transparent",fontWeight:isUsdt?500:400}}>{t}</span>
                        );
                      })}
                    </div>
                  </div>
                  <div style={{padding:"0 clamp(18px,2.5vw,24px)",flex:1}}>
                    <p className="dm" style={{fontSize:"13px",color:C.grey1,lineHeight:1.8,letterSpacing:".02em",
                      display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical",overflow:"hidden"}}>
                      {proj.story}
                    </p>
                  </div>
                  <div style={{padding:"clamp(14px,2vw,20px)",borderTop:`1px solid ${C.grey4}`,marginTop:"auto"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px"}}>
                      <div>
                        <div className="dm" style={{fontSize:"9px",color:C.grey2,letterSpacing:".24em",textTransform:"uppercase",marginBottom:"2px"}}>Giá khởi điểm</div>
                        <div className="pf" style={{fontSize:"18px",color:C.gold,fontWeight:400}}>{proj.price}</div>
                      </div>
                      <div style={{textAlign:"right"}}>
                        <div className="dm" style={{fontSize:"9px",color:C.grey2,letterSpacing:".24em",textTransform:"uppercase",marginBottom:"2px"}}>Yield ước tính</div>
                        <div className="pf" style={{fontSize:"18px",color:C.white,fontWeight:400}}>{proj.metrics.yield}</div>
                      </div>
                    </div>
                    <button className="btn-g" style={{width:"100%",justifyContent:"center",padding:"13px",fontSize:"9.5px",letterSpacing:".22em"}}
                      onClick={()=>openModal(proj)}>
                      <Layers size={12}/>Xem đánh giá đầy đủ
                    </button>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerWrap>

        <Reveal v={V.scale} style={{marginTop:"48px"}}>
          <div style={{textAlign:"center",padding:"clamp(32px,4vw,52px)",border:`1px solid ${C.grey4}`,background:C.goldGlow2}}>
            <div className="dm" style={{fontSize:"11px",color:C.gold,letterSpacing:".44em",textTransform:"uppercase",marginBottom:"16px"}}>Không thấy tài sản phù hợp?</div>
            <h3 className="pf" style={{fontSize:"clamp(20px,2.8vw,32px)",color:C.white,marginBottom:"14px",fontStyle:"italic"}}>
              Mình có thêm tài sản chưa công khai
            </h3>
            <p className="dm" style={{fontSize:"15px",color:C.grey1,lineHeight:1.8,maxWidth:"480px",margin:"0 auto 28px"}}>
              Một số tài sản tốt nhất không xuất hiện trên web. Trong buổi gặp, mình sẽ chia sẻ những gì thực sự phù hợp với quý vị dựa trên bức tranh cụ thể.
            </p>
            <button className="btn-g" onClick={()=>document.getElementById("contact").scrollIntoView({behavior:"smooth"})}>
              <Calendar size={13}/>Đặt lịch gặp trực tiếp
            </button>
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {modalOpen&&selectedProject&&(
          <ProjectModal project={selectedProject} onClose={()=>setModalOpen(false)}/>
        )}
      </AnimatePresence>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// RESULTS — Kết quả thực tế
// ═══════════════════════════════════════════════════════════════════════
const Results=()=>{
  const cases=[
    {
      id:"01",
      title:"Thương vụ Lisbon 2018",
      tag:"Golden Visa · Bồ Đào Nha",
      body:"Khách hàng đầu tiên mình đồng hành lấy Golden Visa Bồ Đào Nha qua bất động sản tại Lisbon. Hồ sơ được phê duyệt sau 14 tháng. Tài sản hiện tăng 47% giá trị so với thời điểm mua. Tài liệu giao dịch và chứng nhận từ IQI có thể chia sẻ trực tiếp trong buổi gặp.",
      metric:"+47% sau 6 năm · Tài liệu xác minh",
      verified:true,
    },
    {
      id:"02",
      title:"Chuyển USDT sang bất động sản Dubai",
      tag:"USDT → Real Estate · Dubai 2024",
      body:"Khách đang giữ khoảng 400.000 USDT, lo ngại rủi ro biến động tài sản số và muốn chuyển sang tài sản cứng. Mình kết nối với VARA-licensed exchange tại Dubai, hoàn tất giao dịch bất động sản DAMAC bằng USDT. Toàn bộ quy trình pháp lý, không cần qua ngân hàng truyền thống. Từ quyết định đến nhận freehold title: 38 ngày.",
      metric:"400.000 USDT → Freehold title Dubai · 38 ngày",
      verified:false,
    },
    {
      id:"03",
      title:"Greece Golden Visa — tối ưu chi phí CBI",
      tag:"Greece GV · €250K · Ẩn danh",
      body:"Khách ban đầu muốn Bồ Đào Nha nhưng ngân sách chỉ phù hợp với Hy Lạp. Mình phân tích rõ ưu và nhược từng option. Khách chọn Hy Lạp diện chuyển đổi công năng €250K. Bảo toàn được €250K so với kế hoạch ban đầu, kết quả tương đương về quyền đi lại Schengen.",
      metric:"Tối ưu €250K · Quyền Schengen tương đương",
      verified:false,
    },
  ];

  return(
    <section id="results" style={{padding:"clamp(80px,10vw,140px) clamp(20px,4vw,48px)",background:C.blackSoft}}>
      <div style={{maxWidth:"1100px",margin:"0 auto"}}>
        <Reveal style={{textAlign:"center",marginBottom:"64px"}}>
          <span className="lbl">Kết quả thực tế</span>
          <h2 className="pf" style={{fontSize:"clamp(28px,4vw,52px)",color:C.white,fontWeight:400,marginBottom:"20px"}}>
            Không phải{" "}
            <span style={{fontStyle:"italic",color:C.gold}}>case study trên slide</span>
          </h2>
          <p className="dm" style={{fontSize:"clamp(15px,1.8vw,18px)",color:C.grey1,lineHeight:1.8,maxWidth:"580px",margin:"0 auto"}}>
            Ba thương vụ thực tế. Số liệu không làm tròn, tiến độ không chỉnh sửa. Tài liệu và chứng nhận IQI có thể xem trực tiếp trong buổi gặp. Chỉ những trường hợp khách cho phép chia sẻ mới được đưa lên — đó là lý do không có nhiều hơn.
          </p>
        </Reveal>

        <StaggerWrap delay={.05}>
          <div className="g3">
            {cases.map((c,i)=>(
              <StaggerItem key={i}>
                <div className="bs glass" style={{padding:"clamp(24px,3vw,40px)",height:"100%",display:"flex",flexDirection:"column",
                  transition:"transform .45s,box-shadow .45s"}}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.boxShadow=`0 28px 64px rgba(0,0,0,.6)`;}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"20px"}}>
                    <div className="pf" style={{fontSize:"52px",color:"rgba(212,175,55,.07)",lineHeight:.9,userSelect:"none"}}>{c.id}</div>
                    <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"8px"}}>
                      <span className="dm" style={{fontSize:"8px",color:C.gold,letterSpacing:".26em",textTransform:"uppercase",background:C.goldGlow,border:`1px solid rgba(212,175,55,.15)`,padding:"4px 10px"}}>{c.tag}</span>
                      {c.verified&&(
                        <span className="dm" style={{fontSize:"8px",color:C.success,letterSpacing:".18em",display:"flex",alignItems:"center",gap:"4px"}}>
                          <Check size={8} color={C.success}/>Có tài liệu xác minh
                        </span>
                      )}
                    </div>
                  </div>
                  <h3 className="pf" style={{fontSize:"clamp(17px,1.9vw,21px)",color:C.white,marginBottom:"14px",fontWeight:400}}>{c.title}</h3>
                  <p className="dm" style={{fontSize:"15px",color:C.grey1,lineHeight:1.8,flex:1}}>{c.body}</p>
                  <div style={{marginTop:"20px",paddingTop:"16px",borderTop:`1px solid ${C.grey4}`}}>
                    <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
                      <TrendingUp size={13} color={C.gold}/>
                      <span className="dm" style={{fontSize:"11px",color:C.goldDim,letterSpacing:".06em"}}>{c.metric}</span>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerWrap>

        <Reveal v={V.scale} style={{marginTop:"40px"}}>
          <div style={{padding:"clamp(32px,4vw,52px)",border:`1px solid ${C.grey4}`,textAlign:"center"}}>
            <div className="dm" style={{fontSize:"11px",color:C.grey2,letterSpacing:".42em",textTransform:"uppercase",marginBottom:"16px"}}>Xác minh tài liệu</div>
            <p className="dm" style={{fontSize:"15px",color:C.grey1,lineHeight:1.8,maxWidth:"480px",margin:"0 auto 28px"}}>
              Mình chia sẻ tài liệu xác nhận từ IQI trực tiếp trong buổi gặp. Qua đó quý vị có cơ sở đánh giá thực tế về cách mình làm việc trước khi quyết định bất cứ điều gì.
            </p>
            <button className="btn-g" onClick={()=>document.getElementById("contact").scrollIntoView({behavior:"smooth"})}>
              <Calendar size={13}/>Đặt lịch gặp trực tiếp
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// PARTNERSHIP — Nguyên tắc làm việc · Tâm & Tầm
// ═══════════════════════════════════════════════════════════════════════
const Partnership=()=>{
  const items=[
    {
      n:"01",
      icon:<ShieldCheck size={18} color={C.gold} strokeWidth={1.4}/>,
      title:"Kinh nghiệm xử lý hồ sơ thực tế",
      body:"Đội ngũ IQI đã xử lý hồ sơ thực tế tại tất cả 6 chương trình CBI và RBI đang hoạt động. Không phải tư vấn lý thuyết. Mỗi chương trình có quy trình riêng — mình biết chính xác cần chuẩn bị gì và theo thứ tự nào để phê duyệt đúng hạn. Thông tin nhân thân và tài sản bảo mật theo tiêu chuẩn tổ chức tài chính quốc tế.",
    },
    {
      n:"02",
      icon:<Globe size={18} color={C.gold} strokeWidth={1.4}/>,
      title:"Mạng lưới IQI 25+ quốc gia",
      body:"IQI Global có mặt tại 25+ quốc gia với hơn 40.000 advisors. Quý vị được kết nối trực tiếp với luật sư bản địa, ngân hàng và đơn vị quản lý tài sản tại thị trường đích. Tất cả trong một quy trình được điều phối từ đầu đến cuối từ TP.HCM.",
    },
    {
      n:"03",
      icon:<Award size={18} color={C.gold} strokeWidth={1.4}/>,
      title:"Phối hợp pháp lý xuyên biên giới",
      body:"Mỗi giao dịch quốc tế đều có luật sư bản địa, công chứng viên và đại diện ngân hàng được chỉ định sẵn tại thị trường đích. Quý vị không cần tự liên hệ từng bên. Mình điều phối toàn bộ và cập nhật tiến độ theo từng mốc cụ thể.",
    },
    {
      n:"04",
      icon:<TrendingUp size={18} color={C.gold} strokeWidth={1.4}/>,
      title:"Tối đa 5 khách mới mỗi quý · Family Business",
      body:"Đây không phải marketing. Chuẩn bị hồ sơ CBI hoặc RBI đúng cách cần thời gian thực sự từ cả hai phía. Mình giới hạn số lượng khách mới để giữ tốc độ phản hồi và chất lượng phân tích ở mức cao nhất — như tinh thần Family Business của các thương hiệu xa xỉ mình học được tại Tam Sơn.",
    },
  ];

  return(
    <section id="partnership" style={{padding:"clamp(80px,10vw,140px) clamp(20px,4vw,48px)"}}>
      <div style={{maxWidth:"1100px",margin:"0 auto"}}>
        <Reveal style={{textAlign:"center",marginBottom:"64px"}}>
          <span className="lbl">Nguyên tắc làm việc</span>
          <h2 className="pf" style={{fontSize:"clamp(28px,4vw,52px)",color:C.white,fontWeight:400,marginBottom:"20px"}}>
            Cách mình{" "}
            <span style={{fontStyle:"italic",color:C.gold}}>đồng hành với quý vị</span>
          </h2>
          <p className="dm" style={{fontSize:"clamp(15px,1.8vw,18px)",color:C.grey1,lineHeight:1.8,maxWidth:"520px",margin:"0 auto"}}>
            Ít hơn, thực hơn. Tâm là không giấu rủi ro. Tầm là hiểu đủ sâu để đặt tài sản đúng vào bức tranh của từng gia đình.
          </p>
        </Reveal>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"clamp(12px,2vw,20px)"}} className="full-md">
          {items.map((item,i)=>(
            <Reveal key={i} delay={i*.1}>
              <div className="bs glass" style={{padding:"clamp(24px,3vw,40px)",transition:"transform .45s,box-shadow .45s",cursor:"default",position:"relative",overflow:"hidden"}}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow=`0 24px 60px rgba(0,0,0,.5)`;}}
                onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";}}>
                <div style={{position:"absolute",top:"-20px",right:"16px",fontFamily:"'Cormorant Garamond',serif",fontSize:"80px",color:"rgba(212,175,55,.04)",lineHeight:1,userSelect:"none"}}>{item.n}</div>
                <div style={{display:"flex",gap:"16px",alignItems:"flex-start"}}>
                  <div style={{marginTop:"2px",flexShrink:0}}>{item.icon}</div>
                  <div>
                    <div className="dm" style={{fontSize:"11px",color:C.gold,letterSpacing:".42em",textTransform:"uppercase",marginBottom:"10px"}}>{item.n} ·· {item.title}</div>
                    <p className="dm" style={{fontSize:"15px",color:C.grey1,lineHeight:1.8}}>{item.body}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal v={V.scale} style={{marginTop:"40px"}}>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"20px",
            padding:"clamp(40px,5vw,64px)",border:`1px solid ${C.grey4}`,textAlign:"center"}}>
            <div className="dm" style={{fontSize:"11px",color:C.grey2,letterSpacing:".46em",textTransform:"uppercase"}}>Giới hạn mỗi quý</div>
            <div className="pf g-txt" style={{fontSize:"clamp(36px,5vw,64px)",fontWeight:400,lineHeight:1}}>5</div>
            <p className="dm" style={{fontSize:"15px",color:C.grey1,lineHeight:1.8,maxWidth:"440px"}}>
              Giới hạn này không phải chiêu marketing. Nó giúp mình duy trì được thời gian phân tích thực sự cho từng trường hợp — thay vì xử lý hàng loạt và mất đi chữ "tâm" trong từng quyết định.
            </p>
            <button className="btn-g" onClick={()=>document.getElementById("contact").scrollIntoView({behavior:"smooth"})}>
              <Users size={13}/>Đặt lịch gặp trực tiếp
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// PROCESS TIMELINE — Quy trình làm việc
// ═══════════════════════════════════════════════════════════════════════
const ProcessTimeline=()=>{
  const steps=[
    {
      n:"01",
      phase:"Buổi đầu · 30 phút",
      title:"Nghe trước, đề xuất sau",
      body:"Mình cần hiểu bức tranh tổng thể trước khi nói bất cứ điều gì: mục tiêu thực sự, cấu trúc tài sản hiện tại, và những ràng buộc không tiện nói rõ với ai. Không có agenda bán hàng trong buổi đầu.",
      detail:"Gặp trực tiếp tại TP.HCM · hoặc video call",
      time:"Tuần 1",
    },
    {
      n:"02",
      phase:"Phân tích · 5–7 ngày",
      title:"Đánh giá pháp lý & dòng tiền trung thực",
      body:"Mình làm việc với luật sư bản địa và đội IQI tại thị trường đích để xác minh pháp lý, kiểm tra lịch sử dự án, và mô phỏng dòng tiền theo 3 kịch bản. Quý vị nhận được một memo viết thẳng — không phải slide PowerPoint.",
      detail:"Tài liệu giao trực tiếp · Bao gồm cả rủi ro",
      time:"Tuần 1–2",
    },
    {
      n:"03",
      phase:"Quyết định · Theo tiến độ của quý vị",
      title:"Không có deadline giả tạo",
      body:"Mình không tạo áp lực. Nếu phù hợp, mình hỗ trợ cấu trúc thanh toán — bao gồm chuyển đổi USDT qua VARA-licensed exchange tại Dubai nếu cần. Toàn bộ luồng tiền được ghi lại và minh bạch.",
      detail:"USDT · Chuyển khoản quốc tế · Đa tiền tệ",
      time:"Tuần 2–4",
    },
    {
      n:"04",
      phase:"Triển khai · Theo từng mốc",
      title:"Quý vị biết mình đang ở đâu mỗi tuần",
      body:"Từ lúc ký hợp đồng đến khi nhận title/thẻ thường trú, mình cập nhật tiến độ theo từng mốc cụ thể: nộp hồ sơ, xét duyệt sơ bộ, phê duyệt chính thức. Không có khoảng trống im lặng — đó là cam kết mình giữ mọi lúc.",
      detail:"Cập nhật qua Zalo hoặc Telegram · theo lịch quý vị chọn",
      time:"Tháng 1–14 tuỳ chương trình",
    },
  ];

  return(
    <section id="process" style={{padding:"clamp(80px,10vw,140px) clamp(20px,4vw,48px)",background:C.blackDeep}}>
      <div style={{maxWidth:"1100px",margin:"0 auto"}}>
        <Reveal style={{textAlign:"center",marginBottom:"72px"}}>
          <span className="lbl">Quy trình làm việc</span>
          <h2 className="pf" style={{fontSize:"clamp(28px,4vw,52px)",color:C.white,fontWeight:400,marginBottom:"20px"}}>
            Từ buổi gặp đầu{" "}
            <span style={{fontStyle:"italic",color:C.gold}}>đến khi xong việc</span>
          </h2>
          <div className="dv" style={{margin:"0 auto 24px"}}/>
          <p className="dm" style={{fontSize:"clamp(15px,1.8vw,18px)",color:C.grey1,lineHeight:1.8,maxWidth:"520px",margin:"0 auto"}}>
            Không có bước nào mờ. Mỗi giai đoạn đều có thời gian cụ thể, người chịu trách nhiệm, và tài liệu xác nhận.
          </p>
        </Reveal>

        <div style={{position:"relative"}}>
          <div className="hide-md" style={{position:"absolute",left:"calc(50% - 0.5px)",top:"0",bottom:"0",width:"1px",
            background:`linear-gradient(to bottom,transparent,${C.goldDim}44,${C.goldDim}44,transparent)`,pointerEvents:"none"}}/>
          <div style={{display:"flex",flexDirection:"column",gap:"clamp(20px,3vw,32px)"}}>
            {steps.map((s,i)=>{
              const isLeft=i%2===0;
              return(
                <Reveal key={i} v={isLeft?V.left:V.right} delay={i*.08}>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 80px 1fr",alignItems:"center",gap:"0"}} className="full-md">
                    {isLeft?(
                      <div className="bs glass" style={{padding:"clamp(24px,3vw,36px)",marginRight:"clamp(12px,2vw,24px)"}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"12px",flexWrap:"wrap",gap:"8px"}}>
                          <div>
                            <div className="dm" style={{fontSize:"10px",color:C.gold,letterSpacing:".46em",textTransform:"uppercase",marginBottom:"6px"}}>{s.phase}</div>
                            <h3 className="pf" style={{fontSize:"clamp(17px,2vw,22px)",color:C.white,fontWeight:400,lineHeight:1.2}}>{s.title}</h3>
                          </div>
                          <span className="dm" style={{fontSize:"8px",color:C.grey2,letterSpacing:".28em",textTransform:"uppercase",padding:"4px 10px",border:`1px solid ${C.grey4}`,whiteSpace:"nowrap",alignSelf:"flex-start"}}>{s.time}</span>
                        </div>
                        <p className="dm" style={{fontSize:"14px",color:C.grey1,lineHeight:1.8,marginBottom:"14px"}}>{s.body}</p>
                        <div style={{display:"flex",alignItems:"center",gap:"8px",paddingTop:"12px",borderTop:`1px solid ${C.grey4}`}}>
                          <div style={{width:"3px",height:"3px",borderRadius:"50%",background:C.goldDim,flexShrink:0}}/>
                          <span className="dm" style={{fontSize:"11px",color:C.grey2,letterSpacing:".04em"}}>{s.detail}</span>
                        </div>
                      </div>
                    ):<div/>}
                    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"6px",zIndex:2}}>
                      <div style={{width:"40px",height:"40px",borderRadius:"50%",background:C.blackCard,
                        border:`1px solid ${C.goldDim}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                        <span className="pf" style={{fontSize:"14px",color:C.gold,fontWeight:400}}>{s.n}</span>
                      </div>
                    </div>
                    {!isLeft?(
                      <div className="bs glass" style={{padding:"clamp(24px,3vw,36px)",marginLeft:"clamp(12px,2vw,24px)"}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"12px",flexWrap:"wrap",gap:"8px"}}>
                          <div>
                            <div className="dm" style={{fontSize:"10px",color:C.gold,letterSpacing:".46em",textTransform:"uppercase",marginBottom:"6px"}}>{s.phase}</div>
                            <h3 className="pf" style={{fontSize:"clamp(17px,2vw,22px)",color:C.white,fontWeight:400,lineHeight:1.2}}>{s.title}</h3>
                          </div>
                          <span className="dm" style={{fontSize:"8px",color:C.grey2,letterSpacing:".28em",textTransform:"uppercase",padding:"4px 10px",border:`1px solid ${C.grey4}`,whiteSpace:"nowrap",alignSelf:"flex-start"}}>{s.time}</span>
                        </div>
                        <p className="dm" style={{fontSize:"14px",color:C.grey1,lineHeight:1.8,marginBottom:"14px"}}>{s.body}</p>
                        <div style={{display:"flex",alignItems:"center",gap:"8px",paddingTop:"12px",borderTop:`1px solid ${C.grey4}`}}>
                          <div style={{width:"3px",height:"3px",borderRadius:"50%",background:C.goldDim,flexShrink:0}}/>
                          <span className="dm" style={{fontSize:"11px",color:C.grey2,letterSpacing:".04em"}}>{s.detail}</span>
                        </div>
                      </div>
                    ):<div/>}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal v={V.scale} style={{marginTop:"clamp(40px,5vw,64px)"}}>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"14px",textAlign:"center",
            padding:"clamp(32px,4vw,48px)",border:`1px solid ${C.grey4}`,background:C.goldGlow2}}>
            <div className="dm" style={{fontSize:"10px",color:C.grey2,letterSpacing:".42em",textTransform:"uppercase"}}>Bắt đầu từ đây</div>
            <p className="dm" style={{fontSize:"15px",color:C.grey1,lineHeight:1.8,maxWidth:"400px"}}>
              Buổi đầu không mất phí. Không có cam kết. Chỉ cần 30 phút để biết có phù hợp hay không.
            </p>
            <button className="btn-g" onClick={()=>document.getElementById("contact").scrollIntoView({behavior:"smooth"})}>
              <Calendar size={13}/>Đặt lịch buổi đầu tiên
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// CONTACT — Form + Calendly · Riêng tư tuyệt đối
// ═══════════════════════════════════════════════════════════════════════
const Contact=()=>{
  const [form,setForm]=useState({name:"",phone:"",email:"",note:""});
  const [errors,setErrors]=useState({});
  const [sent,setSent]=useState(false);
  const CALENDLY_URL="https://calendly.com/locdv2060/30min";

  const validate=()=>{
    const nextErrors={};
    if(!form.name.trim())nextErrors.name="Mình cần biết tên để sắp xếp buổi gặp.";
    if(!/^(\+84|0)[0-9]{8,10}$/.test(form.phone.replace(/\s/g,"")))nextErrors.phone="Số điện thoại chưa đúng định dạng Việt Nam.";
    if(form.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))nextErrors.email="Email chưa hợp lệ.";
    return nextErrors;
  };

  const handleSubmit=(event)=>{
    event?.preventDefault();
    const nextErrors=validate();
    if(Object.keys(nextErrors).length){setErrors(nextErrors);return;}
    const zaloMsg=encodeURIComponent(`Xin chào anh Lộc,\nTên: ${form.name}\nSĐT: ${form.phone}${form.email?"\nEmail: "+form.email:""}\n${form.note?"Ghi chú: "+form.note:""}\nMình muốn đặt lịch tư vấn.`);
    window.open(`https://zalo.me/0961487848?text=${zaloMsg}`,"_blank");
    setSent(true);
  };

  return(
    <section id="contact" style={{padding:"clamp(80px,10vw,140px) clamp(20px,4vw,48px)",background:C.blackSoft,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:"-100px",right:"-100px",width:"600px",height:"600px",borderRadius:"50%",background:"radial-gradient(circle,rgba(212,175,55,.07) 0%,transparent 70%)",filter:"blur(80px)",pointerEvents:"none"}}/>

      <div style={{maxWidth:"1100px",margin:"0 auto",position:"relative",zIndex:1}}>
        <Reveal style={{textAlign:"center",marginBottom:"64px"}}>
          <span className="lbl">Liên hệ</span>
          <h2 className="pf" style={{fontSize:"clamp(28px,4vw,52px)",color:C.white,fontWeight:400,marginBottom:"20px"}}>
            Bắt đầu bằng{" "}
            <span style={{fontStyle:"italic",color:C.gold}}>30 phút trao đổi</span>
          </h2>
          <div className="dv" style={{margin:"0 auto 24px"}}/>
          <p className="dm" style={{fontSize:"clamp(15px,1.8vw,18px)",color:C.grey1,lineHeight:1.8,maxWidth:"520px",margin:"0 auto"}}>
            Thông tin quý vị chia sẻ được bảo mật hoàn toàn. Mình không chia sẻ dữ liệu khách với bất kỳ bên thứ ba nào, không có ngoại lệ.
          </p>
        </Reveal>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"clamp(32px,5vw,80px)"}} className="full-md">
          {/* Form */}
          <Reveal v={V.left}>
            <div>
              <div className="dm" style={{fontSize:"11px",color:C.gold,letterSpacing:".44em",textTransform:"uppercase",marginBottom:"32px"}}>
                Để lại thông tin
              </div>

              {sent?(
                <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
                  style={{padding:"clamp(32px,4vw,48px)",border:`1px solid rgba(212,175,55,.22)`,textAlign:"center"}}>
                  <div className="pf" style={{fontSize:"32px",color:C.gold,marginBottom:"12px"}}>✦</div>
                  <h3 className="pf" style={{fontSize:"24px",color:C.white,marginBottom:"14px",fontWeight:400}}>Đã nhận</h3>
                  <p className="dm" style={{fontSize:"15px",color:C.grey1,lineHeight:1.8}}>
                    Mình sẽ liên hệ lại trong vòng 24 giờ để xác nhận lịch gặp.
                  </p>
                </motion.div>
              ):(
                <form style={{display:"flex",flexDirection:"column",gap:"0"}} onSubmit={handleSubmit}>
                  {[
                    {k:"name",  label:"Tên",          type:"text",    ph:"Quý vị muốn mình gọi tên gì?"},
                    {k:"phone", label:"Số điện thoại", type:"tel",     ph:"0961 xxx xxx"},
                    {k:"email", label:"Email (tùy chọn)",type:"email", ph:"email@example.com"},
                  ].map(({k,label,type,ph})=>(
                    <div key={k} style={{marginBottom:"28px"}}>
                      <label className="dm" style={{display:"block",fontSize:"10px",color:C.grey2,letterSpacing:".3em",textTransform:"uppercase",marginBottom:"8px"}}>{label}</label>
                      <input type={type} value={form[k]} placeholder={ph}
                        onChange={e=>setForm(p=>({...p,[k]:e.target.value}))}
                        className={`inp${errors[k]?" error":""}`}/>
                      {errors[k]&&<div className="dm" style={{fontSize:"11px",color:"#c04040",marginTop:"6px",letterSpacing:".03em"}}>{errors[k]}</div>}
                    </div>
                  ))}
                  <div style={{marginBottom:"36px"}}>
                    <label className="dm" style={{display:"block",fontSize:"10px",color:C.grey2,letterSpacing:".3em",textTransform:"uppercase",marginBottom:"8px"}}>Ghi chú ngắn (tùy chọn)</label>
                    <textarea value={form.note} placeholder="Mục tiêu, thị trường quan tâm, hoặc câu hỏi cụ thể..."
                      onChange={e=>setForm(p=>({...p,note:e.target.value}))}
                      className="inp" rows={4}/>
                  </div>
                  <button className="btn-g" style={{width:"100%",justifyContent:"center"}} type="submit">
                    <ArrowRight size={13}/>Gửi qua Zalo
                  </button>
                  <p className="dm" style={{fontSize:"11px",color:C.grey2,marginTop:"14px",lineHeight:1.75,letterSpacing:".03em"}}>
                    Thông tin được mã hóa và bảo mật. Mình không bao giờ chia sẻ dữ liệu khách.
                  </p>
                </form>
              )}
            </div>
          </Reveal>

          {/* Direct contact + Calendly */}
          <Reveal v={V.right}>
            <div>
              <div className="dm" style={{fontSize:"11px",color:C.gold,letterSpacing:".44em",textTransform:"uppercase",marginBottom:"32px"}}>
                Liên hệ trực tiếp
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:"16px",marginBottom:"40px"}}>
                {[
                  {l:"Zalo / Hotline",v:"0961 487 848",href:"https://zalo.me/0961487848?text=Xin%20chào%20anh%20Lộc"},
                  {l:"Telegram",v:"@locdv_iqiprivate",href:"https://t.me/locdv_iqiprivate"},
                  {l:"Email",v:"locdv2060@gmail.com",href:"mailto:locdv2060@gmail.com"},
                  {l:"Địa điểm",v:"TP. Hồ Chí Minh · Việt Nam",href:null},
                ].map((ch,i)=>(
                  <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 0",borderBottom:`1px solid ${C.grey4}`}}>
                    <span className="dm" style={{fontSize:"11px",color:C.grey2,letterSpacing:".22em",textTransform:"uppercase"}}>{ch.l}</span>
                    {ch.href?(
                      <a href={ch.href} target="_blank" rel="noopener noreferrer"
                        className="dm" style={{fontSize:"14px",color:C.grey1,textDecoration:"none",transition:"color .3s",letterSpacing:".03em"}}
                        onMouseEnter={e=>e.target.style.color=C.gold}
                        onMouseLeave={e=>e.target.style.color=C.grey1}>{ch.v}</a>
                    ):(
                      <span className="dm" style={{fontSize:"14px",color:C.grey1,letterSpacing:".03em"}}>{ch.v}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Calendly embed */}
              <div className="bs glass-bright" style={{padding:"clamp(24px,3vw,36px)"}}>
                <div className="dm" style={{fontSize:"10px",color:C.gold,letterSpacing:".44em",textTransform:"uppercase",marginBottom:"14px"}}>Đặt lịch tự động</div>
                <p className="dm" style={{fontSize:"14px",color:C.grey1,lineHeight:1.8,marginBottom:"20px"}}>
                  Chọn khung giờ phù hợp, xác nhận qua Calendly. Mình xác nhận lại qua Zalo trước 24 giờ.
                </p>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer"
                  className="btn-g" style={{display:"inline-flex",textDecoration:"none",width:"100%",justifyContent:"center"}}>
                  <Calendar size={13}/>Chọn giờ trên Calendly
                </a>
              </div>

              {/* Zalo quick button */}
              <div style={{marginTop:"20px",display:"flex",gap:"10px",flexWrap:"wrap"}}>
                <a href="https://zalo.me/0961487848?text=Xin%20chào%20anh%20Lộc,%20mình%20muốn%20trao%20đổi%20về%20đầu%20tư%20bất%20động%20sản"
                  target="_blank" rel="noopener noreferrer"
                  className="btn-g" style={{textDecoration:"none",fontSize:"10px",padding:"12px 22px",letterSpacing:".18em",flex:1,justifyContent:"center"}}>
                  Nhắn Zalo ngay
                </a>
                <a href="https://t.me/locdv_iqiprivate" target="_blank" rel="noopener noreferrer"
                  className="btn-gh" style={{textDecoration:"none",fontSize:"10px",padding:"12px 22px",letterSpacing:".18em",flex:1,justifyContent:"center"}}>
                  Telegram
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// FOOTER — Civilization closing
// ═══════════════════════════════════════════════════════════════════════
const Footer=()=>(
  <footer style={{background:C.civ,borderTop:`1px solid ${C.grey4}`}}>
    <div style={{maxWidth:"1100px",margin:"0 auto",padding:"clamp(48px,6vw,80px) clamp(20px,4vw,48px) clamp(32px,4vw,48px)",
      display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:"clamp(24px,4vw,64px)"}} className="full-md">
      <div>
        <div className="pf" style={{fontSize:"18px",color:C.gold,letterSpacing:".08em",marginBottom:"16px"}}>Lộc · IQI Private Office</div>
        <div className="dv" style={{marginBottom:"20px"}}/>
        <p className="dm" style={{fontSize:"13px",color:C.grey1,lineHeight:1.85,letterSpacing:".03em",maxWidth:"340px",marginBottom:"20px"}}>
          Tư vấn bất động sản quốc tế và tọa độ dự phòng cho gia đình muốn bảo toàn và tiếp nối di sản dài hạn. Hoạt động tại TP.HCM, kết nối IQI Global 25+ quốc gia.
        </p>
        <p className="dm" style={{fontSize:"12px",color:C.grey2,lineHeight:1.8,letterSpacing:".03em",maxWidth:"340px",fontStyle:"italic"}}>
          "Thế hệ trước xây hạ tầng. Thế hệ này xây phần mềm — thẩm mỹ, tư duy, và lộ trình tiếp nối."
        </p>
        <div style={{display:"flex",gap:"8px",flexWrap:"wrap",marginTop:"20px"}}>
          {["IQI Global","Tam Sơn","S&S Group","Est. 2018"].map((t,i)=>(
            <span key={i} className="dm" style={{fontSize:"8px",color:C.grey2,letterSpacing:".28em",padding:"4px 10px",border:`1px solid ${C.grey4}`,textTransform:"uppercase"}}>{t}</span>
          ))}
        </div>
      </div>

      <div>
        <div className="dm" style={{fontSize:"10px",color:C.gold,letterSpacing:".46em",textTransform:"uppercase",marginBottom:"18px"}}>Điều hướng</div>
        <div style={{display:"flex",flexDirection:"column",gap:"11px"}}>
          {[["Về Lộc","#heritage"],["Triết lý Civilization","#manifesto"],["Tọa độ dự phòng","#portfolio"],["Danh mục dự án","#invest"],["Kết quả","#results"],["Quy trình","#process"],["Liên hệ","#contact"]].map(([l,h])=>(
            <a key={l} href={h} className="dm" style={{fontSize:"13px",color:C.grey1,textDecoration:"none",letterSpacing:".04em",transition:"color .3s"}}
              onMouseEnter={e=>e.target.style.color=C.gold}
              onMouseLeave={e=>e.target.style.color=C.grey1}>{l}</a>
          ))}
        </div>
      </div>

      <div>
        <div className="dm" style={{fontSize:"10px",color:C.gold,letterSpacing:".46em",textTransform:"uppercase",marginBottom:"18px"}}>Liên hệ</div>
        <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
          {[{l:"Zalo / Hotline",v:"0961 487 848"},{l:"Telegram",v:"@locdv_iqiprivate"},{l:"Email",v:"locdv2060@gmail.com"},{l:"Địa điểm",v:"TP. Hồ Chí Minh · Việt Nam"}].map((ch,i)=>(
            <div key={i}>
              <div className="dm" style={{fontSize:"10px",color:C.grey2,letterSpacing:".26em",textTransform:"uppercase",marginBottom:"3px"}}>{ch.l}</div>
              <span className="dm" style={{fontSize:"13px",color:C.grey1,letterSpacing:".03em"}}>{ch.v}</span>
            </div>
          ))}
        </div>
        <div style={{display:"flex",gap:"8px",marginTop:"20px",flexWrap:"wrap"}}>
          <a href="https://zalo.me/0961487848?text=Xin%20chào%20anh%20Lộc,%20mình%20muốn%20trao%20đổi%20về%20đầu%20tư%20bất%20động%20sản"
            target="_blank" rel="noopener noreferrer"
            className="btn-g" style={{textDecoration:"none",fontSize:"10px",padding:"11px 20px",letterSpacing:".18em"}}>
            Nhắn Zalo
          </a>
          <a href="https://t.me/locdv_iqiprivate" target="_blank" rel="noopener noreferrer"
            className="btn-gh" style={{textDecoration:"none",fontSize:"10px",padding:"11px 20px",letterSpacing:".18em"}}>
            Telegram
          </a>
        </div>
      </div>
    </div>

    <div style={{borderTop:`1px solid ${C.grey4}`,padding:"18px clamp(20px,4vw,48px)"}}>
      <div style={{maxWidth:"1100px",margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"12px"}}>
        <span className="dm" style={{fontSize:"10px",color:C.grey3,letterSpacing:".1em"}}>© 2026 Lộc · IQI Vietnam Private Investment Office · All rights reserved</span>
        <span className="dm" style={{fontSize:"10px",color:C.grey3,letterSpacing:".08em"}}>Pháp lý hoàn chỉnh · Không xung đột lợi ích · Minh bạch tuyệt đối</span>
        <span className="dm" style={{fontSize:"9px",color:C.grey3,letterSpacing:".2em",textTransform:"uppercase"}}>Private Boutique · Est. 2018</span>
      </div>
    </div>
  </footer>
);

// ═══════════════════════════════════════════════════════════════════════
// ROOT APP — IQI Private Office · Civilization Edition
// ═══════════════════════════════════════════════════════════════════════
export default function IQIPrivateOfficeNew() {
  const [scrollY,setScrollY]=useState(0);
  const [showCTA,setShowCTA]=useState(false);

  // Schema JSON-LD — Person + LocalBusiness + Organization
  useEffect(()=>{
    document.title="Lộc · IQI Private Office — Tư vấn Bất động sản Quốc tế & Golden Visa tại TP.HCM";

    const setMeta=(name,content,prop=false)=>{
      const attr=prop?"property":"name";
      let el=document.querySelector(`meta[${attr}="${name}"]`);
      if(!el){el=document.createElement("meta");el.setAttribute(attr,name);document.head.appendChild(el);}
      el.setAttribute("content",content);
    };

    setMeta("description","Senior Advisor tại IQI Global. Tư vấn đầu tư bất động sản quốc tế, Golden Visa EU, CBI — Úc, Dubai, Hy Lạp, Thổ Nhĩ Kỳ, Síp, Grenada. Bảo toàn và tiếp nối di sản gia đình. Đặt lịch tư vấn tại TP.HCM.");
    setMeta("keywords","tư vấn bất động sản quốc tế, golden visa, CBI Vietnam, tọa độ dự phòng, bất động sản Dubai, golden visa Hy Lạp, hộ chiếu thứ hai, IQI Global Vietnam, đầu tư định cư, USDT bất động sản Dubai, di sản gia đình");
    setMeta("author","Lộc · IQI Private Office");
    setMeta("robots","index, follow");
    setMeta("viewport","width=device-width, initial-scale=1, maximum-scale=5");

    setMeta("og:type","website",true);
    setMeta("og:title","Lộc · IQI Private Office — Tư vấn BĐS Quốc tế & Golden Visa",true);
    setMeta("og:description","Tư vấn đầu tư bất động sản và tọa độ dự phòng tại Úc, Dubai, Hy Lạp, Thổ Nhĩ Kỳ, Síp, Grenada và Việt Nam. Bảo toàn di sản gia đình.",true);
    setMeta("og:url","https://iqiprivateoffice.com",true);
    setMeta("og:locale","vi_VN",true);
    setMeta("og:site_name","IQI Private Office",true);

    setMeta("twitter:card","summary_large_image");
    setMeta("twitter:title","Lộc · IQI Private Office — Civilization Edition");
    setMeta("twitter:description","Tư vấn bất động sản quốc tế, Golden Visa EU, CBI. Bảo toàn và tiếp nối di sản gia đình Việt.");

    let canonical=document.querySelector("link[rel='canonical']");
    if(!canonical){canonical=document.createElement("link");canonical.rel="canonical";document.head.appendChild(canonical);}
    canonical.href="https://iqiprivateoffice.com";

    // Structured Data — Person + LocalBusiness + Organization + FAQ
    let sd=document.getElementById("sd-json");
    if(!sd){sd=document.createElement("script");sd.id="sd-json";sd.type="application/ld+json";document.head.appendChild(sd);}
    sd.textContent=JSON.stringify({
      "@context":"https://schema.org",
      "@graph":[
        {
          "@type":"Person",
          "name":"Lộc",
          "jobTitle":"Senior Real Estate Advisor",
          "description":"Chuyên gia tư vấn bất động sản quốc tế và chương trình CBI/Golden Visa tại TP.HCM. 6+ năm kinh nghiệm trong ngành xa xỉ tại Tam Sơn và S&S Group.",
          "worksFor":{"@type":"Organization","name":"IQI Global","url":"https://iqiglobal.com"},
          "address":{"@type":"PostalAddress","addressLocality":"Hồ Chí Minh","addressCountry":"VN"},
          "telephone":"+84961487848",
          "email":"locdv2060@gmail.com",
          "knowsAbout":["Golden Visa","CBI","International Real Estate","Dubai Real Estate","Greece Golden Visa","Cyprus Residency","Turkey Citizenship","Grenada Citizenship","Luxury Real Estate","USDT Real Estate"]
        },
        {
          "@type":"LocalBusiness",
          "name":"IQI Private Office",
          "description":"Tư vấn đầu tư bất động sản quốc tế và chương trình tọa độ dự phòng — Golden Visa EU, CBI, bất động sản Úc, Dubai, Hy Lạp. Triết lý Civilization: bảo toàn và tiếp nối di sản gia đình.",
          "address":{"@type":"PostalAddress","addressLocality":"Hồ Chí Minh","addressCountry":"VN"},
          "telephone":"+84961487848",
          "priceRange":"€220,000+",
          "areaServed":["VN","AU","AE","GR","TR","CY","GD"],
          "openingHours":"Mo-Sa 08:00-20:00"
        },
        {
          "@type":"FAQPage",
          "mainEntity":[
            {
              "@type":"Question",
              "name":"Golden Visa Hy Lạp 2026 cần đầu tư bao nhiêu?",
              "acceptedAnswer":{"@type":"Answer","text":"Ngưỡng hiện tại là €250.000 cho diện chuyển đổi công năng tại Athens nội đô. Ngưỡng này có thể tăng sớm — Bồ Đào Nha là bài học năm 2023."}
            },
            {
              "@type":"Question",
              "name":"Có thể mua bất động sản Dubai bằng USDT không?",
              "acceptedAnswer":{"@type":"Answer","text":"Có. Dubai là thị trường bất động sản hợp pháp duy nhất cho phép thanh toán bằng USDT qua sàn được VARA cấp phép. Hoàn toàn hợp pháp và không cần khai báo nguồn gốc qua ngân hàng truyền thống."}
            },
            {
              "@type":"Question",
              "name":"Grenada có hiệp ước E2 với Mỹ không?",
              "acceptedAnswer":{"@type":"Answer","text":"Có. Grenada là quốc tịch thứ 2 duy nhất trong nhóm CBI có hiệp ước E2 với Mỹ, cho phép xin Visa E2 kinh doanh để ở lại Mỹ hợp pháp."}
            }
          ]
        }
      ]
    });
  },[]);

  // Scroll handler với requestAnimationFrame
  useEffect(()=>{
    let tick=false;
    const h=()=>{
      if(!tick){
        requestAnimationFrame(()=>{
          const y=window.scrollY;
          setScrollY(y);
          setShowCTA(y>window.innerHeight*.85);
          tick=false;
        });
        tick=true;
      }
    };
    window.addEventListener("scroll",h,{passive:true});
    return()=>window.removeEventListener("scroll",h);
  },[]);

  return(
    <>
      <GS/>
      <Nav scrolled={scrollY>60}/>
      <StickyCTA show={showCTA}/>
      <main>
        <Hero/>
        <StatsBar/>
        <Heritage/>
        <CivilizationManifesto/>
        <GlobalPortfolio/>
        <UnitOptimizer/>
        <Results/>
        <Partnership/>
        <ProcessTimeline/>
        <Contact/>
      </main>
      <Footer/>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// OPTIMIZATION CHECKLIST
// ─────────────────────────────────────────────────────────────────────
// ✓ Fonts: Cormorant Garamond (display) + DM Sans (body) — Google CDN
// ✓ Animations: blur-reveal + parallax + stagger — Framer Motion
// ✓ Images: thay picsum bằng WebP/AVIF tối ưu khi deploy
// ✓ Schema: Person + LocalBusiness + FAQPage JSON-LD
// ✓ Meta: OG + Twitter + canonical + robots
// ✓ Responsive: breakpoints 900px + 540px
// ✓ Accessibility: semantic HTML + aria-label + focus states
// ✓ Performance: passive scroll listener + RAF + useInView once:true
// ✓ Calendly: lazy-loaded external script
// ✓ Copy: "định cư" → "tọa độ dự phòng" / "bảo chứng cho sự tiếp nối"
// ✓ New section: CivilizationManifesto — 6 pillars
// ✓ Footer: Civilization closing line
// ✓ Nav: added "Triết lý" link
// ═══════════════════════════════════════════════════════════════════════
