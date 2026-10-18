"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, Reorder } from "motion/react";
import {
  Activity, ArrowDown, ArrowUp, ArrowUpRight, Bell, BookOpen, Check, ChevronDown,
  ChevronRight, CircleHelp, Clock3, Eye, FileImage, FileText, FolderKanban,
  Gauge, Globe, GripVertical, ImagePlus, LayoutDashboard, Layers3, Menu, Monitor,
  PanelLeftClose, Plus, Save, Search, Settings2, ShieldCheck, Smartphone, Sparkles,
  Users, Video, X, Zap
} from "lucide-react";

type Section = {
  id: string;
  name: string;
  description: string;
  visible: boolean;
  headline: string;
  copy: string;
  cta: string;
  url: string;
};

const starterSections: Section[] = [
  { id:"hero", name:"Hero slider", description:"Headline, visual, and primary CTA", visible:true, headline:"MAKE SOMETHING REAL.", copy:"Creative work with a point. We help brands make meaningful things through content, visuals, and digital experiences.", cta:"LET’S TALK", url:"/contact/" },
  { id:"ribbon", name:"Performance ribbon", description:"Brand signals and short proof points", visible:true, headline:"BUILT TO MAKE AN IMPACT", copy:"Creative thinking · Real collaboration · Work with purpose", cta:"", url:"" },
  { id:"bio", name:"Founder / SeedX intro", description:"Short bio and why SeedX exists", visible:true, headline:"CREATIVE CHAOS. WITH A POINT.", copy:"We make space for ideas, experiments, and stories that mean something.", cta:"OUR STORY", url:"/about/our-story/" },
  { id:"services", name:"Service cards", description:"Social media, photography, video, website", visible:true, headline:"WHAT WE CAN MAKE TOGETHER", copy:"Social Media & Content Marketing · Photography · Videography · Website & Landing Page", cta:"EXPLORE SERVICES", url:"/services/" },
  { id:"content", name:"Content Marketing feature", description:"Highlighted service and gradient visual", visible:true, headline:"CONTENT THAT DOES SOMETHING.", copy:"Not just posting. Build a signal people remember.", cta:"LET’S BUILD", url:"/services/content-marketing/" },
  { id:"couple", name:"Couple Video Special Promo", description:"Video showcase, offer, and CTA", visible:true, headline:"YOUR STORY, ON FILM.", copy:"A special video experience for two. Details and availability can be updated here.", cta:"ASK ABOUT THE PROMO", url:"/contact/" },
  { id:"work", name:"Selected Work", description:"Featured projects from the portfolio", visible:true, headline:"MADE THINGS. REAL STORIES.", copy:"Selected work from the SeedX universe.", cta:"VIEW ALL WORK", url:"/portfolio/selected-work/" },
  { id:"story", name:"Our Story", description:"Beginning, Search, and Vision timeline", visible:true, headline:"NOT A STRAIGHT LINE. NEVER WAS.", copy:"THE BEGINNING — What if? · THE SEARCH — Find the signal. · THE VISION — Make it mean something.", cta:"READ OUR STORY", url:"/about/our-story/" },
  { id:"team", name:"The Team Behind SeedX", description:"Profiles, specialties, and portfolio links", visible:true, headline:"THE PEOPLE BEHIND THE SEEDX", copy:"Different perspectives. Shared intent.", cta:"MEET THE TEAM", url:"/about/team/" },
  { id:"community", name:"Community teaser", description:"Contributors and open opportunities", visible:true, headline:"GOOD WORK IS RARELY SOLO.", copy:"A growing network of people who make things happen.", cta:"JOIN THE COMMUNITY", url:"/community/" },
  { id:"gallery", name:"Gallery / visual conveyor", description:"Videos, visual experiments, and archive", visible:true, headline:"A WORLD OF MADE THINGS.", copy:"A visual archive of experiments, stories, and moments.", cta:"EXPLORE THE GALLERY", url:"/portfolio/gallery/" },
  { id:"final", name:"Final CTA", description:"Closing message and contact destination", visible:true, headline:"LET’S MAKE SOMETHING REAL.", copy:"Got an idea? A brief? Something weird you want to try? Let’s talk.", cta:"LET’S TALK", url:"/contact/" },
  { id:"footer", name:"Footer", description:"Brand, contact, social links, navigation", visible:true, headline:"SEEDX STUDIO", copy:"#ThisisSeed · Creative Chaos With a Point", cta:"", url:"" }
];

const navGroups = [
  { label:"Workspace", items:[
    { id:"overview", label:"Overview", icon:LayoutDashboard },
    { id:"homepage", label:"Homepage CMS", icon:Layers3, count:"13" },
    { id:"portfolio", label:"Portfolio & Services", icon:FolderKanban },
    { id:"articles", label:"Articles", icon:BookOpen },
    { id:"community", label:"Community", icon:Users },
    { id:"events", label:"Events", icon:Clock3 },
  ]},
  { label:"Management", items:[
    { id:"media", label:"Media Library", icon:FileImage },
    { id:"inquiries", label:"Inquiries", icon:Zap },
    { id:"analytics", label:"Analytics", icon:Activity },
    { id:"settings", label:"Settings", icon:Settings2 },
  ]}
];

function readLocalSections(): Section[] {
  if (typeof window === "undefined") return starterSections;
  try {
    const raw = localStorage.getItem("seedx-cms-sections");
    return raw ? JSON.parse(raw) as Section[] : starterSections;
  } catch { return starterSections; }
}

export default function Dashboard() {
  const [page, setPage] = useState("overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sections, setSections] = useState<Section[]>(starterSections);
  const [selectedId, setSelectedId] = useState("hero");
  const [tab, setTab] = useState<"sections"|"editor"|"preview"|"seo">("sections");
  const [device, setDevice] = useState<"desktop"|"mobile">("desktop");
  const [dirty, setDirty] = useState(false);
  const [toast, setToast] = useState("");
  const [seoTitle, setSeoTitle] = useState("SeedX Studio — Creative Chaos With a Point");
  const [seoDesc, setSeoDesc] = useState("SeedX Studio helps brands make meaningful content through social media, photography, videography, and digital experiences.");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [checklist, setChecklist] = useState([false,false,false,false]);

  const selected = sections.find(s => s.id === selectedId) ?? sections[0];
  const visibleSections = useMemo(() => sections.filter(s => s.visible), [sections]);
  const pageLabel = [...navGroups.flatMap(g => g.items)].find(i => i.id === page)?.label ?? "Overview";

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  }
  function go(next: string) {
    setPage(next);
    setMobileOpen(false);
    if (next === "homepage") setTab("sections");
  }
  function patchSelected(patch: Partial<Section>) {
    setSections(current => current.map(s => s.id === selectedId ? {...s, ...patch} : s));
    setDirty(true);
  }
  function saveDraft() {
    try {
      localStorage.setItem("seedx-cms-sections", JSON.stringify(sections));
      localStorage.setItem("seedx-cms-seo-title", seoTitle);
      localStorage.setItem("seedx-cms-seo-desc", seoDesc);
      setDirty(false);
      notify("Draft tersimpan di browser ini");
    } catch { notify("Browser tidak mengizinkan penyimpanan lokal"); }
  }
  function resetDraft() {
    setSections(starterSections);
    setSelectedId("hero");
    setDirty(true);
    notify("Data demo dipulihkan — simpan untuk menerapkan");
  }
  function addSection() {
    const id = `custom-${Date.now()}`;
    const newSection: Section = { id, name:"Custom section", description:"Custom homepage section", visible:true, headline:"YOUR HEADLINE HERE", copy:"Add your supporting copy here.", cta:"LEARN MORE", url:"/" };
    setSections(current => [...current, newSection]);
    setSelectedId(id);
    setTab("editor");
    setDirty(true);
    notify("Section baru ditambahkan");
  }
  function moveSection(id: string, direction: -1 | 1) {
    setSections(current => {
      const index = current.findIndex(s => s.id === id);
      const next = index + direction;
      if (next < 0 || next >= current.length) return current;
      const clone = [...current];
      [clone[index], clone[next]] = [clone[next], clone[index]];
      return clone;
    });
    setDirty(true);
  }

  return (
    <div className="app-shell">
      <AnimatePresence>
        {mobileOpen && <motion.button className="mobile-scrim" aria-label="Close menu" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setMobileOpen(false)} />}
      </AnimatePresence>
      <motion.aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`} initial={false} animate={{x:0}} transition={{duration:.22,ease:"easeOut"}}>
        <div className="brand-lockup">
          <div className="brand-mark">S</div>
          <div><div className="brand-name">Seed<span>X</span> Studio</div><div className="brand-sub">CONTENT CONTROL</div></div>
          <button className="sidebar-close icon-button" onClick={() => setMobileOpen(false)} aria-label="Close navigation"><X size={17}/></button>
        </div>
        <button className="workspace-switch" onClick={() => notify("SeedX Website · Production workspace")}><span className="online-dot"/><span><strong>SeedX Website</strong><small>Production workspace</small></span><ChevronDown size={15} className="workspace-chevron"/></button>
        {navGroups.map(group => <div className="nav-group" key={group.label}>
          <div className="nav-caption">{group.label}</div>
          <nav className="nav-list">{group.items.map(item => {
            const Icon = item.icon;
            return <button key={item.id} className={`nav-item ${page===item.id ? "active" : ""}`} onClick={() => go(item.id)}>
              <Icon size={17} strokeWidth={1.8}/><span>{item.label}</span>{item.count && <span className="nav-count">{item.count}</span>}
            </button>;
          })}</nav>
        </div>)}
        <div className="sidebar-bottom">
          <button className="help-card" onClick={() => notify("Pilih section → edit → preview → save draft.")}><span className="help-icon"><CircleHelp size={17}/></span><span><strong>Need a hand?</strong><small>CMS quick guide</small></span><ArrowUpRight size={15}/></button>
          <div className="user-profile"><div className="user-avatar">SX</div><div><strong>SeedX Admin</strong><small>Administrator</small></div><button className="more-button" onClick={() => go("settings")} aria-label="Profile settings">•••</button></div>
        </div>
      </motion.aside>

      <main className="main-area">
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-button mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu size={19}/></button>
            <div className="breadcrumb"><span>SeedX Website</span><ChevronRight size={14}/><strong>{pageLabel}</strong></div>
          </div>
          <div className="topbar-actions">
            <button className="icon-button search-button" onClick={() => setSearchOpen(v => !v)} aria-label="Search"><Search size={17}/></button>
            <button className="icon-button notification-button" onClick={() => notify("Belum ada notifikasi baru")} aria-label="Notifications"><Bell size={17}/><i/></button>
            <button className="button button-quiet view-site" onClick={() => notify("Website publik belum terhubung") }><Globe size={15}/> View website</button>
            <button className="button button-primary top-save" onClick={() => page==="homepage" ? saveDraft() : notify("Buka Homepage CMS untuk menyimpan draft")}><Save size={15}/> Save changes</button>
          </div>
        </header>

        <AnimatePresence>
          {searchOpen && <motion.div className="search-popover" initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:.16}}>
            <Search size={16}/><input autoFocus value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search modules..." onKeyDown={e => {if(e.key==="Escape")setSearchOpen(false); if(e.key==="Enter"){const found=navGroups.flatMap(g=>g.items).find(i=>i.label.toLowerCase().includes(searchQuery.toLowerCase()));if(found){go(found.id);setSearchOpen(false)}}}}/><button className="icon-button" onClick={() => setSearchOpen(false)}><X size={15}/></button>
            {searchQuery && <div className="search-hint">Press Enter to open a matching module</div>}
          </motion.div>}
        </AnimatePresence>

        <div className="page-content">
          <AnimatePresence mode="wait">
            {page==="overview" && <motion.section key="overview" className="page-view" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-5}} transition={{duration:.2}}>
              <div className="page-heading">
                <div><div className="eyebrow"><span className="eyebrow-dot"/>WORKSPACE / MONDAY, OCTOBER 19, 2026</div><h1>Make things happen<span className="lime">.</span></h1><p>Selamat datang di control room SeedX. Semua konten, project, dan cerita brand lo dimulai dari sini.</p></div>
                <div className="heading-actions"><button className="button button-secondary" onClick={() => {go("homepage");setTab("preview")}}><Eye size={15}/> Preview homepage</button><button className="button button-primary" onClick={() => go("homepage")}><Plus size={16}/> Edit homepage</button></div>
              </div>
              <div className="stats-grid">
                {[
                  {label:"Published articles",value:"—",note:"Connect data to view real metrics",icon:FileText},
                  {label:"Active projects",value:"—",note:"No project data connected",icon:FolderKanban},
                  {label:"Upcoming events",value:"—",note:"No event data connected",icon:Clock3},
                  {label:"New inquiries",value:"—",note:"Contact form not connected",icon:Zap}
                ].map(s=>{const Icon=s.icon;return <motion.div className="stat-card" key={s.label} whileHover={{y:-3,borderColor:"#526332"}} transition={{duration:.18}}><div className="stat-card-top"><span>{s.label}</span><span className="stat-icon"><Icon size={17}/></span></div><div className="stat-value">{s.value}</div><div className="stat-note">{s.note}</div></motion.div>})}
              </div>
              <div className="overview-grid">
                <div className="panel">
                  <div className="panel-heading"><div><h2>Recent activity</h2><p>Workspace status and recent changes.</p></div><span className="pill pill-neutral">PROTOTYPE</span></div>
                  <div className="activity-list">
                    <div className="activity-row"><span className="activity-icon"><Layers3 size={17}/></span><div><strong>Homepage CMS ready to configure</strong><p>Sections, visibility, and editor interactions are ready to test.</p></div><span className="activity-time">NOW</span></div>
                    <div className="activity-row"><span className="activity-icon"><Monitor size={17}/></span><div><strong>Responsive preview enabled</strong><p>Switch between desktop and mobile preview in Homepage CMS.</p></div><span className="activity-time">NOW</span></div>
                    <div className="activity-row"><span className="activity-icon"><ShieldCheck size={17}/></span><div><strong>Production connection pending</strong><p>Changes are local only; nothing is published online yet.</p></div><span className="activity-time">SETUP</span></div>
                  </div>
                </div>
                <div className="panel">
                  <div className="panel-heading"><div><h2>Quick actions</h2><p>Jump straight into the work.</p></div><Sparkles size={17} className="muted-icon"/></div>
                  <div className="quick-grid">
                    {[{title:"Edit homepage",note:"Sections & content",icon:Layers3,to:"homepage"},{title:"Add a project",note:"Portfolio & services",icon:FolderKanban,to:"portfolio"},{title:"Write an article",note:"Editorial draft",icon:FileText,to:"articles"},{title:"Manage media",note:"Visual assets",icon:ImagePlus,to:"media"}].map(a=>{const Icon=a.icon;return <motion.button key={a.title} className="quick-action" whileHover={{y:-2,borderColor:"#D7FF35"}} whileTap={{scale:.98}} onClick={()=>go(a.to)}><span className="quick-icon"><Icon size={18}/></span><strong>{a.title}</strong><small>{a.note}</small><ArrowUpRight className="quick-arrow" size={15}/></motion.button>})}
                  </div>
                </div>
              </div>
            </motion.section>}

            {page==="homepage" && <motion.section key="homepage" className="page-view" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-5}} transition={{duration:.2}}>
              <div className="page-heading">
                <div><div className="eyebrow"><span className="eyebrow-dot"/>SITE BUILDER / HOMEPAGE</div><h1>Homepage control<span className="lime">.</span></h1><p>Atur struktur halaman utama tanpa mengacak layout. Edit konten, atur section, lalu preview sebelum menyimpan.</p></div>
                <div className="heading-actions"><button className="button button-secondary" onClick={resetDraft}><Activity size={15}/> Reset demo</button><button className="button button-primary" onClick={() => {saveDraft();notify("Draft tersimpan. Publish online butuh backend.")}}><ArrowUpRight size={15}/> Publish</button></div>
              </div>
              <div className="prototype-notice"><span className="notice-icon"><Zap size={16}/></span><div><strong>Prototype mode</strong><p>Perubahan tersimpan di browser ini. Database, autentikasi, upload server, dan publikasi live belum terhubung.</p></div><button onClick={()=>notify("Backend dan auth akan masuk tahap integrasi.")} aria-label="More about prototype"><CircleHelp size={16}/></button></div>
              <div className="panel cms-panel">
                <div className="tab-bar">
                  {([{id:"sections",label:"Page sections",icon:Layers3},{id:"editor",label:"Content editor",icon:FileText},{id:"preview",label:"Live preview",icon:Eye},{id:"seo",label:"SEO & sharing",icon:Globe}] as const).map(t=>{const Icon=t.icon;return <button key={t.id} className={`tab-button ${tab===t.id?"tab-active":""}`} onClick={()=>setTab(t.id)}><Icon size={15}/>{t.label}</button>})}
                </div>
                <AnimatePresence mode="wait">
                  {tab==="sections" && <motion.div key="sections" className="cms-body" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.14}}>
                    <div className="builder-column">
                      <div className="builder-heading"><div><strong>Homepage structure</strong><small>Drag sections to reorder, or use arrows for precise control.</small></div><button className="button button-secondary button-small" onClick={addSection}><Plus size={14}/> Add section</button></div>
                      <Reorder.Group axis="y" values={sections} onReorder={next=>{setSections(next);setDirty(true)}} className="section-list">
                        {sections.map((section,index)=><Reorder.Item key={section.id} value={section} dragListener={true} className={`section-row ${section.visible?"":"section-disabled"} ${selectedId===section.id?"section-selected":""}`} whileDrag={{scale:1.015,boxShadow:"0 16px 40px #0008",borderColor:"#D7FF35",zIndex:5}} transition={{type:"spring",stiffness:450,damping:32}}>
                          <span className="drag-handle" title="Drag to reorder"><GripVertical size={17}/></span>
                          <button className="section-main" onClick={()=>{setSelectedId(section.id);setTab("editor")}}><strong>{section.name}</strong><small>{section.description}</small></button>
                          <div className="section-tools">
                            <button className="mini-icon" title="Move up" disabled={index===0} onClick={()=>moveSection(section.id,-1)}><ArrowUp size={14}/></button>
                            <button className="mini-icon" title="Move down" disabled={index===sections.length-1} onClick={()=>moveSection(section.id,1)}><ArrowDown size={14}/></button>
                            <button className={`visibility-toggle ${section.visible?"is-on":""}`} aria-label={section.visible?"Hide section":"Show section"} onClick={()=>{setSections(current=>current.map(s=>s.id===section.id?{...s,visible:!s.visible}:s));setDirty(true)}}><span/></button>
                          </div>
                        </Reorder.Item>)}
                      </Reorder.Group>
                      <div className="save-strip"><div><strong>{dirty?"Unsaved changes":"All changes saved"}</strong><small>{dirty?"Remember to save your draft before leaving.":"Draft data is stored in this browser."}</small></div><div className="save-actions"><button className="button button-secondary button-small" onClick={()=>{setSections(readLocalSections());setDirty(false);notify("Local draft restored")}}>Discard</button><button className="button button-primary button-small" onClick={saveDraft}><Save size={14}/> Save draft</button></div></div>
                    </div>
                    <aside className="settings-column">
                      <div className="side-panel"><div className="side-panel-title">Page settings</div><div className="side-panel-body"><label className="field-label">Internal page name<input defaultValue="Homepage"/></label><label className="field-label">Publication status<select defaultValue="Draft"><option>Draft</option><option>Published</option><option>Scheduled</option></select></label><label className="field-label">Schedule date (optional)<input type="datetime-local"/></label><p className="field-help">Publication status is a prototype field and does not publish content.</p></div></div>
                      <div className="side-panel"><div className="side-panel-title">Publishing checklist</div><div className="side-panel-body checklist">{["Copy reviewed","CTA links verified","Media rights confirmed","Desktop & mobile checked"].map((item,i)=><label key={item}><input type="checkbox" checked={checklist[i]} onChange={e=>setChecklist(old=>old.map((v,j)=>i===j?e.target.checked:v))}/><span>{item}</span>{checklist[i]&&<Check size={14}/>}</label>)}</div></div>
                      <div className="brand-rule"><Sparkles size={16}/><div><strong>SeedX design rule</strong><p>Keep highlight and CTA lime <code>#D7FF35</code>. Use motion with intention, not decoration.</p></div></div>
                    </aside>
                  </motion.div>}
                  {tab==="editor" && <motion.div key="editor" className="editor-layout" initial={{opacity:0,x:8}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-6}} transition={{duration:.17}}>
                    <div className="editor-form">
                      <div className="editor-title"><div><h2>Edit section</h2><p>Changes reflect in the preview when you switch tabs.</p></div><span className="pill pill-draft">LOCAL DRAFT</span></div>
                      <label className="field-label">Section label<input value={selected.name} onChange={e=>patchSelected({name:e.target.value})}/></label>
                      <label className="field-label">Headline<input value={selected.headline} onChange={e=>patchSelected({headline:e.target.value})}/></label>
                      <label className="field-label">Supporting copy<textarea rows={4} value={selected.copy} onChange={e=>patchSelected({copy:e.target.value})}/></label>
                      <div className="form-two"><label className="field-label">CTA label<input value={selected.cta} onChange={e=>patchSelected({cta:e.target.value})} placeholder="LET’S TALK"/></label><label className="field-label">CTA destination<input value={selected.url} onChange={e=>patchSelected({url:e.target.value})} placeholder="/contact/"/></label></div>
                      <div className="editor-tip"><Zap size={15}/><span>Keep headlines sharp. One section, one clear job, one primary CTA.</span></div>
                      <div className="save-actions"><button className="button button-secondary" onClick={()=>setTab("sections")}>Back to sections</button><button className="button button-primary" onClick={()=>{setTab("preview");notify("Preview updated")}}>Preview changes <ArrowUpRight size={15}/></button></div>
                    </div>
                    <aside className="editor-aside"><div className="side-panel-title">Selected section</div><div className="side-panel-body"><div className="selected-preview-icon"><Layers3 size={20}/></div><strong>{selected.name}</strong><p className="field-help">Edit copy and CTA fields. Advanced media controls will be added with the asset library integration.</p><div className="editor-meta"><span>Section ID</span><code>{selected.id}</code></div><div className="editor-meta"><span>Visibility</span><button className={`visibility-toggle ${selected.visible?"is-on":""}`} onClick={()=>patchSelected({visible:!selected.visible})}><span/></button></div></div></aside>
                  </motion.div>}
                  {tab==="preview" && <motion.div key="preview" className="preview-tab" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.15}}>
                    <div className="preview-toolbar"><div><strong>Homepage preview</strong><small>Visual approximation · not the live website</small></div><div className="device-switch"><button className={device==="desktop"?"device-active":""} onClick={()=>setDevice("desktop")}><Monitor size={14}/> Desktop</button><button className={device==="mobile"?"device-active":""} onClick={()=>setDevice("mobile")}><Smartphone size={14}/> Mobile</button></div></div>
                    <div className="preview-stage"><motion.div layout className={`website-preview ${device==="mobile"?"website-mobile":""}`}>
                      <div className="mock-nav"><strong>SEED<span>X</span> STUDIO</strong><div>WORK　 SERVICES　 ABOUT　 <b>LET’S TALK ↗</b></div></div>
                      {visibleSections.map((s,i)=><motion.div layout key={s.id} className={i===0?"mock-hero":"mock-section"} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:.22,delay:Math.min(i*.025,.2)}}>
                        {i===0&&<small className="mock-eyebrow">CREATIVE CHAOS WITH A POINT</small>}
                        <h3>{s.headline}</h3><p>{s.copy}</p>
                        {s.cta&&<button className="mock-cta">{s.cta} ↗</button>}
                        {["services","work","team","gallery"].includes(s.id)&&<div className="mock-cards"><span/><span/><span/></div>}
                      </motion.div>)}
                      <div className="mock-footer">#ThisisSeed · CREATIVE CHAOS WITH A POINT</div>
                    </motion.div></div>
                  </motion.div>}
                  {tab==="seo" && <motion.div key="seo" className="seo-layout" initial={{opacity:0,y:5}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-5}} transition={{duration:.15}}>
                    <div className="editor-form"><div className="editor-title"><div><h2>SEO & social sharing</h2><p>Draft metadata for the homepage.</p></div></div>
                      <label className="field-label">SEO title<input maxLength={65} value={seoTitle} onChange={e=>{setSeoTitle(e.target.value);setDirty(true)}}/><small className="char-count">{seoTitle.length}/65 characters</small></label>
                      <label className="field-label">Meta description<textarea rows={4} maxLength={160} value={seoDesc} onChange={e=>{setSeoDesc(e.target.value);setDirty(true)}}/><small className="char-count">{seoDesc.length}/160 characters</small></label>
                      <label className="field-label">Social share image URL<input placeholder="https://..."/></label><label className="field-label">Canonical URL<input placeholder="https://seedx.studio/"/></label>
                      <button className="button button-primary" onClick={saveDraft}><Save size={15}/> Save SEO draft</button>
                    </div>
                    <aside className="google-card"><div className="side-panel-title">Search result preview</div><div className="side-panel-body"><div className="google-domain">https://seedx.studio/</div><div className="google-title">{seoTitle||"SEO title"}</div><p>{seoDesc||"Meta description"}</p></div></aside>
                  </motion.div>}
                </AnimatePresence>
              </div>
            </motion.section>}

            {page!=="overview" && page!=="homepage" && <motion.section key={page} className="page-view placeholder-page" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-5}} transition={{duration:.2}}>
              <div className="page-heading"><div><div className="eyebrow"><span className="eyebrow-dot"/>CONTENT MODULE / V1 ROADMAP</div><h1>{pageLabel}<span className="lime">.</span></h1><p>This module is part of the SeedX CMS roadmap. The shared shell and visual system are in place; this module will be built after the Homepage CMS foundation.</p></div><span className="pill pill-neutral">COMING NEXT</span></div>
              <div className="placeholder-card"><div className="placeholder-symbol"><Layers3 size={24}/></div><h2>{pageLabel} is queued for the next build phase.</h2><p>We’re keeping this module honest: no fake metrics or pretend integrations. Once its content model is agreed, it can connect to the same reusable data layer.</p><button className="button button-primary" onClick={()=>go("homepage")}>Back to Homepage CMS <ArrowUpRight size={15}/></button></div>
            </motion.section>}
          </AnimatePresence>
          <footer className="app-footer"><span>SEEDX CMS <span className="footer-dot">●</span> CREATIVE CHAOS WITH A POINT</span><span>V1 PROTOTYPE · LOCAL DATA ONLY</span></footer>
        </div>
      </main>
      <AnimatePresence>{toast && <motion.div className="toast-message" role="status" initial={{opacity:0,y:12,scale:.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:8}} transition={{duration:.18}}><span className="toast-check"><Check size={15}/></span>{toast}</motion.div>}</AnimatePresence>
    </div>
  );
}
